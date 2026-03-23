"""
Dependency Graph Module

Constructs and manages dependency relationships between components.
"""

import networkx as nx
from typing import Dict, List, Tuple, Any
from dataclasses import dataclass
import logging

logger = logging.getLogger(__name__)


@dataclass
class Component:
    """Represents a system component."""
    name: str
    component_type: str  # service, module, library, framework
    technology: str
    description: str = ""


class DependencyGraph:
    """Manages dependency relationships between components."""
    
    def __init__(self):
        self.graph = nx.DiGraph()
        self.components: Dict[str, Component] = {}
    
    def add_component(self, component: Component) -> None:
        """Add a component to the graph."""
        self.components[component.name] = component
        self.graph.add_node(
            component.name,
            type=component.component_type,
            technology=component.technology,
            description=component.description
        )
    
    def add_dependency(self, source: str, target: str, relationship: str = "depends_on") -> None:
        """Add a dependency relationship between components."""
        if source not in self.graph:
            logger.warning(f"Source component {source} not found")
            return
        if target not in self.graph:
            logger.warning(f"Target component {target} not found")
            return
        
        self.graph.add_edge(source, target, relationship=relationship)
    
    def get_component_dependencies(self, component_name: str) -> List[str]:
        """Get all dependencies of a component."""
        if component_name not in self.graph:
            return []
        return list(self.graph.successors(component_name))
    
    def get_component_dependents(self, component_name: str) -> List[str]:
        """Get all components that depend on this component."""
        if component_name not in self.graph:
            return []
        return list(self.graph.predecessors(component_name))
    
    def get_graph_data(self) -> Dict[str, Any]:
        """Export graph as dictionary for serialization."""
        nodes = []
        edges = []
        
        for node in self.graph.nodes():
            node_data = self.graph.nodes[node]
            nodes.append({
                "id": node,
                "label": node,
                "type": node_data.get("type", "unknown"),
                "technology": node_data.get("technology", ""),
                "description": node_data.get("description", "")
            })
        
        for source, target in self.graph.edges():
            edge_data = self.graph.edges[source, target]
            edges.append({
                "source": source,
                "target": target,
                "relationship": edge_data.get("relationship", "depends_on")
            })
        
        return {"nodes": nodes, "edges": edges}
    
    def find_circular_dependencies(self) -> List[List[str]]:
        """Find circular dependencies in the graph."""
        try:
            cycles = list(nx.simple_cycles(self.graph))
            return cycles
        except nx.NetworkXNoCycle:
            return []
    
    def get_topological_order(self) -> List[str]:
        """Get topological order of components for build/execution."""
        try:
            return list(nx.topological_sort(self.graph))
        except nx.NetworkXError:
            logger.warning("Graph contains cycles, topological sort not possible")
            return []
