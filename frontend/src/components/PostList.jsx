import React from "react";
import { Grid, GridItem, Spinner } from "@chakra-ui/react";
import useSWR from "swr";
import PostCard from "./PostCard";
import CurrentUserCard from "./CurrentUserCard";
import { fetcher } from "../utils/_axios";
import { getUser } from "../utils/authUtils";

export default function PostList() {
  const {
    data,
    isValidating: isFetching,
    error,
    mutate,
  } = useSWR("/post", fetcher);

  if (error) {
    return <div>{error.message}</div>;
  }
  if (isFetching) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  return (
    <Grid
      templateColumns="2fr 1fr"
      w="100%"
      maxW="909px"
      marginTop="40px"
      gridGap="1vw"
      display={{ base: "block", md: "grid" }}
      placeContent="center"
    >
      <GridItem w={{ base: "100%", lg: "" }} h="fit-content">
        {!isFetching &&
          data.map((elem) => (
            <PostCard
              picURL={elem.pic}
              desc={elem.desc}
              key={elem}
              username={elem.user.username}
              likeCount={elem.likes.length}
              isPostLiked={elem.likes.includes(getUser().id)}
              id={elem._id}
              createdTime={elem.createdAt}
              commentCount={elem.comments.length}
              commentArray={elem.comments}
              mutateSWR={mutate}
            />
          ))}
        {!isFetching && data.length === 0 && (
          <div>
            Nothing to show over here, follow users to see their posts,also you
            can post an image and see your profile by clicking on buttons in the
            navbar
          </div>
        )}
      </GridItem>
      <GridItem>
        <CurrentUserCard />
      </GridItem>
    </Grid>
  );
}
