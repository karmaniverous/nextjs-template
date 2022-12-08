// npm imports
import { Menu, Segment } from 'semantic-ui-react';

// component imports
import SidebarItemsStatic from './SidebarItemsStatic';

const PageFooter = () => {
  return (
    <Segment style={{ marginBottom: '1em', paddingBottom: 0, paddingTop: 0 }}>
      <Menu borderless stackable style={{ marginBottom: 0, marginTop: 0 }} text>
        {process.env.NEXT_PUBLIC_SITE_COPYRIGHT ? (
          <Menu.Item>&copy; {process.env.NEXT_PUBLIC_SITE_COPYRIGHT}</Menu.Item>
        ) : null}

        <Menu.Menu position="right">
          <SidebarItemsStatic />
        </Menu.Menu>
      </Menu>
    </Segment>
  );
};

export default PageFooter;
