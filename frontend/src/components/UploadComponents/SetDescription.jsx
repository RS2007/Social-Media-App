import React from "react";
import {
  FormControl,
  Textarea,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";

/* eslint-disable react/prop-types*/
const SetDescription = ({
  description,
  setDescription,
  setDescriptionOverflow,
}) => {
  const countWords = (str) => {
    const arr = str.split(" ");

    return arr.filter((word) => word !== "").length;
  };
  console.log(countWords(description));
  return (
    <FormControl>
      <FormLabel>Enter a description for your post</FormLabel>
      <Textarea
        isInvalid={countWords(description) > 100}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          setDescriptionOverflow(countWords(e.target.value) > 100);
        }}
      />
      <FormHelperText>Keep it below 100 characters please =)</FormHelperText>
    </FormControl>
  );
};

export default SetDescription;
