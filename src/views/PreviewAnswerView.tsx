import { useQuizStore } from "../stores/quiz";

import PreviewAnswer from "../components/PreviewAnswer";
import { useEffect, useState } from "react";
import { QuizSet } from "../types/quiz";
import { Button } from "@nextui-org/react";

interface QuizViewState {
  QuizType: "singleChoice" | "multipleChoice" | "judgement";
  Index: number;
}

interface PreviewAnswerViewProps {
  setReviewState: (state: "test") => void;
  failedReviewMode?: boolean;
}

export default function PreviewAnswerView({
  setReviewState,
  failedReviewMode = false,
}: PreviewAnswerViewProps) {
  const { fileContent } = useQuizStore();
  const [quizViewState, setQuizViewState] = useState<QuizViewState>({
    QuizType: "singleChoice",
    Index: 0,
  });
  const [filteredQuizList, setFilteredQuizList] = useState<QuizSet>({});

  const nextQuiz = () => {
    if (!fileContent) return;

    const { QuizType, Index } = quizViewState;
    const currentQuizList = filteredQuizList[QuizType];

    // 如果当前类型的题目还有下一题，直接跳到下一题
    if (currentQuizList && Index + 1 < currentQuizList.length) {
      setQuizViewState({ QuizType, Index: Index + 1 });
      return;
    }

    // 定义题目类型的顺序
    const quizOrder = ["singleChoice", "multipleChoice", "judgement"] as const;
    const currentQuizIndex = quizOrder.indexOf(QuizType);

    // 查找下一个有题目的类型
    for (let i = currentQuizIndex + 1; i < quizOrder.length; i++) {
      const nextQuizType = quizOrder[i];
      if (
        filteredQuizList[nextQuizType] &&
        filteredQuizList[nextQuizType].length > 0
      ) {
        setQuizViewState({ QuizType: nextQuizType, Index: 0 });
        return;
      }
    }

    // 如果没有找到下一个有题目的类型，跳转到测试页
    setReviewState("test");
  };

  // 初始化题目类型
  useEffect(() => {
    if (!fileContent) return;

    const filtered = { ...fileContent };
    if (!failedReviewMode) {
      filtered.judgement = filtered?.judgement?.filter((item) => item.answer);
    }
    setFilteredQuizList(filtered);

    if (filtered.singleChoice && filtered.singleChoice.length > 0) {
      setQuizViewState({ QuizType: "singleChoice", Index: 0 });
      return;
    }
    if (filtered.multipleChoice && filtered.multipleChoice.length > 0) {
      setQuizViewState({ QuizType: "multipleChoice", Index: 0 });
      return;
    }
    if (filtered.judgement && filtered.judgement.length > 0) {
      setQuizViewState({ QuizType: "judgement", Index: 0 });
      return;
    }
  }, [failedReviewMode, fileContent]);

  return (
    <>
      <div className="w-screen h-screen flex flex-row justify-center">
        <div className="flex flex-col justify-around max-w-[36rem]">
          <div></div>
          <div>
            {/* 单选 */}
            {quizViewState.QuizType === "singleChoice" &&
              filteredQuizList.singleChoice && (
                <PreviewAnswer<"singleChoice">
                  options={
                    filteredQuizList.singleChoice[quizViewState.Index].options
                  }
                  question={
                    filteredQuizList.singleChoice[quizViewState.Index].question
                  }
                  answerId={
                    filteredQuizList.singleChoice[quizViewState.Index].answer
                  }
                  explanation={
                    filteredQuizList.singleChoice[quizViewState.Index]
                      .explanation
                  }
                  nextQuiz={nextQuiz}
                />
              )}

            {/* 多选 */}
            {quizViewState.QuizType === "multipleChoice" &&
              filteredQuizList.multipleChoice && (
                <PreviewAnswer<"multipleChoice">
                  options={
                    filteredQuizList.multipleChoice[quizViewState.Index].options
                  }
                  question={
                    filteredQuizList.multipleChoice[quizViewState.Index]
                      .question
                  }
                  answerId={
                    filteredQuizList.multipleChoice[quizViewState.Index].answer
                  }
                  explanation={
                    filteredQuizList.multipleChoice[quizViewState.Index]
                      .explanation
                  }
                  nextQuiz={nextQuiz}
                />
              )}

            {/* 判断 */}
            {quizViewState.QuizType === "judgement" &&
              filteredQuizList.judgement && (
                <PreviewAnswer<"judge">
                  options={undefined}
                  question={
                    filteredQuizList.judgement[quizViewState.Index].question
                  }
                  answerId={
                    filteredQuizList.judgement[quizViewState.Index].answer
                  }
                  explanation={
                    filteredQuizList.judgement[quizViewState.Index].explanation
                  }
                  nextQuiz={nextQuiz}
                />
              )}
          </div>
          <div className="flex flex-row justify-end">
            <Button
              className="regular-text-base !text-sm"
              variant="light"
              onClick={() => setReviewState("test")}
            >
              跳过答案预览
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
