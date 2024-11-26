export interface BaseQuizType {
  question: string;
  explanation?: string;
}

export interface SingleChoice extends BaseQuizType {
  options: {
    id: number;
    content: string;
  }[];
  answer: number;
}

export interface MultipleChoice extends BaseQuizType {
  options: [
    {
      id: number;
      content: string;
    }
  ];
  answer: number[];
}

export interface Judgement extends BaseQuizType {
  answer: boolean;
}

export interface QuizSet {
  singleChoice?: SingleChoice[];
  multipleChoice?: MultipleChoice[];
  judgement?: Judgement[];
}

export interface QuizStore {
  fileContent: QuizSet | null;
  setFileContent: (fileContent: string | null) => void;
  setFileContentFromQuizSet: (fileContent: QuizSet) => void;
}

export interface FailedStore {
  failed: QuizSet;
  addSingleChoice: (question: SingleChoice) => void;
  addMultipleChoice: (question: MultipleChoice) => void;
  addJudgement: (question: Judgement) => void;
  resetFailed: () => void;
}
