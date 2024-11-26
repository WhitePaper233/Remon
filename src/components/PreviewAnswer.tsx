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

interface PreviewAnswerProps<T extends keyof AnswerIdTypeMap> {
  options: T extends "judge" ? undefined : QuizOption[];
  question: string;
  answerId: AnswerIdTypeMap[T];
  explanation?: string;
  nextQuiz: () => void;
}

export default function PreviewAnswer<T extends keyof AnswerIdTypeMap>({
  options,
  question,
  answerId,
  explanation,
  nextQuiz,
}: PreviewAnswerProps<T>) {
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    switch (typeof answerId) {
      case "number":
        setAnswer(
          options?.find((option) => option.id === answerId)?.content || ""
        );
        break;
      case "object":
        setAnswer(
          (answerId as number[])
            .map(
              (id) => options?.find((option) => option.id === id)?.content || ""
            )
            .join(", ")
        );
        break;

      case "boolean":
        setAnswer(answerId ? "正确" : "错误");
        break;
    }
  }, [answerId, options]);

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

      <div className="flex flex-row space-x-[22px]">
        <Chip color="success">答案</Chip>
        <p className="regular-text-xl">{answer}</p>
      </div>

      <div className="flex flex-row justify-end">
        <Button
          className="regular-text-base"
          color="primary"
          variant="ghost"
          onClick={nextQuiz}
        >
          下一题
        </Button>
      </div>
    </div>
  );
}
