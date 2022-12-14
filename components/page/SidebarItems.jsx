// npm imports
import { useSession, signIn } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { Icon, Menu } from 'semantic-ui-react';

// redux imports
import { PAGES } from '../../state/pageSlice.mjs';

// component imports
import RenderIf from '../RenderIf';
import PageMenuItem from '../PageMenuItem';
import ScrollMenuItem from '../ScrollMenuItem';
import SidebarItemsStatic from './SidebarItemsStatic';
import useSignOut from '../useSignOut';

const SidebarItems = () => {
  // Get page state.
  const siteName = useSelector((state) => state.page.siteName);

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
          <ScrollMenuItem name="local-public-api">
            Local Public API
          </ScrollMenuItem>

          <ScrollMenuItem name="local-private-api">
            Local Private API
          </ScrollMenuItem>

          <ScrollMenuItem name="remote-public-api">
            Remote Public API
          </ScrollMenuItem>

          <ScrollMenuItem name="remote-private-api">
            RemotePrivateApi
          </ScrollMenuItem>
        </Menu.Menu>
      </RenderIf>

      <RenderIf authenticated>
        <PageMenuItem page={PAGES.PRIVATE}>Private</PageMenuItem>

        <RenderIf page={PAGES.PRIVATE}>
          <Menu.Menu>
            <ScrollMenuItem name="local-public-api">
              Local Public API
            </ScrollMenuItem>

            <ScrollMenuItem name="local-private-api">
              Local Private API
            </ScrollMenuItem>

            <ScrollMenuItem name="remote-public-api">
              Remote Public API
            </ScrollMenuItem>

            <ScrollMenuItem name="remote-private-api">
              Remote Private API
            </ScrollMenuItem>
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
