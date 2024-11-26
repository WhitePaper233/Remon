import { useQuizStore } from "../stores/quiz";

// import Quiz from "../components/Quiz";
import { useEffect, useState } from "react";
import SingleChoiceQuiz from "../components/SingleChoiceQuiz";
import JudgementQuiz from "../components/JudgementQuiz";

interface QuizViewState {
  QuizType: "singleChoice" | "multipleChoice" | "judgement";
  Index: number;
}

interface QuizViewProps {
  setReviewState: (state: "result") => void;
}

export default function QuizView({ setReviewState }: QuizViewProps) {
  const { fileContent } = useQuizStore();
  const [quizViewState, setQuizViewState] = useState<QuizViewState>({
    QuizType: "singleChoice",
    Index: 0,
  });

  const nextQuiz = () => {
    if (!fileContent) return;

    const { QuizType, Index } = quizViewState;
    const currentQuizList = fileContent[QuizType];

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
      if (fileContent[nextQuizType] && fileContent[nextQuizType].length > 0) {
        setQuizViewState({ QuizType: nextQuizType, Index: 0 });
        return;
      }
    }

    // 如果没有找到下一个有题目的类型，跳转到结果页
    setReviewState("result");
  };

  // 初始化题目类型
  useEffect(() => {
    if (!fileContent) return;
    if (fileContent.singleChoice && fileContent.singleChoice.length > 0) {
      setQuizViewState({ QuizType: "singleChoice", Index: 0 });
      return;
    }
    if (fileContent.multipleChoice && fileContent.multipleChoice.length > 0) {
      setQuizViewState({ QuizType: "multipleChoice", Index: 0 });
      return;
    }
    if (fileContent.judgement && fileContent.judgement.length > 0) {
      setQuizViewState({ QuizType: "judgement", Index: 0 });
      return;
    }
  }, [fileContent]);

  return (
    <>
      <div className="w-screen h-screen flex flex-row justify-center">
        <div className="flex flex-col justify-center max-w-[36rem]">
          {/* 单选 */}
          {quizViewState.QuizType === "singleChoice" &&
            fileContent &&
            fileContent.singleChoice && (
              <SingleChoiceQuiz
                quiz={fileContent.singleChoice[quizViewState.Index]}
                nextQuiz={nextQuiz}
              />
            )}

          {/* TODO: */}
          {/* 多选 */}
          {/* {quizViewState.QuizType === "multipleChoice" &&
            fileContent &&
            fileContent.multipleChoice && (
              <Quiz<"multipleChoice">
                options={
                  fileContent.multipleChoice[quizViewState.Index].options
                }
                question={
                  fileContent.multipleChoice[quizViewState.Index].question
                }
                answerId={
                  fileContent.multipleChoice[quizViewState.Index].answer
                }
                explanation={
                  fileContent.multipleChoice[quizViewState.Index].explanation
                }
                nextQuiz={nextQuiz}
              />
            )} */}

          {/* 判断 */}
          {quizViewState.QuizType === "judgement" &&
            fileContent &&
            fileContent.judgement && (
              <JudgementQuiz
                quiz={fileContent.judgement[quizViewState.Index]}
                nextQuiz={nextQuiz}
              />
            )}
        </div>
      </div>
    </>
  );
}
