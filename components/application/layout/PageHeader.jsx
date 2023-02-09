// npm imports
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Grid, Header, Image } from 'semantic-ui-react';

// component imports
import SidebarButton from '../sidebar/SidebarButton';
import SessionDropdown from '../session/SessionDropdown';

const PageHeader = () => {
  const comingSoon = useSelector((state) => state.page.comingSoon);

  return (
    <Grid padded="vertically">
      <Grid.Row>
        <Grid.Column mobile={12} tablet={6} computer={5} largeScreen={4}>
          <Link href="/">
            <Header as="h1">
              <Image alt="" src="/images/logo.png" />
              <Header.Content>
                HelloWorld
                <Header.Subheader>Nice ta meetcha!</Header.Subheader>
              </Header.Content>
            </Header>
          </Link>
        </Grid.Column>

        <Grid.Column
          tablet={8}
          computer={11}
          largeScreen={12}
          only="computer"
          textAlign="right"
        >
          {comingSoon ? null : <SessionDropdown />}
        </Grid.Column>

        <Grid.Column
          className="burger-container"
          mobile={4}
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
