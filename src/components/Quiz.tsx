import { Button, Card, CardBody, Chip } from "@nextui-org/react";
import { useEffect, useState } from "react";

type AnswerIdTypeMap = {
  singleChoice: number;
  multipleChoice: number[];
  judge: boolean;
};

interface QuizOption {
  id: number;
  content: string;
}

interface QuizProps<T extends keyof AnswerIdTypeMap> {
  options: T extends "judge" ? undefined : QuizOption[];
  question: string;
  answerId: AnswerIdTypeMap[T];
  explanation?: string;
  nextQuiz: () => void;
}

export default function Quiz<T extends keyof AnswerIdTypeMap>({
  options,
  question,
  answerId,
  explanation,
  nextQuiz,
}: QuizProps<T>) {
  const [selected, setSelected] = useState<number | number[] | boolean | null>(
    null
  );

  useEffect(() => {
    // Reset selected option when the answerId changes
    setSelected(null);
  }, [question]);

  function getButtonColor(optionId: number) {
    if (!selected) {
      return "default";
    }
    switch (typeof answerId) {
      case "number": {
        if (answerId === optionId) {
          return "success";
        }
        if (selected === optionId && answerId !== optionId) {
          return "danger";
        }
        break;
      }

      case "object": {
        if ((answerId as number[]).includes(optionId)) {
          return "success";
        }
        if (
          selected === optionId &&
          !(answerId as number[]).includes(optionId)
        ) {
          return "danger";
        }
        break;
      }

      case "boolean": {
        if (answerId === selected) {
          return "success";
        }
        if (selected !== answerId) {
          return "danger";
        }
      }
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row space-x-2 align-middle">
        <Chip color="primary">
          {typeof answerId === "number" && "单选题"}
          {typeof answerId === "object" && "多选题"}
          {typeof answerId === "boolean" && "判断题"}
        </Chip>
        <p className="regular-text-xl">{question}</p>
      </div>

      {explanation && (
        <Card>
          <CardBody>
            <p className="regular-text-base">解析：{explanation}</p>
          </CardBody>
        </Card>
      )}

      <div className="py-4">
        <div className="flex flex-col space-y-2">
          {typeof answerId === "number" &&
            options?.map((option) => (
              <Button
                className="regular-text-base"
                color={getButtonColor(option.id)}
                variant={
                  !selected
                    ? "bordered"
                    : selected === option.id || answerId === option.id
                    ? "solid"
                    : "bordered"
                }
                fullWidth={true}
                onClick={() => {
                  if (!selected) setSelected(option.id);
                }}
                isDisabled={
                  selected
                    ? selected !== option.id && option.id !== answerId
                    : false
                }
              >
                {option.content}
              </Button>
            ))}
        </div>
      </div>

      <div className="flex flex-row justify-end">
        <Button
          className="regular-text-base"
          color="primary"
          variant="ghost"
          onClick={nextQuiz}
          isDisabled={!selected}
        >
          下一题
        </Button>
      </div>
    </div>
  );
}
