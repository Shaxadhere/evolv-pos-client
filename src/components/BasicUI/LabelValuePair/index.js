import { Box, Heading, chakra } from '@chakra-ui/react'
import React from 'react'

const LabelValuePair = ({ label, value, colon = true, restricted = true, valueComponent, headingProps }) => {
    if (restricted && !value) return null
    return (
        <Box>
            <Heading size="sm" {...headingProps}>{label}{colon && ':'} </Heading>
            {valueComponent
                ? valueComponent
                : <chakra.p whiteSpace="normal" fontSize="14px">{value}</chakra.p>
            }
        </Box>
    )
}

export default LabelValuePair