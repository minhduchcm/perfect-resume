import AppModule from 'core/AppModule';
import routes from 'modules/dashboard/routes';

const Dashboard = new AppModule({
  name: 'Dashboard',
  routes,
});

export default Dashboard;
