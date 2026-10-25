import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "../components/AuthLayout";
import { useForgotPassword } from "../hooks/useForgotPassword";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "../schemas/passwordReset.schema";
import { Input } from "../../../shared/components/ui/Input/Input";
import { Button } from "../../../shared/components/ui/Button/Button";
import { ROUTES } from "../../../shared/constants/routes";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const { mutateAsync, isPending } = useForgotPassword();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await mutateAsync(data);
      setSent(true);
    } catch (error) {
      setError("root", { message: getErrorMessage(error) });
    }
  };

  return (
    <AuthLayout
      title={sent ? "Check your email" : "Forgot your password?"}
      subtitle={
        sent
          ? "Follow the link in your email to choose a new password."
          : "Enter your email and we’ll send you a reset link."
      }
    >
      {sent ? (
        <div className="space-y-5">
          <p role="status" className="text-sm text-muted-foreground">
            If an account exists with this email, we’ve sent a password reset
            link. The link expires in 15 minutes. Check your spam folder too.
          </p>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="text-sm font-medium text-primary hover:underline"
          >
            Try again or use another email
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          <Input
            label="Email address"
            aria-label="Email address"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            {...register("email")}
            error={errors.email?.message}
            disabled={isSubmitting || isPending}
          />
          {errors.root && (
            <p role="alert" className="text-sm text-red-600">
              {errors.root.message}
            </p>
          )}

          <Button
            type="submit"
            loading={isSubmitting || isPending}
            className="w-full"
          >
            Send reset link
          </Button>
        </form>
      )}

      <Link
        to={ROUTES.LOGIN}
        className="mt-6 inline-block text-sm font-medium text-primary hover:underline"
      >
        Back to login
      </Link>
    </AuthLayout>
  );
}
