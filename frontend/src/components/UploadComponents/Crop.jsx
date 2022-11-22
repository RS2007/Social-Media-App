import { VStack, Button } from "@chakra-ui/react";
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/imageUtils";
/* eslint-disable react/prop-types*/
const Crop = ({ image, setImage, setCropped }) => {
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [, setLoading] = useState(false);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const cropImage = async () => {
    setLoading(true);
    try {
      const { url } = await getCroppedImg(image, croppedAreaPixels, rotation);
      setImage(url);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack marginTop="500px">
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        rotation={rotation}
        aspect={1}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        onRotationChange={setRotation}
      />
      <Button
        type="primary"
        onClick={() => {
          cropImage();
          setCropped(true);
        }}
      >
        Crop
      </Button>
    </VStack>
  );
};

export default Crop;
