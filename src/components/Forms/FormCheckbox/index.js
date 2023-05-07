import React from 'react'
import { Checkbox, CheckboxGroup, FormControl, FormErrorMessage, FormLabel, Stack } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'

const FormCheckbox = ({ options, defaultChecked, label, errors = {}, id, required = false, control, rules }) => {
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
                <FormControl
                    isInvalid={errors[id]}
                >
                    <FormLabel htmlFor={id}>{label}</FormLabel>
                    <CheckboxGroup
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        defaultValue={defaultChecked}
                        ref={ref}
                        {...rest}
                    >
                        <Stack spacing={[1, 5]} direction={['column', 'row']}>
                            {options?.map((item, index) =>
                                <Checkbox key={index} value={item.value || item}>{item.label || item}</Checkbox>
                            )}
                        </Stack>
                    </CheckboxGroup>
                    <FormErrorMessage>
                        {errors[id] && errors[id].message}
                    </FormErrorMessage>
                </FormControl>
            )}
        />
    )
}

export default FormCheckbox