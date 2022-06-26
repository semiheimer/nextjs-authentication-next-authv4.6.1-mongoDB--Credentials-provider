import Link from 'next/link';
import { getSession, useSession } from 'next-auth/react';
import classes from './main-navigation.module.css';
import { signOut } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

function MainNavigation() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const logoutHandler = async () => {
    const res = await signOut({ redirect: false });
    const session1 = await getSession();
    if (!session1) toast.success('Logout successfully');
    router.push('/');
  };
  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          <li>{!session && <Link href='/auth'>Login</Link>}</li>
          <li>{session && <Link href='/profile'>Profile</Link>}</li>
          <li>{session && <button onClick={logoutHandler}>Logout</button>}</li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
