import AuthCard from "../components/AuthCard";
import { LoginForm } from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <AuthCard title="Welcome Back">
        <LoginForm />
      </AuthCard>
    </div>
  );
};

export default LoginPage;
