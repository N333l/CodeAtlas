# CodeAtlas - Automated Codebase Architecture Analyzer

CodeAtlas is an open-source developer tool that automatically analyzes software repositories and generates high-level architecture overviews. It helps developers quickly understand complex codebases by visualizing system components and their relationships.

## Features

- **Automated Repository Analysis** - Clone and analyze any GitHub repository
- **Technology Detection** - Identify frameworks, programming languages, and infrastructure components
- **Dependency Graph Construction** - Visualize relationships between system components
- **Architecture Visualization** - Interactive architecture diagrams
- **Architecture Insights** - Recommendations and potential improvements
- **Developer-Friendly Interface** - Intuitive web UI for exploration

## Quick Start

### Prerequisites

- Python 3.8+
- Node.js 14+ and npm
- Git

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
python app.py
```

The backend API will run at `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
REACT_APP_API_URL=http://localhost:5000/api npm start
```

The frontend will open at `http://localhost:3000`

## Project Structure

```
CodeAtlas/
├── backend/                    # Python Flask backend
│   ├── codeatlas/             # Core analysis modules
│   │   ├── repository_analyzer.py
│   │   ├── technology_detector.py
│   │   ├── dependency_graph.py
│   │   ├── architecture_analyzer.py
│   │   └── __init__.py
│   ├── app.py                 # Flask API server
│   ├── requirements.txt        # Python dependencies
│   ├── setup.py               # Package setup
│   └── README.md
├── frontend/                  # React frontend
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   ├── store/            # State management
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── README.md
└── README.md
```

## How It Works

### Analysis Workflow

1. **Repository Cloning** - Clone the target repository to a temporary directory
2. **Structure Analysis** - Scan directory structure and identify key configuration files
3. **Technology Detection** - Analyze dependency files and detect frameworks/technologies
4. **Dependency Graph** - Build a graph representing component relationships
5. **Architecture Inference** - Infer architecture patterns and generate insights
6. **Visualization** - Render interactive architecture diagrams

### Supported Detection

CodeAtlas detects:

- **Programming Languages**: Python, JavaScript, Java, C#, Go, Rust, etc.
- **Frameworks**: Django, Flask, Spring, Express.js, React, Vue, Angular, etc.
- **Databases**: PostgreSQL, MongoDB, MySQL, Redis, Elasticsearch, etc.
- **Infrastructure**: Docker, Kubernetes, Terraform, AWS, Azure, Google Cloud, etc.

## API Reference

See [backend/README.md](backend/README.md) for detailed API documentation.

## Use Cases

- **Developer Onboarding** - New developers quickly understand project architecture
- **Codebase Exploration** - Explore unfamiliar repositories
- **Architecture Documentation** - Auto-generate architecture diagrams
- **System Analysis** - Study design patterns in open-source projects
- **Educational Purposes** - Learn from real-world software architectures

## Development

To contribute to CodeAtlas:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Future Enhancements

- [ ] Support for additional programming languages
- [ ] Deeper static code analysis
- [ ] Microservice architecture detection
- [ ] VS Code extension integration
- [ ] AI-assisted recommendations
- [ ] Multi-repository analysis
- [ ] Architecture comparison tools

## License

MIT License

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**CodeAtlas** - Understand Complex Codebases Instantly
