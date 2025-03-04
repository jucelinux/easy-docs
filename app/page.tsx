import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">Easy Docs</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/chat" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Chat</Link>
              <Link href="/upload" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">Upload</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-28 pb-16 px-4 sm:pt-32 sm:pb-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Your AI Documentation</span>
            <span className="block text-blue-600 mt-2">Assistant</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-500">
            Upload your technical manuals and instantly chat with them using our advanced AI. Get answers in seconds, not hours.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link href="/chat" 
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
              Start Chatting
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white rounded-3xl shadow-xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {/* Chat Feature */}
          <Link href="/chat" 
                className="group relative bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="flex items-center">
              <span className="inline-flex p-3 rounded-lg bg-blue-600/10 text-blue-600 ring-4 ring-blue-600/20">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </span>
              <h3 className="ml-4 text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                AI Chat Interface
              </h3>
            </div>
            <p className="mt-4 text-gray-500">
              Get instant answers from your documentation using our advanced AI chat interface. Natural conversations with your technical manuals.
            </p>
          </Link>

          {/* Upload Feature */}
          <Link href="/upload"
                className="group relative bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="flex items-center">
              <span className="inline-flex p-3 rounded-lg bg-green-600/10 text-green-600 ring-4 ring-green-600/20">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </span>
              <h3 className="ml-4 text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                Document Upload
              </h3>
            </div>
            <p className="mt-4 text-gray-500">
              Upload your PDF documentation securely. Our AI processes and indexes your content for instant retrieval and natural conversations.
            </p>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-sm text-gray-500">
              Powered by Next.js, Ollama, and Qdrant
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}