import React from 'react'
import { Select as ReactSelect } from 'chakra-react-select'
import { FormControl, FormErrorMessage, FormLabel, Select, chakra, useColorMode } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'
import { getColor, colorKeys } from '../../../config/constants/appColors'

const FormSelect = ({ label, placeholder, options = [], errors, id, control, required = false, rules, multiple, containerStyles }) => {
    const { colorMode } = useColorMode()
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
                <FormControl isInvalid={errors[id]} {...containerStyles}>
                    <FormLabel htmlFor={id}>
                        {label}
                        {required && <chakra.span color={getColor(colorKeys.danger, colorMode)}>*</chakra.span>}
                    </FormLabel>
                    <Select
                        isMulti={multiple}
                        multiple={multiple}
                        onChange={onChange}
                        value={value}
                        ref={ref}
                        placeholder={placeholder}
                        {...rest}
                    >
                        {options.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Select>
                    <FormErrorMessage>
                        {errors[id] && errors[id].message}
                    </FormErrorMessage>
                </FormControl>
            )}
        />
    )
}

export default FormSelect