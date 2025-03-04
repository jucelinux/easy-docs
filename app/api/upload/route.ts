import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { QdrantClient } from "@qdrant/js-client-rest";
import pdf from "pdf-parse/lib/pdf-parse";

const prisma = new PrismaClient();
const qdrant = new QdrantClient({ url: "http://localhost:6333" });

const COLLECTION_NAME = "documents";

// Inicializa o Qdrant
async function initQdrant() {
  try {
    const collections = await qdrant.getCollections();
    const exists = collections.collections.some((c) => c.name === COLLECTION_NAME);

    if (!exists) {
      await qdrant.createCollection(COLLECTION_NAME, {
        vectors: {
          size: 1536,
          distance: "Cosine",
        },
      });
    }
  } catch (error) {
    console.error("Qdrant initialization error:", error);
  }
}

initQdrant();

function splitIntoChunks(text: string, chunkSize: number = 500) {
  const chunks = [];
  const words = text.split(/\s+/);
  let currentChunk = [];
  let currentLength = 0;

  for (const word of words) {
    if (currentLength + word.length > chunkSize) {
      chunks.push(currentChunk.join(" "));
      currentChunk = [word];
      currentLength = word.length;
    } else {
      currentChunk.push(word);
      currentLength += word.length + 1;
    }
  }
  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join(" "));
  }
  return chunks;
}

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    try {
      const bytes = await file.arrayBuffer();
      const parsedPDF = await pdf(bytes);
      const fullText = parsedPDF.text;

      // Create main document
      const document = await prisma.document.create({
        data: {
          title: file.name.replace(".pdf", ""),
          filename: file.name,
          content: fullText,
        },
      });

      // Process chunks
      const textChunks = splitIntoChunks(fullText);
      const batchSize = 50;

      for (let i = 0; i < textChunks.length; i += batchSize) {
        const batch = textChunks.slice(i, i + batchSize);

        // Create chunks in database and Qdrant
        await Promise.all(
          batch.map(async (chunk, index) => {
            const chunkIndex = i + index;
            const vectorId = `${document.id}_${chunkIndex}`;

            // Create chunk in database
            await prisma.documentChunk.create({
              data: {
                content: chunk,
                vectorId,
                chunkIndex,
                documentId: document.id,
              },
            });

            // Store in Qdrant
            await qdrant.upsert(COLLECTION_NAME, {
              wait: true,
              points: [{
                id: chunkIndex,
                payload: {
                  documentId: document.id,
                  chunkIndex,
                  content: chunk,
                },
                vector: Array(1536).fill(0.1),
              }],
            });
          })
        );

        console.log(`Processed batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(textChunks.length / batchSize)}`);
      }

      return NextResponse.json({
        success: true,
        documentId: document.id,
      });

    } catch (pdfError) {
      console.error("PDF Processing Error:", pdfError);
      return NextResponse.json({ error: "Failed to process PDF file" }, { status: 400 });
    }
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Failed to process document" }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};