/* eslint-disable react/prop-types */

// npm imports
import App from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { SessionProvider } from 'next-auth/react';
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Menu, Sidebar, Sticky } from 'semantic-ui-react';

// redux imports
import { wrapper } from '../state/store.mjs';
import {
  setBaseUrl,
  setLogoutUrl,
  setPushRoute,
  setSidebarVisible,
} from '../state/pageSlice.mjs';

// component imports
import PageFooter from '../components/application/layout/PageFooter';
import PageHeader from '../components/application/layout/PageHeader';
import SidebarItems from '../components/application/sidebar/SidebarItems';

// css imports
import 'semantic-ui-less/semantic.less';
import '../styles.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // Get page state.
  const pushRoute = useSelector((state) => state.page.pushRoute);
  const sidebarVisible = useSelector((state) => state.page.sidebarVisible);
  const siteName = useSelector((state) => state.page.siteName);

  // Create dispatcher.
  const dispatch = useDispatch();

  // Create router.
  const router = useRouter();

  // Create callback to fire when sidebar should be closed.
  const onHideSidebar = useCallback(
    () => dispatch(setSidebarVisible(false)),
    []
  );

  // When pushRoute state changes, push the new route & clear pushRoute.
  useEffect(() => {
    if (!pushRoute) return;

    router.push(pushRoute, null, {
      shallow: true,
    });

    dispatch(setPushRoute(null));
  }, [pushRoute]);

  return (
    <SessionProvider session={session}>
      <Head>
        {/* Get a favicon package at https://www.favicon-generator.org/ */}
        <link rel="shortcut icon" href="/images/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/images/favicon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/images/favicon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/images/favicon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/images/favicon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/images/favicon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/images/favicon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/images/favicon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/images/favicon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/images/favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/images/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/images/favicon/manifest.json" />
        <title>{siteName}</title>
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/images/favicon/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#ffffff" />{' '}
        <meta
          name="description"
          content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION}
          key="metadesc"
        />
        <meta
          property="og:description"
          content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION}
          key="ogdesc"
        />
        {/* <meta property="og:image" content={pageImage} key="ogimage" /> */}
        <meta property="og:site_name" content={siteName} key="ogsitename" />
        <meta name="twitter:card" content="summary_large_image" key="twcard" />
        <meta
          name="twitter:description"
          content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION}
          key="twdesc"
        />
        {/* <meta property="twitter:image" content={pageImage} key="twimage" /> */}
        <meta
          name="twitter:site"
          content={`@${process.env.NEXT_PUBLIC_TWITTER_HANDLE}`}
          key="twhandle"
        />
      </Head>

      {/* Configure Google Tag Manager ID in .env */}
      {process.env.NEXT_PUBLIC_GTM_ID ? (
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}')
      `}
        </Script>
      ) : null}

      {/* Support Sticky inside Pushable. (see https://github.com/Semantic-Org/Semantic-UI-React/issues/2897) */}
      <Sidebar.Pushable style={{ transform: 'none' }}>
        <Sticky>
          <Sidebar
            as={Menu}
            animation="overlay"
            direction="left"
            inverted
            onClick={onHideSidebar}
            onHide={onHideSidebar}
            size="huge"
            vertical
            visible={sidebarVisible}
          >
            <SidebarItems />
          </Sidebar>
        </Sticky>

        <Sidebar.Pusher dimmed={sidebarVisible} style={{ minHeight: '100vh' }}>
          <Container>
            <PageHeader />

            <Grid>
              <Grid.Row>
                <Grid.Column computer={4} only="computer">
                  <Menu className="sidebar-menu" fluid size="huge" vertical>
                    <SidebarItems />
                  </Menu>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={12}>
                  <Component {...pageProps} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <PageFooter />
          </Container>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </SessionProvider>
  );
}

// Helper function to perform a redirect from getInitialProps.
const redirect = (res, path) => {
  if (!res) return;

  res.writeHead(307, {
    Location: path,
  });
  res.end();
};

// Set initial props & state.
MyApp.getInitialProps = wrapper.getInitialAppProps(
  ({ dispatch, getState }) =>
    async (context) => {
      const {
        ctx: { req, res },
        router: { /* query, */ route },
      } = context;
      // Server-side only. NO ACCESS TO CLIENT SIDE DATA!
      if (req) {
        // Is app coming soon?
        const {
          page: { comingSoon },
        } = getState();

        // If app is coming soon, route all traffic to coming-soon endpoint.
        if (route !== '/coming-soon' && comingSoon)
          redirect(res, '/coming-soon');

        // If app is not coming soon, route all coming-soon traffic to home.
        if (route === '/coming-soon' && !comingSoon) redirect(res, '/');

        // Calculate base & logout urls.
        const baseUrl = `${
          req.headers['x-forwarded-proto'] || req.socket?.encrypted
            ? 'https'
            : 'http'
        }://${req.headers['x-forwarded-host'] ?? req.headers.host}`;
        dispatch(setBaseUrl(baseUrl));
        dispatch(
          setLogoutUrl(
            `https://${process.env.NEXTAUTH_COGNITO_DOMAIN}/logout?client_id=${
              process.env.NEXTAUTH_COGNITO_CLIENT_ID
            }&logout_uri=${encodeURIComponent(`${baseUrl}`)}`
          )
        );

        // Perform any server-side redirects.

        // Set any server-side state.
      }

      // If we were actually going to set any page props, this is where we'd put them.
      const props = {};

      // Return any initial props we might have set.
      return {
        pageProps: {
          ...(await App.getInitialProps(context)).pageProps,
          ...props,
        },
      };
    }
);

export default wrapper.withRedux(MyApp);
