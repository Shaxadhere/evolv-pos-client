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
    Tooltip
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
import NoResults from '../../SVGComponents/NoResults';

const CustomTable = ({
    //data manipulation
    head,
    data,
    loading,
    searchKey = "Keyword",
    pageSize: limit,
    pageNo,
    query,
    onQueryChange,
    totalPages,
    totalResults,
    onRefresh,
    isRefreshing = false,
    filters = [],
    caption,
    searchPlaceholder,

    //styles manipulations
    fixedHeight = true,
    rowHeight = "36px",
    size = "md",
    containerProps,
    tableProps,
    tableHeadProps,
    tbodyProps,
    hideFilterBar = false,
    tableWrapperProps,
    hideSearch = false,

    //actions
    onDelete,
    onEdit,
    onView
}) => {
    const { colorMode } = useColorMode()
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
        onQueryChange({ sortBy: key, sortOrder: order, page: 1 })
    }

    return (
        <TableContainer {...containerProps} h={fixedHeight ? "calc(100vh - 140px)" : "auto"}>
            {!hideFilterBar && (
                <Flex h="50px" my={2} justify="space-between" align="center" px="5px">
                    <HStack spacing={3}>
                        {!hideSearch && (
                            <Input
                                type="search"
                                placeholder={searchPlaceholder ? searchPlaceholder : "Search"}
                                rounded="sm"
                                size="md"
                                maxW="300px"
                                onChange={(e) => onQueryChange({ [searchKey]: e.target.value, page: 1 })}
                            />
                        )}
                        {filters?.map((item, index) => {
                            return (
                                <FormMultiSelectCheckboxes
                                    key={index}
                                    options={item.options?.map((i) => ({ value: i.key, label: `${i.value} (${i.count})` }))}
                                    placeholder={item.title}
                                    onChange={(value) => onQueryChange({ [item.key]: value.map((item) => item.value).join(","), page: 1 })}
                                    value={query[item.key] ? query[item.key].split(",").map((item) => ({ value: item, label: item })) : []}
                                />
                            )
                        })}
                    </HStack>
                    <HStack spacing={3}>
                        {onRefresh && <Button
                            minW="100px"
                            size="sm"
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
            )}


            <Box h="calc(100vh - 255px)" overflowY={"auto"} bg={getColor(colorKeys.tableBackground, colorMode)} p="0 20px 15px" {...tableWrapperProps}>
                <Table variant='simple' size={size}  {...tableProps}>
                    {caption && <TableCaption>{caption}</TableCaption>}
                    <Thead zIndex="1" pos="sticky" top={0} h="45px" bg={getColor(colorKeys.tableBackground, colorMode)} {...tableHeadProps}>
                        <Tr>
                            {head && head.map((item, index) =>
                                <Th
                                    textTransform={"capitalize"}
                                    textAlign={item.align ? item.align : "center"}
                                    fontSize="14px"
                                    color={getColor(colorKeys.primaryText, colorMode)}
                                    key={index}
                                    p="2px 5px"
                                    h={"35px"}
                                    rounded="sm"
                                    // _hover={item.isSortable ? { bg: getColor(colorKeys.lightGray, colorMode) } : {}}
                                    bg={query?.sortBy === item.title ? getColor(colorKeys.lightGray, colorMode) : ""}
                                >

                                    <Flex
                                        align={"center"}
                                        justify={item.align ? item.align : "left"}
                                        onClick={item.isSortable ? () => handleSort(item.extractor, query?.sortOrder === sortOrders.ASC ? sortOrders.DESC : sortOrders.ASC) : null}
                                        h="full"
                                        cursor={item.isSortable ? "pointer" : "default"}
                                    >
                                        <Tooltip isDisabled={!item.isSortable} arrowSize={15} label={`Sort in ${query?.sortBy === item.title && query?.sortOrder === sortOrders.DESC ? 'descending' : 'ascending'} order`} aria-label='A tooltip'>
                                            <Flex
                                                h="full"
                                                align={"center"}
                                                transition="all 0.2s ease-in-out"
                                                _hover={item.isSortable
                                                    ? {
                                                        bg: getColor(colorKeys.lightGray, colorMode),
                                                        px: "12px",
                                                        transition: "all 0.2s ease-in-out",
                                                    }
                                                    : {}}
                                            >
                                                <chakra.p>{item.title}</chakra.p>
                                                {item.isSortable &&
                                                    <Flex ml={2} flexDirection={"column"}>
                                                        {query?.sortBy === item.title && query?.sortOrder === sortOrders.ASC && (
                                                            <Icon
                                                                as={APP_ICONS.UpArrow}
                                                                color={getColor(colorKeys.gray, colorMode)}
                                                                fontSize="16px"
                                                                boxSize={5}
                                                                mt={1}
                                                            />
                                                        )}
                                                        {query?.sortBy === item.title && query?.sortOrder === sortOrders.DESC && (
                                                            <Icon
                                                                as={APP_ICONS.DownArrow}
                                                                color={getColor(colorKeys.gray, colorMode)}
                                                                fontSize="16px"
                                                                boxSize={5}
                                                                mt={1}
                                                            />
                                                        )}
                                                    </Flex>
                                                }
                                            </Flex>
                                        </Tooltip>
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
                                                textAlign={item.align ? item.align : "left"}
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
                                            textAlign={item.align ? item.align : "left"}
                                            p="unset"
                                            h={rowHeight}
                                        >
                                            {row[item.extractor] || item.fallBackText || "N/A"}
                                        </Td>
                                    })}
                                </Tr>)
                            }
                            ) : !loading && (
                                <Tr>
                                    <Td colSpan={head.length} borderBottom="0">
                                        <Box w="500px" mx="auto" my={10}>
                                            <NoResults />
                                        </Box>
                                    </Td>
                                </Tr>
                            )}
                        {loading && new Array(15).fill(0).map((item, index) =>
                            <Tr key={index}>
                                <Td colSpan={head.length} p="10px 0px">
                                    <Skeleton height="25px" w="full" />
                                </Td>
                            </Tr>
                        )}

                    </Tbody>
                </Table>

            </Box>

            {(limit &&
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
                            <Select defaultValue={query?.limit} size="sm" onChange={(e) => onQueryChange({ limit: Number(e.target.value), page: 1 })}>
                                {[5, 10, 20, 50, 100].map((item, index) =>
                                    <option selected={item === limit} key={index} value={item}>{item}</option>
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
                                            bg: getColor(colorKeys.paginationNavigationBgColor, colorMode),
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
                                                    bg: getColor(colorKeys.paginationNavigationBgColor, colorMode),
                                                }}
                                                fontSize="sm"
                                                _current={{
                                                    bg: getColor(colorKeys.primaryButtonFill, colorMode),
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
                                            bg: getColor(colorKeys.paginationNavigationBgColor, colorMode),
                                        }}
                                    >
                                        <Text>Next</Text>
                                    </PaginationNext>
                                </PaginationContainer>
                            </Pagination>
                        </HStack>
                    </Flex>
                )}

        </TableContainer>
    )
}

export default CustomTable


