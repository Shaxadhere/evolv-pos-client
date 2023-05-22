import { Box, Button, ButtonGroup, Divider, Flex, HStack, Heading, Icon, IconButton, Image, Input, InputGroup, InputLeftAddon, SimpleGrid, Text, VStack, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { colorKeys, getColor } from '../../../config/constants/appColors'
import CartItem from '../DataBoxes/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import CustomDrawer from '../Drawers/CustomDrawer'
import { addItemToCart, resetCart, setCustomer, setIsCheckingOut, setIsFinishing, setOrderType, setPaymentMethod } from '../../../config/redux/slices/cartSlice'
import { ORDER_TYPES, PAYMENT_METHODS } from '../../../config/constants/options'
import IMAGES from '../../../config/constants/images'
import APP_ICONS from '../../../config/constants/icons'
import { useCreateSale } from '../../../config/query/saleQuery'
import { useQueryClient } from '@tanstack/react-query'
import { useReactToPrint } from 'react-to-print'
import InvoiceBox from '../DataBoxes/InvoiceBox'
import { useProducts } from '../../../config/query/productQuery'

const RightSider = () => {
    const { colorMode } = useColorMode()
    const dispatch = useDispatch()
    const [amount, setAmount] = React.useState(0)
    const { items: cartItems, isFinishing, orderNumber, paymentMethod, customer, orderType } = useSelector(state => state.cart)
    const { store } = useSelector(state => state.user)
    const queryClient = useQueryClient()
    const invoiceRef = React.useRef();

    const productQurey = useProducts({
        page: 1,
        limit: 250,
        category: "646a7649046388633221e494",
    })
    const createSaleQuery = useCreateSale()

    const calculateTotal = () => {
        let subTotal = 0
        let discount = 0
        let tax = 0
        cartItems.forEach(item => {
            subTotal += item.pricePerUnit * item.quantity
            discount += item.discount * item.quantity
            tax += item.tax * item.quantity
        })
        subTotal = subTotal || 0
        discount = discount || 0
        tax = tax || 0

        let total = subTotal + tax - discount
        return {
            total,
            subTotal,
            tax,
            discount,
        }
    }

    const handleFinishSale = async () => {
        const { total, subTotal, tax, discount } = calculateTotal()
        const sale = {
            total,
            subTotal,
            tax,
            discount,
            paymentMethod,
            orderNumber,
            customer,
            orderType,
            products: cartItems.map(item => ({
                product: item._id,
                name: item.name,
                quantity: item.quantity,
                pricePerUnit: item.pricePerUnit,
                price: item.pricePerUnit * item.quantity,
                discount: item.discount,
                tax: item.tax,
            }))
        }
        await createSaleQuery.mutateAsync(sale)
        handleOnPrint()
    }

    const handleAmountChange = (value) => {
        if (value === "C") {
            setAmount("0")
            return;
        }
        if (value === "CE") {
            setAmount(String(amount).slice(0, -1))
            return;
        }
        if (value === ".") {
            if (amount.includes(".")) return;
        }
        if (amount == 0) {
            setAmount(String(value))
            return;
        }
        setAmount(String(amount) + String(value))
    }

    const handleOnPrint = useReactToPrint({
        content: () => invoiceRef.current,
        documentTitle: "Evolv - Invoice",
        onAfterPrint: () => {
            dispatch(setIsFinishing(false))
            dispatch(resetCart())
            setAmount(0)
            queryClient.invalidateQueries({ queryKey: ['sales'] })
        }
    });

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
            <Flex flexDirection={"column"} justify={"space-between"} aria-label='cart' overflow={"auto"} h="calc(100vh - 80px)">
                <VStack spacing={5}>
                    <Flex w="full" align={"center"} justify={"space-between"}>
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
                    <VStack w="full" spacing={5}>
                        {cartItems?.length === 0 && (
                            <Flex h="calc(100vh - 180px)" align="center" justify={"center"}>
                                <Image src={IMAGES.EMPTY_BOX} h="180px" w="full" objectFit={"contain"} filter={"grayscale(1)"} />
                            </Flex>
                        )}
                        {cartItems.map((item, index) =>
                            <CartItem item={item} key={index} />
                        )}
                    </VStack>
                </VStack>

                {cartItems?.length > 0 && (
                    <VStack w="full" spacing={5}>
                        <HStack spacing={2} w="full">
                            {productQurey.data?.docs?.map((product, index) =>
                                <Button
                                    key={index}
                                    size="lg"
                                    bg={getColor(colorKeys.dark, colorMode)}
                                    color={getColor(colorKeys.white, colorMode)}
                                    onClick={() => dispatch(addItemToCart({ ...product, quantity: 1 }))}
                                    _hover={{
                                        bg: getColor(colorKeys.dark, colorMode),
                                    }}
                                >
                                    {product.name}
                                </Button>
                            )}
                        </HStack>

                        <HStack spacing={2} w="full">
                            <IconButton
                                icon={<Icon as={APP_ICONS.BIN} />}
                                aria-label='Reset Cart'
                                size="lg"
                                colorScheme='red'
                                color={getColor(colorKeys.white, colorMode)}
                                onClick={() => dispatch(resetCart())}
                                isDisabled={cartItems?.length === 0}
                            />
                            <Button
                                w="full"
                                size="lg"
                                bg={getColor(colorKeys.dark, colorMode)}
                                color={getColor(colorKeys.white, colorMode)}
                                _hover={{
                                    bg: getColor(colorKeys.dark, colorMode),
                                }}
                                onClick={() => dispatch(setIsFinishing(true))}
                                isDisabled={cartItems?.length === 0}
                            >
                                Finish
                            </Button>
                        </HStack>
                    </VStack>
                )}
            </Flex>


            <CustomDrawer
                heading={"Receipt"}
                isOpen={isFinishing}
                onClose={() => dispatch(setIsFinishing(false))}
                footer={
                    <Button
                        w="full"
                        size="lg"
                        bg={getColor(colorKeys.dark, colorMode)}
                        color={getColor(colorKeys.white, colorMode)}
                        _hover={{
                            bg: getColor(colorKeys.dark, colorMode),
                        }}
                        onClick={handleFinishSale}
                        isLoading={createSaleQuery.isLoading}
                        isDisabled={paymentMethod === "" || !amount || amount === "0" || parseFloat(amount) < calculateTotal().total}
                    >
                        Checkout
                    </Button>
                }
            >
                <Flex
                    flexDir={"column"}
                    aria-label='receipt'
                    p={"10px"}
                    rounded="md"
                    justify={"space-between"}
                    h={"calc(100vh - 160px)"}
                >
                    <Box>
                        {/* <SimpleGrid columns={3} mt={5} spacing={5}>
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
                        </SimpleGrid> */}

                        <VStack spacing={3} w="full">
                            <Flex w="full" justify={"space-between"} align="center" bg={getColor(colorKeys.lightGray, colorMode)} px="5px" py="5px" rounded="md">
                                {ORDER_TYPES.map((item, index) =>
                                    <Button
                                        key={index}
                                        minW="110px"
                                        onClick={() => dispatch(setOrderType(item.name))}
                                        size="sm"
                                        bg={orderType === item.name ? getColor(colorKeys.dark, colorMode) : getColor(colorKeys.white, colorMode)}
                                        color={orderType === item.name ? getColor(colorKeys.white, colorMode) : getColor(colorKeys.dark, colorMode)}
                                        _focus={{
                                            bg: getColor(colorKeys.dark, colorMode),
                                            color: getColor(colorKeys.white, colorMode)
                                        }}
                                    >
                                        {item.name}
                                    </Button>
                                )}
                            </Flex>
                            <Input placeholder='Enter customer name' value={customer} onChange={(e) => dispatch(setCustomer(e.target.value))} />
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
                            {amount > 0 && (
                                <>
                                    <Divider />
                                    <Flex w="full" justify={"space-between"} align={"center"}>
                                        <Text fontSize={"16px"} color={getColor(colorKeys.secondaryText, colorMode)}>Return:</Text>
                                        <Text fontSize={"16px"} fontWeight={"bold"}>Rs. {amount - calculateTotal().total}</Text>
                                    </Flex>
                                </>
                            )}
                        </VStack>
                    </Box>

                    <VStack spacing={3} mt={5} w="full">
                        <InputGroup w="full">
                            <InputLeftAddon children="PKR" />
                            <Input value={amount} type="number" placeholder="Enter amount" />
                        </InputGroup>
                        <SimpleGrid columns={2} w="full" spacing={4}>
                            {[
                                { name: "CE", action: () => setAmount(amount.slice(0, -1)) },
                                { name: "C", action: () => setAmount("0") }
                            ].map((item, index) => (
                                <Button h="60px" onClick={item.action} key={index}>{item.name}</Button>
                            ))}
                        </SimpleGrid>
                        <SimpleGrid columns={3} w="full" spacing={4}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, "00", 0, "."].map((item, index) => (
                                <Button
                                    key={index}
                                    onClick={() => handleAmountChange(item)}
                                >
                                    {item}
                                </Button>
                            ))}
                        </SimpleGrid>
                    </VStack>

                </Flex>
            </CustomDrawer>
            <InvoiceBox
                ref={invoiceRef}
                cartItems={cartItems}
                orderNumber={orderNumber}
                orderType={orderType}
                subTotal={calculateTotal().subTotal}
                discount={calculateTotal().discount}
                tax={calculateTotal().tax}
                total={calculateTotal().total}
                storeName={store?.name}
            />
        </Flex>
    )
}

export default RightSider