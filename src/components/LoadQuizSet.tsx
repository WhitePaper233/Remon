import { Button, useDisclosure } from "@nextui-org/react";
import { useRef, useState } from "react";
import { useQuizStore } from "../stores/quiz";
import QuizLoadError from "./modals/QuizLoadError";
import { useFailedStore } from "../stores/failed";

interface LoadQuizSetProps {
  setReviewState: (state: "preview") => void;
}

export default function LoadQuizSet({ setReviewState }: LoadQuizSetProps) {
  // file input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // modal content
  const [modalContent, setModalContent] = useState("");

  // failed store
  const { resetFailed } = useFailedStore();

  // modal open state
  const {
    isOpen,
    onOpen: onErrorModalOpen,
    onOpenChange: onErrorModalOpenChange,
  } = useDisclosure();

  // button click handler
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    fileInputRef.current?.click();
  };

  // quiz set store
  const { setFileContent } = useQuizStore();

  // file open handler
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          setFileContent(event.target?.result as string);
          resetFailed();
          setReviewState("preview");
        } catch (error) {
          setModalContent((error as Error).message);
          onErrorModalOpen();
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <Button
        className="regular-text-base"
        color="primary"
        variant="shadow"
        fullWidth={true}
        onClick={handleButtonClick}
      >
        打开题库
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept=".json"
      />
      <QuizLoadError
        isOpen={isOpen}
        onOpenChange={onErrorModalOpenChange}
        content={modalContent}
      />
    </>
  );
}
