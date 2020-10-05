import { Base, BaseDocument } from '../base';
import { GraphVertex, GraphVertexDocument } from '../graph_vertices';
import { GraphEdge, GraphEdgeDocument } from '../graph_edges';

export interface Graph<T = unknown> extends Base {
  vertices: GraphVertex<T>[];
  edges: GraphEdge[];
}

export interface GraphDocument<T = unknown> extends BaseDocument {
  vertices: GraphVertexDocument<T>[];
  edges: GraphEdgeDocument[];
}
