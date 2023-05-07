import React from 'react'
import AsyncSelect from 'react-select/async';
import { Controller } from 'react-hook-form'
import { getColor, colorKeys } from '../../../config/constants/appColors'
import { FormControl, FormLabel, useColorMode, chakra, FormErrorMessage } from '@chakra-ui/react';

const FormAsyncSelect = ({ label, placeholder, errors, id, control, required = false, rules, multiple, containerStyles, searchFunction }) => {
    const { colorMode } = useColorMode()
    if (required) {
        required = `${label} is required`
    }
    let timeOut;
    const promiseOptions = (inputValue) =>
        new Promise((resolve) => {
            if (timeOut) { clearTimeout(timeOut) }
            timeOut = setTimeout(async () => {
                const results = await searchFunction(inputValue)
                resolve(results);
            }, 1000);
        });
    return (
        <Controller
            control={control}
            name={id}
            rules={{
                required: required,
                ...rules
            }}
            render={({ field: { onChange, onBlur, value, ref, ...rest } }) => (
                <FormControl isInvalid={errors[id]} {...containerStyles}>
                    <FormLabel htmlFor={id}>
                        {label}
                        {required && <chakra.span color={getColor(colorKeys.danger, colorMode)}>*</chakra.span>}
                    </FormLabel>
                    <AsyncSelect
                        cacheOptions
                        defaultOptions={true}
                        loadOptions={promiseOptions}
                        isMulti={multiple}
                        onChange={onChange}
                        value={value}
                        ref={ref}
                        placeholder={placeholder}
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

export default FormAsyncSelect