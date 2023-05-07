import { Box, Button, Modal, chakra, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

const ModalPlayer = ({ isOpen, onClose, title, data }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
            <ModalOverlay />
            <ModalContent maxW="70rem">
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {/* {JSON.stringify(data)} */}
                    <Box style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                        <chakra.iframe
                            src="https://player.vimeo.com/video/786970791?h=39071e005e&badge=0&autopause=0&player_id=0&app_id=58479"
                            frameBorder={0}
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen=""
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%"
                            }}
                            title="big_buck_bunny_720p_1mb (Copy)"
                        />
                    </Box>

                </ModalBody>

                <ModalFooter>
                   
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalPlayer