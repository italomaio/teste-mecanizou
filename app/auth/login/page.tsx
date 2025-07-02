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

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <main
      className="flex flex-col space-y-2.5 justify-center items-center"
      role="main"
    >
      <Logo />
      <h1 className="text-white font-thin text-lg">Your plate. Your parts.</h1>
      <Card className="min-w-sm p-6">
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(onFormSubmit)}
          aria-label="Login form"
          noValidate
        >
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@mail.com"
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={!!errors.email}
            {...register("email")}
          />

          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            placeholder="* * * *"
            aria-describedby={errors.password ? "password-error" : undefined}
            aria-invalid={!!errors.password}
            {...register("password")}
          />

          {hasErrors && (
            <div
              className="text-red-400"
              role="alert"
              aria-live="polite"
              aria-atomic="true"
              aria-label="Login form errors"
            >
              <ul className="list-disc text-xs list-inside space-y-1">
                {Object.values(errors).map((error, index) => (
                  <li key={`error-${index}`}>{error.message}</li>
                ))}
              </ul>
            </div>
          )}

          <Button
            variant="secondary"
            type="submit"
            aria-describedby={hasErrors ? "form-errors" : undefined}
          >
            Login
          </Button>
        </form>
      </Card>
    </main>
  );
};

export default LoginPage;
