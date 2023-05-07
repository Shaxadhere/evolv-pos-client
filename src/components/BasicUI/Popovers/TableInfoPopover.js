import { Badge, Box, Button, ButtonGroup, Heading, Icon, chakra, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import LabelValuePair from '../LabelValuePair'
import { formatDateTime } from '../../../config/helpers/dateHelper'
import APP_ICONS from '../../../config/constants/icons'
import DeletePopover from '../DeletePopover'

const TableInfoPopover = ({ data = {}, title, triggerText, titleKey = "name", onDelete, onEdit, children, triggerAction = "hover", triggerOnClick, triggerProps, triggerComponent }) => {
    return (
        <Popover trigger={triggerAction} placement='auto-end'>
            <Box ml={2} _hover={{ color: 'brand.primary', cursor: 'pointer', textDecor: "underline" }}>
                <PopoverTrigger>
                    {triggerComponent
                        ? triggerComponent
                        : <chakra.p w="fit-content" onClick={triggerOnClick} {...triggerProps}>{triggerText || data[titleKey]}</chakra.p>}

                </PopoverTrigger>
            </Box>

            <PopoverContent textAlign={"left"}>

                <PopoverArrow />
                <PopoverCloseButton />

                <PopoverHeader>
                    <Heading whiteSpace="normal" size="sm">{title || data[titleKey]}</Heading>
                </PopoverHeader>

                <PopoverBody>

                    <SimpleGrid spacing={3}>
                        {children}
                    </SimpleGrid>

                    {(onEdit || onDelete) && (
                        <>
                            <ButtonGroup mt={2}>
                                {onEdit && (
                                    <Button
                                        size="sm"
                                        leftIcon={<Icon as={APP_ICONS.EDIT} />}
                                        onClick={() => onEdit(data)}
                                    >
                                        Edit
                                    </Button>
                                )}

                                {onDelete && (
                                    <DeletePopover
                                        onConfirm={() => onDelete(data.id)
                                        }>
                                        <Button
                                            size="sm"
                                            leftIcon={<Icon as={APP_ICONS.BIN} />}
                                        >
                                            Delete
                                        </Button>
                                    </DeletePopover>
                                )}
                            </ButtonGroup>
                        </>
                    )}
                </PopoverBody>

            </PopoverContent>
        </Popover>
    )
}

export default TableInfoPopover