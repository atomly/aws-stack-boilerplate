import { Base, BaseDocument } from '../base';
import { Graph } from '../graphs';
import { GraphVertex, GraphVertexDocument } from '../graph_vertices';

export interface GraphEdge<T = unknown, K = T> extends Base {
  graphId: Graph['uuid'];
  from: GraphVertex<T>;
  to: GraphVertex<K>;
  weight?: number;
}

export interface GraphEdgeDocument<T = unknown, K = T> extends GraphEdge<T, K>, BaseDocument {
  from: GraphVertexDocument<T>;
  to: GraphVertexDocument<K>;
}
