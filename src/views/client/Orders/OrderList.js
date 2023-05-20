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
                { title: "Order Number", extractor: "orderNumber" },
                { title: "Payment Method", extractor: "paymentMethod" },
                { title: "Total", extractor: "total" },
                { title: "Status", extractor: "status", component: (item) => <StatusBadge value={item.status} /> },
                {
                    title: "Products",
                    extractor: "products.length",
                    component: (item) => <Chronology data={item} />
                },
                { title: "Actions", extractor: "actions" }
            ]}
            data={salesQuery?.data?.docs?.map((item) => {
                return {
                    ...item,
                    // categoryName: item?.category?.name,
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
            // loading={lectureQuery?.isLoading}
            // totalResults={lectureQuery?.data?.totalResults}
            // totalPages={lectureQuery?.data?.totalPages}
            pageNo={query.pageNo}
            pageSize={query.pageSize}
            onQueryChange={(updatedQuery) => setQuery({ ...query, ...updatedQuery })}
            query={query}
            // onRefresh={() => lectureQuery.refetch()}
            // isRefreshing={lectureQuery?.isFetching}
            sortBy={query?.sortBy}
            sortOrder={query?.sortOrder}
        />
    )
}

export default OrderList