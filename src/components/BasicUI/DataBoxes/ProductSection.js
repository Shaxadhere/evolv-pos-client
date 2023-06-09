import { Box, Button, Flex, Heading, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import ProductCard from './ProductCard'

const ProductSection = ({ category, productsQuery }) => {
    return (
        <Box w="full">
            <Flex w="full" align="center" justify={"space-between"}>
                <Heading fontSize="24px">{category}</Heading>
                <Button variant={"ghost"} size="sm">See All</Button>

            </Flex>
            <SimpleGrid spacing={4} mt={3} columns={{ base: 1, sm: 2, md: 4 }}>
                {productsQuery?.data?.docs?.map((item, index) => (
                    <ProductCard key={index} product={item} />
                ))}
            </SimpleGrid>
        </Box>
    )
}

export default ProductSection