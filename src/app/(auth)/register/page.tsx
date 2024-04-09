import RegisterForm from '@/app/(auth)/register/_component/register-form';

export default function RegisterPage() {
  return (
    <>
      <h1 className="text-xl font-semibold text-center">Register</h1>
      <div className="flex justify-center">
        <RegisterForm />
      </div>
    </>
  );
}
