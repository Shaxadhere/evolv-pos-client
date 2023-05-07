import React from 'react'
import {
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent
} from '@chakra-ui/react'
import FormButton from '../FormButton'

const FormDrawer = ({ title, disclosure, size = "2xl", id = "drawer-form", containerProps, children, isSubmitting, onSubmit, reset }) => {
  const { isOpen, onClose } = disclosure

  return (
    <Modal
      size={size}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent maxW="70rem" {...containerProps} rounded="sm">
        <Box as="form" onSubmit={onSubmit}>

          <ModalCloseButton />
          <ModalHeader>{title}</ModalHeader>

          <ModalBody>
            {children}
          </ModalBody>

          <ModalFooter>
            <Button variant='outline' mr={3} onClick={() => {
              onClose()
              reset && reset()
            }}>
              Cancel
            </Button>
            <FormButton
              type='submit'
              form={id}
              colorScheme='blue'
              isLoading={isSubmitting}
              onClick={onSubmit}>Save</FormButton>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>

  )
}

export default FormDrawer
