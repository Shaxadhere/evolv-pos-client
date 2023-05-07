import { Box, Flex, Heading, Icon, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import PrimaryButton from '../../../components/BasicUI/Buttons/PrimaryButton'
import CustomerList from './CustomerList'
import CustomerForm from './CustomerForm'
import APP_ICONS from '../../../config/constants/icons'

const Customers = () => {
  const formDisclosure = useDisclosure()
  const [selectedCustomer, setSelectedCustomer] = React.useState(null)

  return (
    <Box>
      <Flex justify="space-between" align={"center"}>
        <Heading as="h2" fontSize={26} fontWeight="bold">Customers</Heading>
        <PrimaryButton onClick={() => {
          formDisclosure.onOpen()
          setSelectedCustomer(null)
        }}
          leftIcon={<Icon boxSize={6} as={APP_ICONS.ADD} />}
        >
          Create New Customer
        </PrimaryButton>
      </Flex>
      <CustomerList
        onEditModal={(data) => {
          setSelectedCustomer(data)
          formDisclosure.onOpen()
        }}
      />
      <CustomerForm disclosure={formDisclosure} data={selectedCustomer} />
    </Box>
  )
}

export default Customers