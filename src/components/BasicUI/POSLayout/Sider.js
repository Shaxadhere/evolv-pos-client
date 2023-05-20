import { ChevronDownIcon } from '@chakra-ui/icons'
import { Avatar, Badge, Box, Button, Divider, Flex, HStack, Heading, Icon, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Text, VStack, useColorMode } from '@chakra-ui/react'
import React, { useState } from 'react'
import { colorKeys, getColor } from '../../../config/constants/appColors'
import APP_ICONS from '../../../config/constants/icons'
import { useDispatch, useSelector } from 'react-redux'
import { ORDER_TYPES } from '../../../config/constants/options'
import { setOrderType } from '../../../config/redux/slices/cartSlice'
import { useSales } from '../../../config/query/saleQuery'
import IMAGES from '../../../config/constants/images'
import InvoiceBox from '../DataBoxes/InvoiceBox'
import { useReactToPrint } from 'react-to-print'

const Sider = () => {
  const { colorMode } = useColorMode()
  const { orderType } = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const [selectedSale, setSelectedSale] = useState(null)
  const [query, setQuery] = useState({
    page: 1,
    limit: 250,
  })
  const invoiceRef = React.useRef()
  const salesQuery = useSales(query)
  const { store } = useSelector(state => state.user)

  const saleItemOptions = [
    {
      name: "Print Receipt",
      icon: APP_ICONS.PRINT,
      onClick: (sale) => {
        console.log({sale})
        setSelectedSale(sale)
        setTimeout(() => {
          handleOnPrint()
        }, 1000)
      }
    },
    {
      name: "View Details",
      icon: APP_ICONS.WATCH,
      onClick: (sale) => setSelectedSale(sale)
    },
  ]

  const handleOnPrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: "Evolv - Invoice",
    onAfterPrint: () => {
      setSelectedSale(null)
    }
  });

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

        {/* <Flex w="full" justify={"space-between"} align="center" bg={getColor(colorKeys.lightGray, colorMode)} px="5px" py="5px" rounded="md">
          {ORDER_TYPES.map((item, index) =>
            <Button
              key={index}
              minW="110px"
              onClick={() => dispatch(setOrderType(item.name))}
              size="sm"
              bg={orderType === item.name ? getColor(colorKeys.dark, colorMode) : getColor(colorKeys.white, colorMode)}
              color={orderType === item.name ? getColor(colorKeys.white, colorMode) : getColor(colorKeys.dark, colorMode)}
            >
              {item.name}
            </Button>
          )}
        </Flex> */}

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
          {salesQuery?.data?.docs?.length === 0 && (
            <Flex h="calc(100vh - 205px)" align="center" justify={"center"}>
              <Image src={IMAGES.EMPTY_BOX} objectFit={"contain"} h="180px" w="full" filter={"grayscale(1)"} />
            </Flex>
          )}
          {salesQuery?.data?.docs?.map((item, index) =>
            <>
              <Box key={index}>
                <Flex w="full" align="center">
                  <Avatar size="md" />
                  <Flex justify="space-between" ml={2} w="full">
                    <Box>
                      <Text fontSize={"14px"} fontWeight={"bold"}>#{item.orderNumber || "N/A"}</Text>
                      <HStack spacing={1} align="center">
                        <Text color={getColor(colorKeys.secondaryText, colorMode)} fontSize="12px">Items {item.products?.length}</Text>
                        <Icon as={APP_ICONS.DOT} />
                        <Text color={getColor(colorKeys.secondaryText, colorMode)} fontSize="12px">PKR 2300</Text>
                      </HStack>
                    </Box>
                    <Box h="full">
                      <Menu>
                        <MenuButton as={IconButton} size="xs" variant={"ghost"} icon={<Icon as={APP_ICONS.OPTIONS} />} />
                        <MenuList>
                          {saleItemOptions.map((option, i) =>
                            <MenuItem key={i} icon={<Icon as={option.icon} />} onClick={() => option.onClick(item)}>{option.name}</MenuItem>
                          )}
                        </MenuList>
                      </Menu>
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

      <InvoiceBox
        ref={invoiceRef}
        cartItems={selectedSale?.products || []}
        subTotal={selectedSale?.subTotal}
        discount={selectedSale?.discount}
        tax={selectedSale?.tax}
        total={selectedSale?.total}
        storeName={store?.name}
      />
    </Box >
  )
}

export default Sider