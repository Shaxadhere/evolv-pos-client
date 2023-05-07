import { Box, Image, Flex } from '@chakra-ui/react'
import React from 'react'

const ProductCard = () => {
    return (
        <Box w="full" h="220px" rounded="lg" p="5px" border={"1px solid #eee"} >
            <Image src="https://via.placeholder.com/300x200" w="full" h="160px" objectFit="cover" rounded={"md"} />
            <Flex align="end" justify="space-between">
                <Flex flexDir="column">
                    <Box fontSize="14px" fontWeight="bold" mt={2}>Product Name</Box>
                    <Box fontSize="12px" color="gray.500">Kitchen</Box>
                </Flex>
                <Box fontSize="16px" fontWeight="bold" mt={2}>$ 100.00</Box>
            </Flex>
        </Box>
    )
}

export default ProductCard