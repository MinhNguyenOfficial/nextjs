import accountApiResquest from '@/apiRequests/account';
import Profile from '@/app/me/profile';
import ProfileForm from '@/app/me/profile-form';
import envConfig from '@/config';
import { cookies } from 'next/headers';

export default async function UserPage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const result = await accountApiResquest.me(sessionToken?.value || '');

  return (
    <div>
      <h1>Profile</h1>
      <p>Hello {result.payload.data.name}</p>
      <ProfileForm profile={result.payload.data} />
    </div>
  );
}
