import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginFormData } from "../schemas/login.schema";
import { Input } from "../../../shared/components/ui/Input/Input";
import { Button } from "../../../shared/components/ui/Button/Button";
import { useLogin } from "../hooks/useLogin";
import { setUser } from "../store/authSlice";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { mutateAsync, isPending } = useLogin();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await mutateAsync(data);

      dispatch(setUser(response.user));

      navigate("/dashboard");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Email"
        name="email"
        placeholder="user@gmail.com"
        {...register("email")}
        error={errors.email?.message}
      />

      <Input
        label="Password"
        name="password"
        type="password"
        {...register("password")}
        error={errors.password?.message}
      />

      <Button type="submit" isLoading={isPending}>
        Submit
      </Button>
    </form>
  );
};
