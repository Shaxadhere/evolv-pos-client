import { Box, Button, CloseButton, Divider, Flex, HStack, Heading, Icon, IconButton, Image, SimpleGrid, Text, VStack, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { colorKeys, getColor } from '../../../config/constants/appColors'
import IMAGES from '../../../config/constants/images'
import APP_ICONS from '../../../config/constants/icons'
import CartItem from '../DataBoxes/CartItem'

const RightSider = () => {
    const { colorMode } = useColorMode()
    const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState("Cash")

    const cartItems = [
        {
            name: "iPhone 12",
            category: "Mobile Phones",
            price: 20000,
            quantity: 1,
        },
        {
            name: "iPhone Charger",
            category: "Mobile Accessories",
            price: 2000,
            quantity: 1,
        },
        {
            name: "iPhone Charger",
            category: "Mobile Accessories",
            price: 2000,
            quantity: 1,
        },

    ]
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
                    <Text
                        fontSize={"14px"}
                        fontWeight={"bold"}
                        bg={getColor(colorKeys.dark, colorMode)}
                        color={getColor(colorKeys.white, colorMode)}
                        px="10px"
                        py="5px"
                        borderRadius="5px"
                    >
                        Order No. #223
                    </Text>
                </Flex>
                <VStack spacing={5} mt={5}>
                    {cartItems.map((item, index) =>
                        <CartItem item={item} key={index} />
                    )}
                </VStack>
            </Box>

            <Box
                aria-label='receipt'
                border="1px solid #eee"
                p={"10px"}
                rounded="md"
            >
                <Flex align={"center"} justify={"space-between"} >
                    <Heading as="h2" fontSize="20px">Receipt</Heading>
                    <IconButton variant={"ghost"} size="sm" icon={<Icon boxSize="5" as={APP_ICONS.OPTIONS} />} />
                </Flex>
                <SimpleGrid columns={3} mt={5} spacing={5}>
                    {[
                        {
                            name: "Cash",
                            icon: APP_ICONS.CASH
                        },
                        {
                            name: "Card",
                            icon: APP_ICONS.CREDIT_CARD,
                        },
                        {
                            name: "Code",
                            icon: APP_ICONS.QR_CODE,
                        }
                    ].map((item, index) =>
                        <Flex
                            onClick={() => setSelectedPaymentMethod(item.name)}
                            key={index}
                            bg={selectedPaymentMethod === item.name ? getColor(colorKeys.dark, colorMode) : getColor(colorKeys.white, colorMode)}
                            rounded={"xl"} p="15px" border={"1px solid #eee"} justify="center" flexDir="column">
                            <Icon
                                m="auto"
                                as={item.icon}
                                color={selectedPaymentMethod === item.name ? getColor(colorKeys.white, colorMode) : getColor(colorKeys.gray, colorMode)}
                                boxSize="10"
                            />
                            <Text
                                textAlign={"center"}
                                fontSize={"18px"}
                                mt={2}
                                color={selectedPaymentMethod === item.name ? getColor(colorKeys.white, colorMode) : getColor(colorKeys.gray, colorMode)}
                            >
                                {item.name}
                            </Text>
                        </Flex>
                    )}
                </SimpleGrid>
                <VStack mt={5} spacing={3} w="full">
                    <Flex w="full" justify={"space-between"} align={"center"}>
                        <Text fontSize={"16px"} color={getColor(colorKeys.secondaryText, colorMode)}>Subtotal:</Text>
                        <Text fontSize={"16px"} fontWeight={"bold"}>Rs. 22,000</Text>
                    </Flex>
                    <Flex w="full" justify={"space-between"} align={"center"}>
                        <Text fontSize={"16px"} color={getColor(colorKeys.secondaryText, colorMode)}>Discount:</Text>
                        <Text fontSize={"16px"} fontWeight={"bold"}>Rs. 500</Text>
                    </Flex>
                    <Flex w="full" justify={"space-between"} align={"center"}>
                        <Text fontSize={"16px"} color={getColor(colorKeys.secondaryText, colorMode)}>Total Sales Tax:</Text>
                        <Text fontSize={"16px"} fontWeight={"bold"}>Rs. 1500</Text>
                    </Flex>
                    <Divider />
                    <Flex w="full" justify={"space-between"} align={"center"}>
                        <Text fontSize={"16px"} color={getColor(colorKeys.secondaryText, colorMode)}>Total:</Text>
                        <Text fontSize={"16px"} fontWeight={"bold"}>Rs. 23,000</Text>
                    </Flex>
                    <Button w="full" size="lg" bg={getColor(colorKeys.dark, colorMode)} color={getColor(colorKeys.white, colorMode)}>Finish</Button>
                </VStack>

            </Box>
        </Flex>
    )
}

export default RightSider