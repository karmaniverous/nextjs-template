// npm imports
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';

// component imports
import ApiQuery from './ApiQuery';
import ScrollTarget from '../application/util/ScrollTarget';
const ScrollSegment = ScrollTarget(Segment);

const ApiTest = ({ log }) => {
  // Get page state.
  const baseUrl = useSelector((state) => state.page.baseUrl);

  return (
    <>
      <ScrollSegment name="local-public-api">
        <Header as="h3">Local Public API Endpoint</Header>

        <ApiQuery log={log} method="get" url={`${baseUrl}/api/hello`} />
      </ScrollSegment>

      <ScrollSegment name="local-private-api">
        <Header as="h3">Local Private API Endpoint</Header>

        <ApiQuery log={log} method="get" url={`${baseUrl}/api/private/hello`} />
      </ScrollSegment>

      <ScrollSegment name="remote-public-api">
        <Header as="h3">Remote Public API Endpoint</Header>

        <ApiQuery
          log={log}
          method="get"
          url={`${process.env.AWS_API_BASE_URL}/hello`}
        />
      </ScrollSegment>

      <ScrollSegment name="remote-private-api">
        <Header as="h3">Remote Private API Endpoint</Header>

        <ApiQuery
          authenticate
          log={log}
          method="get"
          url={`${process.env.AWS_API_BASE_URL}/secure-hello`}
        />
      </ScrollSegment>
    </>
  );
};

ApiTest.propTypes = {
  log: PropTypes.bool,
};

export default ApiTest;
