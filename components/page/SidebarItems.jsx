// npm imports
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Icon, Menu } from 'semantic-ui-react';

// redux imports
import { PAGES, resolveRoute } from '../../state/pageSlice.js';

const SidebarItems = () => {
  // Get page state.
  const currentPage = useSelector((state) => state.page.currentPage);

  // Create router.
  const router = useRouter();
  const shallowRoute = useCallback(
    (path) =>
      router.push(path, null, {
        shallow: true,
      }),
    [router]
  );

  return (
    <>
      <Menu.Item header>Menu Header</Menu.Item>
      <Menu.Item
        name={PAGES.HOME}
        active={currentPage === PAGES.HOME}
        onClick={() =>
          shallowRoute(
            resolveRoute({
              currentPage: PAGES.HOME,
            })
          )
        }
      >
        Home
      </Menu.Item>

      <Menu.Item>
        <Menu.Header>Get Help On...</Menu.Header>
        <Menu.Menu>
          <Menu.Item
            name="twitter"
            href="https://twitter.com/karmaniverous"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="twitter" />
            Twitter
          </Menu.Item>

          <Menu.Item
            name="telegram"
            href="https://t.me/karmaniverous"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="telegram" />
            Telegram
          </Menu.Item>

          <Menu.Item
            name="discord"
            href="https://discordapp.com/users/karmaniverous"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="discord" />
            Discord
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>
    </>
  );
};

export default SidebarItems;
