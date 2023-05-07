import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import FormDrawer from '../../../components/Forms/FormDrawer'
import { SimpleGrid } from '@chakra-ui/react'
import FormInput from '../../../components/Forms/FormInput'
import FormSelect from '../../../components/Forms/FormSelect'
import FormSwitch from '../../../components/Forms/FormSwitch'
import uploadFile from '../../../config/helpers/uploadFile'
import { useSelector } from 'react-redux'
import { ALLOWED_FILE_TYPES } from '../../../config/constants/fileHelper'
import FormSearchSelect from '../../../components/Forms/FormSearchSelect'
import { useCohortOptions } from '../../../config/query/cohortQuery'
import { useChapterOptions } from '../../../config/query/chapterQuery'
import { makeSelectList } from '../../../config/helpers/selectListHelper'
// import { useCreateProduct, useProducts, useUpdateProduct } from '../../../config/query/productQuery'

const ProductForm = ({ disclosure, data }) => {

    const token = useSelector((state) => state.user.token)
    const [isUploading, setIsUploading] = useState(false)

    // const productsQuery = useProducts({
    //     pageNo: 1,
    //     pageSize: 20,
    // })

    // const cohortOptionsQuery = useCohortOptions({})
    // const chapterOptionsQuery = useChapterOptions({})

    // const createProductQuery = useCreateProduct()
    // const updateProductQuery = useUpdateProduct(data?.id)

    const {
        handleSubmit,
        control,
        setValue,
        reset: resetForm,
        getValues: getFormValues,
        formState: { errors },
    } = useForm({
        values: { ...data, status: (data?.id && data?.status === 2) ? false : true },
    })

    const onSubmit = async (values) => {
       
    }
    return (
        <FormDrawer
            title={data ? "Edit Product" : "Add Product"}
            disclosure={disclosure}
            // isSubmitting={createProductQuery.isLoading || updateProductQuery.isLoading || isUploading}
            onSubmit={handleSubmit(onSubmit)}
        >
            <SimpleGrid columns={{ base: 1, md: 1 }} spacing={5}>

                <FormInput
                    label={"Name"}
                    control={control}
                    errors={errors}
                    id="name"
                    required={true}
                    placeholder="Enter product name"
                    rules={{
                        minLength: {
                            value: 3,
                            message: "Name must be at least 3 characters"
                        }
                    }}
                />

            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} mt={5}>

                <FormSearchSelect
                    id="cohortId"
                    label="Cohort"
                    placeholder={'Select Cohort'}
                    required={true}
                    errors={errors}
                    control={control}
                    // options={makeSelectList(cohortOptionsQuery?.data)}
                />

                <FormSearchSelect
                    id="chapterId"
                    label="Chapter"
                    placeholder={'Select Chapter'}
                    required={true}
                    errors={errors}
                    control={control}
                    // options={makeSelectList(chapterOptionsQuery?.data)}
                />

                <FormInput
                    label={"Available Start Date Time"}
                    control={control}
                    errors={errors}
                    id="availableStartDateTime"
                    required={true}
                    type={"datetime-local"}
                />

                <FormInput
                    label={"Available End Date Time"}
                    control={control}
                    errors={errors}
                    id="availableEndDateTime"
                    required={true}
                    type={"datetime-local"}
                />

                <FormSwitch
                    label={"Status"}
                    control={control}
                    errors={errors}
                    id="status"
                />

            </SimpleGrid>

            <FormInput
                type={"hidden"}
                control={control}
                id="productFile"
            />
            
        </FormDrawer>
    )
}

export default ProductForm