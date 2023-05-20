import StatusBadge from '../../../components/BasicUI/Badges/StatusBadge'
import Chronology from '../../../components/BasicUI/DataBoxes/Chronology'
import TableInfoPopover from '../../../components/BasicUI/Popovers/TableInfoPopover'
import LabelValuePair from '../../../components/BasicUI/LabelValuePair'
import { getFilters } from '../../../config/helpers/filterHelper'
import CustomTable from '../../../components/BasicUI/CustomTable'
import { useState } from 'react'
import { formatDateTime } from '../../../config/helpers/dateHelper'
import { useDeleteProduct, useProducts } from '../../../config/query/productQuery'
import APP_ICONS from '../../../config/constants/icons'

const ProductList = ({ onEditModal, onWatchModal }) => {

    const [query, setQuery] = useState({
        page: 1,
        limit: 20,
    })

    const productQuery = useProducts(query)
    const deleteProductQuery = useDeleteProduct()

    const handleDelete = (id) => {
        deleteProductQuery.mutateAsync(id)
            .then((response) => {
                productQuery.refetch()
                console.log(`Product deleted successfully: ${response}`)
            })
            .catch((error) => {
                console.log(`Error while deleting Product: ${error}`)
            })
    }

    // console.log(productQuery?.data?.docs)

    return (
        <CustomTable
            containerProps={{ mt: 5 }}
            searchPlaceholder="Search products"
            // filters={getFilters(lectureFacetQuery?.data)}
            activeFilters={[]}
            head={[
                {
                    title: "Name",
                    extractor: "name",
                    align: "left",
                    isSortable: true,
                    component: (item) => (
                        <TableInfoPopover
                            data={item}
                            onEdit={(item) => onEditModal(item)}
                            onDelete={(id) => handleDelete(id)}
                            triggerOnClick={() => onEditModal(item)}
                        >
                            <LabelValuePair label="Description" value={item.description} />
                            <LabelValuePair label="Created" value={formatDateTime(item.created_at)} />
                            <LabelValuePair label="Last Updated" value={formatDateTime(item.updated_at)} />
                        </TableInfoPopover>
                    )
                },
                { title: "Price Per Unit", extractor: "pricePerUnit" },
                { title: "Quantity", extractor: "quantity" },
                { title: "category", extractor: "categoryName"},
                {
                    title: "photo",
                    extractor: "photo",
                    
                },
                { title: "Actions", extractor: "actions" }
            ]}
            data={productQuery?.data?.docs?.map((item) => {
                return {
                    ...item,
                    categoryName: item?.category?.name,
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
            loading={productQuery?.isLoading}
            totalResults={productQuery?.data?.totalResults}
            totalPages={productQuery?.data?.totalPages}
            pageNo={query.page}
            pageSize={query.limit}
            onQueryChange={(updatedQuery) => setQuery({ ...query, ...updatedQuery })}
            query={query}
            onRefresh={() => productQuery.refetch()}
            isRefreshing={productQuery?.isFetching}
            sortBy={query?.sortBy}
            sortOrder={query?.sortOrder}
        />
    )
}

export default ProductList