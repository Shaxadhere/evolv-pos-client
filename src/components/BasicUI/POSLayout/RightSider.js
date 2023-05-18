import { Box, Button, CloseButton, Divider, Flex, HStack, Heading, Icon, IconButton, Image, SimpleGrid, Text, VStack, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { colorKeys, getColor } from '../../../config/constants/appColors'
import CartItem from '../DataBoxes/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import CustomDrawer from '../Drawers/CustomDrawer'
import { setIsFinishing, setPaymentMethod } from '../../../config/redux/slices/cartSlice'
import { PAYMENT_METHODS } from '../../../config/constants/options'

const RightSider = () => {
    const { colorMode } = useColorMode()
    const dispatch = useDispatch()
    const { items: cartItems, isFinishing, orderNumber, paymentMethod } = useSelector(state => state.cart)

    const calculateTotal = () => {
        let subTotal = 0
        let discount = 0
        let tax = 0
        cartItems.forEach(item => {
            subTotal += item.pricePerUnit * item.quantity
            discount += item.discount * item.quantity
            tax += item.tax * item.quantity
        })
        let total = subTotal + tax - discount
        return {
            total,
            subTotal,
            tax,
            discount
        }
    }



    return (
        <Flex
            pos={"fixed"}
            top={"60px"}
            right={"0"}
            w={"400px"}
            h={"calc(100vh - 60px)"}
            bg={"white"}
            borderLeft={"1px solid #eee"}
            p="10px"
            overflow={"auto"}
            justify={"space-between"}
            flexDir={"column"}

        >
            <Box aria-label='cart' overflow={"auto"}>
                <Flex align={"center"} justify={"space-between"}>
                    <Heading as="h2" fontSize="20px">Cart</Heading>
                    {orderNumber && (
                        <Text
                            fontSize={"14px"}
                            fontWeight={"bold"}
                            bg={getColor(colorKeys.dark, colorMode)}
                            color={getColor(colorKeys.white, colorMode)}
                            px="10px"
                            py="5px"
                            borderRadius="5px"
                        >
                            Order No. #{orderNumber}
                        </Text>
                    )}
                </Flex>
                <VStack spacing={5} mt={5}>
                    {cartItems.map((item, index) =>
                        <CartItem item={item} key={index} />
                    )}
                </VStack>
                <Button
                    w="full"
                    size="lg"
                    bg={getColor(colorKeys.dark, colorMode)}
                    color={getColor(colorKeys.white, colorMode)}
                    onClick={() => dispatch(setIsFinishing(true))}
                >
                    Finish
                </Button>
            </Box>


            <CustomDrawer heading={"Receipt"} isOpen={isFinishing} onClose={() => dispatch(setIsFinishing(false))}>
                <Box
                    aria-label='receipt'
                    border="1px solid #eee"
                    p={"10px"}
                    rounded="md"
                >
                    <SimpleGrid columns={3} mt={5} spacing={5}>
                        {PAYMENT_METHODS.map((item, index) => {
                            const color = paymentMethod === item.name ? getColor(colorKeys.white, colorMode) : getColor(colorKeys.gray, colorMode)
                            const bg = paymentMethod === item.name ? getColor(colorKeys.dark, colorMode) : getColor(colorKeys.white, colorMode)
                            return (
                                <Flex
                                    onClick={() => dispatch(setPaymentMethod(item.name))}
                                    key={index}
                                    bg={bg}
                                    rounded={"xl"} p="15px" border={"1px solid #eee"} justify="center" flexDir="column" cursor={"pointer"}>
                                    <Icon
                                        m="auto"
                                        as={item.icon}
                                        color={color}
                                        boxSize="10"
                                    />
                                    <Text
                                        textAlign={"center"}
                                        fontSize={"18px"}
                                        mt={2}
                                        color={color}
                                    >
                                        {item.name}
                                    </Text>
                                </Flex>
                            )
                        })}
                    </SimpleGrid>
                    <VStack mt={5} spacing={3} w="full">
                        <Flex w="full" justify={"space-between"} align={"center"}>
                            <Text fontSize={"16px"} color={getColor(colorKeys.secondaryText, colorMode)}>Subtotal:</Text>
                            <Text fontSize={"16px"} fontWeight={"bold"}>Rs. {calculateTotal().subTotal}</Text>
                        </Flex>
                        <Flex w="full" justify={"space-between"} align={"center"}>
                            <Text fontSize={"16px"} color={getColor(colorKeys.secondaryText, colorMode)}>Discount:</Text>
                            <Text fontSize={"16px"} fontWeight={"bold"}>Rs. {calculateTotal().discount}</Text>
                        </Flex>
                        <Flex w="full" justify={"space-between"} align={"center"}>
                            <Text fontSize={"16px"} color={getColor(colorKeys.secondaryText, colorMode)}>Total Sales Tax:</Text>
                            <Text fontSize={"16px"} fontWeight={"bold"}>Rs. {calculateTotal().tax}</Text>
                        </Flex>
                        <Divider />
                        <Flex w="full" justify={"space-between"} align={"center"}>
                            <Text fontSize={"16px"} color={getColor(colorKeys.secondaryText, colorMode)}>Total:</Text>
                            <Text fontSize={"16px"} fontWeight={"bold"}>Rs. {calculateTotal().total}</Text>
                        </Flex>
                        <Button w="full" size="lg" bg={getColor(colorKeys.dark, colorMode)} color={getColor(colorKeys.white, colorMode)}>Finish</Button>
                    </VStack>

                </Box>
            </CustomDrawer>
        </Flex>
    )
}

export default RightSider