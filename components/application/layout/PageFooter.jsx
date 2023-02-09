// npm imports
import { Menu, Segment } from 'semantic-ui-react';

// component imports
import SidebarLinks from '../sidebar/SidebarLinks';

const PageFooter = () => {
  return (
    <Segment style={{ marginBottom: '1em', paddingBottom: 0, paddingTop: 0 }}>
      <Menu borderless stackable style={{ marginBottom: 0, marginTop: 0 }} text>
        {process.env.NEXT_PUBLIC_SITE_COPYRIGHT ? (
          <Menu.Item>{process.env.NEXT_PUBLIC_SITE_COPYRIGHT}</Menu.Item>
        ) : null}

        <Menu.Menu position="right">
          <SidebarLinks />
        </Menu.Menu>
      </Menu>
    </Segment>
  );
};

export default PageFooter;
