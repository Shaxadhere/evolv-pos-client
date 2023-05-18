import { Box, CloseButton, Flex, HStack, Heading, Icon, IconButton, Image, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import IMAGES from '../../../config/constants/images'
import APP_ICONS from '../../../config/constants/icons'
import { colorKeys, getColor } from '../../../config/constants/appColors'
import ImageBox from './ImageBox'

const CartItem = ({ item }) => {
    const { colorMode } = useColorMode()
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
                    <IconButton bg={`transparent !important`} color="white" size="xs" icon={<Icon boxSize="5" as={APP_ICONS.ADD} />} />
                    <Text color="#fff">{item.quantity}</Text>
                    <IconButton bg={`transparent !important`} color="white" size="xs" icon={<Icon boxSize="5" as={APP_ICONS.ADD} />} />
                </HStack>
            </Flex>
        </Flex>
    )
}

export default CartItem