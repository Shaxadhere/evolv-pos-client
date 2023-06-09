import React from "react";
import { useForm } from "react-hook-form";
import FormDrawer from "../../../components/Forms/FormDrawer";
import { SimpleGrid } from "@chakra-ui/react";
import FormInput from "../../../components/Forms/FormInput";
import FormSwitch from "../../../components/Forms/FormSwitch";
import { useSelector } from "react-redux";
import FormSearchSelect from "../../../components/Forms/FormSearchSelect";
import {
  useCreateCategory,
  useUpdateCategory,
} from "../../../config/query/categoryQuery";
import FormTextarea from "../../../components/Forms/FormTextarea";
import { useQueryClient } from "@tanstack/react-query";

const CategoryForm = ({ disclosure, data }) => {
  const queryClient = useQueryClient();
  const token = useSelector((state) => state.user.token);

  // const categorysQuery = useCategorys({
  //     pageNo: 1,
  //     pageSize: 20,
  // })

  const createCategoryQuery = useCreateCategory();
  const updateCategoryQuery = useUpdateCategory(data?._id);

  const {
    handleSubmit,
    control,
    setValue,
    reset: resetForm,
    getValues: getFormValues,
    formState: { errors },
  } = useForm();


  const onSubmit = async (values) => {
    const mutate = data?._id
      ? updateCategoryQuery.mutateAsync
      : createCategoryQuery.mutateAsync;

    //   console.log(mutate, data?.id)
    mutate(values)
      .then(() => {
        queryClient.invalidateQueries(["categories"]);
        disclosure.onClose();
        console.log("category Created Successfully");
      })
      .catch((error) => {
        console.log("Error while creating category");
      });
  };
  return (
    <FormDrawer
      title={data ? "Edit Category" : "Add Category"}
      disclosure={disclosure}
      // isSubmitting={createCategoryQuery.isLoading || updateCategoryQuery.isLoading || isUploading}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SimpleGrid columns={{ base: 1, md: 1 }} spacing={5}>
        <FormInput
          label={"Name"}
          control={control}
          errors={errors}
          id="name"
          required={true}
          placeholder="Enter category name"
          rules={{
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
          }}
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1 }} spacing={5} mt={5}>
        <FormTextarea
          mt={5}
          id="description"
          label="Description"
          rules={{
            maxLength: "2000",
          }}
          placeholder={"Select description"}
          required={true}
          errors={errors}
          control={control}
          // options={makeSelectList(chapterOptionsQuery?.data)}
        />

        {/* <FormInput
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
                /> */}
      </SimpleGrid>

      <FormInput type={"hidden"} control={control} id="categoryFile" />
    </FormDrawer>
  );
};

export default CategoryForm;
