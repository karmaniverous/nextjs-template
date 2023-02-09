// npm imports
import _ from 'lodash';
import { useSession } from 'next-auth/react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// redux imports
import { PAGES } from '../../../state/pageSlice.mjs';

const RenderIf = ({ children, page, authenticated }) => {
  // Get page state.
  const currentPage = useSelector((state) => state.page.currentPage);

  // Get session.
  const { data: session } = useSession();

  // Apply conditions.
  if (!_.isNil(page) && page !== currentPage) return null;
  if (!_.isNil(authenticated) && authenticated !== !!session?.user) return null;

  return children;
};

RenderIf.propTypes = {
  children: PropTypes.any,
  page: PropTypes.oneOf(Object.values(PAGES)),
  authenticated: PropTypes.bool,
};

export default RenderIf;
