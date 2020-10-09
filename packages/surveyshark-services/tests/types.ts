export type SimpleSurveyData = (
  {
    question: {
        name: string;
        value: string;
    };
    answers: {
        name: string;
        value: string;
    }[];
    closure?: undefined;
    welcomeScreen?: undefined;
  } |
  {
    closure: {
        name: string;
        value: string;
    };
    question?: undefined;
    answers?: undefined;
    welcomeScreen?: undefined;
  } |
  {
    welcomeScreen: {
        name: string;
        value: string;
    };
    closure?: undefined;
    question?: undefined;
    answers?: undefined;
  }
)[];
