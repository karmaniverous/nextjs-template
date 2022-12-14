// npm imports
import { Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';

// redux imports
import { setSidebarVisible } from '../../../state/pageSlice.mjs';

const SidebarButton = () => {
  // Get page state.
  const sidebarVisible = useSelector((state) => state.page.sidebarVisible);

  // Create dispatcher.
  const dispatch = useDispatch();

  return (
    <Button
      color={sidebarVisible ? 'grey' : 'blue'}
      icon="sidebar"
      active={sidebarVisible}
      onClick={() => dispatch(setSidebarVisible(!sidebarVisible))}
    />
  );
};

export default SidebarButton;
