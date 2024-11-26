import { useState } from "react";
import OpenQuizSetView from "./views/OpenQuizSetView";
import PreviewAnswerView from "./views/PreviewAnswerView";
import QuizView from "./views/QuizView";
import ResultView from "./views/ResultView";

export default function App() {
  const [reviewState, setReviewState] = useState<
    "open" | "preview" | "failed-preview" | "test" | "result"
  >("open");

  return (
    <>
      {reviewState === "open" && (
        <OpenQuizSetView setReviewState={setReviewState} />
      )}
      {reviewState === "preview" && (
        <PreviewAnswerView setReviewState={setReviewState} />
      )}
      {reviewState === "failed-preview" && (
        <PreviewAnswerView setReviewState={setReviewState} failedReviewMode={true} />
      )}
      {reviewState === "test" && <QuizView setReviewState={setReviewState} />}
      {reviewState === "result" && (
        <ResultView setReviewState={setReviewState} />
      )}
    </>
  );
}
