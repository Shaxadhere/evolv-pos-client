import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { colorKeys, getColor } from "../../../config/constants/appColors";
import APP_ICONS from "../../../config/constants/icons";
import { useDispatch, useSelector } from "react-redux";
import { ORDER_TYPES } from "../../../config/constants/options";
import { setOrderType, updateTempQuantity } from "../../../config/redux/slices/cartSlice";
import { useSales } from "../../../config/query/saleQuery";
import IMAGES from "../../../config/constants/images";
import InvoiceBox from "../DataBoxes/InvoiceBox";
import { useReactToPrint } from "react-to-print";
import sortOrders from "../../../config/constants/sortOrders";
import { formatDateTimeFromNow } from "../../../config/helpers/dateHelper";

const Sider = () => {
  const { colorMode } = useColorMode();
  const { orderType, tempQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [selectedSale, setSelectedSale] = useState(null);
  // const [quantity, setQuantity] = useState("0")
  const [query, setQuery] = useState({
    page: 1,
    limit: 250,
    sortOrder: sortOrders.DESC,
    sortBy: "createdAt",
    orderType: ORDER_TYPES[0].name,
  });
  const invoiceRef = React.useRef();
  const salesQuery = useSales(query);
  const { store } = useSelector((state) => state.user);

  const saleItemOptions = [
    {
      name: "Print Receipt",
      icon: APP_ICONS.PRINT,
      onClick: (sale) => {
        console.log({ sale });
        setSelectedSale(sale);
        setTimeout(() => {
          handleOnPrint();
        }, 1000);
      },
    },
    // {
    //   name: "View Details",
    //   icon: APP_ICONS.WATCH,
    //   onClick: (sale) => setSelectedSale(sale)
    // },
  ];

  const handleOnPrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: "Evolv - Invoice",
    onAfterPrint: () => {
      setSelectedSale(null);
    },
  });

  const handleQuantityChange = (value) => {
    if (value === "C") {
      dispatch(updateTempQuantity("0"))
        return;
    }
    if (value === "CE") {
      dispatch(updateTempQuantity(String(tempQuantity).slice(0, -1)))
        return;
    }
    if (value === ".") {
        if (tempQuantity.includes(".")) return;
    }
    if (tempQuantity == 0) {
      dispatch(updateTempQuantity(String(value)))
        return;
    }
    dispatch(updateTempQuantity(String(tempQuantity) + String(value)))
}

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
      <Tabs size="md" variant="enclosed">
        <TabList>
          <Tab>Keyboard</Tab>
          <Tab>Recent Sales</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack spacing={3} mt={5} w="full">
              <InputGroup w="full">
                {/* <InputLeftAddon children="PKR" /> */}
                <Input
                  value={tempQuantity}
                  type="number"
                  placeholder="Enter quantity"
                />
              </InputGroup>
              <SimpleGrid columns={2} w="full" spacing={4}>
                {[
                  { name: "CE", action: 
                  () => dispatch(updateTempQuantity(tempQuantity.slice(0, -1)))
                },
                  { name: "C", action: () => 
                  dispatch(updateTempQuantity("0"))
                },
                ].map((item, index) => (
                  <Button h="60px" onClick={item.action} key={index}>
                    {item.name}
                  </Button>
                ))}
              </SimpleGrid>
              <SimpleGrid columns={3} w="full" spacing={4}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, "00", 0, "."].map(
                  (item, index) => (
                    <Button
                      key={index}
                      onClick={() => handleQuantityChange(item)}
                    >
                      {item}
                    </Button>
                  )
                )}
              </SimpleGrid>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={4}>
              <Flex
                w="full"
                justify={"space-between"}
                align="center"
                bg={getColor(colorKeys.lightGray, colorMode)}
                px="5px"
                py="5px"
                rounded="md"
              >
                {ORDER_TYPES.map((item, index) => (
                  <Button
                    key={index}
                    minW="110px"
                    onClick={() => setQuery({ ...query, orderType: item.name })}
                    size="sm"
                    bg={
                      query?.orderType === item.name
                        ? getColor(colorKeys.dark, colorMode)
                        : getColor(colorKeys.white, colorMode)
                    }
                    color={
                      query?.orderType === item.name
                        ? getColor(colorKeys.white, colorMode)
                        : getColor(colorKeys.dark, colorMode)
                    }
                  >
                    {item.name}
                  </Button>
                ))}
              </Flex>

              {/* <Flex w="full" justify={"space-between"} align="center">
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

        <Divider /> */}

              <VStack spacing={3} w="full">
                <Heading fontSize="18px" textAlign={"left"} w="full">
                  Recent Sales
                </Heading>
                {salesQuery?.data?.docs?.length === 0 && (
                  <Flex
                    h="calc(100vh - 205px)"
                    align="center"
                    justify={"center"}
                  >
                    <Image
                      src={IMAGES.EMPTY_BOX}
                      objectFit={"contain"}
                      h="180px"
                      w="full"
                      filter={"grayscale(1)"}
                    />
                  </Flex>
                )}
                {salesQuery?.data?.docs?.map((item, index) => (
                  <>
                    <Box key={index} w="full">
                      <Flex w="full" align="center">
                        <Avatar size="md" name={item.customer} />
                        <Flex justify="space-between" ml={2} w="full">
                          <Box>
                            <Text fontSize={"14px"} fontWeight={"bold"}>
                              {item.customer ? `${item.customer} - ` : ""} #
                              {item.orderNumber || "N/A"}
                            </Text>
                            <HStack spacing={1} align="center">
                              <Text
                                color={getColor(
                                  colorKeys.secondaryText,
                                  colorMode
                                )}
                                fontSize="12px"
                              >
                                Items {item.products?.length}
                              </Text>
                              <Icon as={APP_ICONS.DOT} />
                              <Text
                                color={getColor(
                                  colorKeys.secondaryText,
                                  colorMode
                                )}
                                fontSize="12px"
                              >
                                PKR {item.total}
                              </Text>
                              <Icon as={APP_ICONS.DOT} />
                              <Text
                                color={getColor(
                                  colorKeys.secondaryText,
                                  colorMode
                                )}
                                fontSize="12px"
                              >
                                {item.orderType}
                              </Text>
                            </HStack>
                            <Text
                              color={getColor(
                                colorKeys.secondaryText,
                                colorMode
                              )}
                              fontSize="12px"
                            >
                              {formatDateTimeFromNow(item.createdAt)}
                            </Text>
                          </Box>
                          <Box h="full">
                            <Menu>
                              <MenuButton
                                as={IconButton}
                                size="xs"
                                variant={"ghost"}
                                icon={<Icon as={APP_ICONS.OPTIONS} />}
                              />
                              <MenuList>
                                {saleItemOptions.map((option, i) => (
                                  <MenuItem
                                    key={i}
                                    icon={<Icon as={option.icon} />}
                                    onClick={() => option.onClick(item)}
                                  >
                                    {option.name}
                                  </MenuItem>
                                ))}
                              </MenuList>
                            </Menu>
                          </Box>
                        </Flex>
                      </Flex>
                    </Box>
                    <Divider />
                  </>
                ))}
              </VStack>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <InvoiceBox
        ref={invoiceRef}
        cartItems={selectedSale?.products || []}
        subTotal={selectedSale?.subTotal}
        discount={selectedSale?.discount}
        orderType={selectedSale?.orderType}
        orderNumber={selectedSale?.orderNumber}
        tax={selectedSale?.tax}
        total={selectedSale?.total}
        storeName={store?.name}
      />
    </Box>
  );
};

export default Sider;
