import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const [gettedSession, setGettedSession] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        setGettedSession(false);
        router.replace('/');
      }
      setGettedSession(true);
    });
  }, [router]);
  return <>{gettedSession ? children : null}</>;
};

export default ProtectedRoute;
