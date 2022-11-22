import React, { useState } from "react";
import {
  Flex,
  Heading,
  Icon,
  HStack,
  useMediaQuery,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import "../pages/login.css";
import SearchBar from "./SearchBar";
import { FaHome } from "react-icons/fa";
import { BiMessageRoundedDetail } from "react-icons/bi";
import {
  AiOutlineCompass,
  AiOutlineHeart,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import TestComponent from "./TestComponent";

const Navbar = () => {
  const [searchBarDisplay] = useMediaQuery("(min-width:741px)");
  const [showPostModal, setShowPostModal] = useState(false);
  const navigate = useNavigate();
  return (
    <Flex justify="center" w="100%" h="60px" borderBottom="1px solid #efefef">
      <Flex w="100%" maxW="950px" h="60px" justify="space-between">
        <Flex
          w={{ base: "50%", md: "20%" }}
          h="60px"
          justify="center"
          align="center"
          padding="0"
        >
          <Heading
            as="h3"
            style={{
              fontFamily: "'Pacifico'",
              height: "45px",
              fontSize: "25px",
              margin: "0",
              position: "relative",
              top: "5px",
            }}
          >
            Instaclone
          </Heading>
        </Flex>
        {searchBarDisplay && (
          <Flex
            w="25%"
            h="fit-content"
            align="center"
            justify="center"
            paddingTop="10px"
            colSpan={8}
            overflow="visible"
          >
            <SearchBar />
          </Flex>
        )}

        <HStack w="250px">
          <Flex w="20%" maxW="40px" justify="center" align="center">
            <Icon
              as={FaHome}
              h="100%"
              w="80%"
              onClick={() => {
                navigate("/");
              }}
            />
          </Flex>
          <Flex w="20%" maxW="40px" justify="center" align="center">
            <Icon as={BiMessageRoundedDetail} h="100%" w="80%" />
          </Flex>
          <Flex w="20%" maxW="40px" justify="center" align="center">
            <Icon
              as={AiOutlinePlusSquare}
              h="100%"
              w="80%"
              cursor="pointer"
              onClick={() => {
                setShowPostModal(true);
              }}
            />
          </Flex>
          <Flex w="20%" maxW="40px" justify="center" align="center">
            <Icon as={AiOutlineCompass} h="100%" w="80%" />
          </Flex>
          <Flex w="20%" maxW="40px" justify="center" align="center">
            <Icon as={AiOutlineHeart} h="100%" w="80%" />
          </Flex>
          <Flex w="20%" maxW="40px" align="center" justify="center">
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<Icon as={HiOutlineUserCircle} h="100%" w="80%" />}
                variant="transparent"
                colorScheme="white"
              />
              <MenuList>
                <MenuItem>
                  <Link to="/profile">Profile</Link>
                </MenuItem>
                <MenuItem>Saved</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Switch Accounts</MenuItem>
                <Divider />
                <MenuItem>Log Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
      <TestComponent
        isOpen={showPostModal}
        onClose={() => {
          setShowPostModal(false);
        }}
      />
    </Flex>
  );
};

export default Navbar;
