# Easy Docs

An AI-powered documentation assistant that helps you interact with technical manuals using Next.js, Ollama, PostgreSQL, and Pinecone.

## 🚀 Tech Stack

- **Frontend & Backend**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **AI Model**: Ollama (Qwen 4B)
- **Database**: PostgreSQL
- **Vector Search**: Pinecone
- **Container**: Docker & Docker Compose
- **Package Manager**: pnpm

## 🛠 Prerequisites

- Docker and Docker Compose
- Node.js 20+
- pnpm
- MacOS or Linux
- Pinecone API Key (sign up at pinecone.io)

## 🏃‍♂️ Quick Start

1. Clone the repository:
```bash
git clone <your-repo-url>
cd easy-docs
```
2. Set up environment variables:
```bash
cp .env.example .env.local
 ```
 Edit .env.local and add your Pinecone API key.

3. Start the Docker containers:
```bash
docker compose up -d
 ```

4. Install dependencies:
```bash
pnpm install
 ```

5. Access the services:
- Web Interface: http://localhost:3000
- PgAdmin: http://localhost:5050
  - Email: admin@admin.com
  - Password: admin
## 📁 Project Structure
```plaintext
easy-docs/
├── app/              # Next.js app directory
│   ├── api/         # API routes
│   ├── chat/        # Chat interface
│   └── upload/      # Document upload
├── components/       # React components
├── lib/             # Utility functions
│   ├── db/         # Database utilities
│   ├── ai/         # AI/LLM integration
│   └── vector/     # Vector search utilities
├── public/          # Static files
└── docker/          # Docker configuration
 ```

## 🔧 Development
Run the development server:

```bash
pnpm dev
 ```

Build for production:

```bash
pnpm build
 ```

## 📝 Features
- Chat interface for interacting with technical manuals
- PDF document upload and processing
- Semantic search using Pinecone
- Vector embeddings for accurate responses
- PostgreSQL for metadata storage
- Multi-document context support
- Real-time chat responses
- Document version tracking
## 🐳 Docker Services
- web : Next.js application (Port 3000)
- ollama : AI model service with Qwen 4B (Port 11434)
- postgres : Database (Port 5432)
- pgadmin : Database management (Port 5050)
## 🔒 Security Notes
- Default credentials should be changed in production
- API keys should be properly secured
- Enable proper authentication for production use
- Regular security updates recommended
## 🚀 Deployment
The application can be deployed to:

- Railway
- Fly.io
- AWS EC2
- Any Docker-compatible hosting
## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
MIT License - feel free to use this project for personal or commercial purposes.

## 📞 Support
For issues and feature requests, please use the GitHub issues page.