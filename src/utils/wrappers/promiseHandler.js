/**
* @Author: Subrata Mal <subrat>
* @Date:   2016-09-16T15:04:48+05:30
* @Email:  subrata.mal@
* @Last modified by:   subrat
* @Last modified time: 2016-09-16T15:35:59+05:30
*/

export default function promiseRejectionHandler() {
  let Raven = global.Raven;
  if (!Raven) {
    Raven = window.Raven;
  }

  // Browser Context
  if (window) {
    window.addEventListener('unhandledrejection', event => {
      event.preventDefault();

      const payload = {
        extra: {
          unhandledPromise: true,
          event,
        },
      };

      if (typeof Raven !== 'undefined' && typeof Raven.captureException === 'function') {
        Raven.captureException(event.reason, payload);
      }
    });
  }

  // Node Context
  if (process) {
    process.on('unhandledRejection', (reason, promise) => {
      const payload = {
        extra: {
          unhandledPromise: true,
          promise,
        },
      };

      if (typeof Raven !== 'undefined' && typeof Raven.captureException === 'function') {
        Raven.captureException(reason.message || reason, payload);
      }
    });
  }
}

promiseRejectionHandler();
