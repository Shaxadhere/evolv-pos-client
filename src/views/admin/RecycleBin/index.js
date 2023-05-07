import { Box, Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import BinList from './BinList'

const Users = () => {

  return (
    <Box>
      <Flex justify="space-between" align={"center"}>
        <Heading as="h2" fontSize={26} fontWeight="bold">Bin</Heading>
      </Flex>
      <BinList />
    </Box>
  )
}

export default Users