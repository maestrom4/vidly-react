// import * as Sentry from '@sentry/react';
// import { Integrations } from '@sentry/tracing';

function init() {
  //   Sentry.init({
  //     dsn:
  //       'https://35f2d5ae28534a52bf15bfdc1877f1c1@o486045.ingest.sentry.io/5542232',
  //     integrations: [new Integrations.BrowserTracing()],
  //     // We recommend adjusting this value in production, or using tracesSampler
  //     // for finer control
  //     tracesSampleRate: 1.0,
  //   });
}

function log(error) {
  //   Sentry.captureException(error);
}

export default {
  init,
  log,
};
