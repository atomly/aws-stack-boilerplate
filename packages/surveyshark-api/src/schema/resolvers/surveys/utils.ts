// Libraries
import { Survey } from '@atomly/surveyshark-collections-lib';
import { Graph, Vertex } from '@atomly/data-structures-sdk';

/**
 * Validates a survey by checking if there are any unconnected vertices. Returns
 * a list of the unconnected vertices, the survey is considered valid if the list is empty.
 * @param survey - Survey object.
 */
export function validateSurvey(survey: Survey): Vertex<unknown>[] {
  const graph = new Graph({
    isDirectedGraph: true,
    vertices: survey.graph.vertices,
    edges: survey.graph.edges.map(edge => ({ from: edge.from.key, to: edge.to.key, weight: edge.weight })),
  });
  const unconnectedVertices = Array.from(graph.verticesMap.values()).filter(vertex => {
    if (graph.edgesMap.from[vertex.key]) {
      return Object.keys(graph.edgesMap.from[vertex.key].to).length === 0;
    }
    return true;
  });
  return unconnectedVertices;
}
