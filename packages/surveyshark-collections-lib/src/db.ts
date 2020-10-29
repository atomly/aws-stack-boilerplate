/* eslint-disable @typescript-eslint/no-explicit-any */

// Libraries
import { Connection } from 'mongoose';

// Dependencies
import { DefaultDBContext } from '@atomly/mongoose-sdk';
import {
  answersCollection,
  closuresCollection,
  customersCollection,
  graphVerticesCollection,
  graphEdgesCollection,
  graphsCollection,
  plansCollection,
  questionsCollection,
  resultsCollection,
  subscriptionsCollection,
  surveysCollection,
  usersCollection,
  welcomeScreensCollection,
  GraphDocument,
  GraphVertexDocument,
  GraphEdgeDocument,
  QuestionDocument,
  SurveyDocument,
  UserDocument,
} from './collections';
import { sanitizeDuplicateVertices, sanitizeDuplicateEdges } from './collections/graphs/utils';

export const collections = {
  Answers: answersCollection,
  Closures: closuresCollection,
  Customers: customersCollection,
  GraphVertices: graphVerticesCollection,
  GraphEdges: graphEdgesCollection,
  Graphs: graphsCollection,
  Plans: plansCollection,
  Questions: questionsCollection,
  Results: resultsCollection,
  Subscriptions: subscriptionsCollection,
  Surveys: surveysCollection,
  Users: usersCollection,
  WelcomeScreens: welcomeScreensCollection,
};

