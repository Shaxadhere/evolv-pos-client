import { Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { colorKeys, getColor } from '../../../config/constants/appColors'

const Logo = () => {
  const { colorMode } = useColorMode()
  return (
    <Text fontWeight={"bold"} color={getColor(colorKeys.white, colorMode)} fontSize="20px">EvolvPOS</Text>
  )
}

export default Logo