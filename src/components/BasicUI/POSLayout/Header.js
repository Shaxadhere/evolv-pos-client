import { Box, Divider, Flex, useColorMode } from '@chakra-ui/react'
import React from 'react'
import Logo from '../Logo'
import { Link, useLocation } from 'react-router-dom'
import { colorKeys, getColor } from '../../../config/constants/appColors'
import { topNav } from '../../../config/constants/navigations'

const Header = () => {
  const { colorMode } = useColorMode()
  const { pathname } = useLocation()

  return (
    <Flex
      as="header"
      pos="fixed"
      top="0"
      left="0"
      w="100%"
      h="60px"
      borderBottom="1px solid #eee"
      bg={getColor(colorKeys.layoutHeaderBackground, colorMode)}
      justify={"space-between"}
      align={"center"}
      px="20px"
    >
      <Flex align="center">
        <Box borderRight={"1px solid #eee"} px="20px">
          <Logo />
        </Box>
        <Flex as="nav" align="center" ml="20px">
          {topNav.map((item, index) => {
            const isActive = pathname === item.path
            return (
              <Box
                as={Link}
                to={item.path}
                fontSize="14px"
                key={index}
                mx="2"
                fontWeight="500"
                color={isActive ? getColor(colorKeys.white, colorMode) : getColor(colorKeys.white, colorMode)}
              >
                {item.name}
              </Box>
            )
          })}
        </Flex>
      </Flex>

      <Flex>

      </Flex>
    </Flex>
  )
}

export default Header