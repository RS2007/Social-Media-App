import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import ModalContainer from "./ModalContainer";
import SetDescription from "./SetDescription";
import Cropper from "./Crop";
import React, { useState } from "react";
import Upload from "./Upload";
import _axios from "../../utils/_axios";
import { motion } from "framer-motion";

const steps = [
  { label: "Upload", content: Upload },
  { label: "Crop", content: Cropper },
  { label: "Details", content: SetDescription },
];

/* eslint-disable react/prop-types*/
export default function PostModal({ isOpen, onClose }) {
  const uploadImage = async () => {
    console.log({ image, description });
    _axios.post("/post/", {
      pic: image,
      desc: description,
    });
    nextStep();
  };
  const { nextStep, activeStep } = useSteps({
    initialStep: 0,
  });
  const [image, setImage] = useState([]);
  const [description, setDescription] = useState("");
  const [descriptionOverflow, setDescriptionOverflow] = useState(false);
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      const delay = 1 + i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 },
        },
      };
    },
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Steps activeStep={activeStep} marginBottom="20px">
            {steps.map(({ label, content }) => (
              <Step key={label}>
                <ModalContainer
                  content={content}
                  image={image}
                  setImage={setImage}
                  description={description}
                  setDescription={setDescription}
                  setDescriptionOverflow={setDescriptionOverflow}
                />
              </Step>
            ))}
          </Steps>
          {activeStep === steps.length ? (
            <VStack>
              <motion.svg
                version="1.1"
                id="tick"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 37 37"
                style={{
                  enableBackground: "new 0 0 37 37",
                  width: "50%",
                }}
                xmlSpace="preserve"
                initial="hidden"
                animate="visible"
              >
                <defs>
                  <linearGradient id="grad1">
                    <stop stopColor="#405de6" />
                    <stop offset=".2" stopColor="#5851db" />
                    <stop offset=".4" stopColor="#833ab4" />
                    <stop offset=".6" stopColor="#c13584" />
                    <stop offset=".8" stopColor="#e1306c" />
                    <stop offset="1" stopColor="#fd1d1d" />
                  </linearGradient>
                </defs>
                <path
                  className="circ path"
                  style={{
                    fill: "none",
                    stroke: "url(#grad1)",
                    strokeWidth: 3,
                    strokeLinejoin: "round",
                    strokeMiterlimit: 10,
                  }}
                  d="
	M30.5,6.5L30.5,6.5c6.6,6.6,6.6,17.4,0,24l0,0c-6.6,6.6-17.4,6.6-24,0l0,0c-6.6-6.6-6.6-17.4,0-24l0,0C13.1-0.2,23.9-0.2,30.5,6.5z"
                />
                <motion.polyline
                  className="tick path"
                  style={{
                    fill: "none",
                    stroke: "url(#grad1)",
                    strokeWidth: 3,
                    strokeLinejoin: "round",
                    strokeMiterlimit: 10,
                  }}
                  points="
	11.6,20 15.9,24.2 26.4,13.8 "
                  variants={draw}
                />
              </motion.svg>
              <Text padding="30px 0px" fontSize="1.2rem">
                Image upload is successful
              </Text>
            </VStack>
          ) : (
            <Flex width="100%" justify="flex-end">
              <Button
                size="sm"
                onClick={
                  activeStep === steps.length - 1 ? uploadImage : nextStep
                }
                isDisabled={descriptionOverflow}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
