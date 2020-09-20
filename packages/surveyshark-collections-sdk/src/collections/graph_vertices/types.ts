import { BaseDocument } from '../base';

export interface GraphVertexDocument<T = unknown> extends BaseDocument {
  graphId: string;
  key: string;
  value?: T;
  _valueCollectionName?: string;
}
