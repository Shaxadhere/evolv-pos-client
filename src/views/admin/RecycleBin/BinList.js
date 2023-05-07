import React, { useState } from 'react'
import { Badge } from '@chakra-ui/react'
import CustomTable from '../../../components/BasicUI/CustomTable'
import { useDeleteItemsFacet, useDeletedItems, useRestoreDeletedItem } from '../../../config/query/deletedItemQuery'
import { formatDateTime, formatDateTimeFromNow } from '../../../config/helpers/dateHelper'
import APP_ICONS from '../../../config/constants/icons'
import StatusBadge from '../../../components/BasicUI/Badges/StatusBadge'
import { getFilters } from '../../../config/helpers/filterHelper'
import LabelValuePair from '../../../components/BasicUI/LabelValuePair'
import TableInfoPopover from '../../../components/BasicUI/Popovers/TableInfoPopover'

const BinList = () => {

    const [query, setQuery] = useState({
        pageNo: 1,
        pageSize: 20,
    })

    const deletedItemsQuery = useDeletedItems(query)
    const deleteItemsFacetQuery = useDeleteItemsFacet()
    // const deleteDeletedItemQuery = useDeleteDeletedItem()
    const restoreDeleteItemQuery = useRestoreDeletedItem()

    const handleDelete = (id) => {
        // deleteDeletedItemQuery.mutateAsync(id)
        //     .then((response) => {
        //         deletedItemsQuery.refetch()
        //         console.log(`Deleted item deleted successfully: ${response}`)
        //     })
        //     .catch((error) => {
        //         console.log(`Error while deleting deltetd item: ${error}`)
        //     })
    }


    const handleRestore = (id) => {
        restoreDeleteItemQuery.mutateAsync(id)
            .then((response) => {
                deletedItemsQuery.refetch()
                console.log(`Deleted item restored successfully: ${response}`)
            })
            .catch((error) => {
                console.log(`Error while restoring deleted item: ${error}`)
            })
    }

    return (
        <CustomTable
            containerProps={{ mt: 5 }}
            searchPlaceholder="Search deleted items"
            filters={getFilters(deleteItemsFacetQuery?.data)}
            activeFilters={[]}
            head={[
                {
                    title: "Name",
                    extractor: "name",
                    align: "left",
                    component: (item) => (
                        <TableInfoPopover
                            data={item}
                        >
                            <LabelValuePair
                                label="Status"
                                value={true}
                                valueComponent={
                                    <StatusBadge value={item.status} />
                                }
                            />
                            <LabelValuePair label="Created" value={formatDateTime(item.createdBy?.dateTime)} />
                            <LabelValuePair label="Last Updated" value={formatDateTime(item.updateBy?.dateTime)} />
                        </TableInfoPopover>
                    )
                },
                { title: "Status", extractor: "status", component: (item) => <StatusBadge value={item.status} /> },
                { title: "Deleted From Now", extractor: "deletedOn" },
                { title: "Actions", extractor: "actions" }
            ]}
            data={deletedItemsQuery?.data?.results?.map((item) => {
                return {
                    ...item,
                    deletedOn: formatDateTimeFromNow(item.itemDeletedOn),
                    actions: [
                        {
                            title: "Restore",
                            action: handleRestore,
                            icon: APP_ICONS.CHECK,
                            isRestore: true
                        },
                        {
                            title: "Permanently Delete",
                            action: handleDelete,
                            icon: APP_ICONS.BIN,
                            isDelete: true
                        }
                    ]
                }
            })}
            loading={deletedItemsQuery?.isLoading}
            totalPages={deletedItemsQuery?.data?.totalPages}
            totalResults={deletedItemsQuery?.data?.totalResults}
            pageNo={query.pageNo}
            pageSize={query.pageSize}
            onQueryChange={(updatedQuery) => setQuery({ ...query, ...updatedQuery })}
            query={query}
            onRefresh={() => deletedItemsQuery.refetch()}
            isRefreshing={deletedItemsQuery?.isFetching}
        />
    )
}

export default BinList