import { Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { colorKeys, getColor } from '../../../config/constants/appColors'
import { useSelector } from 'react-redux'

const Logo = () => {
  const { colorMode } = useColorMode()
  const { store } = useSelector(state => state.user)
  return (
    <Text fontWeight={"bold"} color={getColor(colorKeys.white, colorMode)} fontSize="20px">{store?.name}</Text>
  )
}

export default Logo