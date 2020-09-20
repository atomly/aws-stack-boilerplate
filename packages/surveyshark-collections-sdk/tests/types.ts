export type SimpleSurveyData = (
  {
    question: {
        displayText: string;
        value: string;
    };
    answers: {
        displayText: string;
        value: string;
    }[];
    closure?: undefined;
  } |
  {
    closure: {
        displayText: string;
        value: string;
    };
    question?: undefined;
    answers?: undefined;
  }
)[];
