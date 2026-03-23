"""
Repository Analyzer Module

Responsible for cloning repositories and analyzing their structure.
"""

import os
import tempfile
import json
from pathlib import Path
from typing import Dict, List, Any
import logging

# Handle optional git dependency
try:
    from git import Repo
    GIT_AVAILABLE = True
except ImportError:
    GIT_AVAILABLE = False
    Repo = None

logger = logging.getLogger(__name__)


class RepositoryAnalyzer:
    """Analyzes repository structure and detects key files."""
    
    def __init__(self):
        self.temp_dir = None
        self.repo = None
        self.repo_path = None
        
    def _ensure_temp_dir(self) -> str:
        """Ensure a writable temporary directory exists."""
        base = os.getenv('CODEATLAS_TMP_DIR', None)
        if base and os.path.isdir(base):
            return tempfile.mkdtemp(prefix='codeatlas_', dir=base)
        return tempfile.mkdtemp(prefix='codeatlas_')

    def clone_repository(self, repo_url: str) -> str:
        """Clone repository to temporary directory."""
        if not GIT_AVAILABLE:
            raise ImportError(
                "Git is not installed or not in PATH. "
                "Please install Git from https://git-scm.com/download/win "
                "or set GIT_PYTHON_GIT_EXECUTABLE environment variable."
            )

        try:
            self.temp_dir = self._ensure_temp_dir()
            logger.info(f"Cloning {repo_url} to {self.temp_dir}")
            # Use shallow clone to reduce size and lock footprint
            self.repo = Repo.clone_from(repo_url, self.temp_dir, depth=1)
            self.repo_path = Path(self.temp_dir)
            return self.temp_dir
        except Exception as e:
            logger.error(f"Failed to clone repository: {e}")
            raise
    
    def analyze_structure(self) -> Dict[str, Any]:
        """Analyze repository structure and return metadata."""
        if not self.repo_path:
            raise ValueError("Repository not cloned yet")
        
        structure = {
            "root_files": [],
            "directories": [],
            "key_files": {},
        }
        
        # Scan root directory
        for item in self.repo_path.iterdir():
            if item.is_file():
                structure["root_files"].append(item.name)
            elif item.is_dir() and not item.name.startswith("."):
                structure["directories"].append(item.name)
        
        # Detect key configuration files
        key_patterns = {
            "package.json": "Node.js/NPM",
            "requirements.txt": "Python/pip",
            "Pipfile": "Python/Pipenv",
            "pom.xml": "Java/Maven",
            "build.gradle": "Java/Gradle",
            "Dockerfile": "Docker",
            "docker-compose.yml": "Docker Compose",
            ".github/workflows": "GitHub Actions",
            "Makefile": "Build Tool",
            "terraform": "Terraform"
        }
        
        for pattern, tech in key_patterns.items():
            path = self.repo_path / pattern
            if path.exists():
                structure["key_files"][pattern] = tech
        
        # code metrics: file type counts and line counts
        language_extensions = {
            'Python': ['.py'],
            'JavaScript': ['.js'],
            'TypeScript': ['.ts', '.tsx'],
            'HTML': ['.html', '.htm'],
            'CSS': ['.css', '.scss'],
            'Java': ['.java'],
            'C#': ['.cs'],
            'Go': ['.go'],
            'Terraform': ['.tf'],
        }

        language_stats = {lang: {'files': 0, 'lines': 0} for lang in language_extensions}

        for root, _, files in os.walk(self.repo_path):
            if '.git' in root.split(os.sep):
                continue

            for filename in files:
                ext = Path(filename).suffix.lower()
                for lang, exts in language_extensions.items():
                    if ext in exts:
                        path = Path(root) / filename
                        try:
                            text = path.read_text(errors='ignore')
                            lines = len(text.splitlines())
                        except Exception:
                            lines = 0

                        language_stats[lang]['files'] += 1
                        language_stats[lang]['lines'] += lines
                        break

        structure['language_stats'] = {k: v for k, v in language_stats.items() if v['files'] > 0}
        return structure
    
    def cleanup(self):
        """Clean up temporary directory and close repo resources."""
        import shutil

        try:
            if self.repo:
                try:
                    self.repo.close()
                except Exception:
                    pass
        except Exception:
            pass

        def _on_remove_error(func, path, exc_info):
            # fix read-only file mode
            try:
                os.chmod(path, 0o777)
                func(path)
            except Exception as exc:
                logger.warning(f"Could not remove {path}: {exc}")

        if self.temp_dir and os.path.exists(self.temp_dir):
            shutil.rmtree(self.temp_dir, onerror=_on_remove_error)
            logger.info("Cleaned up temporary repository")
