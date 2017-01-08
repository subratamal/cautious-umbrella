
export default (store) => (next) => (action) => {
  let Raven = global.Raven;
  if (!Raven) {
    Raven = window.Raven;
  }

  if (!Raven.isSetup()) {
    console.error('Sentry Raven is not configured.');
  }

  try {
    return next(action);
  } catch (error) {
    const payload = {
      extra: {
        action: typeof action === 'function' ? action.toString() : action,
        state: store.getState(),
      },
    };
    if (typeof Raven !== 'undefined' && typeof Raven.captureException === 'function') {
      Raven.captureException(error, payload);
    }
    throw error;
  }
};
