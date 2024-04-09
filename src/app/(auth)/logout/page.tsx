'use client';

import authApiRequest from '@/apiRequests/auth';
import { clientSessionToken } from '@/lib/http';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Logout() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const sessionToken = searchParams.get('sessionToken');

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (sessionToken === clientSessionToken.value) {
      authApiRequest.logoutFromNextClientToNextServer(true, signal).then(() => {
        router.push(`/login?redirectFrom=${pathName}`);
      });
    }
    return () => {
      controller.abort();
    };
  }, [pathName, router, sessionToken]);
  return <div>page</div>;
}
