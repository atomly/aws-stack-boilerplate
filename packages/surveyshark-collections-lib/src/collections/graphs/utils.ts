// Type
import { GraphDocument } from './types';

/**
 * Sanitizes the duplicate vertices from a graph document.
 * @param graph - Graph document.
 */
export function sanitizeDuplicateVertices(graph: GraphDocument): void {
  const verticesHashTable: Record<string, null> = {};
  const uniqueVertices = graph.vertices.reduce(
    (acc, vertex) => {
      if (!(vertex._id in verticesHashTable)) {
        verticesHashTable[vertex._id] = null;
        acc.push(vertex);
      }
      return acc;
    },
    [] as GraphDocument['vertices'],
  );
  graph.vertices = uniqueVertices;
}

/**
 * Sanitizes the duplicate edges from a graph document.
 * @param graph - Graph document.
 */
export function sanitizeDuplicateEdges(graph: GraphDocument): void {
  const edgesHashTable: Record<string, null> = {};
  const uniqueEdges = graph.edges.reduce(
    (acc, edge) => {
      if (!(edge._id in edgesHashTable)) {
        edgesHashTable[edge._id] = null;
        acc.push(edge);
      }
      return acc;
    },
    [] as GraphDocument['edges'],
  );
  graph.edges = uniqueEdges;
}
