// npm imports
import Link from 'next/link';
import { Grid, Header, Image } from 'semantic-ui-react';

// component imports
import SidebarButton from './SidebarButton';

const PageHeader = () => {
  return (
    <Grid padded="vertically">
      <Grid.Row>
        <Grid.Column mobile={13} tablet={14} computer={16}>
          <Link href="/">
            <a>
              <Header as="h1">
                <Image alt="" src="/images/logo.png" />
                <Header.Content>
                  HelloWorld
                  <Header.Subheader>Nice ta meetcha!</Header.Subheader>
                </Header.Content>
              </Header>
            </a>
          </Link>
        </Grid.Column>

        <Grid.Column
          className="burger-container"
          mobile={3}
          tablet={2}
          only="mobile tablet"
          textAlign="right"
          verticalAlign="top"
        >
          <SidebarButton />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default PageHeader;
