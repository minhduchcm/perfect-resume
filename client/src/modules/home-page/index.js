import AppModule from 'core/AppModule';
import routes from 'modules/home-page/routes';

const HomePage = new AppModule({
  name: 'HomePage',
  routes,
});

export default HomePage;
