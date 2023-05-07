import React from 'react'
import TableInfoPopover from '../Popovers/TableInfoPopover'
import LabelValuePair from '../LabelValuePair'
import { Avatar, Flex, HStack, chakra, useColorMode } from '@chakra-ui/react'
import { formatDateTime } from '../../../config/helpers/dateHelper'
import { colorKeys, getColor } from '../../../config/constants/appColors'

const Chronology = ({ data }) => {
    const { colorMode } = useColorMode()
    return (
        <TableInfoPopover
            data={data}
            triggerText={data.lastModified}
            title={"Chronology"}
            triggerAction='hover'
            triggerProps={{ m: "auto" }}
        >
            <LabelValuePair
                label="Updated by"
                headingProps={{
                    fontSize: "12px",
                    color: "#888"
                }}
                value={data.updatedBy?.dateTime}
                valueComponent={
                    <HStack>
                        <Flex>
                            <Avatar size="sm" name={data.updatedBy?.name} src={data.updatedBy?.profilePicture} />
                        </Flex>
                        <chakra.p whiteSpace={"normal"} fontSize="14px">
                            <chakra.p fontWeight="bold">{data.updatedBy?.name}</chakra.p><chakra.p fontWeight="normal">{formatDateTime(data.updatedBy?.dateTime)}</chakra.p>
                        </chakra.p>
                    </HStack>
                }
            />

            <LabelValuePair
                label="Created by"
                headingProps={{
                    fontSize: "12px",
                    color: getColor(colorKeys.gray, colorMode)
                }}
                value={data.createdBy?.dateTime}
                valueComponent={
                    <HStack>
                        <Flex>
                            <Avatar size="sm" name={data.createdBy?.name} src={data.createdBy?.profilePicture} />
                        </Flex>
                        <chakra.p whiteSpace={"normal"} fontSize="14px">
                            <chakra.p fontWeight="bold">{data.createdBy?.name}</chakra.p><chakra.p fontWeight="normal">{formatDateTime(data.createdBy?.dateTime)}</chakra.p>
                        </chakra.p>
                    </HStack>
                }
            />
        </TableInfoPopover>
    )
}

export default Chronology