import {
    Box,
    Button,
    ButtonGroup,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    PopoverFooter
} from '@chakra-ui/react'
import React from 'react'

const DeletePopover = ({ children, type = "item", onConfirm, subject = "delete", confirmScheme = "red" }) => {
    return (
        <Popover>
            {({ onClose }) => (
                <>
                    <PopoverTrigger>
                        {children}
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverHeader pt={4} fontWeight='bold' border='0'>
                            Warning
                        </PopoverHeader>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                            Are you sure you want to {subject} this {type}?
                        </PopoverBody>
                        <PopoverFooter
                            border='0'
                            display='flex'
                            alignItems='center'
                            justifyContent='end'
                            pb={4}
                        >
                            <ButtonGroup size='sm'>
                                <Button onClick={() => onClose()}>No</Button>
                                <Button colorScheme={confirmScheme} onClick={() => {
                                    onConfirm()
                                    onClose()
                                }}>
                                    Yes
                                </Button>
                            </ButtonGroup>
                        </PopoverFooter>
                    </PopoverContent>
                </>
            )}
        </Popover>
    )
}

export default DeletePopover