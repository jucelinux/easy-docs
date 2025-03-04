import Link from 'next/link';

interface DocumentCardProps {
  id: string;
  title: string;
  filename: string;
}

export default function DocumentCard({ id, title, filename }: DocumentCardProps) {
  return (
    <Link href={`/chat/${id}`} className="block">
      <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow bg-white">
        <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{filename}</p>
      </div>
    </Link>
  );
}