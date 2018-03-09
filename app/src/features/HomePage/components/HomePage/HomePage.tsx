import * as React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';

interface HomePagePropTypes {
  route: RouteConfig;
}

class HomePage extends React.Component<HomePagePropTypes> {
  render() {
    return (
      <div>
        HomePage
        <div>{this.props.route && renderRoutes(this.props.route.routes)}</div>
      </div>
    );
  }
}

export default HomePage;
