import Raven from 'raven-js';
import { SENTRY_DEV_DSN, SENTRY_PROD_DSN } from '../../config/parameters';

if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
  Raven.config(SENTRY_DEV_DSN).install();
} else {
  Raven.config(SENTRY_PROD_DSN).install();
}

window.Raven = global.Raven = Raven;

export default Raven;
