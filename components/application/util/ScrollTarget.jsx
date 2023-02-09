// npm imports
import { mergeDelimitedLists } from '@karmaniverous/merge-delimited-lists';
import PropTypes from 'prop-types';

/**
 * This Higher-Order Component adds a name prop and the 'element' className to
 * any component so it can be used as a react-scroll scrolling target. More
 * info at https://www.npmjs.com/package/react-scroll
 *
 * @component
 * @param {component} Component to be wrapped.
 * @returns The input component, transformed into a react-scroll target.
 */
const ScrollTarget = (Component) => {
  const Wrapped = ({ name, className, ...props }) => (
    <Component
      className={mergeDelimitedLists(' ', className, 'element')}
      name={name}
      {...props}
    />
  );

  Wrapped.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
  };

  return Wrapped;
};

export default ScrollTarget;