export class SurveySharkDBContext<T extends typeof collections = typeof collections> extends DefaultDBContext<T> {
  constructor(args: {
      connectionString: string;
      collections: T;
  }) {
    super(args);

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    //
    // USERS
    //

    /**
     * Post-delete document hook that deletes the related user documents.
     */
    this.collections.Users.schema.post<UserDocument>('deleteOne',  { document: true, query: false }, async doc => {
      const surveys = await this.collections.Surveys.model.find({ user: doc }).populate('graph');
      // TODO: Figure out what to do with Stripe ustomers and subscriptions data.
      await Promise.all(surveys.map(survey => survey.deleteOne()));
    });

    /**
     * Pre-delete query hook that deletes the related user documents.
     */
    this.collections.Users.schema.pre(/delete|findOneAndDelete/i, async function() {
      const queryConditions = (this as any)._conditions; // `this` is the Query object.
      const doc: UserDocument | null = await self.collections.Users.model.findOne(queryConditions).lean();
      if (doc) {
        const surveys = await self.collections.Surveys.model.find({ user: doc }).populate('graph');
        // TODO: Figure out what to do with Stripe ustomers and subscriptions data.
        await Promise.all(surveys.map(survey => survey.deleteOne()));
      }
    });

    //
    // SURVEYS
    //

    /**
     * Post-delete document hook that deletes the related survey documents.
     */
    this.collections.Surveys.schema.post<SurveyDocument>('deleteOne',  { document: true, query: false }, async doc => {
      await Promise.all([
        this.collections.Graphs.model.deleteOne({ uuid: doc.graph.uuid }),
        this.collections.Questions.model.deleteMany({ surveyId: doc.uuid }),
        this.collections.Answers.model.deleteMany({ surveyId: doc.uuid }),
        this.collections.Closures.model.deleteMany({ surveyId: doc.uuid }),
        this.collections.WelcomeScreens.model.deleteMany({ surveyId: doc.uuid }),
        this.collections.Results.model.deleteMany({ surveyId: doc.uuid }),
      ]);
    });

    /**
     * Pre-delete query hook that deletes the related survey documents.
     */
    this.collections.Surveys.schema.pre(/delete|findOneAndDelete/i, async function() {
      const queryConditions = (this as any)._conditions; // `this` is the Query object.
      const doc: SurveyDocument | null = await self.collections.Surveys.model.findOne(queryConditions).populate('graph').lean();
      if (doc) {
        await Promise.all([
          self.collections.Graphs.model.deleteOne({ uuid: doc.graph.uuid }),
          self.collections.Questions.model.deleteMany({ surveyId: doc.uuid }),
          self.collections.Answers.model.deleteMany({ surveyId: doc.uuid }),
          self.collections.Closures.model.deleteMany({ surveyId: doc.uuid }),
          self.collections.WelcomeScreens.model.deleteMany({ surveyId: doc.uuid }),
          self.collections.Results.model.deleteMany({ surveyId: doc.uuid }),
        ]);
      }
    });

    //
    // QUESTIONS
    //

    /**
     * Post-delete document hook that deletes the related answers of the removed question.
     */
    this.collections.Questions.schema.post<QuestionDocument>('deleteOne',  { document: true, query: false }, async doc => {
      await this.collections.Answers.model.deleteMany({ parentQuestionId: doc.uuid });
    });

    /**
     * Pre-delete query hook that deletes the related answers of the removed question.
     */
    this.collections.Questions.schema.pre(/delete|findOneAndDelete/i, async function() {
      const queryConditions = (this as any)._conditions; // `this` is the Query object.
      const doc: GraphDocument | null = await self.collections.Questions.model.findOne(queryConditions).lean();
      if (doc) {
        await self.collections.Answers.model.deleteMany({ parentQuestionId: doc.uuid });
      }
    });

    //
    // GRAPHS
    //

    /**
     * Pre-save hook that sanitizes any duplicate vertices and edges from
     * the Graph document.
     */
    this.collections.Graphs.schema.pre<GraphDocument>('save', function(next) {
      sanitizeDuplicateVertices(this);
      sanitizeDuplicateEdges(this);
      next();
    });

    /**
     * Post-delete document hook that deletes the related vertices and edges of the removed graph.
     */
    this.collections.Graphs.schema.post<GraphVertexDocument>('deleteOne',  { document: true, query: false }, async doc => {
      await Promise.all([
        this.collections.GraphVertices.model.deleteMany({ graphId: doc.uuid }),
        this.collections.GraphEdges.model.deleteMany({ graphId: doc.uuid }),
      ]);
    });

    /**
     * Pre-delete query hook that deletes the related vertices and edges of the removed graph.
     */
    this.collections.Graphs.schema.pre(/delete|findOneAndDelete/i, async function() {
      const queryConditions = (this as any)._conditions; // `this` is the Query object.
      const doc: GraphDocument | null = await self.collections.Graphs.model.findOne(queryConditions).lean();
      if (doc) {
        await Promise.all([
          self.collections.GraphVertices.model.deleteMany({ graphId: doc.uuid }),
          self.collections.GraphEdges.model.deleteMany({ graphId: doc.uuid }),
        ]);
      }
    });

    //
    // GRAPH VERTICES
    //

    /**
     * Post-save hook that adds the created vertex to the respective graph's vertices.
     */
    this.collections.GraphVertices.schema.post<GraphVertexDocument>('save', async doc => {
      await this.collections.Graphs.model.updateOne(
        { uuid: doc.graphId },
        { $addToSet: { vertices: doc } },
      );
    });

    /**
     * Post-save hook that adds the created vertices to the respective graph's vertices.
     */
    this.collections.GraphVertices.schema.post<GraphVertexDocument>('insertMany', async (docs: GraphVertexDocument[]) => {
      const verticesByGraphIdsMap = docs.reduce(
        (map, doc) => {
          const vertices = map.get(doc.graphId);
          if (vertices) {
            vertices.push(doc);
          } else {
            map.set(doc.graphId, [doc]);
          }
          return map;
        },
        new Map<string, GraphVertexDocument[]>(),
      );
      const verticesByGraphIds = Array.from(verticesByGraphIdsMap.entries());
      if (verticesByGraphIds.length) {
        await Promise.all((
          verticesByGraphIds.map(([graphId, vertices]) => {
            return this.collections.Graphs.model.updateOne(
              { uuid: graphId },
              { $addToSet: { vertices: { $each: vertices } } },
            );
          })
        ));
      }
    });

    /**
     * Pre-delete query hook that pulls the deleted vertex from the respective graph's vertices.
     */
    this.collections.GraphVertices.schema.pre(/delete|findOneAndDelete/i, async function() {
      const queryConditions = (this as any)._conditions; // `this` is the Query object.
      const doc: GraphVertexDocument | null = await self.collections.GraphVertices.model.findOne(queryConditions).lean();
      if (doc) {
        const edges = await self.collections.GraphEdges.model.find({
          $or: [
            { from: doc },
            { to: doc },
          ],
        });
        const promises: unknown[] = edges.map(edge => edge.deleteOne());
        promises.push((
          self.collections.Graphs.model.updateOne(
            { uuid: doc.graphId },
            { $pull: { vertices: doc._id } },
          )
        ))
        await Promise.all(promises);
      }
    });

    /**
     * Post-delete document hook that pulls the deleted vertex from the respective graph's vertices.
     */
    this.collections.GraphVertices.schema.post<GraphVertexDocument>('deleteOne',  { document: true, query: false }, async doc => {
      const edges = await this.collections.GraphEdges.model.find({
        $or: [
          { from: doc },
          { to: doc },
        ],
      });
      const promises: unknown[] = edges.map(edge => edge.deleteOne());
      promises.push((
        this.collections.Graphs.model.updateOne(
          { uuid: doc.graphId },
          { $pull: { vertices: doc._id } },
        )
      ))
      await Promise.all(promises);
    });

    //
    // GRAPH EDGES
    //

    /**
     * Post-save hook that adds the created edge to the respective graph's edges.
     */
    this.collections.GraphEdges.schema.post<GraphEdgeDocument>('save', async doc => {
      await this.collections.Graphs.model.updateOne(
        { uuid: doc.graphId },
        { $addToSet: { edges: doc } },
      );
    });

    /**
     * Post-save hook that adds the created vertices to the respective graph's vertices.
     */
    this.collections.GraphEdges.schema.post<GraphEdgeDocument>('insertMany', async (docs: GraphEdgeDocument[]) => {
      const edgesByGraphIdsMap = docs.reduce(
        (map, doc) => {
          const edges = map.get(doc.graphId);
          if (edges) {
            edges.push(doc);
          } else {
            map.set(doc.graphId, [doc]);
          }
          return map;
        },
        new Map<string, GraphEdgeDocument[]>(),
      );
      const edgesByGraphIds = Array.from(edgesByGraphIdsMap.entries());
      if (edgesByGraphIds.length) {
        await Promise.all((
          edgesByGraphIds.map(([graphId, edges]) => {
            return this.collections.Graphs.model.updateOne(
              { uuid: graphId },
              { $addToSet: { edges: { $each: edges } } },
            );
          })
        ));
      }
    });

    /**
     * Pre-delete query hook that pulls the deleted edge from the respective graph's edges.
     */
    this.collections.GraphEdges.schema.pre(/delete|findOneAndDelete/i, async function() {
      const queryConditions = (this as any)._conditions; // `this` is the Query object.
      const doc: GraphEdgeDocument | null = await self.collections.GraphEdges.model.findOne(queryConditions).lean();
      if (doc) {
        await self.collections.Graphs.model.updateOne(
          { uuid: doc.graphId },
          { $pull: { edges: doc._id } },
        );
      }
    });

    /**
     * Post-delete document hook that pulls the deleted edge from the respective graph's edges.
     */
    this.collections.GraphEdges.schema.post<GraphEdgeDocument>('deleteOne', { document: true, query: false }, async doc => {
      await this.collections.Graphs.model.updateOne(
        { uuid: doc.graphId },
        { $pull: { edges: doc._id } },
      );
    });
  }

  public async setup(connection: Connection): Promise<void> {
    Object.values(this.collections).forEach((collection) => {
      collection.setupModel(connection);
    });
  }
}
