import { Box, CloseButton, Editable, EditableInput, EditablePreview, Flex, HStack, Heading, Icon, IconButton, Text, useColorMode } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import APP_ICONS from '../../../config/constants/icons'
import { colorKeys, getColor } from '../../../config/constants/appColors'
import ImageBox from './ImageBox'
import { useDispatch } from 'react-redux'
import { removeItemFromCart, updateQuantity } from '../../../config/redux/slices/cartSlice'

const CartItem = ({ item }) => {
    const { colorMode } = useColorMode()
    const dispatch = useDispatch()
    const priceRef = useRef()

    const handleDecrease = () => {
        dispatch(updateQuantity({ _id: item._id, quantity: item.quantity - 1 }))
    }

    const handleIncrease = () => {
        dispatch(updateQuantity({ _id: item._id, quantity: item.quantity + 1 }))
    }

    const handleRemove = () => {
        dispatch(removeItemFromCart(item._id))
    }

    const handleAmountChange = (value) => {
        dispatch(updateQuantity({ _id: item._id, quantity: value / item.pricePerUnit }))
    }

    // const handleAmountBlur = (value) => {
    //     dispatch(updateQuantity({ _id: item._id, quantity: value / item.pricePerUnit }))
    // }

    return (
        <Flex align={"center"} justify={"space-between"} w="full" p="5px" border={"1px solid #eee"} rounded={'md'}>
            <Flex>
                <ImageBox src={item?.photo} w="120px" h="70px" rounded="md" />
                <Flex flexDir={"column"} ml="10px" justify={"space-between"}>
                    <Box>
                        <Heading as="h3" fontSize="16px">{item.name}</Heading>
                        <Text fontSize="14px">{item?.category?.name}</Text>
                    </Box>
                    <Flex align="center">
                        <Text mr={1}>PKR</Text>
                        <Editable
                            value={Number(item?.pricePerUnit) * Number(item.quantity)}
                            onChange={(value) => handleAmountChange(value)}
                            ref={priceRef}
                        >
                            <EditablePreview fontSize="14px" />
                            <EditableInput />
                        </Editable>
                    </Flex>
                </Flex>
            </Flex>
            <Flex justify={"space-between"} flexDir={"column"} align="end" h="70px">
                <CloseButton onClick={handleRemove} />
                <HStack spacing={3} bg={getColor(colorKeys.dark, colorMode)} rounded={"full"}>
                    <IconButton
                        bg={`transparent !important`}
                        color="white"
                        size="xs"
                        icon={<Icon boxSize="5" as={APP_ICONS.MINUS} />}
                        onClick={() => handleDecrease()}
                    />
                    <Text color="#fff">
                        {item.quantity}
                    </Text>
                    <IconButton
                        bg={`transparent !important`}
                        color="white"
                        size="xs"
                        icon={<Icon boxSize="5" as={APP_ICONS.ADD} />}
                        onClick={() => handleIncrease()}
                    />
                </HStack>
            </Flex>
        </Flex>
    )
}

export default CartItem