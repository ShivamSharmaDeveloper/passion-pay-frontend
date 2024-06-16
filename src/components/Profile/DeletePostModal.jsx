// src/components/DeletePostModal.jsx
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
} from "@chakra-ui/react";

const DeletePostModal = ({ isOpen, onClose, onDelete }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Are you sure you want to delete this post?</Text>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={onDelete}>
                        Delete
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DeletePostModal;
