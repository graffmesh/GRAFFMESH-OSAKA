import * as Sentry from '@sentry/browser';

class LogManager {
  static instance: LogManager;

  private constructor() {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV || 'development',
    });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new LogManager();
    }
    return this.instance;
  }

  logInfo(message: string, data?: any) {
    console.info(message, data);
    Sentry.addBreadcrumb({ message, data });
  }

  logError(error: Error) {
    console.error(error.message, error.stack);
    Sentry.captureException(error);
  }
}
