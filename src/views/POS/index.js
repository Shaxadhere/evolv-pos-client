import { Box, Button, Flex, Heading, Icon, Input, InputGroup, InputLeftElement, SimpleGrid, VStack, useColorMode } from '@chakra-ui/react'
import React, { useState } from 'react'
import APP_ICONS from '../../config/constants/icons'
import { colorKeys, getColor } from '../../config/constants/appColors'
import { useCategory } from '../../config/query/categoryQuery'
import { useProducts } from '../../config/query/productQuery'
import ProductCard from '../../components/BasicUI/DataBoxes/ProductCard'

const POS = () => {
  const { colorMode } = useColorMode()
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categoryQuery = useCategory({
    page: 1,
    limit: 250,
  })
  const productsQuery = useProducts({
    page: 1,
    limit: 250,
  })


  return (
    <Box>
      <InputGroup bg="gray.100" rounded="md" >
        <Input placeholder="Search anything..." />
        <InputLeftElement children={<Icon as={APP_ICONS.SEARCH} />} />
      </InputGroup>

      <Flex mt={1} overflow={"auto"} py={1}>
        <Button
          mx="1"
          minW="fit-content"
          size="sm"
          onClick={() => setSelectedCategory({ name: "All", _id: "All" })}
          bg={selectedCategory?._id === "All" ? getColor(colorKeys.dark, colorMode) : "transparent"}
          color={selectedCategory?._id === "All" ? getColor(colorKeys.white, colorMode) : getColor(colorKeys.dark, colorMode)}
        >
          All
        </Button>
        {categoryQuery?.data?.docs?.map((item, index) => (
          <Button
            mx="1"
            minW="fit-content"
            size="sm"
            key={index}
            onClick={() => setSelectedCategory(item)}
            bg={selectedCategory?._id === item?._id ? getColor(colorKeys.dark, colorMode) : "transparent"}
            color={selectedCategory?._id === item?._id ? getColor(colorKeys.white, colorMode) : getColor(colorKeys.dark, colorMode)}
          >
            {item?.name}
          </Button>
        ))}
      </Flex>

      <Box aria-label='product-list' mt={4}>
        <VStack spacing={4}>
          <Box w="full">
            <Flex w="full" align="center" justify={"space-between"}>
              <Heading fontSize="24px">{selectedCategory || "All"}</Heading>
              <Button variant={"ghost"} size="sm">See All</Button>

            </Flex>
            <SimpleGrid spacing={4} mt={3} columns={{ base: 1, sm: 2, md: 4 }}>
              {productsQuery?.data?.docs?.map((item, index) => (
                <ProductCard key={index} product={item} />
              ))}
            </SimpleGrid>
          </Box>
        </VStack>

      </Box>
    </Box>
  )
}

export default POS