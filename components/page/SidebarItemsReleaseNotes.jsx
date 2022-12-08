// npm imports
import { Icon, Menu } from 'semantic-ui-react';

const SidebarItemsReleaseNotes = () => (
  <Menu.Item
    link
    href={`https://blog.yielda.io/blog/release-${process.env.NEXT_PUBLIC_NPM_PACKAGE_VERSION.replace(
      /v/g,
      ''
    ).replace(/\./g, '-')}`}
    target="_blank"
  >
    <Icon name="cloud upload" />
    {`v${process.env.NEXT_PUBLIC_NPM_PACKAGE_VERSION} Release Notes`}
  </Menu.Item>
);

export default SidebarItemsReleaseNotes;
