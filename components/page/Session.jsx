// npm imports
import { useSession, signIn } from 'next-auth/react';
import { Dropdown } from 'semantic-ui-react';

// component imports
import useSignOut from '../useSignOut';

const Session = () => {
  // Get session.
  const { data: session } = useSession();

  // Get signOut callback.
  const { signOut } = useSignOut();

  return (
    <Dropdown
      button
      icon={session ? 'dropdown' : null}
      onClick={session ? null : () => signIn('cognito')}
      simple
      text={session ? session.user.email : 'Sign In/Register'}
    >
      {session ? (
        <Dropdown.Menu>
          <Dropdown.Item icon="log out" onClick={signOut} text="Sign Out" />
        </Dropdown.Menu>
      ) : null}
    </Dropdown>
  );
};

export default Session;
