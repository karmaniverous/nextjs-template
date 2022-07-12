// npm imports
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';

// redux imports
import { PAGES, setCurrentPage } from '../../state/pageSlice.js';

// TODO: pass game index in as prop.
const HomePage = () => {
  // Create dispatcher.
  const dispatch = useDispatch();

  // Set current page state.
  useEffect(() => {
    dispatch(setCurrentPage(PAGES.HOME));
  }, []);

  return (
    <>
      <Head>
        <title>Hello, World!</title>
      </Head>

      <Segment>
        <Header as="h2">
          Hello, World! <Header.Subheader>Nice ta meetcha!</Header.Subheader>
        </Header>
        <p>Some content.</p>
      </Segment>
    </>
  );
};

export default HomePage;
