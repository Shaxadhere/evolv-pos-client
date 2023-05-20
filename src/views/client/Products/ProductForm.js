import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import FormDrawer from '../../../components/Forms/FormDrawer'
import { InputLeftAddon, SimpleGrid, VStack } from '@chakra-ui/react'
import FormInput from '../../../components/Forms/FormInput'
import FormSwitch from '../../../components/Forms/FormSwitch'
import { useSelector } from 'react-redux'
import FormSearchSelect from '../../../components/Forms/FormSearchSelect'
import { useCategory } from '../../../config/query/categoryQuery'
import { makeSelectList } from '../../../config/helpers/selectListHelper'
import { useCreateProduct } from '../../../config/query/productQuery'

const ProductForm = ({ disclosure, data }) => {

    const token = useSelector((state) => state.user.token)
    const [isUploading, setIsUploading] = useState(false)
    const categoryQuery = useCategory({
        pageNo: 1,
        pageSize: 250,
    })

    const createProductQuery = useCreateProduct()
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
        createProductQuery
            .mutateAsync(values)
            .then(() => {
                console.log("Product Created Successfully")
            })
            .catch((error) => {
                console.log("Error while creating Product")
            })
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

            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={5} mt={5}>

                <FormInput
                    label={"Price Per Unit"}
                    control={control}
                    errors={errors}
                    id="pricePerUnit"
                    required={true}
                    leftAddon={<InputLeftAddon children={'PKR'} />}
                    type={"number"}
                    placeholder={"Enter price per unit"}
                />

                <FormInput
                    label={"Quantity"}
                    control={control}
                    errors={errors}
                    id="quantity"
                    required={true}
                    type={"number"}
                    placeholder={"Enter quantity"}
                />


                <FormSearchSelect
                    id="category"
                    label="Category"
                    placeholder={'Select Category'}
                    required={true}
                    errors={errors}
                    control={control}
                    options={makeSelectList(categoryQuery?.data?.docs)}
                />

            </SimpleGrid>

            <VStack spacing={5} mt={5}>

            </VStack>

            <FormInput
                type={"hidden"}
                control={control}
                id="productFile"
            />

        </FormDrawer>
    )
}

export default ProductForm