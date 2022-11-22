import React, { useEffect, useState } from "react";
import { Flex, Image } from "@chakra-ui/react";
import CommentInput from "./CommentInput";
import UserDetails from "./UserDetails";
import PostActions from "../components/PostActions";
import ExpandedPostCard from "./ExpandedPostCard";
import { timeDifferenceInAppropriateUnit } from "../utils/dateUtils";

/* eslint-disable react/prop-types*/
const PostCard = ({
  picURL,
  desc,
  username,
  likeCount,
  createdTime,
  id,
  isPostLiked,
  commentCount,
  commentArray,
  mutateSWR,
}) => {
  const [likeCountState, setLikeCountState] = useState(0);
  const [showCommentModal, setShowCommentModal] = useState(false);
  useEffect(() => {
    setLikeCountState(likeCount);
  }, []);
  return (
    <Flex
      direction="column"
      w="100%"
      maxW="630px"
      justify-content="center"
      align="center"
      border="1px solid #dbdbdb"
      marginBottom="20px"
    >
      <UserDetails username={username} />
      <Image src={picURL} w="100%" />
      <PostActions
        id={id}
        isPostLiked={isPostLiked}
        setLikeCountState={setLikeCountState}
        setShowCommentModal={setShowCommentModal}
      />
      <Flex justify="left" w="95%" marginBottom="5px">
        Liked by &nbsp;<strong>{likeCountState} </strong>&nbsp;people
      </Flex>
      <Flex justify="left" flexDirection="horizontal" w="95%" fontSize="16px">
        <span>
          <strong>{username}</strong>&nbsp;&nbsp;{desc}
        </span>
      </Flex>
      <Flex
        justify="left"
        w="95%"
        fontWeight="400"
        fontSize="16px"
        color="rgb(142, 142, 142)"
        margin="5px 0px"
        cursor="pointer"
        onClick={() => {
          setShowCommentModal(true);
        }}
      >
        View all {commentCount} comments
      </Flex>
      <ExpandedPostCard
        isOpen={showCommentModal}
        onClose={() => {
          setShowCommentModal(false);
        }}
        picURL={picURL}
        username={username}
        desc={desc}
        postId={id}
        createdTime={createdTime}
        commentArray={commentArray}
        mutateSWR={mutateSWR}
      />
      <Flex
        justify="left"
        w="95%"
        fontWeight="400"
        fontSize="16px"
        color="rgb(142, 142, 142)"
        margin="5px 0px"
      >
        {timeDifferenceInAppropriateUnit(createdTime).magnitude}{" "}
        {timeDifferenceInAppropriateUnit(createdTime).unit}
      </Flex>
      <CommentInput postId={id} mutateSWR={mutateSWR} />
    </Flex>
  );
};

export default PostCard;
