import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../../../shared/components/ui/Input/Input";
import { Button } from "../../../shared/components/ui/Button/Button";

import { loginSchema } from "../schemas/login.schema";
import type { LoginFormData } from "../schemas/login.schema";

import { useLogin } from "../hooks/useLogin";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { setUser } from "../store/authSlice";
import { tokenManager } from "../../../shared/services/auth/tokenManager";

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await mutateAsync(data);

      tokenManager.setToken(response.accessToken);

      dispatch(setUser(response.user));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email */}

      <Input
        label="Email address"
        type="email"
        placeholder="user@example.com"
        error={errors.email?.message}
        {...register("email")}
      />

      {/* Password */}

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Password
        </label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("password")}
            className="
              h-11
              w-full
              rounded-lg
              border
              border-slate-200
              px-3
              pr-10
              text-sm
              outline-none
              transition
              focus:border-primary
            "
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {errors.password && (
          <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Remember + Forgot */}

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-slate-600">
          <input type="checkbox" className="rounded" />
          Remember me
        </label>

        <Link
          to="/forgot-password"
          className="
            font-medium
            text-primary
            hover:underline
          "
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit */}

      <Button type="submit" loading={isPending} className="w-full">
        Login
      </Button>

      {/* Divider */}

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>

        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-xs text-slate-500">
            OR CONTINUE WITH
          </span>
        </div>
      </div>

      {/* Social Login */}

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="
            flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-lg
            border
            border-slate-200
            text-sm
            font-medium
            hover:bg-slate-50
          "
        >
          Google
        </button>

        <button
          type="button"
          className="
            flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-lg
            border
            border-slate-200
            text-sm
            font-medium
            hover:bg-slate-50
          "
        >
          GitHub
        </button>
      </div>

      {/* Register */}

      <p className="text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="
            font-semibold
            text-primary
            hover:underline
          "
        >
          Sign up
        </Link>
      </p>
    </form>
  );
};
