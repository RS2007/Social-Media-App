import {
  Button,
  Icon,
  VStack,
  Flex,
  Center,
  Image,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
  GridItem,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { getUser } from "../utils/authUtils";
import { FiSettings } from "react-icons/fi";
import { BsGrid3X3Gap, BsBookmark } from "react-icons/bs";
import { RiFileUserFill } from "react-icons/ri";
import useSWR from "swr";
import { fetcher } from "../utils/_axios";
import ExpandedPostCard from "../components/ExpandedPostCard";

export default function UserProfilePage() {
  const [openModal, setOpenModal] = useState(false);
  const {
    data: userPosts,
    isValidating: isFetching,
    error,
    mutate,
  } = useSWR("/post/user/", fetcher);
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <VStack w="100%" maxW="950px" marginTop="40px">
      <Flex w="100%" h="200px" gap="10%">
        <Center w="30%">
          <Image
            src="https://picsum.photos/200/200"
            borderRadius="50%"
            h="150px"
          />
        </Center>
        <VStack w="40%">
          <HStack w="90%" justify="space-between" paddingTop="10px">
            <Flex w="30%" justify="center">
              <h1
                style={{
                  overflow: "hidden",
                  display: "block",
                  textOverflow: "ellipsis",
                  fontSize: "28px",
                  fontWeight: "300",
                  lineHeight: "32px",
                }}
              >
                {getUser().username}
              </h1>
            </Flex>
            <Button color="rgba(38,38,38,1)">Edit Profile</Button>
            <Icon as={FiSettings} fontSize="31px" />
          </HStack>
        </VStack>
      </Flex>
      <Tabs w="100%" align="center">
        <TabList>
          <Tab>
            <Icon as={BsGrid3X3Gap} />
            &nbsp;POSTS
          </Tab>
          <Tab>
            <Icon as={BsBookmark} />
            &nbsp;SAVED
          </Tab>
          <Tab>
            <Icon as={RiFileUserFill} /> &nbsp;TAGGED
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Grid
              templateColumns="repeat(auto-fill,minmax(200px,1fr))"
              gap="10px"
              w="100%"
            >
              {isFetching && <Spinner />}
              {userPosts?.map((elem) => (
                <GridItem
                  key={elem}
                  w="100%"
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  <Image
                    src={elem.pic}
                    w="100%"
                    borderRadius="10px"
                    cursor="pointer"
                  />
                  <ExpandedPostCard
                    isOpen={openModal}
                    onClose={() => {
                      setOpenModal(false);
                    }}
                    picURL={elem.pic}
                    username={elem.user.username}
                    desc={elem.desc}
                    postId={elem._id}
                    createdTime={elem.createdAt}
                    commentArray={elem.comments}
                    mutateSWR={mutate}
                    isPostLiked={elem.likes.includes(getUser().id)}
                  />
                </GridItem>
              ))}
            </Grid>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}
