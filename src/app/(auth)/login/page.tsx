import LoginForm from '@/app/(auth)/login/_component/login-form';

export default function LoginPage() {
  return (
    <>
      <h1 className="text-xl font-semibold text-center">Login</h1>
      <div className="flex justify-center">
        <LoginForm />
      </div>
    </>
  );
}
