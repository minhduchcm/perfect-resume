import Module, { ConstructorParams } from 'core/Module';
import RouteConfig from 'core/RouteConfig';
import TestSection from './components/TestSection';

import testReducer from './testReducer';

class TestSubModule extends Module {
  constructor(params: ConstructorParams) {
    super(params);
  }

  public async getRoutes(): Promise<RouteConfig[]> {
    return [
      new RouteConfig({
        path: '/test',
        component: TestSection,
      }),
    ];
  }

  public async getReducers() {
    return testReducer;
  }
}

export default TestSubModule;
