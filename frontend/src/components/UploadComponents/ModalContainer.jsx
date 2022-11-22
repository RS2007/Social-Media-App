import React from "react";
/* eslint-disable react/prop-types*/
const ModalContainer = ({
  content: Content,
  image,
  setImage,
  description,
  setDescription,
  setDescriptionOverflow,
}) => {
  return (
    <div>
      <Content
        image={image}
        setImage={setImage}
        description={description}
        setDescription={setDescription}
        setDescriptionOverflow={setDescriptionOverflow}
      />
    </div>
  );
};

export default ModalContainer;
