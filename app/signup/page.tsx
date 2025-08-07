import AutoLogin from "../components/auth/auto-login";
import SignupForm from "../components/auth/sign-up-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <AutoLogin />
      <SignupForm />
    </div>
  );
}
