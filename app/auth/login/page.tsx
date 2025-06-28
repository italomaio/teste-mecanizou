"use client";

import { useCallback } from "react";
import { Button, Card, Input, Label, Logo } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "@/types/forms/login";

import PasswordInput from "@/components/PasswordInput/PasswordInput";
import { authService } from "@/services/auth";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onFormSubmit = useCallback(
    async (values: LoginFormData) => {
      const { error } = await authService.login(values);

      if (error) {
        console.error(error);
        return;
      }

      if (!error) router.push("/products");
    },
    [router]
  );

  return (
    <div className="flex flex-col space-y-2.5 justify-center items-center">
      <Logo />
      <h4 className="text-white font-thin">Your plate. Your parts.</h4>
      <Card className="min-w-sm p-6">
        <form
          className="flex flex-col space-y-4 "
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="example@mail.com"
            {...register("email")}
          />
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            placeholder="* * * *"
            {...register("password")}
          />
          <div className="text-red-400">
            <ul className="list-disc text-xs list-inside">
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error.message}</li>
              ))}
            </ul>
          </div>
          <Button variant="secondary" type="submit">
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
