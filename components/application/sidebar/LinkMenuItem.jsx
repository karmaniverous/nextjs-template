// npm imports
import PropTypes from 'prop-types';
import { Icon, Menu } from 'semantic-ui-react';

const LinkMenuItem = ({ children, icon, renderIf, target, ...props }) => {
  if (!renderIf) return null;

  return (
    <Menu.Item
      {...props}
      rel={target === '_blank' ? 'noreferrer' : undefined}
      target={target}
    >
      {icon ? <Icon name={icon} /> : null}

      {children}
    </Menu.Item>
  );
};

LinkMenuItem.propTypes = {
  children: PropTypes.any,
  icon: PropTypes.string,
  renderIf: PropTypes.any,
  target: PropTypes.string,
};

export default LinkMenuItem;
