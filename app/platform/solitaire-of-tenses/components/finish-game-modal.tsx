import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

export const FinishModal = ({ isOpen, onOpen, onClose }) => {
  return (
    <Modal
      onClose={onClose}
      size="xl"
      isOpen={isOpen}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Success</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon
              boxSize="40px"
              mr={0}
            />
            <AlertTitle
              mt={4}
              mb={1}
              fontSize="lg"
            >
              Application submitted!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Thanks for submitting your application. Our team will get back to
              you soon.
            </AlertDescription>
          </Alert>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
