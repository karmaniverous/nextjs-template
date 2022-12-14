// npm imports
import { useSession, signIn } from 'next-auth/react';
import { Menu, Icon } from 'semantic-ui-react';

// component imports
import useSignOut from './useSignOut';

const SessionMenuItem = () => {
  // Get session.
  const { data: session } = useSession();

  // Get signOut callback.
  const { signOut } = useSignOut();

  return (
    <Menu.Item onClick={session ? null : () => signIn('cognito')}>
      {session ? (
        <>
          {session.user.email}
          <Menu.Menu>
            <Menu.Item onClick={signOut}>
              <Icon name="log out" />
              Sign Out
            </Menu.Item>
          </Menu.Menu>
        </>
      ) : (
        'Sign Up / Sign In'
      )}
    </Menu.Item>
  );
};

export default SessionMenuItem;
