import { Badge, Box, Flex, FormControl, FormLabel, HStack, Icon, Input, Select, SimpleGrid, Text, chakra, useColorMode } from '@chakra-ui/react'
import React, { useState } from 'react'
import { getColor, colorKeys } from "../../../config/constants/appColors"
import APP_ICONS from '../../../config/constants/icons'
import { useSaleReport } from '../../../config/query/saleQuery'
import { ORDER_TYPES } from '../../../config/constants/options'
import { useStoreUsers } from '../../../config/query/userQuery'
import moment from 'moment'

const Dashboard = () => {
  const { colorMode } = useColorMode()
  const [query, setQuery] = useState({

  })

  const saleReportQuery = useSaleReport(query)
  const storeUsers = useStoreUsers()


  const handleQueryChange = (key, value) => {
    setQuery({
      ...query,
      [key]: value
    })
  }



  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5} mb={5}>

        <FormControl>
          <FormLabel>Start Date</FormLabel>
          <Input type="date" onChange={(e) => {
            handleQueryChange("fromDate", e.target.value)
          }} />
        </FormControl>

        <FormControl>
          <FormLabel>End Date</FormLabel>
          <Input type="date" onChange={(e) => {
            handleQueryChange("toDate", e.target.value)
          }} />
        </FormControl>

        <FormControl>
          <FormLabel>Customer</FormLabel>
          <Input type="text" placeholder="Enter customer name" onChange={(e) => handleQueryChange("customer", e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>Order Type</FormLabel>
          <Select type="text" placeholder="Select order type" onChange={(e) => handleQueryChange("customer", e.target.value)}>
            {ORDER_TYPES.map((type, index) => (
              <option key={index} value={type.name}>{type.name}</option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Cashier</FormLabel>
          <Select placeholder="Select Cashier" onChange={(e) => handleQueryChange("user", e.target.value)}>
            {storeUsers.data?.map((user, index) => (
              <option key={index} value={user._id}>{user.name}</option>
            ))}
          </Select>
        </FormControl>

      </SimpleGrid>
      <HStack
        spacing={2}
        boxShadow={"lg"}
      >
        <Flex
          flexDir="column"
          p="28px 20px"
          w="full"
        >
          <Flex mb={4} align={"center"}>
            <Flex mr="3" align="center" justify={"center"} backgroundColor={getColor(colorKeys.lighterBlue, colorMode)} h="30px" w="30px" rounded={"full"}>
              <Icon boxSize={8} as={APP_ICONS.REPORTS} color={getColor(colorKeys.lightBlue, colorMode)} />
            </Flex>
            <Box>
              <chakra.p fontWeight={"500"} fontSize="20px">Sales</chakra.p>
              <chakra.p color={getColor(colorKeys.dimText)} fontSize="13px">Your sales in selected criteria</chakra.p>
            </Box>
          </Flex>
          {saleReportQuery.isFetching
            ? <Text>Loading...</Text>
            : <Text fontSize="20px" fontWeight={"500"}>PKR {saleReportQuery.data?.at(0)?.total || 0}</Text>
          }
        </Flex>
      </HStack>
    </Box>
  )
}

export default Dashboard