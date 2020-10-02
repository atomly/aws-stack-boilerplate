export function questionsWithAnswersPipeline(questionId: string): unknown[] {
  return [
    {
      $match: {
        uuid: questionId,
      },
    }, {
      $lookup: {
        from: 'answers', 
        let: {
          questionId: '$uuid',
        }, 
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$parentQuestionId', '$$questionId'],
              },
            },
          },
        ], 
        as: 'answers',
      },
    },
  ];
}

export const questionWithAnswersPipeline = [
  {
    $lookup: {
      from: 'questions', 
      let: {
        questionId: '$uuid',
      }, 
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ['$parentQuestionId', '$$questionId'],
            },
          },
        },
      ],
      as: 'questions',
    },
  },
];
