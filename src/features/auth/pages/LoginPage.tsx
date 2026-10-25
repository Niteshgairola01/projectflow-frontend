import { useLocation } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { LoginForm } from "../components/LoginForm";

export default function LoginPage() {
  const { state } = useLocation();
  return (
    <AuthLayout title="Welcome back" subtitle="Please login to your account">
      {state?.passwordReset === true && (
        <p
          role="status"
          className="mb-5 rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm"
        >
          Password updated successfully. Please sign in with your new password.
        </p>
      )}
      <LoginForm />
    </AuthLayout>
  );
}
