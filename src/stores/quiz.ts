import { create } from "zustand";
import { QuizSet, QuizStore } from "../types/quiz";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { QuizSetSchema } from "../schemas/quiz";

const ajv = new Ajv({ allowUnionTypes: true });
addFormats(ajv);
const validate = ajv.compile(QuizSetSchema);

export const useQuizStore = create<QuizStore>((set) => ({
  fileContent: null,
  setFileContent: (fileContent: string | null) => {
    if (!fileContent) {
      set({ fileContent: null });
      return;
    }

    // parse json file content
    const parsedContent: QuizSet = JSON.parse(fileContent);
    // validate json file content
    if (
      validate(parsedContent) &&
      (parsedContent.judgement !== undefined ||
        parsedContent.singleChoice !== undefined ||
        parsedContent.multipleChoice !== undefined)
    ) {
      set({ fileContent: parsedContent });
    } else {
      throw new Error("题库文件格式错误");
    }
  },
  setFileContentFromQuizSet: (fileContent: QuizSet) => {
    set({ fileContent: { ...fileContent } });
  },
}));
