import { Box, Flex, Heading, Icon, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import PrimaryButton from '../../../components/BasicUI/Buttons/PrimaryButton'
import ProductList from './ProductList'
import ProductForm from './ProductForm'
import APP_ICONS from '../../../config/constants/icons'

const Products = () => {
  const formDisclosure = useDisclosure()
  const [selectedProduct, setSelectedProduct] = React.useState(null)

  return (
    <Box>
      <Flex justify="space-between" align={"center"}>
        <Heading as="h2" fontSize={26} fontWeight="bold">Products</Heading>
        <PrimaryButton onClick={() => {
          formDisclosure.onOpen()
          setSelectedProduct(null)
        }}
          leftIcon={<Icon boxSize={6} as={APP_ICONS.ADD} />}
        >
          Create New Product
        </PrimaryButton>
      </Flex>
      <ProductList
        onEditModal={(data) => {
          setSelectedProduct(data)
          formDisclosure.onOpen()
        }}
      />
      <ProductForm disclosure={formDisclosure} data={selectedProduct} />
    </Box>
  )
}

export default Products