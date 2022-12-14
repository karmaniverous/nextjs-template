// component imports
import LinkMenuItem from './LinkMenuItem';

const SidebarLinks = () => (
  <>
    <LinkMenuItem
      href={process.env.NEXT_PUBLIC_GITHUB_LINK}
      icon="github"
      renderIf={process.env.NEXT_PUBLIC_GITHUB_LINK}
      target="_blank"
    >
      GitHub
    </LinkMenuItem>

    <LinkMenuItem
      href={`https://twitter.com/${process.env.NEXT_PUBLIC_TWITTER_HANDLE}`}
      icon="twitter"
      renderIf={process.env.NEXT_PUBLIC_TWITTER_HANDLE}
      target="_blank"
    >
      Twitter
    </LinkMenuItem>

    <LinkMenuItem
      href={`https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_HANDLE}`}
      icon="telegram"
      renderIf={process.env.NEXT_PUBLIC_TELEGRAM_HANDLE}
      target="_blank"
    >
      Telegram
    </LinkMenuItem>

    <LinkMenuItem
      href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
      icon="mail"
      renderIf={process.env.NEXT_PUBLIC_EMAIL}
    >
      Email
    </LinkMenuItem>

    <LinkMenuItem
      href={`${process.env.NEXT_PUBLIC_GITHUB_LINK}/releases/tag/${process.env.NEXT_PUBLIC_NPM_PACKAGE_VERSION}`}
      icon="cloud upload"
      renderIf={process.env.NEXT_PUBLIC_GITHUB_LINK}
      target="_blank"
    >
      {`v${process.env.NEXT_PUBLIC_NPM_PACKAGE_VERSION} Release Notes`}
    </LinkMenuItem>
  </>
);

export default SidebarLinks;
