import { Button, Card, CardBody, Chip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useFailedStore } from "../stores/failed";
import { SingleChoice } from "../types/quiz";

interface QuizProps {
  quiz: SingleChoice;
  nextQuiz: () => void;
}

export default function Quiz({ quiz, nextQuiz }: QuizProps) {
  const [selected, setSelected] = useState<number | number[] | boolean | null>(
    null
  );

  const { failed, addSingleChoice } = useFailedStore();

  useEffect(() => {
    // Reset selected option when the answerId changes
    setSelected(null);
  }, [quiz]);

  useEffect(() => {
    console.debug(failed);
  }, [failed]);

  function getButtonColor(optionId: number) {
    if (!selected) {
      return "default";
    }
    if (quiz.answer === optionId) {
      return "success";
    }
    if (selected === optionId && quiz.answer !== optionId) {
      return "danger";
    }
  }

  function getButtonVariant(optionId: number) {
    if (selected) {
      if (selected === optionId || quiz.answer === optionId) {
        return "solid";
      }
    }
    return "bordered";
  }

  function onOptionClick(optionId: number) {
    if (!selected) {
      setSelected(optionId);
      if (optionId !== quiz.answer) {
        addSingleChoice(quiz);
      }
    }
  }

  function checkButtonDisabled(optionId: number) {
    if (selected) {
      return selected !== optionId && optionId !== quiz.answer;
    }
    return false;
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row space-x-2 align-middle">
        <Chip color="primary">单选题</Chip>
        <p className="regular-text-xl">{quiz.question}</p>
      </div>

      {quiz.explanation && (
        <Card>
          <CardBody>
            <p className="regular-text-base">解析：{quiz.explanation}</p>
          </CardBody>
        </Card>
      )}

      <div className="py-4">
        <div className="flex flex-col space-y-2">
          {quiz.options.map((option) => (
            <Button
              key={option.id}
              className="regular-text-base"
              color={getButtonColor(option.id)}
              variant={getButtonVariant(option.id)}
              fullWidth={true}
              onClick={onOptionClick.bind(null, option.id)}
              isDisabled={checkButtonDisabled(option.id)}
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
