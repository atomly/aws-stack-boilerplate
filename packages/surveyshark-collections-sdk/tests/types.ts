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
    welcomeScreen?: undefined;
  } |
  {
    closure: {
        displayText: string;
        value: string;
    };
    question?: undefined;
    answers?: undefined;
    welcomeScreen?: undefined;
  } |
  {
    welcomeScreen: {
        displayText: string;
        value: string;
    };
    closure?: undefined;
    question?: undefined;
    answers?: undefined;
  }
)[];
