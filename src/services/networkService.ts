import { NetworkGraphData, NetworkNode, NetworkEdge } from '../types';
import { CASE_NETWORK_DATA } from '../data/unifiedCaseData';

export class NetworkService {
  /**
   * Retrieves network graph data for an active case
   */
  static getCaseNetwork(caseId: string): NetworkGraphData {
    return CASE_NETWORK_DATA;
  }

  /**
   * Filter network graph by node category or minimum call edge weight
   */
  static filterNetwork(
    data: NetworkGraphData,
    filterType: 'all' | 'person' | 'phone' | 'vehicle' | 'location' | 'case',
    minCalls: number = 0
  ): NetworkGraphData {
    let filteredNodes = data.nodes;
    if (filterType !== 'all') {
      filteredNodes = data.nodes.filter((n) => n.type === filterType || n.isFocus);
    }

    const nodeIds = new Set(filteredNodes.map((n) => n.id));

    const filteredEdges = data.edges.filter((e) => {
      const bothNodesExist = nodeIds.has(e.source) && nodeIds.has(e.target);
      const callRequirement = !e.callCount || e.callCount >= minCalls;
      return bothNodesExist && callRequirement;
    });

    return {
      nodes: filteredNodes,
      edges: filteredEdges
    };
  }
}
