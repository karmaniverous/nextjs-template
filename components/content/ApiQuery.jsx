// npm imports
import axios from 'axios';
import { useSession } from 'next-auth/react';
import JSONPretty from 'react-json-pretty';
import JSONPrettyTheme from 'react-json-pretty/dist/monikai';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Card } from 'semantic-ui-react';

const ApiQuery = ({ authenticate, log, method, url }) => {
  // Create response state.
  const [response, setResponse] = useState();

  // Create error state.
  const [error, setError] = useState();

  const { data: session } = useSession();

  // Query endpoint.
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.request({
          headers:
            authenticate && session?.id_token
              ? { Authorization: `Bearer ${session?.id_token}` }
              : {},
          method,
          url,
        });
        if (log) console.log(res);
        setResponse(res);
        setError(null);
      } catch (err) {
        if (log) console.log(err);
        setResponse(null);
        setError(err);
      }
    })();
  }, [method, session, url]);

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{method}</Card.Header>
        <Card.Meta>{url}</Card.Meta>
      </Card.Content>

      {response ? (
        <Card.Content extra style={{ backgroundColor: 'LightGreen' }}>
          {`${response.status}${
            response.statusText ? ` (${response.statusText})` : ''
          }`}
        </Card.Content>
      ) : null}

      {response?.data ? (
        <Card.Content extra>
          <JSONPretty data={response.data} theme={JSONPrettyTheme} />
        </Card.Content>
      ) : null}

      {error ? (
        <Card.Content extra style={{ backgroundColor: 'LightPink' }}>
          {error.message}
        </Card.Content>
      ) : null}
    </Card>
  );
};

ApiQuery.propTypes = {
  authenticate: PropTypes.bool,
  log: PropTypes.bool,
  method: PropTypes.oneOf([
    'delete',
    'get',
    'head',
    'options',
    'patch',
    'post',
    'put',
  ]),
  url: PropTypes.string,
};

export default ApiQuery;
