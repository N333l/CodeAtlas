"""
Technology Detection Module

Detects frameworks, programming languages, and infrastructure components.
"""

import os
import json
import yaml
import re
from pathlib import Path
from typing import Dict, List, Set, Any
import logging

logger = logging.getLogger(__name__)


class TechnologyDetector:
    """Detects technologies used in a repository."""
    
    TECHNOLOGY_PATTERNS = {
        "backend": {
            "Flask": ["flask"],
            "Django": ["django"],
            "FastAPI": ["fastapi"],
            "Express.js": ["express"],
            "Spring": ["spring-boot", "org.springframework"],
            "ASP.NET": ["aspnetcore", "System.Web"],
            ".NET": ["dotnet", "csproj"],
        },
        "frontend": {
            "React": ["react", "react-dom"],
            "Vue": ["vue"],
            "Angular": ["@angular"],
            "Next.js": ["next"],
            "Svelte": ["svelte"],
        },
        "database": {
            "PostgreSQL": ["psycopg2", "postgresql"],
            "MongoDB": ["pymongo", "mongodb"],
            "MySQL": ["mysql-connector", "pymysql"],
            "Redis": ["redis"],
            "Elasticsearch": ["elasticsearch"],
        },
        "infrastructure": {
            "Docker": ["docker"],
            "Kubernetes": ["kubernetes", "helm"],
            "Terraform": ["terraform"],
            "AWS": ["boto3", "aws"],
            "Google Cloud": ["google-cloud"],
            "Azure": ["azure"],
        }
    }
    
    def __init__(self, repo_path: Path):
        self.repo_path = repo_path
        self.detected_technologies = {"backend": [], "frontend": [], "database": [], "infrastructure": []}
    
    def detect_from_dependencies(self) -> Dict[str, List[str]]:
        """Detect technologies from dependency files."""
        dependencies = []
        
        # Check package.json
        package_json = self.repo_path / "package.json"
        if package_json.exists():
            try:
                with open(package_json) as f:
                    data = json.load(f)
                    deps = list(data.get("dependencies", {}).keys()) + list(data.get("devDependencies", {}).keys())
                    dependencies.extend(deps)
            except Exception as e:
                logger.warning(f"Error reading package.json: {e}")
        
        # Check requirements.txt
        requirements = self.repo_path / "requirements.txt"
        if requirements.exists():
            try:
                with open(requirements) as f:
                    for line in f:
                        dep = line.strip().split("==")[0].split(">=")[0].lower()
                        if dep:
                            dependencies.append(dep)
            except Exception as e:
                logger.warning(f"Error reading requirements.txt: {e}")
        
        # Check Pipfile
        pipfile = self.repo_path / "Pipfile"
        if pipfile.exists():
            try:
                with open(pipfile) as f:
                    data = yaml.safe_load(f)
                    if data:
                        deps = list(data.get("packages", {}).keys()) + list(data.get("dev-packages", {}).keys())
                        dependencies.extend(deps)
            except Exception as e:
                logger.warning(f"Error reading Pipfile: {e}")
        
        # Match technologies
        for category, techs in self.TECHNOLOGY_PATTERNS.items():
            for tech, patterns in techs.items():
                for pattern in patterns:
                    if any(pattern.lower() in dep.lower() for dep in dependencies):
                        self.detected_technologies[category].append(tech)
                        break
        
        return self.detected_technologies
    
    def detect_from_files(self) -> Dict[str, List[str]]:
        """Detect technologies from file existence."""
        detections = {"backend": [], "frontend": [], "database": [], "infrastructure": []}
        
        file_patterns = {
            "backend": {
                "Flask": ["app.py", "wsgi.py"],
                "Django": ["manage.py", "settings.py"],
                "Express.js": ["server.js", "index.js"],
            },
            "frontend": {
                "React": ["App.jsx", "App.tsx"],
                "Vue": ["App.vue"],
            },
            "infrastructure": {
                "Docker": ["Dockerfile"],
                "Terraform": ["main.tf", "variables.tf"],
                "Kubernetes": ["deployment.yaml", "service.yaml"],
            }
        }
        
        for category, techs in file_patterns.items():
            for tech, files in techs.items():
                if any((self.repo_path / f).exists() for f in files):
                    detections[category].append(tech)
        
        return detections
    
    def detect_from_source(self) -> Dict[str, List[str]]:
        """Detect technologies from source code imports and keywords."""
        detections = {"backend": [], "frontend": [], "database": [], "infrastructure": []}

        # only scan common source files
        file_exts = ['.py', '.js', '.ts', '.tsx', '.jsx', '.java', '.cs', '.go', '.rb', '.php']
        exclude_dirs = {'.git', 'node_modules', 'venv', '__pycache__', '.venv', 'build', 'dist'}

        for root, dirs, files in os.walk(self.repo_path):
            # skip irrelevant folders
            dirs[:] = [d for d in dirs if d not in exclude_dirs]
            for filename in files:
                ext = Path(filename).suffix.lower()
                if ext not in file_exts:
                    continue
                file_path = Path(root) / filename
                try:
                    content = file_path.read_text(errors='ignore').lower()
                except Exception:
                    continue

                for category, techs in self.TECHNOLOGY_PATTERNS.items():
                    for tech, patterns in techs.items():
                        if tech in detections[category]:
                            continue
                        for pattern in patterns:
                            if pattern in content:
                                detections[category].append(tech)
                                break

        return detections

    def get_all_technologies(self) -> Dict[str, List[str]]:
        """Get all detected technologies."""
        deps = self.detect_from_dependencies()
        files = self.detect_from_files()
        source = self.detect_from_source()

        result = {}
        for category in deps:
            combined = set(deps.get(category, []))
            combined.update(files.get(category, []))
            combined.update(source.get(category, []))
            result[category] = sorted(combined)

        return result
