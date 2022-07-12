import { Image, Header, Segment } from 'semantic-ui-react';
import Head from 'next/head';

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
          This is a static coming soon page. See the template{' '}
          <a href="https://github.com/karmaniverous/template-nextjs#deploying-to-vercel">
            README
          </a>{' '}
          for details on how to configure it.
        </p>

        <p>
          <a href="https://preview.template-nextjs.karmanivero.us/">
            Click here
          </a>{' '}
          to visit the Preview deployment which displays the main site.
        </p>
      </Segment>
    </>
  );
};

export default ComingSoon;
