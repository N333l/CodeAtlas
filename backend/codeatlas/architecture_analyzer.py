"""
Architecture Analyzer Module

Main module that orchestrates repository analysis and architecture inference.
"""

from pathlib import Path
from typing import Dict, Any
from .repository_analyzer import RepositoryAnalyzer
from .technology_detector import TechnologyDetector
from .dependency_graph import DependencyGraph, Component
import logging

logger = logging.getLogger(__name__)


class ArchitectureAnalyzer:
    """Orchestrates the analysis of repository architecture."""
    
    def __init__(self):
        self.repo_analyzer = RepositoryAnalyzer()
        self.dependency_graph = DependencyGraph()
        self.technologies = {}
    
    def analyze_repository(self, repo_url: str) -> Dict[str, Any]:
        """
        Analyze a repository and return architecture information.
        
        Args:
            repo_url: URL of the GitHub repository
            
        Returns:
            Dictionary containing architecture information
        """
        try:
            # Clone repository
            repo_path = self.repo_analyzer.clone_repository(repo_url)
            logger.info(f"Analyzing repository: {repo_url}")
            
            # Analyze structure
            structure = self.repo_analyzer.analyze_structure()
            logger.info(f"Repository structure: {structure}")
            
            # Detect technologies
            detector = TechnologyDetector(Path(repo_path))
            self.technologies = detector.get_all_technologies()
            logger.info(f"Detected technologies: {self.technologies}")
            
            # Build dependency graph
            self._build_dependency_graph(structure, self.technologies)
            
            # Generate insights
            insights = self._generate_insights()
            
            # Cleanup
            self.repo_analyzer.cleanup()
            
            return {
                "repository_url": repo_url,
                "structure": structure,
                "technologies": self.technologies,
                "architecture": self.dependency_graph.get_graph_data(),
                "insights": insights,
            }
        
        except Exception as e:
            logger.error(f"Error analyzing repository: {e}")
            self.repo_analyzer.cleanup()
            raise
    
    def _build_dependency_graph(self, structure: Dict[str, Any], technologies: Dict[str, list]) -> None:
        """Build dependency graph based on structure and technologies."""
        
        # Add technology-based components
        for tech_type, techs in technologies.items():
            for tech in techs:
                component = Component(
                    name=tech,
                    component_type=tech_type,
                    technology=tech
                )
                self.dependency_graph.add_component(component)
        
        # Infer dependencies based on directory structure and common patterns
        directories = structure.get("directories", [])
        
        # Common patterns for microservices
        common_services = ["api", "backend", "service", "server", "gateway"]
        common_frontends = ["frontend", "client", "web", "ui", "app"]
        common_databases = ["db", "database", "data"]
        
        for dir_name in directories:
            dir_lower = dir_name.lower()
            
            if any(pattern in dir_lower for pattern in common_services):
                service = Component(
                    name=f"Service: {dir_name}",
                    component_type="service",
                    technology="Service"
                )
                self.dependency_graph.add_component(service)
            
            elif any(pattern in dir_lower for pattern in common_frontends):
                frontend = Component(
                    name=f"Frontend: {dir_name}",
                    component_type="frontend",
                    technology="Frontend"
                )
                self.dependency_graph.add_component(frontend)
            
            elif any(pattern in dir_lower for pattern in common_databases):
                database = Component(
                    name=f"Database: {dir_name}",
                    component_type="database",
                    technology="Database"
                )
                self.dependency_graph.add_component(database)
    
    def _generate_insights(self) -> Dict[str, Any]:
        """Generate architectural insights."""
        insights = {
            "services": [],
            "external_dependencies": list(set(sum(self.technologies.values(), []))),
            "potential_issues": [],
            "recommendations": []
        }
        
        # Add insights based on detected technologies
        if self.technologies.get("frontend"):
            insights["services"].append("Frontend application detected")
        
        if self.technologies.get("backend"):
            insights["services"].append("Backend services detected")
        
        if self.technologies.get("database"):
            insights["services"].append("Database layer detected")
        
        if self.technologies.get("infrastructure"):
            insights["services"].append("Infrastructure automation detected")
        
        # Check for potential issues
        if len(self.dependency_graph.find_circular_dependencies()) > 0:
            insights["potential_issues"].append("Circular dependencies detected")
        
        # Generate recommendations
        if "Docker" not in self.technologies.get("infrastructure", []):
            insights["recommendations"].append("Consider using Docker for containerization")
        
        if "Kubernetes" not in self.technologies.get("infrastructure", []) and len(self.technologies.get("backend", [])) > 1:
            insights["recommendations"].append("Multiple backend services detected - consider Kubernetes for orchestration")
        
        return insights
