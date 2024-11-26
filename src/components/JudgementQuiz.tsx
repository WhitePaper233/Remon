import { Button, Card, CardBody, Chip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useFailedStore } from "../stores/failed";
import { Judgement } from "../types/quiz";

interface QuizProps {
  quiz: Judgement;
  nextQuiz: () => void;
}

export default function Quiz({ quiz, nextQuiz }: QuizProps) {
  const [selected, setSelected] = useState<boolean | null>(null);

  const { failed, addJudgement } = useFailedStore();

  useEffect(() => {
    // Reset selected option when the answerId changes
    setSelected(null);
  }, [quiz]);

  useEffect(() => {
    console.debug(failed);
  }, [failed]);

  function getButtonColor(option: boolean) {
    if (selected === null) {
      return "default";
    }
    if (quiz.answer === option) {
      return "success";
    }
    if (selected === option && quiz.answer !== option) {
      return "danger";
    }
  }

  function getButtonVariant(option: boolean) {
    if (selected !== null) {
      if (selected === option || quiz.answer === option) {
        return "solid";
      }
    }
    return "bordered";
  }

  function onOptionClick(option: boolean) {
    if (selected === null) {
      setSelected(option);
      if (option !== quiz.answer) {
        addJudgement(quiz);
      }
    }
  }

  function checkButtonDisabled(option: boolean) {
    if (selected !== null) {
      return selected !== option && option !== quiz.answer;
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
          <Button
            className="regular-text-base"
            color={getButtonColor(true)}
            variant={getButtonVariant(true)}
            fullWidth={true}
            onClick={onOptionClick.bind(null, true)}
            isDisabled={checkButtonDisabled(true)}
          >
            正确
          </Button>
          <Button
            className="regular-text-base"
            color={getButtonColor(false)}
            variant={getButtonVariant(false)}
            fullWidth={true}
            onClick={onOptionClick.bind(null, false)}
            isDisabled={checkButtonDisabled(false)}
          >
            错误
          </Button>
        </div>
      </div>

      <div className="flex flex-row justify-end">
        <Button
          className="regular-text-base"
          color="primary"
          variant="ghost"
          onClick={nextQuiz}
          isDisabled={selected !== null ? false : true}
        >
          下一题
        </Button>
      </div>
    </div>
  );
}
