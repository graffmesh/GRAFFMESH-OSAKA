/**
 * Global type declarations for the application
 * @packageDocumentation
 */

interface EnvConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  API_URL: string;
}

declare global {
  namespace NodeJS {
    /**
     * Extended ProcessEnv interface with strongly typed environment variables
     */
    export interface ProcessEnv {
      NODE_ENV: EnvConfig['NODE_ENV'];
      API_URL: EnvConfig['API_URL'];
    }
  }
}

export * from './Annotation';
export * from './Api';
export * from './Message';
