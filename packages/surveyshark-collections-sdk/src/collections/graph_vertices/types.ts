import { Base, BaseDocument } from '../base';
import { Graph } from '../graphs';

export interface GraphVertex<T = unknown> extends Base {
  graphId: Graph['uuid'];
  key: string;
  value?: T;
}

export interface GraphVertexDocument<T = unknown> extends GraphVertex<T>, BaseDocument {
  _valueCollectionName?: string;
}
