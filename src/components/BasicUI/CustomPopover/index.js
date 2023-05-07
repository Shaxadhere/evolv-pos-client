import React from 'react'
import {
    Button,
    Box,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverCloseButton,
    PopoverBody,
    PopoverFooter,
    ButtonGroup,
    PopoverArrow,
    useDisclosure
} from '@chakra-ui/react'

const CustomPopover = ({
    label = "Custom Popover",
    heading = "Heading",
    children,
    actions = [
        {
            label: "Cancel",
            variant: "outline",
            onClick: () => console.log("Cancel")
        },
        {
            label: "Apply",
            colorScheme: "pink",
            onClick: () => console.log("Apply")
        }
    ]
}) => {
    const { isOpen, onToggle, onClose } = useDisclosure()
    return (
        <Box className="custom-popover">
            <Popover
                returnFocusOnClose={false}
                isOpen={isOpen}
                onClose={onClose}
                placement='bottom'
                closeOnBlur={false}
            >
                <PopoverTrigger>
                    <Button onClick={onToggle} colorScheme='pink'>{label}</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverHeader fontWeight='semibold'>{heading}</PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                        {children}
                    </PopoverBody>
                    {actions && actions.length > 0 && (
                        <PopoverFooter display='flex' justifyContent='flex-end'>
                            <ButtonGroup size='sm'>
                                {actions?.map((item, index) => {
                                    return (
                                        <Button
                                            key={index}
                                            onClick={item.onClick}
                                            variant={item.variant}
                                            colorScheme={item.colorScheme}
                                        >
                                            {item.label}
                                        </Button>
                                    )
                                })}
                            </ButtonGroup>
                        </PopoverFooter>
                    )}
                </PopoverContent>
            </Popover>
        </Box>
    )
}

export default CustomPopover