// npm imports
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { animateScroll } from 'react-scroll';
import { Menu } from 'semantic-ui-react';

// redux imports
import { PAGES, resolveRoute } from '../../../state/pageSlice.mjs';

const PageMenuItem = ({ children, page, ...props }) => {
  // Get page state.
  const currentPage = useSelector((state) => state.page.currentPage);

  // Get session.
  const { data: session } = useSession();

  // Create router.
  const router = useRouter();

  return (
    <Menu.Item
      {...props}
      name={page}
      active={currentPage === page}
      onClick={
        currentPage === page
          ? animateScroll.scrollToTop
          : () =>
              router.push(
                resolveRoute({
                  currentPage: page,
                }),
                null,
                { shallow: !session }
              )
      }
    >
      {children}
    </Menu.Item>
  );
};

PageMenuItem.propTypes = {
  children: PropTypes.any,
  page: PropTypes.oneOf(Object.values(PAGES)),
};

export default PageMenuItem;
