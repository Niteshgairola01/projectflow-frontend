import { AuthLayout } from "../components/AuthLayout";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <AuthLayout title="Regsister" subtitle="Please register to login">
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
