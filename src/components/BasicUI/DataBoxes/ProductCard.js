import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import ImageBox from './ImageBox'

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <Box w="full" h="220px" rounded="lg" p="5px" border={"1px solid #eee"} onClick={() => onAddToCart(product)}>
            <ImageBox src={product?.photo} w="full" h="160px" objectFit="cover" rounded={"md"} />
            <Flex flexDir="column">
                <Box fontSize="14px" fontWeight="bold" mt={2}>{product?.name}</Box>
                <Flex align="center" justify="space-between">
                    <Box fontSize="13px" color="gray.500">{product?.category?.name}</Box>
                    <Box fontSize="16px" fontWeight="bold" mt={2}>PKR {product?.pricePerUnit}</Box>
                </Flex>
            </Flex>
        </Box>
    )
}

export default ProductCard