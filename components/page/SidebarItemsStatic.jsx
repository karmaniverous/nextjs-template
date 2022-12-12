// npm imports
import { Icon, Menu } from 'semantic-ui-react';

// component imports
import SidebarItemsReleaseNotes from './SidebarItemsReleaseNotes';

const SidebarItemsStatic = () => (
  <>
    {process.env.NEXT_PUBLIC_GITHUB_LINK ? (
      <Menu.Item
        name="github"
        href={process.env.NEXT_PUBLIC_GITHUB_LINK}
        target="_blank"
        rel="noreferrer"
      >
        <Icon name="github" />
        GitHub
      </Menu.Item>
    ) : null}

    {process.env.NEXT_PUBLIC_TWITTER_HANDLE ? (
      <Menu.Item
        name="twitter"
        href={`https://twitter.com/${process.env.NEXT_PUBLIC_TWITTER_HANDLE}`}
        target="_blank"
        rel="noreferrer"
      >
        <Icon name="twitter" />
        Twitter
      </Menu.Item>
    ) : null}

    {process.env.NEXT_PUBLIC_TELEGRAM_HANDLE ? (
      <Menu.Item
        name="telegram"
        href={`https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_HANDLE}`}
        target="_blank"
        rel="noreferrer"
      >
        <Icon name="telegram" />
        Telegram
      </Menu.Item>
    ) : null}

    {process.env.NEXT_PUBLIC_EMAIL ? (
      <Menu.Item name="email" href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
        <Icon name="mail" />
        Email
      </Menu.Item>
    ) : null}

    <SidebarItemsReleaseNotes />
  </>
);

export default SidebarItemsStatic;
