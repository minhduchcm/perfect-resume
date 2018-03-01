import { v4 } from 'uuid';

import Application from 'core/Application';
import RouterConfig from 'core/RouterConfig';

export interface ConstructorParams {
  name: string;
}

class Module {
  public id: string;
  public name: string;

  constructor(params: ConstructorParams) {
    this.name = params.name;
    this.id = v4();
  }

  public getRoutes(app: Application): RouterConfig[] {
    return [];
  }
}

export default Module;
