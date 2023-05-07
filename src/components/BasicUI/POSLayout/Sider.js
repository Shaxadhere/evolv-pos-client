import { ChevronDownIcon } from '@chakra-ui/icons'
import { Avatar, Badge, Box, Button, Divider, Flex, HStack, Heading, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Text, VStack, useColorMode } from '@chakra-ui/react'
import React, { useState } from 'react'
import { colorKeys, getColor } from '../../../config/constants/appColors'
import APP_ICONS from '../../../config/constants/icons'

const Sider = () => {
  const { colorMode } = useColorMode()
  const [selectedOrderType, setSelectedOrderType] = useState("Dine in")
  const orderTypes = [
    "Dine in",
    "Delivery",
    "Takeaway"
  ]
  return (
    <Box
      pos="fixed"
      top="60px"
      left="0"
      w="400px"
      h="calc(100vh - 60px)"
      bg="white"
      borderRight="1px solid #eee"
      p="10px"
      overflow={"auto"}
    >
      <VStack spacing={4}>

        <Flex w="full" justify={"space-between"} align="center" bg={getColor(colorKeys.lightGray, colorMode)} px="5px" py="5px" rounded="md">
          {orderTypes.map((item, index) =>
            <Button
              key={index}
              minW="110px"
              onClick={() => setSelectedOrderType(item)}
              size="sm"
              bg={selectedOrderType === item ? getColor(colorKeys.dark, colorMode) : getColor(colorKeys.white, colorMode)}
              color={selectedOrderType === item ? getColor(colorKeys.white, colorMode) : getColor(colorKeys.dark, colorMode)}
            >
              {item}
            </Button>
          )}
        </Flex>

        <Flex w="full" justify={"space-between"} align="center">
          <Menu>
            <MenuButton size="sm" as={Button} rightIcon={<ChevronDownIcon />}>
              Recent
            </MenuButton>
            <MenuList>
              <MenuItem>Recent</MenuItem>
              <MenuItem>Today</MenuItem>
              <MenuItem>Yesterday</MenuItem>
              <MenuItem>Last 7 days</MenuItem>
              <MenuItem>Last 30 days</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton size="sm" as={Button} rightIcon={<ChevronDownIcon />}>
              Latest
            </MenuButton>
            <MenuList>
              <MenuItem>Latest</MenuItem>
              <MenuItem>Oldest</MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        <Divider />

        <VStack spacing={3} w="full">
          {new Array(9).fill(0).map(() =>
            <>
              <Box>
                <Flex w="full" align="center">
                  <Avatar size="md" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                  <Flex justify="space-between" ml={2} w="full">
                    <Box>
                      <Text fontSize={"14px"}>Shehzad Ahmed</Text>
                      <HStack spacing={1} align="center">
                        <Text color={getColor(colorKeys.secondaryText, colorMode)} fontSize="12px">Table 230</Text>
                        <Icon as={APP_ICONS.DOT} />
                        <Text color={getColor(colorKeys.secondaryText, colorMode)} fontSize="12px">Items 2</Text>
                        <Icon as={APP_ICONS.DOT} />
                        <Text color={getColor(colorKeys.secondaryText, colorMode)} fontSize="12px">PKR 2300</Text>
                      </HStack>
                    </Box>
                    <Box h="full">
                      <IconButton size="xs" variant={"ghost"} icon={<Icon as={APP_ICONS.OPTIONS} />} />
                    </Box>
                  </Flex>
                </Flex>
                <Text fontSize="12px" color={getColor(colorKeys.secondaryText, colorMode)}>Give more rice in one meal, and for one meal do not make it spicy...</Text>
              </Box>
              <Divider />
            </>
          )}
        </VStack>

      </VStack>

    </Box >
  )
}

export default Sider