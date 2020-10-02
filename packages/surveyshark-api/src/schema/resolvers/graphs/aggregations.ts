export const graphEdgesPopulatePipeline = [
  {
    path: 'from',
    populate: 'value',
  },
  {
    path: 'to',
    populate: 'value',
  },
];

export function graphEdgesQueryPipeline(fromVertexKey?: string, toVertexKey?: string): unknown[] {
  const aggregationPipeline = [
    {
      $lookup: {
        from: 'graph_vertices', 
        localField: 'from', 
        foreignField: '_id', 
        as: 'from',
      },
    }, {
      $lookup: {
        from: 'graph_vertices', 
        localField: 'to', 
        foreignField: '_id', 
        as: 'to',
      },
    }, {
      $unwind: {
        path: '$from',
      },
    }, {
      $unwind: {
        path: '$to',
      },
    }, {
      $match: {
        $or: [
          {
            $expr: {
              $eq: [
                fromVertexKey, '$from.key',
              ],
            },
          }, {
            $expr: {
              $eq: [
                toVertexKey, '$to.key',
              ],
            },
          },
        ],
      },
    },
  ];
  return aggregationPipeline;
}

export function graphEdgeQueryPipeline(fromVertexKey: string, toVertexKey: string): unknown[] {
  const aggregationPipeline = [
    {
      $lookup: {
        from: 'graph_vertices', 
        localField: 'from', 
        foreignField: '_id', 
        as: 'from',
      },
    }, {
      $lookup: {
        from: 'graph_vertices', 
        localField: 'to', 
        foreignField: '_id', 
        as: 'to',
      },
    }, {
      $unwind: {
        path: '$from',
      },
    }, {
      $unwind: {
        path: '$to',
      },
    }, {
      $match: {
        $and: [
          {
            $expr: {
              $eq: [
                fromVertexKey, '$from.key',
              ],
            },
          }, {
            $expr: {
              $eq: [
                toVertexKey, '$to.key',
              ],
            },
          },
        ],
      },
    },
  ];
  return aggregationPipeline;
}
