// npm imports
import { useSession, signIn } from 'next-auth/react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { scroller } from 'react-scroll';
import { Icon, Menu } from 'semantic-ui-react';

// redux imports
import { PAGES } from '../../state/pageSlice.mjs';

// component imports
import RenderIf from '../RenderIf';
import PageMenuItem from '../PageMenuItem';
import SidebarItemsStatic from './SidebarItemsStatic';
import useSignOut from '../useSignOut';

const SidebarItems = () => {
  // Get page state.
  const siteName = useSelector((state) => state.page.siteName);

  const doScroll = useCallback(
    (e, { name }) => scroller.scrollTo(name, { smooth: true }),
    []
  );

  // Get session.
  const { data: session } = useSession();

  // Get signOut callback.
  const { signOut } = useSignOut();

  return (
    <>
      <Menu.Item header>{siteName}</Menu.Item>

      <RenderIf authenticated>
        <Menu.Item>
          {session?.user?.email}
          <Menu.Menu>
            <Menu.Item onClick={signOut}>
              <Icon name="log out" />
              Sign Out
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
      </RenderIf>

      <RenderIf authenticated={false}>
        <Menu.Item onClick={() => signIn('cognito')}>
          Sign Up / Sign In
        </Menu.Item>
      </RenderIf>

      <PageMenuItem page={PAGES.HOME}>Home</PageMenuItem>

      <RenderIf page={PAGES.HOME}>
        <Menu.Menu>
          <Menu.Item name="local-public-api" link onClick={doScroll}>
            Local Public API
          </Menu.Item>

          <Menu.Item name="local-private-api" link onClick={doScroll}>
            Local Private API
          </Menu.Item>

          <Menu.Item name="remote-public-api" link onClick={doScroll}>
            Remote Public API
          </Menu.Item>

          <Menu.Item name="remote-private-api" link onClick={doScroll}>
            RemotePrivateApi
          </Menu.Item>
        </Menu.Menu>
      </RenderIf>

      <RenderIf authenticated>
        <PageMenuItem page={PAGES.PRIVATE}>Private</PageMenuItem>

        <RenderIf page={PAGES.PRIVATE}>
          <Menu.Menu>
            <Menu.Item name="local-public-api" link onClick={doScroll}>
              Local Public API
            </Menu.Item>

            <Menu.Item name="local-private-api" link onClick={doScroll}>
              Local Private API
            </Menu.Item>

            <Menu.Item name="remote-public-api" link onClick={doScroll}>
              Remote Public API
            </Menu.Item>

            <Menu.Item name="remote-private-api" link onClick={doScroll}>
              Remote Private API
            </Menu.Item>
          </Menu.Menu>
        </RenderIf>
      </RenderIf>

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
