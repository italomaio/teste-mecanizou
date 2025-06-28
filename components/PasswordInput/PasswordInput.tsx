"use client";

import React, { forwardRef, useMemo } from "react";
import { Button, Input } from "@/components";
import { Eye, EyeClosed, LucideProps } from "lucide-react";

type PasswordInputProps = React.ComponentProps<"input">;

const iconProps: LucideProps = {
  className: "text-sapphire dark:text-sapphire-50",
  size: 18,
};

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const togglePassword = () => {
      setShowPassword((prev) => !prev);
    };

    const Icon = useMemo(() => {
      const Component = !showPassword ? Eye : EyeClosed;
      return <Component {...iconProps} />;
    }, [showPassword]);

    return (
      <div className="relative flex items-center">
        <Input
          ref={ref}
          type={showPassword ? "text" : "password"}
          className={className}
          {...props}
        />
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="absolute right-1"
          onClick={togglePassword}
        >
          {Icon}
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
