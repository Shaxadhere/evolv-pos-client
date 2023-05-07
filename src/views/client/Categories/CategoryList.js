import StatusBadge from '../../../components/BasicUI/Badges/StatusBadge'
import Chronology from '../../../components/BasicUI/DataBoxes/Chronology'
import TableInfoPopover from '../../../components/BasicUI/Popovers/TableInfoPopover'
import LabelValuePair from '../../../components/BasicUI/LabelValuePair'
import { getFilters } from '../../../config/helpers/filterHelper'
import CustomTable from '../../../components/BasicUI/CustomTable'
import { useState } from 'react'
import { formatDateTime } from '../../../config/helpers/dateHelper'

const CategoryList = ({ onEditModal, onWatchModal }) => {

    const [query, setQuery] = useState({
        pageNo: 1,
        pageSize: 20,
    })

    // const lectureQuery = useLectures(query)
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
                            <LabelValuePair label="Chapter" value={item.chapterName} />
                            <LabelValuePair label="Cohort" value={item.cohortName} />
                            <LabelValuePair label="Course" value={item.courseName} />
                            <LabelValuePair label="Qualification" value={item.qualificationName} />
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
                { title: "Available From", extractor: "availableStartDateTimeValue" },
                { title: "Available Till", extractor: "availableEndDateTimeValue" },
                { title: "Status", extractor: "status", component: (item) => <StatusBadge value={item.status} /> },
                {
                    title: "Last Modified",
                    extractor: "lastModified",
                    component: (item) => <Chronology data={item} />
                },
                { title: "Actions", extractor: "actions" }
            ]}
            data={[]}
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

export default CategoryList