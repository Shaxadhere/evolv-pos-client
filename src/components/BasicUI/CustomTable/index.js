import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Image,
    Flex,
    Input,
    Box,
    HStack,
    IconButton,
    Icon,
    useColorMode,
    Text,
    Button,
    Skeleton,
    Select,
    chakra,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption
} from "@chakra-ui/react"
import {
    Pagination,
    usePagination,
    PaginationPage,
    PaginationNext,
    PaginationPrevious,
    PaginationPageGroup,
    PaginationContainer,
    PaginationSeparator
} from "@ajna/pagination";
import FormMultiSelectCheckboxes from "../../Forms/FormMultiSelectCheckboxes"
import { getColor, colorKeys } from '../../../config/constants/appColors'
import APP_ICONS from '../../../config/constants/icons'
import DeletePopover from '../DeletePopover';
import sortOrders from '../../../config/constants/sortOrders';

const CustomTable = ({
    head,
    data,
    size = "md",
    rowHeight = "36px",
    caption,
    filters = [],
    containerProps,
    tableProps,
    tableHeadProps,
    tbodyProps,
    loading,
    searchPlaceholder,
    searchKey = "searchQuery",
    pageSize: limit,
    pageNo,
    query,
    onQueryChange,
    totalPages,
    totalResults,
    onRefresh,
    isRefreshing = false,
    sortBy,
    sortOrder,
}) => {
    const { colorMode } = useColorMode()
    const [shownFilters, setShownFilters] = React.useState([])
    const {
        pages,
        pagesCount,
        currentPage,
        setCurrentPage,
    } = usePagination({
        pagesCount: totalPages,
        total: totalResults,
        limits: {
            outer: limit,
            inner: limit
        },
        initialState: {
            pageSize: limit,
            currentPage: pageNo,
        }
    });

    const handlePageChange = (nextPage) => {
        setCurrentPage(nextPage);
        onQueryChange({ page: nextPage })
    };

    const handleSort = (key, order) => {
        console.log(key, order, (sortOrder === sortOrders.ASC), sortOrder, sortOrders.ASC, "sort")
        onQueryChange({ sortBy: key, sortOrder: order, page: 1 })
    }

    return (
        <TableContainer {...containerProps}>
            <Flex
                // h="50px"
                my={2}
                justify="space-between"
                align="center"
                px="5px"
            >
                <HStack p="2px" flexWrap={"wrap"} w="82%">
                    <Input
                        type="search"
                        placeholder={searchPlaceholder ? searchPlaceholder : "Search"}
                        rounded="sm"
                        size="md"
                        maxW={"300px"}
                        m="2px"
                        onChange={(e) => onQueryChange({ [searchKey]: e.target.value, page: 1 })}
                    />
                    {filters?.map((item, index) => {
                        const visible = (shownFilters.includes(item.key) || index < 1 || query[item.key])
                        if (visible)
                            return (
                                <FormMultiSelectCheckboxes
                                    key={index}
                                    options={item.options?.map((i) => ({ value: i.key, label: `${i.value} (${i.count})` }))}
                                    placeholder={item.title}
                                    onChange={(value) => onQueryChange({ [item.key]: value.map((item) => item.value).join(","), page: 1 })}
                                    value={query[item.key] ? query[item.key].split(",").map((item) => ({ value: item, label: item })) : []}
                                    containerStyles={{ m: "2px !important" }}
                                />
                            )
                    })}
                    <Menu>
                        <MenuButton
                            as={Button}
                            m="2px !important"
                            size="md"
                            rightIcon={<Icon boxSize={7} as={APP_ICONS.ADD} fontSize={"20px"} />}
                        >
                            More
                        </MenuButton>
                        <MenuList>
                            {filters?.map((item, index) => {
                                const visible = (shownFilters.includes(item.key) || index < 1 || query[item.key])
                                return (
                                    <MenuItem
                                        key={index}
                                        onClick={() => {
                                            if (visible) {
                                                setShownFilters(shownFilters.filter((i) => i !== item.key))
                                            }
                                            else {
                                                setShownFilters([...shownFilters, item.key])
                                            }
                                        }}
                                        icon={visible && <Icon boxSize={4} as={APP_ICONS.CHECK} fontSize={"20px"} />}
                                    >
                                        <Text
                                            ml={visible ? "0px" : "29px"}
                                        >{item.title}</Text>
                                    </MenuItem>
                                )
                            })}
                        </MenuList>
                    </Menu>
                </HStack>
                <HStack spacing={3}>
                    {onRefresh && <Button
                        minW="100px"
                        size="md"
                        leftIcon={
                            <Icon
                                as={APP_ICONS.REFRESH}
                                fontSize={"20px"}
                            />
                        }
                        isLoading={isRefreshing}
                        onClick={onRefresh}
                    >Refresh</Button>}
                </HStack>
            </Flex>

            <Box bg={getColor(colorKeys.tableBackground, colorMode)} p="20px 15px"
            // h="calc(100vh - 295px)"
            >
                <Table variant='simple' size={size}  {...tableProps}>
                    {caption && <TableCaption>{caption}</TableCaption>}
                    <Thead bg={getColor(colorKeys.tableBackground, colorMode)} {...tableHeadProps}>
                        <Tr>
                            {head && head.map((item, index) =>
                                <Th
                                    textTransform={"capitalize"}
                                    textAlign={item.align ? item.align : "center"}
                                    fontSize="14px"
                                    color={getColor(colorKeys.primaryText, colorMode)}
                                    key={index}
                                >
                                    <Flex
                                        align={"center"}
                                        justify={item.align ? item.align : "center"}
                                        onClick={item.isSortable ? () => handleSort(item.extractor, sortOrder === sortOrders.ASC ? sortOrders.DESC : sortOrders.ASC) : null}
                                        cursor={item.isSortable ? "pointer" : "default"}
                                    >
                                        <chakra.p>{item.title}</chakra.p>
                                        {item.isSortable &&
                                            <Flex ml={2} flexDirection={"column"}>
                                                <Icon
                                                    as={APP_ICONS.CaretUpFill}
                                                    color={sortBy === item.title && sortOrder === sortOrders.ASC ? getColor(colorKeys.gray, colorMode) : getColor(colorKeys.lightGray, colorMode)}
                                                    fontSize="16px"
                                                    boxSize={4}
                                                    mt={1}
                                                />
                                                <Icon
                                                    as={APP_ICONS.CaretDownFill}
                                                    color={sortBy === item.title && sortOrder === sortOrders.DESC ? getColor(colorKeys.gray, colorMode) : getColor(colorKeys.lightGray, colorMode)}
                                                    fontSize="16px"
                                                    mt={"-5px"}
                                                />
                                            </Flex>
                                        }
                                    </Flex>
                                </Th>
                            )}
                        </Tr>
                    </Thead>
                    <Tbody {...tbodyProps} borderTop={`1px solid ${getColor(colorKeys.whiteSmoke, colorMode)}`}>
                        {(data && data.length > 0) ?
                            data?.map((row, rowIndex) => {
                                return (<Tr
                                    h={rowHeight}
                                    key={rowIndex}
                                    bg={getColor(colorKeys.tableBackground, colorMode)}
                                    borderColor="transparent"
                                    _hover={{ backgroundColor: getColor(colorKeys.tableRowHoverBackground, colorMode) }}
                                >
                                    {head && head.map((item, index) => {
                                        if (item.component) {
                                            return <Td
                                                key={index}
                                                color={getColor(colorKeys.primaryText, colorMode)}
                                                p="0px"
                                                cursor="pointer"
                                                textAlign={item.align ? item.align : "center"}
                                            >
                                                {item.component(row)}
                                            </Td>
                                        }
                                        else if (item.extractor === "actions") {
                                            return <Td
                                                key={index}
                                                color={getColor(colorKeys.primaryText, colorMode)}
                                                p="2px 0px"
                                                cursor="pointer"
                                                textAlign={item.align ? item.align : "center"}
                                            >
                                                <HStack spacing={2} justify={"center"}>
                                                    {row[item.extractor]
                                                        .map((action, actionIndex) => {
                                                            if (action.isDelete) {
                                                                return (
                                                                    <DeletePopover key={actionIndex} onConfirm={() => action.action(row._id)}>
                                                                        <IconButton size="sm" icon={<Icon as={action.icon} />} key={index}>
                                                                            {action.title}
                                                                        </IconButton>
                                                                    </DeletePopover>
                                                                )
                                                            }
                                                            if (action.isRestore) {
                                                                return (
                                                                    <DeletePopover subject="restore" confirmScheme="green" key={actionIndex} onConfirm={() => action.action(row._id)}>
                                                                        <IconButton size="sm" icon={<Icon as={action.icon} />} key={index}>
                                                                            {action.title}
                                                                        </IconButton>
                                                                    </DeletePopover>
                                                                )
                                                            }
                                                            return (<IconButton size="sm" icon={<Icon as={action.icon} />} key={actionIndex} onClick={() => action.action(row._id)}>
                                                                {action.title}
                                                            </IconButton>)
                                                        })}
                                                </HStack>
                                            </Td>
                                        }
                                        return <Td
                                            key={index}
                                            fontSize="14px"
                                            color={getColor(colorKeys.primaryText, colorMode)}
                                            cursor="pointer"
                                            textAlign={item.align ? item.align : "center"}
                                            p="unset"
                                            h={rowHeight}
                                        >
                                            {row[item.extractor]}
                                        </Td>
                                    })}
                                </Tr>)
                            }
                            ) : !loading && (
                                <Tr>
                                    <Td colSpan={head.length}>
                                        <Image w="120px" mx="auto" my={10} src={require("../../../assets/images/empty-box.png")} />
                                    </Td>
                                </Tr>
                            )}
                        {loading && new Array(10).fill(0).map((item, index) =>
                            <Tr>
                                <Td colSpan={head.length} p="10px 0px">
                                    <Skeleton height="25px" w="full" />
                                </Td>
                            </Tr>
                        )}

                    </Tbody>
                </Table>

            </Box>

            {
                (limit &&
                    pageNo &&
                    onQueryChange &&
                    totalPages > 0) && (
                    <Flex justify={"space-between"}>
                        <Text
                            fontSize="sm"
                            color={getColor(colorKeys.primaryText, colorMode)}
                            my={2}
                            mr={2}
                            pl="5px"
                        >
                            Showing {pageNo * limit - limit + 1} to {pageNo * limit > totalResults ? totalResults : pageNo * limit} of {totalResults} records
                        </Text>
                        <HStack spacing={1}>
                            <Select defaultValue={query?.pageSize} size="sm" onChange={(e) => onQueryChange({ pageSize: Number(e.target.value), page: 1 })}>

                                {[5, 10, 20, 50, 100].map((item, index) =>
                                    <option selected={item===limit} key={index} value={item}>{item}</option>
                                )}
                            </Select>
                            <Pagination
                                pagesCount={pagesCount}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            >
                                <PaginationContainer
                                    align="center"
                                    justify="end"
                                    p={4}
                                    w="full"
                                    as={HStack}
                                    spacing={2}
                                >
                                    <PaginationPrevious
                                        as={Button}
                                        size="sm"
                                        color={getColor(colorKeys.paginationNavigationColor, colorMode)}
                                        bg={getColor(colorKeys.paginationNavigationBgColor, colorMode)}
                                        _hover={{
                                            bg: getColor(colorKeys.paginationNavigationHoverBgColor, colorMode),
                                        }}
                                    >
                                        <Text>Previous</Text>
                                    </PaginationPrevious>
                                    <PaginationPageGroup
                                        isInline
                                        align="center"
                                        separator={
                                            <PaginationSeparator
                                                onClick={() =>
                                                    console.log("p")
                                                }
                                                fontSize="sm"
                                                color={getColor(colorKeys.primaryText, colorMode)}
                                                w={7}
                                                jumpSize={11}
                                            />
                                        }
                                    >
                                        {pages.map((page) => (
                                            <PaginationPage
                                                w={7}
                                                as={Button}
                                                key={`pagination_page_${page}`}
                                                page={page}
                                                size="sm"
                                                bg={getColor(colorKeys.paginationNavigationBgColor, colorMode)}
                                                _hover={{
                                                    bg: getColor(colorKeys.paginationNavigationHoverBgColor, colorMode),
                                                }}
                                                fontSize="sm"
                                                _current={{
                                                    bg: getColor(colorKeys.primary, colorMode),
                                                    color: getColor(colorKeys.white, colorMode),
                                                }}
                                            />
                                        ))}
                                    </PaginationPageGroup>
                                    <PaginationNext
                                        as={Button}
                                        size="sm"
                                        color={getColor(colorKeys.paginationNavigationColor, colorMode)}
                                        bg={getColor(colorKeys.paginationNavigationBgColor, colorMode)}
                                        _hover={{
                                            bg: getColor(colorKeys.paginationNavigationHoverBgColor, colorMode),
                                        }}
                                    >
                                        <Text>Next</Text>
                                    </PaginationNext>
                                </PaginationContainer>
                            </Pagination>
                        </HStack>
                    </Flex>
                )
            }

        </TableContainer >
    )
}

export default CustomTable