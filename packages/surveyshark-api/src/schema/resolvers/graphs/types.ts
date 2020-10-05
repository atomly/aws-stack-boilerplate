// Libraries
import { GraphEdge } from '@atomly/surveyshark-collections-lib';

// Dependencies
import { IThrowError } from '../../../utils';

// Types
import {
  GQL,
  Resolver,
  IResolvers,
} from '../../../types';

export interface IGraphsResolverMap extends IResolvers {
  Query: {
    readGraphEdge: Resolver<null, GQL.QueryReadGraphEdgeArgs, Promise<GraphEdge | null>>;
    readGraphEdges: Resolver<null, GQL.QueryReadGraphEdgesArgs, Promise<GraphEdge[]>>;
  },
  Mutation: {
    createGraphEdge: Resolver<null, GQL.MutationCreateGraphEdgeArgs, Promise<GraphEdge | IThrowError>>;
    updateGraphEdge: Resolver<null, GQL.MutationUpdateGraphEdgeArgs, Promise<GraphEdge | null | IThrowError>>;
    deleteGraphEdge: Resolver<null, GQL.MutationDeleteGraphEdgeArgs, Promise<GraphEdge | null | IThrowError>>;
  },
}
