import {
  CircularProgress,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Progress,
} from "@nextui-org/react";

interface AccuracyProps {
  total: number;
  correct: number;
  singleChoice?: {
    total: number;
    correct: number;
  };
  multipleChoice?: {
    total: number;
    correct: number;
  };
  judgement?: {
    total: number;
    correct: number;
  };
}

export default function Accuracy(props: AccuracyProps) {
  return (
    <div className="flex flex-row space-x-3">
      <Card className="w-[240px] h-[240px] border-none">
        <CardBody className="justify-center items-center pb-0">
          <CircularProgress
            aria-label="总正确率"
            classNames={{
              svg: "w-36 h-36 drop-shadow-md",
              value: "text-3xl font-semibold text-white",
            }}
            value={(props.correct * 100) / props.total}
            strokeWidth={3}
            showValueLabel={true}
          />
        </CardBody>
        <CardFooter className="justify-center items-center pt-0">
          <Chip
            classNames={{
              base: "border-1 border-white/30",
              content: "text-white/90 regular-text-base !text-sm",
            }}
            variant="bordered"
          >
            总正确率
          </Chip>
        </CardFooter>
      </Card>
      {(props.judgement || props.multipleChoice || props.singleChoice) && (
        <Card className="w-[480px] h-[240px] border-none">
          <CardBody className="justify-center items-center space-y-6">
            {props.singleChoice && (
              <Progress
                aria-label="单选正确率"
                size="md"
                radius="lg"
                classNames={{
                  base: "max-w-md",
                  label: "tracking-wider regular-text-base",
                  value: "text-foreground/60",
                }}
                label="单选正确率"
                value={
                  (props.singleChoice.correct * 100) / props.singleChoice.total
                }
                showValueLabel={true}
              />
            )}
            {props.multipleChoice && (
              <Progress
                aria-label="多选正确率"
                size="md"
                radius="lg"
                classNames={{
                  base: "max-w-md",
                  label: "tracking-wider regular-text-base",
                  value: "text-foreground/60",
                }}
                label="多选正确率"
                value={
                  (props.multipleChoice.correct * 100) /
                  props.multipleChoice.total
                }
                showValueLabel={true}
              />
            )}
            {props.judgement && (
              <Progress
                aria-label="判断正确率"
                size="md"
                radius="lg"
                classNames={{
                  base: "max-w-md",
                  label: "tracking-wider regular-text-base",
                  value: "text-foreground/60",
                }}
                label="判断正确率"
                value={(props.judgement.correct * 100) / props.judgement.total}
                showValueLabel={true}
              />
            )}
          </CardBody>
        </Card>
      )}
    </div>
  );
}
