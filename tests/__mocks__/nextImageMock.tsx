import React from "react";

const Image = ({
  src,
  alt,
  ...props
}: {
  src: { src: string };
  alt: string;
  props: unknown;
}) => {
  const finalSrc =
    typeof src === "object" && src !== null && "src" in src ? src.src : src;

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={finalSrc || ""} alt={alt} {...props} />;
};

export default Image;
