import { Reducer, combineReducers, ReducersMapObject } from 'redux';
import { v4 } from 'uuid';

import Application from 'core/Application';
import RouteConfig from 'core/RouteConfig';

export interface ConstructorParams {
  name: string;
}

class Module {
  public id: string;
  public name: string;
  public app: Application;
  public subModules: Map<string, Module>;

  constructor(params: ConstructorParams) {
    this.id = v4();
    this.name = params.name;
    this.subModules = new Map<string, Module>();
  }

  public async init(app: Application) {
    this.app = app;
    this.getSubModules().forEach(subModule => {
      subModule.init(app);
    });
  }

  public getSubModules(): Module[] {
    return Array.from(this.subModules.values());
  }

  public registerSubModules(appModules: Module[]) {
    appModules.forEach(m => this.registerSubModule(m));
  }

  public registerSubModule(appModule: Module) {
    this.subModules.set(appModule.name, appModule);
  }

  public async getReducers(): Promise<Reducer<any> | null> {
    const childrenReducers = await this.getChildrenReducers();
    if (childrenReducers === null) {
      return null;
    }
    return combineReducers(childrenReducers);
  }

  public async getChildrenReducers(): Promise<ReducersMapObject | null> {
    let reducers = await Promise.all(
      this.getSubModules().map(async m => ({
        name: m.name,
        reducer: await m.getReducers(),
      })),
    );
    reducers = reducers.filter(r => r.reducer !== null);
    if (reducers.length === 0) {
      return null;
    }
    return reducers.reduce((accumulator, current) => {
      accumulator[current.name] = current.reducer;
      return accumulator;
    }, {});
  }

  public async getRoutes(): Promise<RouteConfig[]> {
    return await this.getChildrenRoutes();
  }

  public async getChildrenRoutes(): Promise<RouteConfig[]> {
    const routes = await Promise.all(
      this.getSubModules().map(m => m.getRoutes()),
    );
    const childRoutes: RouteConfig[] = [];
    return childRoutes.concat(...routes);
  }
}

export default Module;
