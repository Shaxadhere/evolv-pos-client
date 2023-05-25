import { Box, Button, Flex, Heading, Icon, Image, Input, InputGroup, InputLeftElement, SimpleGrid, VStack, useColorMode } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useReactToPrint } from 'react-to-print';
import APP_ICONS from '../../config/constants/icons'
import { colorKeys, getColor } from '../../config/constants/appColors'
import { useCategory } from '../../config/query/categoryQuery'
import { useProducts } from '../../config/query/productQuery'
import ProductCard from '../../components/BasicUI/DataBoxes/ProductCard'
import RightSider from '../../components/BasicUI/POSLayout/RightSider'
import Sider from '../../components/BasicUI/POSLayout/Sider'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, updateTempQuantity } from '../../config/redux/slices/cartSlice'
import IMAGES from '../../config/constants/images'
import InvoiceBox from '../../components/BasicUI/DataBoxes/InvoiceBox'

const POS = () => {
  const { colorMode } = useColorMode()
  const dispatch = useDispatch()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const { tempQuantity } = useSelector((state) => state.cart);

  const [query, setQuery] = useState({
    page: 1,
    limit: 250,
  })

  const categoryQuery = useCategory({
    page: 1,
    limit: 250,
  })
  const productsQuery = useProducts(query)


  const handleAddProduct = (product) => {
    if(!tempQuantity){
      dispatch(addItemToCart({ ...product, quantity: 1 }))
    }else{
      dispatch(addItemToCart({ ...product, quantity: tempQuantity }))
      dispatch(updateTempQuantity(0))
    }
  }

  const onQueryChange = ({ key, value }) => {
    setQuery({ ...query, [key]: value })
  }



  return (
    <Box>
      <Sider />
      <Box as="main"
        pos="fixed"
        top="60px"
        left="400px"
        right="400px"
        w="calc(100vw - 800px)"
        h="calc(100vh - 60px)"
        overflowY="auto"
        p="20px"
      >
        <InputGroup bg="gray.100" rounded="md" >
          <Input placeholder="Search anything..." value={query?.name} onChange={(e) => onQueryChange({ key: "name", value: e.target.value })} />
          <InputLeftElement children={<Icon as={APP_ICONS.SEARCH} />} />
        </InputGroup>

        <Flex mt={1} overflow={"auto"} py={1}>
          <Button
            mx="1"
            minW="fit-content"
            size="sm"
            onClick={() => onQueryChange({ key: "category", value: "" })}
            bg={!query?.category ? getColor(colorKeys.dark, colorMode) : "transparent"}
            color={!query?.category ? getColor(colorKeys.white, colorMode) : getColor(colorKeys.dark, colorMode)}
          >
            All
          </Button>
          {categoryQuery?.data?.docs?.map((item, index) => (
            <Button
              mx="1"
              minW="fit-content"
              size="sm"
              key={index}
              onClick={() => onQueryChange({ key: "category", value: item?._id })}
              bg={query?.category === item?._id ? getColor(colorKeys.dark, colorMode) : "transparent"}
              color={query?.category === item?._id ? getColor(colorKeys.white, colorMode) : getColor(colorKeys.dark, colorMode)}
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
              {productsQuery?.data?.docs?.length === 0 && (
                <Flex h="calc(100vh - 245px)" align="center" justify={"center"}>
                  <Image src={IMAGES.EMPTY_BOX} h="180px" w="full" objectFit={"contain"} filter={"grayscale(1)"} />
                </Flex>
              )}
              <SimpleGrid spacing={4} mt={3} columns={{ base: 1, sm: 2, md: 8 }}>
                {productsQuery?.data?.docs?.map((item, index) => (
                  <ProductCard key={index} product={item} onAddToCart={handleAddProduct} />
                ))}
              </SimpleGrid>
            </Box>
          </VStack>

        </Box>
      </Box>
      <RightSider />
    </Box>
  )
}

export default POS