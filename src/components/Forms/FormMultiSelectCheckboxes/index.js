import React from "react"
import { components } from "react-select";
import { default as ReactSelect } from "react-select";
import { chakra, Box, useColorMode, Flex } from "@chakra-ui/react"
import { getColor, colorKeys } from "../../../config/constants/appColors";




const FormMultiSelectCheckboxes = ({ options, placeholder, style, containerStyles, onChange, value }) => {
    const { colorMode } = useColorMode()
    const ValueContainer = props => {
        let length = props.getValue().length;
        return (
            <components.ValueContainer {...props}>
                {length === 0 && (<chakra.p pl="2" pos="absolute" fontSize={14} color="#6f6f6f">{placeholder}</chakra.p>)}
                <chakra.p fontSize={14} m="4px 2px">
                    <chakra.span fontWeight="bold">
                        {placeholder}:
                    </chakra.span>
                    {` ${length} selected `}
                </chakra.p>
                {React.cloneElement(props.children[1])}
            </components.ValueContainer>
        );
    };


    const Option = (props) => {
        return (
            <div>
                <components.Option {...props}>
                    <Flex align={"center"}>
                        <chakra.input
                            className="custom-checkbox"
                            type="checkbox"
                            checked={props.isSelected}
                            onChange={() => null}
                        />
                        <chakra.label fontSize={"13px"} ml={1} style={{ color: getColor(colorKeys.gray, colorMode) }}>{props.label}</chakra.label>
                    </Flex>
                </components.Option>
            </div>
        );
    };

    return (
        <Box {...containerStyles}>
            <ReactSelect
                className="form-multi-select-checkboxes"
                classNamePrefix={"form-multi-select-checkboxes"}
                placeholder={placeholder}
                style={{ width: '100%', minWidth: 200, borderColor: getColor(colorKeys.tableFilterBorder, colorMode), ...style }}
                styles={{
                    control: (baseStyles) => ({
                        ...baseStyles,
                        boxShadow: "none",
                        borderRadius: 0,
                        borderColor: getColor(colorKeys.tableFilterBorder, colorMode),
                    }),
                }}
                theme={(theme) => {
                    return ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                            ...theme.colors,
                            neutral0: getColor(colorKeys.layoutBoxBackground, colorMode),
                        },
                    })
                }}
                options={options}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                defaultValue={value}
                value={value}
                components={{
                    Option,
                    ValueContainer
                }}
                onChange={onChange}
                allowSelectAll={true}
            />
        </Box>
    )

}
export default FormMultiSelectCheckboxes