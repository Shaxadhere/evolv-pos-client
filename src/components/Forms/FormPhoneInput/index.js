import React, { useState } from "react";
import {
    Flex,
    Input,
    Select,
    InputGroup,
    InputLeftElement,
    chakra,
    FormControl,
    FormLabel,
    FormErrorMessage,
    useColorMode
} from "@chakra-ui/react";
import { COUNTRIES } from "./countries";
import { Controller } from "react-hook-form";
import appColors, { getColor, colorKeys } from "../../../config/constants/appColors";

const FormPhoneInput = ({
    size,
    label,
    placeholder,
    id,
    required = false,
    errors = {},
    control,
    rules,
    containerStyles,
    countryCodeValue,
    setCountryCodeValue
}) => {
    const { colorMode } = useColorMode();
    let [countryCode, setCountryCode] = useState(
        countryCodeValue || ""
    );

    const countryOptions = COUNTRIES.map(({ name, iso, prefix }) => ({
        label: name,
        value: prefix
    }));

    const onCountryChange = e => {
        let value = e.target.value;
        // let parsedNumber = new AsYouType().input(`${code}${number}`);
        setCountryCodeValue(value);
        setCountryCode(value);
    };



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
                    <InputGroup size={size} {...rest}>
                        <InputLeftElement pr="30px" left="2px" top="2px" h="90%" borderTopStartRadius={"md"} borderBottomStartRadius={"md"} bg={getColor(colorKeys.lightGray, colorMode)} width="4.5rem" className="phone-input-dropdown">
                            <Select
                                name="countryCode"
                                top="0"
                                left="0"
                                zIndex={1}
                                bottom={0}
                                opacity={0}
                                height="100%"
                                position="absolute"
                                value={countryCode || "+92"}
                                onChange={onCountryChange}
                            >
                                {countryOptions.map(option => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </Select>
                            <Flex pl={3} width="100%" alignItems="center">
                                {countryCode || "+92"}
                            </Flex>
                        </InputLeftElement>
                        <Input
                            ref={ref}
                            pl="5rem"
                            type="tel"
                            value={value}
                            placeholder={placeholder}
                            onChange={onChange}
                            onBlur={onBlur}
                            {...rest}
                        />
                    </InputGroup>
                    <FormErrorMessage>
                        {errors[id] && errors[id].message}
                    </FormErrorMessage>
                </FormControl>
            )}
        />
    );
}

export default FormPhoneInput