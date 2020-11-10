export const surveysWithDataPopulatePipeline = [
  {
    path: 'startingVertex',
    populate: 'value',
  },
  {
    path: 'closingVertex',
    populate: 'value',
  },
  {
    path: 'graph',
    populate: [
      {
        path: 'vertices',
        populate: 'value',
      },
      {
        path: 'edges',
        populate: ['from', 'to'],
      },
    ],
  },
  {
    path: 'user',
    populate: 'value',
  },
];
