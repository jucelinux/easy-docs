'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Document {
  id: string;
  title: string;
  filename: string;
}

export default function ChatPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const response = await fetch('/api/documents');
        const data = await response.json();
        if (data.success) {
          setDocuments(data.documents);
        }
      } catch (error) {
        console.error('Failed to fetch documents:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDocuments();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Choose a Document to Chat About</h1>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse h-40 bg-gray-100 rounded-xl"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <Link href={`/chat/${doc.id}`} key={doc.id}>
              <div className="p-6 border rounded-xl hover:shadow-lg transition-all duration-300 bg-white group">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary">
                  {doc.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {doc.filename}
                </p>
                <div className="mt-4 text-primary text-sm font-medium">
                  Start Chat →
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}