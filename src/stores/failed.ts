import { create } from "zustand";
import { QuizSet, FailedStore } from "../types/quiz";

const initialQuizSet: QuizSet = {
  singleChoice: [],
  multipleChoice: [],
  judgement: [],
};

export const useFailedStore = create<FailedStore>((set) => ({
  failed: initialQuizSet,
  addSingleChoice: (question) => {
    set((state) => ({
      failed: {
        ...state.failed,
        singleChoice: [...(state.failed.singleChoice || []), question],
      },
    }));
  },
  addMultipleChoice: (question) => {
    set((state) => ({
      failed: {
        ...state.failed,
        multipleChoice: [...(state.failed.multipleChoice || []), question],
      },
    }));
  },
  addJudgement: (question) => {
    set((state) => ({
      failed: {
        ...state.failed,
        judgement: [...(state.failed.judgement || []), question],
      },
    }));
  },
  resetFailed: () => {
    set({
      failed: initialQuizSet,
    });
  },
}));
