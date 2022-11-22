import {
  FormErrorMessage,
  Button,
  FormControl,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { useForm } from "react-hook-form";
import _axios from "../utils/_axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const toast = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const postData = async (data) => {
    console.log(data);
    try {
      const res = await _axios.post("/user/register", data);
      if (res.status === 200) {
        toast({
          title: "Registration successful.",
          description: "Welcome to instaclone",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <VStack as="form" w="85%" onSubmit={handleSubmit(postData)}>
      <Text color="#8e8e8e" fontSize="17px">
        Sign up to see photos and videos from your friends.
      </Text>
      <Button
        colorScheme="facebook"
        variant="primary"
        leftIcon={<FaFacebook />}
      >
        Log in with Facebook
      </Button>
      <Text>OR</Text>
      <FormControl isRequired>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          bg="background"
          color="loginFontColor"
          fontSize="16px"
          fontFamily="-apple-system,system-ui"
          lineHeight="18px"
          w="100%"
          marginBottom="10px"
          {...register("email", {
            required: "Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
        />
        {errors.email && <FormErrorMessage>Invalid Email</FormErrorMessage>}
      </FormControl>
      <FormControl isRequired>
        <Input
          id="fullName"
          type="text"
          placeholder="Full Name"
          bg="background"
          color="loginFontColor"
          fontSize="16px"
          fontFamily="-apple-system,system-ui"
          lineHeight="18px"
          w="100%"
          marginBottom="10px"
          {...register("fullName", {
            required: "Required",
          })}
        />
        {errors.fullName && <FormErrorMessage>Required</FormErrorMessage>}
      </FormControl>
      <FormControl isRequired>
        <Input
          id="username"
          type="text"
          placeholder="Username"
          bg="background"
          color="loginFontColor"
          fontSize="16px"
          fontFamily="-apple-system,system-ui"
          lineHeight="18px"
          w="100%"
          marginBottom="10px"
          {...register("username", {
            required: "Required",
          })}
        />
        {errors.username && <FormErrorMessage>Required</FormErrorMessage>}
      </FormControl>
      <FormControl isRequired>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          bg="background"
          color="loginFontColor"
          fontSize="16px"
          fontFamily="-apple-system,system-ui"
          lineHeight="18px"
          w="100%"
          marginBottom="10px"
          {...register("password", {
            required: "Required",
          })}
        />
        {errors.password && <FormErrorMessage>Required</FormErrorMessage>}
      </FormControl>
      <Button type="submit" w="100%" variant="primary">
        Sign up
      </Button>
      <Text
        color="#8e8e8e"
        fontSize="14px"
        paddingTop="20px"
        paddingBottom="20px"
      >
        By signing up, you agree to our <strong>Terms</strong> ,{" "}
        <strong>Data Policy</strong> and <strong>Cookies Policy</strong> .
      </Text>
    </VStack>
  );
}
