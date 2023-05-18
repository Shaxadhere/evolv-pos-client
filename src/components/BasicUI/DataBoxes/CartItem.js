import { Box, CloseButton, Flex, HStack, Heading, Icon, IconButton, Image, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import APP_ICONS from '../../../config/constants/icons'
import { colorKeys, getColor } from '../../../config/constants/appColors'
import ImageBox from './ImageBox'
import { useDispatch, useSelector } from 'react-redux'
import { replaceCart } from '../../../config/redux/slices/cartSlice'

const CartItem = ({ item }) => {
    const { colorMode } = useColorMode()
    const dispatch = useDispatch()

    const { items: cartItems } = useSelector(state => state.cart)

    const handleDecrease = () => {
        let _cartItems = [...cartItems]
        const quantity = item.quantity - 1

        if (quantity <= 0) {
            _cartItems = _cartItems.filter(i => i._id !== item._id)
            dispatch(replaceCart(_cartItems))
            return
        }
        const itemIndex = _cartItems.findIndex(i => i._id === item._id)
        if (itemIndex !== -1) {
            _cartItems[itemIndex].quantity = quantity
        }
        dispatch(replaceCart(_cartItems))
    }

    const handleIncrease = () => {
        let _cartItems = Array.from(cartItems)
        const quantity = item.quantity + 1

        //manage inventory here if required
        // if (quantity <= 0) {
        //     _cartItems = _cartItems.filter(i => i._id !== item._id)
        //     dispatch(replaceCart(_cartItems))
        //     return
        // }
        const itemIndex = _cartItems.findIndex(i => i._id === item._id)
        if (itemIndex !== -1) {
            console.log("itemIndex", itemIndex, _cartItems[itemIndex])
            _cartItems[itemIndex].quantity = quantity
        }
        // dispatch(replaceCart(_cartItems))
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
                <CloseButton />
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