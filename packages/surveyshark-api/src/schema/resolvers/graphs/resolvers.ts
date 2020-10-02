// Libraries
import { GraphEdge } from '@atomly/surveyshark-collections-sdk';

// Types
import { IGraphsResolverMap } from './types';
import { IThrowError } from '../../../utils';

// Utils
import { throwError } from '../../../utils';

// Dependencies
import { graphEdgesPopulatePipeline, graphEdgeQueryPipeline, graphEdgesQueryPipeline } from './aggregations';

const resolvers: IGraphsResolverMap = {
  Query: {
    async readGraphEdge(_, { input }, { dbContext }): Promise<GraphEdge | null> {
      const graphEdges = await dbContext.collections.GraphEdges.model.aggregate<GraphEdge>(
        graphEdgeQueryPipeline(
          input.fromVertexKey,
          input.toVertexKey,
        ),
      );
      return graphEdges[0];
    },
    async readGraphEdges(_, { input }, { dbContext }): Promise<GraphEdge[]> {
      const graphEdges = await dbContext.collections.GraphEdges.model.aggregate<GraphEdge>(
        graphEdgesQueryPipeline(
          input.fromVertexKey ?? undefined,
          input.toVertexKey ?? undefined,
        ),
      );
      return graphEdges;
    },
  },
  Mutation: {
    async createGraphEdge(_, { input }, { dbContext }): Promise<GraphEdge | IThrowError> {
      try {
        const [fromVertex, toVertex] = await Promise.all([
          dbContext.collections.GraphVertices.model.findOne({
            key: input.fromVertexKey,
          }).lean(),
          dbContext.collections.GraphVertices.model.findOne({
            key: input.fromVertexKey,
          }).lean(),
        ]);
        if (
          fromVertex &&
          toVertex &&
          fromVertex.graphId === toVertex.graphId
        ) {
          const graphEdge = await new dbContext.collections.GraphEdges.model({
            graphId: fromVertex.graphId,
            from: fromVertex,
            to: toVertex,
          }).save();
          return graphEdge;
        }
        throw new Error('Invalid origin and/or ending vertex keys.');
      } catch (err) {
        return throwError({
          status: throwError.Errors.EStatuses.BAD_REQUEST,
          message: 'Invalid input.',
          details: err.message,
        });
      }
    },
    async updateGraphEdge(_, { input }, { dbContext }): Promise<GraphEdge | null | IThrowError> {
      try {
        const graphEdges = await dbContext.collections.GraphEdges.model.aggregate<GraphEdge>(
          graphEdgeQueryPipeline(
            input.fromVertexKey,
            input.toVertexKey,
          ),
        );
        if (graphEdges[0]) {
          const graphEdge = await dbContext.collections.GraphEdges.model
            .findOneAndUpdate(
              { uuid: graphEdges[0].uuid },
              { weight: input.weight ?? undefined },
              { new: true },
            ).populate(graphEdgesPopulatePipeline)
            .lean();
          return graphEdge;
        }
        return null;
      } catch (err) {
        return throwError({
          status: throwError.Errors.EStatuses.BAD_REQUEST,
          message: 'Invalid input.',
          details: err.message,
        });
      }
    },
    async deleteGraphEdge(_, { input }, { dbContext }): Promise<GraphEdge | null | IThrowError> {
      try {
        const graphEdges = await dbContext.collections.GraphEdges.model.aggregate<GraphEdge>(
          graphEdgeQueryPipeline(
            input.fromVertexKey,
            input.toVertexKey,
          ),
        );
        if (graphEdges[0]) {
          const graphEdge = await dbContext.collections.GraphEdges.model
            .findOneAndDelete({ uuid: graphEdges[0].uuid })
            .populate(graphEdgesPopulatePipeline)
            .lean();
          return graphEdge;
        }
        return null;
      } catch (err) {
        return throwError({
          status: throwError.Errors.EStatuses.BAD_REQUEST,
          message: 'Invalid input.',
          details: err.message,
        });
      }
    },
  },
}

export default resolvers;
