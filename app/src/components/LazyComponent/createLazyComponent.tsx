import * as React from 'react';

interface LazyComponentParams {
  getComponent: () => Promise<React.ComponentClass<any>>;
  onBeforeLoadRoute?: () => void;
}

const createLazyComponent = ({
  getComponent,
  onBeforeLoadRoute,
}: LazyComponentParams) => {
  interface LazyComponentPropTypes {}
  class LazyComponent extends React.Component<LazyComponentPropTypes> {
    state = {
      loading: true,
    };
    private Component: React.ComponentClass<any>;

    async componentDidMount() {
      if (this.Component === undefined) {
        this.Component = await getComponent();
        if (onBeforeLoadRoute) {
          await onBeforeLoadRoute();
        }
        this.setState(prevState => {
          return { loading: false };
        });
      }
    }

    render() {
      const { loading } = this.state;
      if (loading) {
        return null;
      }
      return <this.Component {...this.props} />;
    }
  }
  return LazyComponent;
};
export default createLazyComponent;
