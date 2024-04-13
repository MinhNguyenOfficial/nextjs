'use client';

import authApiRequest from '@/apiRequests/auth';
import { Button } from '@/components/ui/button';
import { handleErrorApi } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';

export default function ButtonLogout() {
  const router = useRouter();
  const pathName = usePathname();
  const handleButtonLogout = async () => {
    try {
      await authApiRequest.logoutFromNextClientToNextServer();
      router.push('/login');
    } catch (error) {
      handleErrorApi({
        error,
      });
      authApiRequest.logoutFromNextClientToNextServer(true).then(() => {
        router.push(`/login?redirectFrom=${pathName}`);
      });
    }
  };
  return (
    <Button size={'sm'} onClick={handleButtonLogout}>
      Logout
    </Button>
  );
}
