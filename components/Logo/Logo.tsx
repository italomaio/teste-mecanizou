import React from "react";

import Image from "next/image";
import LogoImage from "@/assets/images/mecanizou-logo-dark.avif";
import { cn } from "@/utils/classes";

export type LogoProps = {
  animate?: boolean;
  bordered?: boolean;
  className?: string;
};

const Logo: React.FC<LogoProps> = ({
  animate = true,
  bordered = true,
  className,
}) => {
  return (
    <Image
      src={LogoImage}
      alt="Logo mecanizou"
      width={150}
      height={150}
      className={cn("py-4 px-6", className, {
        "scale-transition": animate,
        "border border-white": bordered,
      })}
    />
  );
};

export default Logo;
