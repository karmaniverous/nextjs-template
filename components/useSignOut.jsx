// npm imports
import { useRouter } from 'next/router';
import { signOut as nextAuthSignOut } from 'next-auth/react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

const useSignOut = () => {
  // Get page state.
  const logoutUrl = useSelector((state) => state.page.logoutUrl);

  // Get router.
  const router = useRouter();

  const signOut = useCallback(() => {
    nextAuthSignOut({ redirect: false });
    router.push(logoutUrl);
  }, []);

  return { signOut };
};

export default useSignOut;
