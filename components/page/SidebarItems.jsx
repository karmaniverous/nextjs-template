// npm imports
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { scroller } from 'react-scroll';
import { Menu } from 'semantic-ui-react';

// redux imports
import { PAGES, resolveRoute } from '../../state/pageSlice.mjs';

// component imports
import SidebarItemsStatic from './SidebarItemsStatic';

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
          <SidebarItemsStatic />
        </Menu.Menu>
      </Menu.Item>
    </>
  );
};

export default SidebarItems;
