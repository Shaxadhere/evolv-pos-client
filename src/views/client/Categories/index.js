import { Box, Flex, Heading, Icon, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import PrimaryButton from '../../../components/BasicUI/Buttons/PrimaryButton'
import CategoryList from './CategoryList'
import CategoryForm from './CategoryForm'
import APP_ICONS from '../../../config/constants/icons'

const Categories = () => {
  const formDisclosure = useDisclosure()
  const [selectedCategory, setSelectedCategory] = React.useState(null)

  return (
    <Box>
      <Flex justify="space-between" align={"center"}>
        <Heading as="h2" fontSize={26} fontWeight="bold">Categories</Heading>
        <PrimaryButton onClick={() => {
          formDisclosure.onOpen()
          setSelectedCategory(null)
        }}
          leftIcon={<Icon boxSize={6} as={APP_ICONS.ADD} />}
        >
          Create New Category
        </PrimaryButton>
      </Flex>
      <CategoryList
        onEditModal={(data) => {
          setSelectedCategory(data)
          formDisclosure.onOpen()
        }}
      />
      <CategoryForm disclosure={formDisclosure} data={selectedCategory} />
    </Box>
  )
}

export default Categories