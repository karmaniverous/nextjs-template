// npm imports
import { Icon, Menu } from 'semantic-ui-react';

const SidebarItemsReleaseNotes = () => (
  <Menu.Item
    link
    href={`${process.env.NEXT_PUBLIC_GITHUB_LINK}/releases/tag/${process.env.NEXT_PUBLIC_NPM_PACKAGE_VERSION}`}
    target="_blank"
  >
    <Icon name="cloud upload" />
    {`v${process.env.NEXT_PUBLIC_NPM_PACKAGE_VERSION} Release Notes`}
  </Menu.Item>
);

export default SidebarItemsReleaseNotes;
