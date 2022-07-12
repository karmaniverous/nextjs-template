import { Image, Header, Segment } from 'semantic-ui-react';
import Head from 'next/head';

// Show coming soon page when designated but never in preview environment.
export const isComingSoon =
  process.env.NEXT_PUBLIC_COMING_SOON === '1' &&
  process.env.NEXT_PUBLIC_VERCEL_ENV !== 'preview';

const ComingSoon = () => {
  return (
    <>
      <Head>
        <title>HelloWorld is Coming Soon!</title>
      </Head>

      <Segment basic>
        <Header as="h1">
          <Image alt="" src="/images/logo.png" />
          <Header.Content>
            HelloWorld
            <Header.Subheader>Nice ta meetcha!</Header.Subheader>
          </Header.Content>
        </Header>
      </Segment>
      <Segment>
        <Header as="h2">HelloWorld is Coming Soon!</Header>
        <p>
          This is a static coming soon page. See the
          <a href="https://github.com/karmaniverous/template-nextjs#deploying-to-vercel">
            README
          </a>{' '}
          for details on how to configure it.
        </p>

        <p>
          <a href="https://template-nextjs-git-preview-tribify.vercel.app/">
            Click here
          </a>{' '}
          to visit the Preview deployment which displays the main site.
        </p>
      </Segment>
    </>
  );
};

export default ComingSoon;
