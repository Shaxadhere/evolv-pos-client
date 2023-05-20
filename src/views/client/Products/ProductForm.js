import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormDrawer from "../../../components/Forms/FormDrawer";
import { Box, InputLeftAddon, SimpleGrid, VStack } from "@chakra-ui/react";
import FormInput from "../../../components/Forms/FormInput";
import FormSwitch from "../../../components/Forms/FormSwitch";
import { useSelector } from "react-redux";
import FormSearchSelect from "../../../components/Forms/FormSearchSelect";
import { useCategory } from "../../../config/query/categoryQuery";
import { makeSelectList } from "../../../config/helpers/selectListHelper";
import { useCreateProduct, useUpdateProduct } from "../../../config/query/productQuery";
import FormTextarea from "../../../components/Forms/FormTextarea";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

const ProductForm = ({ disclosure, data }) => {
    const queryClient = useQueryClient()
  const token = useSelector((state) => state.user.token);
  const [isUploading, setIsUploading] = useState(false);
  const categoryQuery = useCategory({
    pageNo: 1,
    pageSize: 250,
  });

  // const createProductQuery = useCreateProduct()
  // const productsQuery = useProducts({
  //     pageNo: 1,
  //     pageSize: 20,
  // })

  // const cohortOptionsQuery = useCohortOptions({})
  // const chapterOptionsQuery = useChapterOptions({})

  const createProductQuery = useCreateProduct();
  const updateProductQuery = useUpdateProduct(data?._id)

//   console.log(data)

  const {
    handleSubmit,
    control,
    setValue,
    reset: resetForm,
    getValues: getFormValues,
    formState: { errors },
  } = useForm({
    values: { 
        ...data,
        category : data?.category?._id , 
    },
  });

  const onSubmit = async (values) => {
    const mutate = data?._id ? updateProductQuery.mutateAsync : createProductQuery.mutateAsync
    mutate(values)
      .then(() => {
        queryClient.invalidateQueries(["products"])
        disclosure.onClose();
        console.log("Product Created Successfully");
      })
      .catch((error) => {
        console.log("Error while creating Product");
      });
  };
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
              message: "Name must be at least 3 characters",
            },
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
          leftAddon={<InputLeftAddon children={"PKR"} />}
          type={"number"}
          placeholder={"Enter price per unit"}
        />

        <FormInput
          label={"Quantity"}
          control={control}
          errors={errors}
          id="quantity"
          required={false}
          type={"number"}
          placeholder={"Enter quantity"}
        />

        <FormSearchSelect
          id="category"
          label="Category"
          placeholder={"Select Category"}
          required={true}
          errors={errors}
          control={control}
          options={makeSelectList(categoryQuery?.data?.docs)}
        />

        <FormInput
          label={"Photo"}
          control={control}
          errors={errors}
          id="photo"
          required={true}
          placeholder={"Add Photo"}
        />
      </SimpleGrid>
      <Box mt={5}>
        <FormTextarea
          label={"Description"}
          control={control}
          rules={{
            maxLength: "2000",
          }}
          errors={errors}
          id="description"
          required={false}
          placeholder={"Enter Description"}
        />
      </Box>

      <FormInput type={"hidden"} control={control} id="productFile" />
    </FormDrawer>
  );
};

export default ProductForm;
