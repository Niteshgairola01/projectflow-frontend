import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "../components/AuthLayout";
import { useResetPassword } from "../hooks/useResetPassword";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "../schemas/passwordReset.schema";
import { Input } from "../../../shared/components/ui/Input/Input";
import { Button } from "../../../shared/components/ui/Button/Button";
import { ROUTES } from "../../../shared/constants/routes";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";
import { clearSession } from "../../../shared/services/auth/clearSession";

export default function ResetPasswordPage() {
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  // Reset form state if another emailed link is opened without a full page reload.
  return <ResetPasswordForm key={token} token={token} />;
}

function ResetPasswordForm({ token }: { token: string }) {
  const [invalidLink, setInvalidLink] = useState(!/^[a-f0-9]{64}$/.test(token));
  const [showPasswords, setShowPasswords] = useState(false);

  const navigate = useNavigate();

  const { mutateAsync, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async ({ password }: ResetPasswordFormData) => {
    try {
      await mutateAsync({ token, password });
      clearSession();
      navigate(ROUTES.LOGIN, { replace: true, state: { passwordReset: true } });
    } catch (error) {
      const message = getErrorMessage(error);
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 400 &&
        message.includes("reset link")
      ) {
        setInvalidLink(true);
      } else {
        setError("root", { message });
      }
    }
  };

  return (
    <AuthLayout
      title={invalidLink ? "Request a new reset link" : "Choose a new password"}
      subtitle={
        invalidLink
          ? "Reset links expire after 15 minutes and can only be used once."
          : "Enter and confirm your new password to get back to work."
      }
    >
      {invalidLink ? (
        <div className="space-y-5">
          <p role="alert" className="text-sm text-muted-foreground">
            This reset link is invalid or has expired.
          </p>
          <Link
            to={ROUTES.FORGOT_PASSWORD}
            className="inline-block font-medium text-primary hover:underline"
          >
            Request another link
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          <Input
            label="New password"
            aria-label="New password"
            type={showPasswords ? "text" : "password"}
            autoComplete="new-password"
            {...register("password")}
            error={errors.password?.message}
            disabled={isSubmitting || isPending}
          />
          <p className="text-xs text-muted-foreground">
            Use at least 8 characters. Maximum 72 bytes; some characters use
            more than one byte.
          </p>
          <Input
            label="Confirm password"
            aria-label="Confirm password"
            type={showPasswords ? "text" : "password"}
            autoComplete="new-password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
            disabled={isSubmitting || isPending}
          />
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={showPasswords}
              onChange={(event) => setShowPasswords(event.target.checked)}
            />
            Show passwords
          </label>
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
            Update password
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
