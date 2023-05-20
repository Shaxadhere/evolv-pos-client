import StatusBadge from '../../../components/BasicUI/Badges/StatusBadge'
import Chronology from '../../../components/BasicUI/DataBoxes/Chronology'
import TableInfoPopover from '../../../components/BasicUI/Popovers/TableInfoPopover'
import LabelValuePair from '../../../components/BasicUI/LabelValuePair'
import { getFilters } from '../../../config/helpers/filterHelper'
import CustomTable from '../../../components/BasicUI/CustomTable'
import { useState } from 'react'
import { formatDateTime } from '../../../config/helpers/dateHelper'
import APP_ICONS from '../../../config/constants/icons'
import { useCategory, useDeleteCategory } from '../../../config/query/categoryQuery'

const CategoryList = ({ onEditModal, onWatchModal }) => {

    const [query, setQuery] = useState({
        page: 1,
        limit: 20,
    })

    const categoryQuery = useCategory(query)
    // const lectureFacetQuery = useLecturesFacet()
    const deleteCategoryQuery = useDeleteCategory()

    const handleDelete = (id) => {
        deleteCategoryQuery.mutateAsync(id)
            .then((response) => {
                categoryQuery.refetch()
                console.log(`Category deleted successfully: ${response}`)
            })
            .catch((error) => {
                console.log(`Error while deleting Category: ${error}`)
            })
    }

    return (
        <CustomTable
            containerProps={{ mt: 5 }}
            searchPlaceholder="Search categories"
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
                            <LabelValuePair label="Created" value={formatDateTime(item.createdBy?.dateTime)} />
                            <LabelValuePair label="Last Updated" value={formatDateTime(item.updateBy?.dateTime)} />
                        </TableInfoPopover>
                    )
                },
                { title: "Description", extractor: "description"},
                {
                    title: "Last Modified",
                    extractor: "lastModified",
                    component: (item) => <Chronology data={item} />
                },
                { title: "Actions", extractor: "actions" }
            ]}
            data={categoryQuery?.data?.docs?.map((item) => {
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
            loading={categoryQuery?.isLoading}
            totalResults={categoryQuery?.data?.totalResults}
            totalPages={categoryQuery?.data?.totalPages}
            pageNo={query.pageNo}
            pageSize={query.pageSize}
            onQueryChange={(updatedQuery) => setQuery({ ...query, ...updatedQuery })}
            query={query}
            onRefresh={() => categoryQuery.refetch()}
            isRefreshing={categoryQuery?.isFetching}
            sortBy={query?.sortBy}
            sortOrder={query?.sortOrder}
        />
    )
}

export default CategoryList