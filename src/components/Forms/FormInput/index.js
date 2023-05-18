import { FormControl, chakra, FormErrorMessage, FormLabel, Icon, Input, InputGroup, InputRightElement, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { Controller } from 'react-hook-form'
import APP_ICONS from '../../../config/constants/icons'
import { getColor, colorKeys } from '../../../config/constants/appColors'
import { formatDate, formatDateForInput, formatDateTime } from '../../../config/helpers/dateHelper'

const FormInput = ({ label, placeholder, id, required = false, errors = {}, control, rules, containerStyles, type, leftAddon }) => {
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
      render={({ field: { onChange, onBlur, value, ref, ...rest } }) => {
        switch (type) {
          case "date":
            value = formatDate(value, true)
            break
          case "datetime-local":
            value = formatDateTime(value, true)
            break
          default:
            break
        }
        return (
          <FormControl isInvalid={errors[id]} {...containerStyles}>
            <FormLabel htmlFor={id}>
              {label}
              {required && <chakra.span color={getColor(colorKeys.danger, colorMode)}>*</chakra.span>}
            </FormLabel>
            <InputGroup>
              {leftAddon}
              <Input
                value={type === "date" ? formatDate(value, true).toLocaleString() : value}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                placeholder={placeholder}
                id={id}
                type={type}
                {...rest}
              />
              <InputRightElement display={errors[id] ? "flex" : "none"}>
                <Icon as={APP_ICONS.WARNING} color={getColor(colorKeys.danger, colorMode)} boxSize={5} />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors[id] && errors[id].message}
            </FormErrorMessage>
          </FormControl>
        )
      }}
    />
  )
}

export default FormInput