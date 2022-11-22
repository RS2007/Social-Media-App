import React, { useEffect, useState } from "react";
import { Divider, Flex, HStack, Icon } from "@chakra-ui/react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import _axios from "../utils/_axios";
/* eslint-disable react/prop-types*/
export default function PostActions({
  id,
  isPostLiked,
  setLikeCountState,
  setShowCommentModal,
}) {
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    setIsLiked(isPostLiked);
  }, []);
  const handleLike = async () => {
    try {
      console.log(id);
      const res = await _axios.put("post/like/" + id);
      if (res.status === 200) {
        setIsLiked((prevState) => !prevState);
        setLikeCountState
          ? setLikeCountState((prevState) => prevState + (isLiked ? -1 : 1))
          : "";
        console.log(isLiked);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Flex
        flexDirection="horizontal"
        justify="space-between"
        w="95%"
        marginTop="15px"
        marginBottom="5px"
      >
        <HStack>
          <Icon
            as={isLiked ? AiFillHeart : AiOutlineHeart}
            fontSize="2rem"
            cursor="pointer"
            color={isLiked ? "red" : "black"}
            onClick={handleLike}
          />
          <Icon
            as={BiMessageRounded}
            fontSize="2rem"
            cursor="pointer"
            onClick={() => {
              setShowCommentModal ? setShowCommentModal(true) : "";
            }}
          />
        </HStack>
        <Icon
          as={BsBookmark}
          fontSize="2rem"
          padding="3px"
          paddingBottom="5px"
          cursor="pointer"
        />
      </Flex>
      <Divider marginBottom="5px" />
    </>
  );
}
