// npm imports
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { scroller } from 'react-scroll';
import { Icon, Menu } from 'semantic-ui-react';

// redux imports
import { PAGES, resolveRoute } from '../../state/pageSlice.mjs';

// component imports
import SidebarItemsStatic from './SidebarItemsStatic';
import useSignOut from '../useSignOut';

const SidebarItems = () => {
  // Get page state.
  const currentPage = useSelector((state) => state.page.currentPage);
  const siteName = useSelector((state) => state.page.siteName);

  // Create router.
  const router = useRouter();
  const shallowRoute = useCallback(
    (path) =>
      router.push(path, null, {
        shallow: true,
      }),
    [router]
  );

  const doScroll = useCallback((e, { name }) =>
    scroller.scrollTo(name, { smooth: true })
  );

  // Get session.
  const { data: session } = useSession();

  // Get signOut callback.
  const { signOut } = useSignOut();

  return (
    <>
      <Menu.Item header>{siteName}</Menu.Item>

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

      <Menu.Item
        name={PAGES.HOME}
        active={currentPage === PAGES.HOME}
        onClick={
          currentPage === PAGES.HOME
            ? doScroll
            : () =>
                shallowRoute(
                  resolveRoute({
                    currentPage: PAGES.HOME,
                  })
                )
        }
      >
        Home
      </Menu.Item>

      <Menu.Menu>
        <Menu.Item name="section1" link onClick={doScroll}>
          Section 1
        </Menu.Item>

        <Menu.Item name="section2" link onClick={doScroll}>
          Section 2
        </Menu.Item>

        <Menu.Item name="section3" link onClick={doScroll}>
          Section 3
        </Menu.Item>
      </Menu.Menu>

      <Menu.Item>
        <Menu.Header>Get Help On...</Menu.Header>
        <Menu.Menu>
          <SidebarItemsStatic />
        </Menu.Menu>
      </Menu.Item>
    </>
  );
};

export default SidebarItems;
