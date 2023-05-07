import { Box, Flex, Heading, Icon, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import PrimaryButton from '../../../components/BasicUI/Buttons/PrimaryButton'
import OrderList from './OrderList'
import APP_ICONS from '../../../config/constants/icons'

const Orders = () => {
  const formDisclosure = useDisclosure()
  const [selectedOrder, setSelectedOrder] = React.useState(null)

  return (
    <Box>
      <Flex align={"center"}>
        <Heading as="h2" fontSize={26} fontWeight="bold">Orders</Heading>
      </Flex>
      <OrderList
        onEditModal={(data) => {
          setSelectedOrder(data)
          formDisclosure.onOpen()
        }}
      />
    </Box>
  )
}

export default Orders