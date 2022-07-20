// npm imports
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { scroller } from 'react-scroll';
import { Icon, Menu } from 'semantic-ui-react';

// redux imports
import { PAGES, resolveRoute } from '../../state/pageSlice.mjs';

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

  const doScroll = useCallback((e, { name }) =>
    scroller.scrollTo(name, { smooth: true })
  );

  return (
    <>
      <Menu.Item header>Menu Header</Menu.Item>
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
          <Menu.Item
            name="github"
            href="https://github.com/karmaniverous/template-nextjs/issues"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="github" />
            GitHub
          </Menu.Item>

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
