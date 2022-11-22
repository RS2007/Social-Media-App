import { React } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  VStack,
} from "@chakra-ui/react";
import { getUser } from "../utils/authUtils";
const CurrentUserCard = () => {
  console.log(getUser());
  return (
    <Grid
      h="56px"
      templateColumns="2fr 4fr 2fr"
      w="100%"
      padding="0px 10px"
      display={{ base: "none", md: "grid" }}
    >
      <GridItem>
        <Image
          src="https://picsum.photos/200"
          w="auto"
          borderRadius="50%"
          h="56px"
        />
      </GridItem>
      <Flex align="center" justify="center">
        <VStack spacing="0px">
          <Box>
            <strong>{getUser().username}</strong>
          </Box>
          <Box color="#8e8e8e">{getUser().fullName}</Box>
        </VStack>
      </Flex>
      <Flex align="center" justify="center" h="100%">
        <Button
          colorScheme="white"
          color="active"
          variant="tranparent"
          style={{ padding: "10px" }}
        >
          Follow
        </Button>
      </Flex>
    </Grid>
  );
};

export default CurrentUserCard;
