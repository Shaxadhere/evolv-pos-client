import { Box, Center, Heading, Table, Td, Text, Tr, chakra } from '@chakra-ui/react'
import React from 'react'
import { formatDateTime } from '../../../config/helpers/dateHelper'

const InvoiceBox = React.forwardRef((props, ref) => {
    const { orderNumber, dateTime, cartItems, total, subTotal, discount, storeName } = props
    console.log(cartItems)
    return (
        <Box
            ref={ref}
            id="Evolv-Invoice"
            p="2mm"
            m="0 auto"
            w="full"
            maxW="83mm"
            bg="#fff"
        >

            <Center id="top" borderBottom="1px solid #eee" minH="50px">
                <Box
                    display="block"
                    float="left"
                    marginLeft="0"
                >
                    <Heading fontSize="0.9em" as="h2">{storeName||"Evolv POS"}</Heading>
                </Box>
            </Center>

            <Box id="mid" borderBottom="1px solid #eee" minH="40px" mt={2}>
                <Box
                    display="block"
                    float="left"
                    marginLeft="0"
                >
                    <Text
                        fontSize="0.7em"
                        color="#666"
                        lineHeight="1.2em"
                    >
                        <chakra.strong>Order Number: </chakra.strong>{orderNumber}<chakra.br />
                        <chakra.strong>Date & Time: </chakra.strong>{dateTime ? formatDateTime(dateTime) : formatDateTime(new Date)}<chakra.br />
                    </Text>
                </Box>
            </Box>

            <Box id="bot" minH="50px">

                <Box id="table">
                    <Table w="full" borderCollapse="collapse">
                        <Tr class="tabletitle" p="5px" fontSize="0.5em" bg="#eee">
                            <Td p="5px 0 5px 15px" border="1px solid #eee" class="item"><Heading as="h2" fontSize="14px" w="24mm" >ITM</Heading></Td>
                            <Td p="5px 0 5px 15px" border="1px solid #eee" class="Hours"><Heading as="h2" fontSize="14px" >QTY</Heading></Td>
                            <Td p="5px 0 5px 15px" border="1px solid #eee" class="Rate"><Heading as="h2" fontSize="14px" >S.TTL</Heading></Td>
                        </Tr>

                        {cartItems.map((product, index) => (
                            <Tr class="service" borderBottom={"1px solid #eee"} key={index}>
                                <Td p="5px 0 5px 15px" border="1px solid #eee" class="tableitem"><Text class="itemtext" fontSize="14px">{product?.name}</Text></Td>
                                <Td p="5px 0 5px 15px" border="1px solid #eee" class="tableitem"><Text class="itemtext" fontSize="14px">{product?.quantity}</Text></Td>
                                <Td p="5px 0 5px 15px" border="1px solid #eee" lass="tableitem"><Text class="itemtext" fontSize="14px">{product?.pricePerUnit * product?.quantity}</Text></Td>
                            </Tr>
                        ))}

                        {total !== subTotal && (
                            <Tr class="tabletitle" p="5px" fontSize="0.5em" bg="#eee">
                                <Td p="5px 0 5px 15px" border="1px solid #eee" class="item"><Heading as="h2" fontSize="14px" w="24mm" >Subtotal</Heading></Td>
                                <Td textAlign={"right"} p="5px 0 5px 15px" border="1px solid #eee" class="Rate" colSpan={2}><Heading as="h2" fontSize="14px" mr="5px" >PKR {subTotal}</Heading></Td>
                            </Tr>
                        )}

                        {discount > 0 && (
                            <Tr class="tabletitle" p="5px" fontSize="0.5em" bg="#eee">
                                <Td p="5px 0 5px 15px" border="1px solid #eee" class="item"><Heading as="h2" fontSize="14px" w="24mm" >Discount</Heading></Td>
                                <Td textAlign={"right"} p="5px 0 5px 15px" border="1px solid #eee" class="Rate" colSpan={2}><Heading as="h2" fontSize="14px" mr="5px">PKR {discount}</Heading></Td>
                            </Tr>
                        )}

                        <Tr class="tabletitle" p="5px" fontSize="0.5em" bg="#eee">
                            <Td p="5px 0 5px 15px" border="1px solid #eee" class="item"><Heading as="h2" fontSize="14px" w="24mm" >Total</Heading></Td>
                            <Td textAlign={"right"} p="5px 0 5px 15px" border="1px solid #eee" class="Rate" colSpan={2}><Heading as="h2" fontSize="14px" mr="5px" >PKR {total}</Heading></Td>
                        </Tr>


                    </Table>
                </Box>

                <Box id="legalcopy" mt="5mm">
                    <Text class="legal" fontSize="12px">Software developed by: <chakra.br/> <strong>Evolv-Systems.com</strong> .
                    </Text>
                </Box>

            </Box>
        </Box>
    )
})

export default InvoiceBox