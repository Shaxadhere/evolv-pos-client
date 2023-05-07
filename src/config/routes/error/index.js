import { Link, useRouteError } from "react-router-dom";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react"
import ErrorImage from "../../../assets/images/error.png"
import PrimaryButton from "../../../components/BasicUI/Buttons/PrimaryButton";

const ErrorPage = () => {
    const error = useRouteError();
    console.error("Unhandled Error Occurred! ", error);
    return (
        <Flex id="error-page" h="100vh" justify="center" align="center">
            <Box>
                <Image src={ErrorImage} />
            </Box>
            <Box>
                <Heading>Oops!</Heading>
                <Text>Sorry, an unexpected error has occurred.</Text>
                <Text>{error.statusText || error.message}</Text>
                <PrimaryButton mt={5}>
                    <Link to="/">
                        Back To Homepage
                    </Link>
                </PrimaryButton>
            </Box>
        </Flex>
    );
}

export default ErrorPage