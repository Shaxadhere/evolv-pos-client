import StatusBadge from '../../../components/BasicUI/Badges/StatusBadge'
import Chronology from '../../../components/BasicUI/DataBoxes/Chronology'
import TableInfoPopover from '../../../components/BasicUI/Popovers/TableInfoPopover'
import LabelValuePair from '../../../components/BasicUI/LabelValuePair'
import { getFilters } from '../../../config/helpers/filterHelper'
import CustomTable from '../../../components/BasicUI/CustomTable'
import { useState } from 'react'
import { formatDateTime } from '../../../config/helpers/dateHelper'
import { useSales } from '../../../config/query/saleQuery'
import APP_ICONS from '../../../config/constants/icons'

const OrderList = ({ onEditModal, onWatchModal }) => {

    const [query, setQuery] = useState({
        page: 1,
        limit: 20,
    })

    const salesQuery = useSales(query)
    // const lectureFacetQuery = useLecturesFacet()
    // const deleteLectureQuery = useDeleteLecture()

    const handleDelete = (id) => {
        // deleteLectureQuery.mutateAsync(id)
        //     .then((response) => {
        //         lectureQuery.refetch()
        //         console.log(`Lecture deleted successfully: ${response}`)
        //     })
        //     .catch((error) => {
        //         console.log(`Error while deleting Lecture: ${error}`)
        //     })
    }

    return (
        <CustomTable
            containerProps={{ mt: 5 }}
            searchPlaceholder="Search orders"
            // filters={getFilters(lectureFacetQuery?.data)}
            activeFilters={[]}
            head={[
                {
                    title: "Order Number",
                    extractor: "orderNumber",
                    align: "left",
                    isSortable: true,
                    component: (item) => (
                        <TableInfoPopover
                            data={item}
                            triggerText={item.orderNumber}
                            onEdit={(item) => onEditModal(item)}
                            onDelete={(id) => handleDelete(id)}
                            triggerOnClick={() => onEditModal(item)}
                        >
                            <LabelValuePair label="Description" value={item.description} />
                            <LabelValuePair label="Created" value={formatDateTime(item.createdBy?.dateTime)} />
                            <LabelValuePair label="Last Updated" value={formatDateTime(item.updateBy?.dateTime)} />
                        </TableInfoPopover>
                    )
                },
                { title: "Payment Method", extractor: "paymentMethod" },
                { title: "Total", extractor: "total" },
                {
                    title: "No. of Items",
                    extractor: "productsLength",
                },
            ]}
            data={salesQuery?.data?.docs?.map((item) => {
                return {
                    ...item,
                    productsLength: item?.products?.length,
                    actions: [
                        {
                            title: "Edit",
                            action: () => onEditModal(item),
                            icon: APP_ICONS.EDIT,
                            isEdit: true
                        },
                        {
                            title: "Delete",
                            action: handleDelete,
                            icon: APP_ICONS.BIN,
                            isDelete: true
                        }
                    ]
                }
            })}
            loading={salesQuery?.isLoading}
            totalResults={salesQuery?.data?.totalResults}
            totalPages={salesQuery?.data?.totalPages}
            pageNo={query.page}
            pageSize={query.limit}
            onQueryChange={(updatedQuery) => setQuery({ ...query, ...updatedQuery })}
            query={query}
            onRefresh={() => salesQuery.refetch()}
            isRefreshing={salesQuery?.isFetching}
            sortBy={query?.sortBy}
            sortOrder={query?.sortOrder}
        />
    )
}

export default OrderList