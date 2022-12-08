/* eslint-disable react/prop-types */

// npm imports
import App from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Menu, Sidebar, Sticky } from 'semantic-ui-react';

// redux imports
import { wrapper } from '../state/store.mjs';
import { setPushRoute, setSidebarVisible } from '../state/pageSlice.mjs';

// component imports
import PageFooter from '../components/page/PageFooter';
import PageHeader from '../components/page/PageHeader';
import SidebarItems from '../components/page/SidebarItems';

// css imports
import 'semantic-ui-css/semantic.min.css';
import '../styles.css';

function MyApp({ Component, pageProps }) {
  // Get page state.
  const pushRoute = useSelector((state) => state.page.pushRoute);
  const sidebarVisible = useSelector((state) => state.page.sidebarVisible);

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
    <>
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
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/images/favicon/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#ffffff" />{' '}
      </Head>

      {isComingSoon ? (
        <Container>
          <ComingSoon {...pageProps} />
        </Container>
      ) : (
        <Sidebar.Pushable>
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

          <Sidebar.Pusher
            dimmed={sidebarVisible}
            style={{ minHeight: '100vh' }}
          >
            <Container>
              <PageHeader />

              <Grid>
                <Grid.Row>
                  <Grid.Column computer={4} only="computer">
                    <Sticky offset={20}>
                      <Menu vertical fluid size="huge">
                        <SidebarItems />
                      </Menu>
                    </Sticky>
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
      )}
    </>
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

// Set initial state on server side. NO ACCESS TO CLIENT SIDE DATA!
MyApp.getInitialProps = wrapper.getInitialAppProps(
  (/* { dispatch, getState } */) => async (context) => {
    const {
      ctx: { res },
      router: { /* query, */ route },
    } = context;

    // If app is coming soon, route all traffic to coming-soon endpoint.
    if (route !== '/coming-soon' && isComingSoon) redirect(res, '/coming-soon');

    // If app is not coming soon, route all coming-soon traffic to home.
    if (route === '/coming-soon' && !isComingSoon) redirect(res, '/');

    // Perform any server-side redirects.

    // Set any server-side state.

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
