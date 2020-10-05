// Libraries
import faker from 'faker';

// Dependencies
import { dbContext } from '../contants';
import { dropDatabase } from '../utils';

// Types
import {
  GraphEdgeDocument,
  GraphVertexDocument,
  GraphDocument,
} from '../../src';
import {
  generateGraphVertexDocument,
  generateGraphEdgeDocument,
  generateGraphDocument,
} from '../fixtures';

let graph: GraphDocument;
let vertex1: GraphVertexDocument;
let vertex2: GraphVertexDocument;
let edge1: GraphEdgeDocument;

describe('graphs collection works correctly', () => {
  beforeAll(
    async () => {
      await dbContext.open();
    },
    120000,
  );

  afterAll(
    async () => {
      await dropDatabase(dbContext);
      await dbContext.close();
    },
    120000,
  );

  it('successfully creates a document for the graphs collection', async () => {
    const doc = generateGraphDocument();
    graph = await new dbContext.collections.Graphs.model(doc).save();
    expect(graph).toBeTruthy();
    expect(graph.uuid).toBeTruthy();
    expect(graph.createdAt).toBeTruthy();
    expect(graph.updatedAt).toBeTruthy();
    expect(graph.vertices).toHaveLength(0);
    expect(graph.edges).toHaveLength(0);
  });

  it('successfully creates a vertex document for the graphs collection', async () => {
    const doc = generateGraphVertexDocument(graph.uuid);
    vertex1 = await new dbContext.collections.GraphVertices.model(doc).save();
    expect(vertex1).toBeTruthy();
    expect(vertex1.uuid).toBeTruthy();
    expect(vertex1.createdAt).toBeTruthy();
    expect(vertex1.updatedAt).toBeTruthy();
    expect(vertex1.key).toBe(doc.key);
  });

  it('should have successfully added the previous vertex through the post-save vertex hook', async () => {
    graph = await dbContext.collections.Graphs.model.findOne({ uuid: graph.uuid }) as GraphDocument;
    expect(graph.vertices).toHaveLength(1);
  });

  it('should fail to add duplicate vertices', async () => {
    graph.vertices.push(vertex1);
    graph.vertices.push(vertex1);
    graph = await graph.save();
    expect(graph.vertices).toHaveLength(1);
  });

  it('successfully creates an edge document for the graphs collection', async () => {
    vertex2 = await new dbContext.collections.GraphVertices.model(generateGraphVertexDocument(graph.uuid)).save();
    await new dbContext.collections.GraphVertices.model(generateGraphVertexDocument(graph.uuid)).save();
    edge1 = await new dbContext.collections.GraphEdges.model(generateGraphEdgeDocument(graph.uuid, vertex1, vertex2)).save();
    expect(await edge1.populated('from')).toBeTruthy();
    expect(await edge1.populated('to')).toBeTruthy();
  });

  it('should have successfully added the previous vertices and edge through the post-save vertex and edge hook', async () => {
    graph = await dbContext.collections.Graphs.model.findOne({ uuid: graph.uuid }) as GraphDocument;
    expect(graph.vertices).toHaveLength(3);
    expect(graph.edges).toHaveLength(1);
  });

  it('should fail to add duplicate edges', async () => {
    const updateResults = await dbContext.collections.Graphs.model.updateOne(
      { uuid: graph.uuid },
      {
        $addToSet: {
          vertices: { $each: [vertex1, vertex2] },
          edges: { $each: [edge1] },
        },
      },
    );
    expect(updateResults.n).toBe(1);
    graph = await dbContext.collections.Graphs.model.findOne({ uuid: graph.uuid }) as GraphDocument;
    expect(graph.vertices).toHaveLength(3);
    expect(graph.edges).toHaveLength(1);
  });

  it('successfully finds the documents for the graphs collection', async () => {
    const graphs = await dbContext.collections
      .Graphs
      .model
      .find({})
      .populate('graph_vertices')
      .populate('graph_edges');
    expect(graphs).toHaveLength(1);
    expect(graphs[0].vertices).toHaveLength(3);
    expect(graphs[0].edges).toHaveLength(1);
  });

  describe('post delete hooks for vertices and edges work correctly', () => {
    beforeEach(() => {

    });

    it('deleting an edge (through document) also removes it from the graph', async () => {
      await edge1.deleteOne();
      graph = await dbContext.collections.Graphs.model.findOne({ uuid: graph.uuid }) as GraphDocument;
      expect(graph.edges).toHaveLength(0);
    });

    it('deleting a vertex (through document) also removes its edge(s) and removes the vertex and respective edge(s) from the graph', async () => {
      const vertex4 = await new dbContext.collections.GraphVertices.model(generateGraphVertexDocument(graph.uuid)).save();
      const vertex5 = await new dbContext.collections.GraphVertices.model(generateGraphVertexDocument(graph.uuid)).save();
      await new dbContext.collections.GraphEdges.model(generateGraphEdgeDocument(graph.uuid, vertex4, vertex5)).save();
      graph = await dbContext.collections.Graphs.model.findOne({ uuid: graph.uuid }) as GraphDocument;
      expect(graph.vertices).toHaveLength(5);
      expect(graph.edges).toHaveLength(1);
      // deleting vertex should remove its edge, and it should remove the vertex and edge from the graph:
      await vertex4.deleteOne();
      graph = await dbContext.collections.Graphs.model.findOne({ uuid: graph.uuid }) as GraphDocument;
      expect(graph.vertices).toHaveLength(4);
      expect(graph.edges).toHaveLength(0);
    });

    it('deleting an edge (through query) also removes it from the graph', async () => {
      edge1 = await new dbContext.collections.GraphEdges.model(generateGraphEdgeDocument(graph.uuid, vertex1, vertex2)).save();
      await dbContext.collections.GraphEdges.model.deleteOne({ uuid: edge1.uuid });
      graph = await dbContext.collections.Graphs.model.findOne({ uuid: graph.uuid }) as GraphDocument;
      expect(graph.edges).toHaveLength(0);
    });

    it('deleting a vertex (through query) also removes its edge(s) and removes the vertex and respective edge(s) from the graph', async () => {
      const vertex4 = await new dbContext.collections.GraphVertices.model(generateGraphVertexDocument(graph.uuid)).save();
      const vertex5 = await new dbContext.collections.GraphVertices.model(generateGraphVertexDocument(graph.uuid)).save();
      await new dbContext.collections.GraphEdges.model(generateGraphEdgeDocument(graph.uuid, vertex4, vertex5)).save();
      graph = await dbContext.collections.Graphs.model.findOne({ uuid: graph.uuid }) as GraphDocument;
      expect(graph.vertices).toHaveLength(6);
      expect(graph.edges).toHaveLength(1);
      // deleting vertex should remove its edge, and it should remove the vertex and edge from the graph:
      await dbContext.collections.GraphVertices.model.deleteOne({ uuid: vertex4.uuid });
      graph = await dbContext.collections.Graphs.model.findOne({ uuid: graph.uuid }) as GraphDocument;
      expect(graph.vertices).toHaveLength(5);
      expect(graph.edges).toHaveLength(0);
    });

    it('deleting a graph (through document) also removes its related vertices and edges', async () => {
      await graph.deleteOne();
      const vertices = await dbContext.collections.GraphVertices.model.find({}).lean();
      expect(vertices).toHaveLength(0);
      const edges = await dbContext.collections.GraphEdges.model.find({}).lean();
      expect(edges).toHaveLength(0);
    });

    it('deleting a graph (through query) also removes its related vertices and edges', async () => {
      // Setting up a new small graph then deleting it through a query:
      graph = await new dbContext.collections.Graphs.model(generateGraphDocument()).save();
      vertex2 = await new dbContext.collections.GraphVertices.model(generateGraphVertexDocument(graph.uuid)).save();
      await new dbContext.collections.GraphVertices.model(generateGraphVertexDocument(graph.uuid)).save();
      await new dbContext.collections.GraphVertices.model(generateGraphVertexDocument(graph.uuid)).save();
      await dbContext.collections.Graphs.model.deleteOne({ uuid: graph.uuid });
      // Assertions:
      const vertices = await dbContext.collections.GraphVertices.model.find({}).lean();
      expect(vertices).toHaveLength(0);
      const edges = await dbContext.collections.GraphEdges.model.find({}).lean();
      expect(edges).toHaveLength(0);
    });
  });

  describe('graph vertices and edges insertMany hook works correctly', () => {
    const amountOfVertices = 10;
    const amountOfEdges = 50;

    beforeAll(async () => {
      const doc = generateGraphDocument();
      graph = await new dbContext.collections.Graphs.model(doc).save();
      // Inserting many vertices:
      const graphVertexDocs: Partial<GraphVertexDocument>[] = Array(amountOfVertices)
        .fill(undefined)
        .map(() => generateGraphVertexDocument(graph.uuid));
      const graphVertices = await dbContext.collections.GraphVertices
        .model
        .insertMany(graphVertexDocs);
      // Inserting many edges:
      const graphEdgeDocs: Partial<GraphEdgeDocument>[] = Array(amountOfEdges)
        .fill(undefined)
        .map(() => {
          const randomFromVertex = faker.random.number(Math.ceil(amountOfVertices / 2));
          const randomToVertex = randomFromVertex + faker.random.number(Math.ceil(amountOfVertices / 2)) - 1;
          return generateGraphEdgeDocument(
            graph.uuid,
            graphVertices[randomFromVertex]!,
            graphVertices[randomToVertex]!,
          );
        });
      await dbContext.collections.GraphEdges
        .model
        .insertMany(graphEdgeDocs);
      // Validating that the graph references to its vertices and edges was set up:
      graph = await dbContext.collections.Graphs.model.findOne({ uuid: graph.uuid }) as GraphDocument;
    });

    it('should have correctly referenced the inserted vertices', () => {
      expect(graph.vertices).toHaveLength(amountOfVertices);
    });

    it('should have correctly referenced the inserted edges', () => {
      expect(graph.edges).toHaveLength(amountOfEdges);
    });
  });
});
