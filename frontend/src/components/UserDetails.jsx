import { Box, Flex, Image, Center } from "@chakra-ui/react";
import { React } from "react";

/* eslint-disable react/prop-types*/
const UserDetails = ({ username }) => {
  return (
    <Flex w="100%" h="75px" align="center">
      <Flex w="25%" h="100%">
        <Image
          src="https://picsum.photos/200/200"
          objectFit="cover"
          h="75px"
          borderRadius="50%"
          padding="10px 10px"
        />
        <Center
          align="center"
          h="70px"
          direction="column"
          w="auto"
          fontSize="1rem"
          marginLeft="20px"
        >
          <Box>
            <strong>{username}</strong>
          </Box>
        </Center>
      </Flex>
    </Flex>
  );
};
export default UserDetails;
