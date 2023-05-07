import React from 'react'
import { FormControl, FormErrorMessage, FormLabel, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'

const FormRadio = ({ options, defaultValue, label, errors = {}, id, required = false, control, rules }) => {
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
                    <RadioGroup onChange={onChange} onBlur={onBlur} value={value} defaultValue={defaultValue} ref={ref} {...rest}>
                        <Stack direction='row'>
                            {options && options.map((item, index) =>
                                <Radio
                                    key={index}
                                    value={item.value || item}
                                >
                                    {item.label || item}
                                </Radio>
                            )}
                        </Stack>
                    </RadioGroup>
                    <FormErrorMessage>
                        {errors[id] && errors[id].message}
                    </FormErrorMessage>
                </FormControl>
            )}
        />
    )
}

export default FormRadio