// npm imports
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { scroller } from 'react-scroll';
import { Menu } from 'semantic-ui-react';

const ScrollMenuItem = ({ children, name, ...props }) => {
  // Create scrolling callback.
  const doScroll = useCallback(
    (e, { name }) => scroller.scrollTo(name, { smooth: true }),
    []
  );

  return (
    <Menu.Item {...props} name={name} link onClick={doScroll}>
      {children}
    </Menu.Item>
  );
};

ScrollMenuItem.propTypes = {
  children: PropTypes.any,
  name: PropTypes.string.isRequired,
};

export default ScrollMenuItem;
