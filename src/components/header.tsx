import ButtonLogout from '@/components/button-logout';
import { ModeToggle } from '@/components/mode-toggle';
import { AccountResType } from '@/schemaValidations/account.schema';
import Link from 'next/link';

export default function Header({
  user,
}: {
  user: AccountResType['data'] | null;
}) {
  return (
    <div>
      <ul className="flex space-x-4">
        <li>
          <Link href={'/'}>Home</Link>
        </li>
        <li>
          <Link href={'/products'}>Products</Link>
        </li>

        {user ? (
          <>
            <li>
              <Link href={'/me'}>
                <span>Hello, {user.name}</span>
              </Link>
            </li>
            <ButtonLogout />
          </>
        ) : (
          <>
            <li>
              <Link href={'/login'}>Login</Link>
            </li>
            <li>
              <Link href={'/register'}>Register</Link>
            </li>
          </>
        )}

        <li></li>
      </ul>
      <ModeToggle />
    </div>
  );
}
