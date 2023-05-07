import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Controller } from 'react-hook-form'
import { Box, CloseButton, Flex, FormControl, FormErrorMessage, FormLabel, Image, Input, VStack, chakra, useColorMode } from '@chakra-ui/react'
import { colorKeys, getColor } from '../../../config/constants/appColors'

const FormDropzone = ({
    multiple,
    control,
    id,
    rules,
    required = false,
    errors = {},
    placeholder,
    containerProps,
    label,
    onFileChange,
    onRemoveFile
}) => {

    const onDrop = useCallback(acceptedFiles => {
        onFileChange(id, acceptedFiles)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple })
    const { colorMode } = useColorMode()

    if (required) {
        required = `${label} is required`
    }


    return (
        <Controller
            render={({ field: { onChange, onBlur, value, ref, ...rest } }) => (
                <FormControl isInvalid={errors[id]} {...containerProps}>
                    <FormLabel htmlFor={id}>
                        {label}
                        {required && <chakra.span color={getColor(colorKeys.danger, colorMode)}>*</chakra.span>}
                    </FormLabel>
                    <Box
                        border={`1px dashed ${isDragActive
                            ? getColor(colorKeys.primary, colorMode)
                            : getColor(colorKeys.tableFilterBorder, colorMode)}`}
                        padding="25px"
                    >
                        <Box

                            display="flex"
                            flexDir={"column"}
                            justifyContent="center"
                            cursor={"pointer"}
                            {...getRootProps()}
                        >
                            <Input
                                multiple={multiple}
                                onBlur={onBlur}
                                ref={ref}
                                id={id}
                                {...getInputProps()}
                                {...rest}
                            />
                            {
                                isDragActive
                                    ? <Box textAlign={"center"}>
                                        <p>Drop the files here ...</p>
                                        <chakra.p color={getColor(colorKeys.gray, colorMode)}>{placeholder}</chakra.p>
                                    </Box>
                                    : <Box textAlign={"center"}>
                                        <p>{"Drag and drop file here or click to upload"}</p>
                                        <chakra.p color={getColor(colorKeys.gray, colorMode)}>{placeholder}</chakra.p>
                                    </Box>
                            }
                        </Box>
                        {value && value.length > 0 &&
                            <Box mt={3}>
                                <VStack alignItems="start">
                                    {value.map((file, index) =>
                                        <Flex
                                            p="4px 10px"
                                            borderRadius="2px"
                                            rounded="md"
                                            align="center"
                                            justifyContent={"space-between"}
                                            w="full"
                                            bg={getColor(colorKeys.lightGrayBackgroundFill, colorMode)}
                                        >
                                            <chakra.p textDecor={"underline"}>{file?.name}</chakra.p>
                                            <Box>
                                                {onRemoveFile && (
                                                    <CloseButton size="sm" onClick={() => onRemoveFile(id, file, index)} />
                                                )}
                                            </Box>
                                        </Flex>
                                    )}
                                </VStack>
                            </Box>}
                    </Box>

                    <FormErrorMessage>
                        {errors[id] && errors[id].message}
                    </FormErrorMessage>
                </FormControl>
            )}
            control={control}
            name={id}
            rules={{
                required: required,
                ...rules
            }}
        />
    )
}


// const FormDropzone = ({
//     multiple,
//     control,
//     id,
//     rules,
//     required = false,
//     errors = {},
//     placeholder,
//     containerProps,
//     label,
//     onFileChange,
//     allowedExtensions = ALLOWED_FILE_TYPES.IMAGE,
//     maxFileSize = 3000000
// }) => {
//     const { colorMode } = useColorMode()

//     const onDrop = useCallback(acceptedFiles => {
//         console.log(acceptedFiles, 'acceptedFiles')
//         onFileChange(id, acceptedFiles)
//     }, [])

//     function onUploadSuccess(args) {
//         if (args.operation === 'upload') {
//             window.console.log('File uploaded successfully');
//         }
//     }
//     function onUploadFailure(args) {
//         window.console.log('File failed to upload');
//     }

//     if (required) {
//         required = `${label} is required`
//     }
//     return (
//         <Controller
//             render={({ field: { onChange, onBlur, value, ref, ...rest } }) => (
//                 <FormControl isInvalid={errors[id]} {...containerProps}>
//                     <FormLabel htmlFor={id}>
//                         {label}
//                         {required && <chakra.span color={getColor(colorKeys.danger, colorMode)}>*</chakra.span>}
//                     </FormLabel>
//                     <UploaderComponent
//                         className='dropzone'
//                         id={id}
//                         multiple={multiple}
//                         allowedExtensions={allowedExtensions.join(',')}
//                         onChange={() => console.log("changed")}
//                         change={() => console.log("change called")}
//                         autoUpload={true}
//                         onBlur={onBlur}
//                         // selected={value}
//                         showFileList={true}
//                         ref={ref}
//                         enableHtmlSanitizer={true}
//                         // files={value}
//                         maxFileSize={maxFileSize}
//                         // success={onUploadSuccess}
//                         // failure={onUploadFailure}
//                         beforeUpload={(args) => {
//                             console.log(args, 'beforeUpload')
//                             // args.cancel = true;
//                         }}
//                         name={id}
//                         {...rest}
//                     />
//                     <FormErrorMessage>
//                         {errors[id] && errors[id].message}
//                     </FormErrorMessage>
//                 </FormControl>
//             )}
//             control={control}
//             name={id}
//             rules={{
//                 required: required,
//                 ...rules
//             }}
//         />
//     )
// }

export default FormDropzone

