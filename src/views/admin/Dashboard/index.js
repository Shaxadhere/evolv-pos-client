import { Badge, Box, Button, Card, CardBody, CardHeader, useColorMode, chakra, Flex, Heading, Icon, Image, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import CardOwlImage from "../../../assets/images/knowly-pointing--left.svg"
import APP_ICONS from '../../../config/constants/icons'
import { getColor, colorKeys } from '../../../config/constants/appColors'
import { Link } from 'react-router-dom'
import ExamsImage from "../../../assets/images/knowly--clipboard.svg"
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const { user } = useSelector((state) => state.user)
  const { colorMode } = useColorMode()
  return (
    <Box p="3rem 0">
      <Box maxW={"1110px"} m="0 auto">

        {/* warning card */}
        <Card boxShadow={"0 10px 20px rgb(51 51 51 / 18%), 0 6px 6px rgb(51 51 51 / 14%)"} borderRadius="3px" bg={getColor(colorKeys.white, colorMode)} mb={"20px"}>
          <CardBody p="2rem" borderRadius={"3px 3px 0 0"}>
            <Flex align={"center"}>
              <Icon as={APP_ICONS.WARNING} color={getColor(colorKeys.secondaryText, colorMode)} boxSize={5} />
              <Text ml={2} color={getColor(colorKeys.secondaryText, colorMode)}>You are on the <chakra.span fontWeight={"bold"}>Business Owl</chakra.span> <Badge p="4px 10px" rounded="full" bg="#f3decf" color="#683e1c" fontWeight={"normal"} >Trial Subscription</Badge> <chakra.span fontWeight={"bold"}>4 days remaining</chakra.span></Text>
              <Button bg={getColor(colorKeys.primaryButtonFill, colorMode)} color="white" fontSize={"14px"} rounded="full" ml={4}>
                Purchase Subscription
              </Button>
            </Flex>
          </CardBody>
          <Image pos={"absolute"} right="0" top="20px" src={CardOwlImage} w="150px" />
        </Card>
        {/* warning card */}

        <Box>
          <Heading color={getColor(colorKeys.primaryText, colorMode)} fontSize="26px" fontWeight={"900"} lineHeight="1.4">Hi {user?.name}</Heading>
          <Text fontSize="15px" color={getColor(colorKeys.secondaryText, colorMode)}>Not sure what to choose? Read about the <chakra.span color={getColor(colorKeys.highlightedText, colorMode)}>options for creating learning content.</chakra.span></Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} mt={5} spacingX={10} spacingY={10}>

          {new Array(6).fill(null).map((item, index) =>
            <Card borderRadius={"3px"} key={index}>
              <CardHeader h="87px" overflow={"hidden"} bg={getColor(colorKeys.whiteSmoke, colorMode)} p="15px 30px">
                <Flex justifyContent={"space-between"}>
                  <Box>
                    <Heading fontSize={"22px"}>Exams</Heading>
                    <Button fontSize={"15px"} color={getColor(colorKeys.primaryButtonFill, colorMode)} as={Link} variant="link" rightIcon={<Icon as={APP_ICONS.RightChevron} />}>View all</Button>
                  </Box>
                  <Image w="33%" maxW="115px" src={ExamsImage} />
                </Flex>
              </CardHeader>
              <CardBody p="30px" bg={getColor(colorKeys.white, colorMode)}>
                <Text m="0 0 15px" fontSize={"15px"}>Create a more serious knowledge test with a pass or fail mark and even generate certificates automatically.</Text>
              </CardBody>
            </Card>
          )}

        </SimpleGrid>

      </Box>
    </Box>
  )
}

export default Dashboard