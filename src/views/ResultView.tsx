import { Button } from "@nextui-org/react";
import LoadQuizSet from "../components/LoadQuizSet";
import Accuracy from "../components/misc/Accuracy";
import { useQuizStore } from "../stores/quiz";
import { useFailedStore } from "../stores/failed";

interface ResultViewProps {
  setReviewState: (state: "preview" | "failed-preview") => void;
}

export default function OpenQuizSetView({ setReviewState }: ResultViewProps) {
  const { fileContent, setFileContentFromQuizSet: setFileContentFromJson } =
    useQuizStore();
  const { failed, resetFailed } = useFailedStore();

  const total =
    (fileContent?.singleChoice?.length || 0) +
    (fileContent?.multipleChoice?.length || 0) +
    (fileContent?.judgement?.length || 0);
  const correct =
    total -
    (failed.singleChoice?.length || 0) -
    (failed.multipleChoice?.length || 0) -
    (failed.judgement?.length || 0);

  const singleChoiceAccuracy =
    fileContent?.singleChoice && fileContent.singleChoice?.length > 0
      ? {
          total: fileContent?.singleChoice?.length || 0,
          correct:
            (fileContent?.singleChoice?.length || 0) -
            (failed.singleChoice?.length || 0),
        }
      : undefined;

  const multipleChoiceAccuracy =
    fileContent?.multipleChoice && fileContent.multipleChoice?.length > 0
      ? {
          total: fileContent?.multipleChoice?.length || 0,
          correct:
            (fileContent?.multipleChoice?.length || 0) -
            (failed.multipleChoice?.length || 0),
        }
      : undefined;

  const judgementAccuracy =
    fileContent?.judgement && fileContent.judgement?.length > 0
      ? {
          total: fileContent?.judgement?.length || 0,
          correct:
            (fileContent?.judgement?.length || 0) -
            (failed.judgement?.length || 0),
        }
      : undefined;

  function handleDownload() {
    const jsonString = JSON.stringify(failed);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${new Date().toISOString()}.json`;
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function handleReviewFailed() {
    setFileContentFromJson(failed);
    resetFailed();
    setReviewState("failed-preview");
  }

  return (
    <>
      <div className="w-screen h-screen flex flex-row justify-center">
        <div className="flex flex-col justify-center">
          <div className="mx-auto relative mb-6 select-none">
            <Accuracy
              total={total}
              correct={correct}
              singleChoice={singleChoiceAccuracy}
              multipleChoice={multipleChoiceAccuracy}
              judgement={judgementAccuracy}
            />
          </div>
          <p className="regular-text-xl text-center w-full">接下来?</p>
          <div className="flex flex-row mt-6 mx-auto w-[500px] space-x-3">
            <LoadQuizSet setReviewState={setReviewState} />
            <Button
              className="regular-text-base"
              color="primary"
              variant="shadow"
              fullWidth={true}
              isDisabled={total === correct}
              onClick={handleReviewFailed}
            >
              巩固错题
            </Button>
            <Button
              className="regular-text-base"
              color="primary"
              variant="shadow"
              fullWidth={true}
              isDisabled={total === correct}
              onClick={handleDownload}
            >
              保存错题题库
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
