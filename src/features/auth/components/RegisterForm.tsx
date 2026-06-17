import { useForm } from "react-hook-form";
import { Input } from "../../../shared/components/ui/Input/Input.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterFormData,
} from "../schemas/register.schema.ts";
import { useRegister } from "../hooks/useRegister.ts";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../../../shared/components/ui/Button/Button.tsx";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync, isPending } = useRegister();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await mutateAsync(data);

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* name */}
      <Input
        label="Name"
        placeholder="Name"
        error={errors.name?.message}
        {...register("name")}
      />

      {/* email */}
      <Input
        label="Email address"
        type="email"
        placeholder="john@example.com"
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

      {/* Submit */}

      <Button type="submit" loading={isPending} className="w-full">
        Register
      </Button>

      {/* Divider */}

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>

        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-xs text-slate-500">
            OR REGISTER WITH
          </span>
        </div>
      </div>

      {/* Social Register */}

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

      {/* Login */}

      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="
            font-semibold
            text-primary
            hover:underline
          "
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
