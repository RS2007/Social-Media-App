import React, { useState } from "react";
import {
  Icon,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Divider,
} from "@chakra-ui/react";
import { VscSmiley } from "react-icons/vsc";
import _axios from "../utils/_axios";
/*eslint-disable react/prop-types*/
const CommentInput = ({ postId, mutateSWR }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const handleCommentSubmit = async () => {
    try {
      setLoading(true);
      await _axios.post("/comment/create", { content, postId });
      mutateSWR();
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Divider />
      <Flex w="100%" h="53px" justify="center" align="center" padding="10px 2%">
        <InputGroup>
          <InputLeftElement>
            <Icon as={VscSmiley} />
          </InputLeftElement>
          <Input
            placeholder="Add a comment"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <InputRightElement padding="23px 4%">
            <Button
              colorScheme="white"
              color="active"
              variant="tranparent"
              style={{ padding: "10px" }}
              onClick={handleCommentSubmit}
              isLoading={loading}
            >
              Post
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </>
  );
};
export default CommentInput;
