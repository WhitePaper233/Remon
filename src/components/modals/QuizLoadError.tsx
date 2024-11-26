import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface QuizLoadErrorProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  content?: string;
}

export default function QuizLoadError({
  isOpen,
  onOpenChange,
  content,
}: QuizLoadErrorProps) {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                题库文件加载错误
              </ModalHeader>
              <ModalBody>
                <p className="regular-text-base">{content}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="regular-text-base"
                  color="primary"
                  onPress={() => {
                    onClose();
                  }}
                >
                  关闭
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
