import { React, useState } from "react";
import {
  Input,
  Icon,
  InputGroup,
  InputLeftElement,
  VStack,
  Image,
  Flex,
  Button,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import _axios from "../utils/_axios";
import { getUser } from "../utils/authUtils";
const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchedUserArray, setSearchedUserArray] = useState(null);

  const getUsers = async () => {
    try {
      const res = await _axios.get(`/user/search?q=${searchInput}`);
      setSearchedUserArray(res.data);
      console.log(searchedUserArray);
    } catch (err) {
      console.log(err.message);
    }
  };

  const followUser = async (id) => {
    try {
      const res = await _axios.put("/user/follow/" + id);
      console.log(res.data);
      if (res.status === 200) {
        let tempState = [...searchedUserArray];
        let tempElement = tempState.find((elem) => elem.id === id);
        let tempElementIndex = tempState.indexOf(tempElement);
        console.log(tempElement, tempElementIndex, tempState);
        tempElement.followers.push(getUser().id);
        console.log("new");
        console.log(tempState);
        setSearchedUserArray([...tempState]);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <VStack>
      <InputGroup>
        <InputLeftElement>
          <Icon as={FaSearch} color="gray.300" />
        </InputLeftElement>
        <Input
          w="100%"
          placeholder="Search"
          bg="#efefef"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            getUsers();
          }}
          onBlur={() => {
            setSearchedUserArray([]);
          }}
        />
      </InputGroup>
      <VStack
        bg="white"
        h="auto"
        maxH="180px"
        overflowY="scroll"
        w="100%"
        boxShadow="rgba(0, 0, 0, 0.098) 0px 0px 5px 1px"
        zIndex={5}
      >
        {searchedUserArray?.map((elem) => (
          <Flex
            key={elem}
            h="fit-content"
            flexDirection="row"
            justify="left"
            w="100%"
          >
            <VStack w="30%">
              <Image
                src="/profile-image.jpg"
                h="60px"
                w="auto"
                borderRadius="50%"
                padding="5px"
              />
            </VStack>
            <VStack justify="center" h="60px" w="60%">
              <p key={elem} style={{ fontWeight: "600", fontSize: "14px" }}>
                {elem.username}
              </p>
              <p key={elem} style={{ color: "rgba(142,142,142,1)" }}>
                {elem.fullName}
              </p>
            </VStack>
            <VStack>
              <Button
                colorScheme="white"
                color="active"
                variant="transparent"
                style={{ padding: "auto" }}
                h="60px"
                w="60px"
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onClick={() => {
                  followUser(elem._id);
                }}
              >
                {elem._id === getUser().id
                  ? ""
                  : elem.followers.includes(getUser().id)
                  ? "Unfollow"
                  : "Follow"}
              </Button>
            </VStack>
          </Flex>
        ))}
      </VStack>
    </VStack>
  );
};

export default SearchBar;
