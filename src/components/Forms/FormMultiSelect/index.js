import React, { useState } from "react"
import { Select } from "@chakra-ui/react"
import { MultiSelect } from 'chakra-multiselect'

const FormMultiSelect = () => {
    const [value, setValue] = useState([])

    return (
        <Select
            as={MultiSelect}
            options={[{ label: 'Option 1', value: 'option1' }, { label: 'Option 2', value: 'option2' }]}
            value={value}
            placeholder='Select option'
            onChange={setValue}>

        </Select>
    )
}

export default FormMultiSelect