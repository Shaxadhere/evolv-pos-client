import { Box, Button, Flex, Heading, Icon, Input, InputGroup, InputLeftAddon, InputLeftElement, SimpleGrid, VStack, useColorMode } from '@chakra-ui/react'
import React, { useState } from 'react'
import APP_ICONS from '../../config/constants/icons'
import { colorKeys, getColor } from '../../config/constants/appColors'
import ProductSection from '../../components/BasicUI/DataBoxes/ProductSection'

const POS = () => {
  const { colorMode } = useColorMode()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const categories = [
    "All",
    "Electronics",
    "Clothes",
    "Shoes",
    "Bags",
    "Watches",
    "Jewelries",
    "Phones",
    "Laptops",
    "Accessories",
    "Furniture",
    "Beauty",
    "Health",
    "Sports",
    "Books",
    "Toys",
    "Games",
    "Food",
    "Others"
  ]

  return (
    <Box>
      <InputGroup bg="gray.100" rounded="md" >
        <Input placeholder="Search anything..." />
        <InputLeftElement children={<Icon as={APP_ICONS.SEARCH} />} />
      </InputGroup>

      <Flex mt={1} overflow={"auto"} py={1}>
        {categories.map((item, index) => (
          <Button
            mx="1"
            minW="fit-content"
            size="sm"
            key={index}
            onClick={() => setSelectedCategory(item)}
            bg={selectedCategory === item ? getColor(colorKeys.dark, colorMode) : "transparent"}
            color={selectedCategory === item ? getColor(colorKeys.white, colorMode) : getColor(colorKeys.dark, colorMode)}
          >
            {item}
          </Button>
        ))}
      </Flex>

      <Box aria-label='product-list' mt={4}>
        <VStack spacing={4}>
          {selectedCategory !== "All" && (
            <ProductSection item={selectedCategory} />
          )}

          {selectedCategory === "All" && categories.map((item, index) => {
            if (item !== "All") {
              return (
                <ProductSection key={index} item={item} />
              )
            }
          })}

        </VStack>

      </Box>
    </Box>
  )
}

export default POS