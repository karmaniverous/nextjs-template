// npm imports
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';

// redux imports
import { PAGES, setCurrentPage } from '../../state/pageSlice.mjs';

// component imports
import ScrollTarget from '../page/ScrollTarget';
const ScrollSegment = ScrollTarget(Segment);

// TODO: pass game index in as prop.
const PrivatePage = () => {
  // Get page state.
  const siteName = useSelector((state) => state.page.siteName);

  // Create dispatcher.
  const dispatch = useDispatch();

  // Set current page state.
  useEffect(() => {
    dispatch(setCurrentPage(PAGES.PRIVATE));
  }, []);

  return (
    <>
      <Head>
        <title>{`Private Page - ${siteName}`}</title>
      </Head>

      <ScrollSegment name={PAGES.HOME}>
        <Header as="h2">
          Private Page{' '}
          <Header.Subheader>
            This page is only visible to authenticated users.
          </Header.Subheader>
        </Header>

        <ScrollSegment name="section1" style={{ minHeight: '400px' }}>
          <Header as="h3">Section 1</Header>
        </ScrollSegment>

        <ScrollSegment name="section2" style={{ minHeight: '400px' }}>
          <Header as="h3">Section 2</Header>
        </ScrollSegment>

        <ScrollSegment name="section3" style={{ minHeight: '400px' }}>
          <Header as="h3">Section 3</Header>
        </ScrollSegment>
      </ScrollSegment>
    </>
  );
};

export default PrivatePage;
