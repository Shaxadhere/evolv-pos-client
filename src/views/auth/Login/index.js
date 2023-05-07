import { Card, CardBody, chakra, CardHeader, Flex, Button, Box, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { getColor, colorKeys } from "../../../config/constants/appColors"
import PrimaryButton from '../../../components/BasicUI/Buttons/PrimaryButton'
import FormInput from "../../../components/Forms/FormInput"
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { addUser } from '../../../config/redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import { useLogin } from '../../../config/query/authQuery'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { colorMode } = useColorMode()

    const loginQuery = useLogin()

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm()

    function onSubmit(values) {
        // loginQuery.mutateAsync(values)
        //     .then((response) => {
        //         console.log(response, "response")
        //         dispatch(addUser(response))
        //         navigate("/admin")
        //     })
        //     .catch((error) => {
        //         console.log(error, "error")
        //     })
        dispatch(addUser({
            user: {
                name: "Admin",
                email: "admin@mail.com",
            },
            token: "token"
        }))
    }

    return (
        <Flex height={"calc(100vh - 60px)"} justify="center" align="center" bg={getColor(colorKeys.lightBackgroundFill, colorMode)}>
            <Box>
                <Card minW="460px" my="4rem">
                    <CardHeader
                        border={`1px solid ${getColor(colorKeys.lightGrayBackgroundFill, colorMode)}`}
                        bg={getColor(colorKeys.lightGrayBackgroundFill, colorMode)}
                        color={getColor(colorKeys.primaryText, colorMode)}
                        fontSize={"22px"}
                        fontWeight="bold"
                        p="13px 30px"
                    >
                        Log in
                    </CardHeader>
                    <CardBody bg={getColor(colorKeys.layoutBoxBackground, colorMode)}>
                        <chakra.form onSubmit={handleSubmit(onSubmit)}>

                            <FormInput
                                id={"email"}
                                label="Email"
                                placeholder="someone@example.com"
                                required={true}
                                errors={errors}
                                control={control}
                                rules={{
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "invalid email address"
                                    }
                                }}
                            />

                            <FormInput
                                id={"password"}
                                type="password"
                                label="Password"
                                placeholder="********"
                                required={true}
                                errors={errors}
                                control={control}
                                containerStyles={{ mt: 5 }}
                            />

                            <Link to="/forgot-password">
                                <Box textAlign={"right"} mt={5} color={getColor(colorKeys.primaryButtonFill, colorMode)} fontSize={"15px"} >Forgot password?</Box>
                            </Link>

                            <PrimaryButton
                                isLoading={loginQuery.isLoading} mt={5} type="submit" p="18px 33px"
                                bg={getColor(colorKeys.primaryButtonFill, colorMode)}
                                w="full" h="50px" rounded="full" fontWeight={"bold"} color="white"
                            >
                                Login
                            </PrimaryButton>


                        </chakra.form>
                    </CardBody>
                </Card>


                <Box fontSize="15px" color={getColor(colorKeys.primaryText, colorMode)} textAlign="center">
                    <Text>Haven't registerd yet?</Text>

                    <Flex textAlign={"center"} justify="center">

                        <Link to="/register">
                            <Button variant="link" type="button" color={getColor(colorKeys.primaryButtonFill, colorMode)}>
                                Create an account
                            </Button>
                        </Link>
                        <Text ml={1}> and spread your wigs</Text>
                    </Flex>
                </Box>

            </Box>


        </Flex>
    )
}

export default Login