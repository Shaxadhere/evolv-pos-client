import { Box, CloseButton, Flex, HStack, Heading, Icon, IconButton, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import APP_ICONS from '../../../config/constants/icons'
import { colorKeys, getColor } from '../../../config/constants/appColors'
import ImageBox from './ImageBox'
import { useDispatch } from 'react-redux'
import { removeItemFromCart, updateQuantity } from '../../../config/redux/slices/cartSlice'

const CartItem = ({ item }) => {
    const { colorMode } = useColorMode()
    const dispatch = useDispatch()

    const handleDecrease = () => {
        dispatch(updateQuantity({ _id: item._id, quantity: item.quantity - 1 }))
    }

    const handleIncrease = () => {
        dispatch(updateQuantity({ _id: item._id, quantity: item.quantity + 1 }))
    }

    const handleRemove = () => {
        dispatch(removeItemFromCart(item._id))
    }

    return (
        <Flex align={"center"} justify={"space-between"} w="full" p="10px" border={"1px solid #eee"} rounded={'md'}>
            <Flex>
                <ImageBox src={item?.photo} w="120px" h="120px" rounded="md" />
                <Flex flexDir={"column"} ml="10px" justify={"space-between"}>
                    <Box>
                        <Heading as="h3" fontSize="16px">{item.name}</Heading>
                        <Text fontSize="14px">{item?.category?.name}</Text>
                    </Box>
                    <Text fontSize="14px">PKR {item?.pricePerUnit}</Text>
                </Flex>
            </Flex>
            <Flex justify={"space-between"} flexDir={"column"} align="end" h="120px">
                <CloseButton onClick={handleRemove} />
                <HStack spacing={3} bg={getColor(colorKeys.dark, colorMode)} rounded={"full"}>
                    <IconButton
                        bg={`transparent !important`}
                        color="white"
                        size="xs"
                        icon={<Icon boxSize="5" as={APP_ICONS.MINUS} />}
                        onClick={() => handleDecrease()}
                    />
                    <Text color="#fff">{item.quantity}</Text>
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