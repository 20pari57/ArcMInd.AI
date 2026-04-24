from typing import Dict, List
import networkx as nx


def build_dependency_graph(analyzed_files: List[Dict]) -> nx.DiGraph:
    graph = nx.DiGraph()

    for item in analyzed_files:
        graph.add_node(
            item["path"],
            label=item["path"],
            extension=item["extension"],
            size=item["size"],
        )

    known_paths = {item["path"] for item in analyzed_files}

    for item in analyzed_files:
        for dep in item["imports"]:
            matched_target = None

            dep_clean = dep.replace("\\", "/")

            for path in known_paths:
                if path.endswith(dep_clean) or path.endswith(dep_clean + ".py") or path.endswith(dep_clean + ".js"):
                    matched_target = path
                    break

            if matched_target:
                graph.add_edge(item["path"], matched_target, type="imports")

    return graph


def graph_to_reactflow(graph: nx.DiGraph) -> Dict[str, List[Dict]]:
    nodes = []
    edges = []

    x = 0
    y = 0

    for index, node in enumerate(graph.nodes(data=True)):
        node_id, attrs = node
        nodes.append(
            {
                "id": node_id,
                "position": {"x": x, "y": y},
                "data": {"label": attrs.get("label", node_id)},
                "type": "default",
            }
        )
        x += 220
        if (index + 1) % 4 == 0:
            x = 0
            y += 140

    for source, target, attrs in graph.edges(data=True):
        edges.append(
            {
                "id": f"{source}->{target}",
                "source": source,
                "target": target,
                "label": attrs.get("type", "imports"),
                "type": "smoothstep",
            }
        )

    return {"nodes": nodes, "edges": edges}