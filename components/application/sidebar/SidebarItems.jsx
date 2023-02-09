// npm imports
import { useSelector } from 'react-redux';
import { Menu } from 'semantic-ui-react';

// redux imports
import { PAGES } from '../../../state/pageSlice.mjs';

// component imports
import RenderIf from '../util/RenderIf';
import PageMenuItem from './PageMenuItem';
import ScrollMenuItem from './ScrollMenuItem';
import SessionMenuItem from '../session/SessionMenuItem';
import SidebarLinks from './SidebarLinks';

const SidebarItems = () => {
  // Get page state.
  const comingSoon = useSelector((state) => state.page.comingSoon);
  const siteName = useSelector((state) => state.page.siteName);

  return (
    <>
      <Menu.Item header>{siteName}</Menu.Item>

      {comingSoon ? null : <SessionMenuItem />}

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
          <SidebarLinks />
        </Menu.Menu>
      </Menu.Item>
    </>
  );
};

export default SidebarItems;
