import React from 'react'
import { FormControl, FormErrorMessage, FormLabel, Textarea } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'

const FormTextarea = ({ id, label, control, placeholder, errors, required, rules, containerProps }) => {
    if (required) {
        required = `${label} is required`
    }
    return (
        <Controller
            control={control}
            name={id}
            rules={{
                required: required,
                ...rules
            }}
            render={({ field: { onChange, onBlur, value, ref, ...rest } }) => (
                <FormControl isInvalid={errors[id]} {...containerProps}>
                    <FormLabel htmlFor={id} mb='0'>
                        {label}
                    </FormLabel>
                    <Textarea
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        ref={ref}
                        placeholder={placeholder}
                        size='sm'
                        borderRadius={"md"}
                        {...rest}
                    />
                    <FormErrorMessage>
                        {errors[id] && errors[id].message}
                    </FormErrorMessage>
                </FormControl>
            )}
        />
    )
}

export default FormTextarea