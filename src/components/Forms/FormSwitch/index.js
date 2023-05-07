import React from 'react'
import { FormControl, FormErrorMessage, FormLabel, Switch } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'

const FormSwitch = ({ control, label, id, required, rules, errors }) => {
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
            render={({ field: { onChange, onBlur, value, ref, ...rest } }) => {
                return (
                    <FormControl isInvalid={errors[id]}>
                        <FormLabel htmlFor={id} mb='0'>
                            {label}
                        </FormLabel>
                        <Switch
                            id={id}
                            onChange={onChange}
                            defaultValue={value}
                            onBlur={onBlur}
                            value={value}
                            isChecked={value}
                            ref={ref}
                            {...rest}
                        />
                        <FormErrorMessage>
                            {errors[id] && errors[id].message}
                        </FormErrorMessage>
                    </FormControl>
                )
            }}
        />
    )
}

export default FormSwitch