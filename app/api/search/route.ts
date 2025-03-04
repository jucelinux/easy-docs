import { NextResponse } from 'next/server';
import { QdrantClient } from '@qdrant/js-client-rest';

const qdrant = new QdrantClient({ url: 'http://localhost:6333' });
const COLLECTION_NAME = 'documents';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    // TODO: Generate embeddings for the query
    const queryVector = new Array(1536).fill(0); // Placeholder

    const searchResults = await qdrant.search(COLLECTION_NAME, {
      vector: queryVector,
      limit: 5,
      with_payload: true,
    });

    return NextResponse.json({ results: searchResults });
  } catch (error) {
    console.error('Search Error:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
}