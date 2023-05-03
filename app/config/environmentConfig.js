/* Environments */
const environments = {
  PROD: 'PROD',
  DEV: 'DEV',
};

// const currentEnvironment = environments.PROD;
// const currentEnvironment = environments.DEV;
const currentEnvironment =
  process.env.RUN_MODE &&
  (Object.keys(environments).includes(process.env.RUN_MODE)
    ? environments[process.env.RUN_MODE]
    : environments.DEFAULT);

/* URL Prefixes */

console.log(environments, process.env, '===');
const port = process.env.PORT || window.location.port;
const apiUrlPrefixes = {
  [environments.PROD]:
    process.env.REACT_APP_BACKEND_URL ||
    process.env.BACKEND_URL ||
    `${window.location.protocol}//${window.location.hostname}${port}`,
  // [environments.DEV]: `https://apistaging.justmyroots.com`,
  [environments.DEV]: `http://43.205.31.129:4040`,
  [environments.PROD]: `http://43.205.31.129:4040`,
  // [environments.PROD]: `https://apistaging.justmyroots.com`,
};

const currentApiUrlPrefix = apiUrlPrefixes[currentEnvironment];

/* Log configuration */
const logLevels = {
  TRACE: 'TRACE',
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  OFF: 'SILENT',
};

/* Environment Specific configs */
const environmentConfigs = {
  [environments.PROD]: {
    enableAuthorization: true,
    enableMock: false,
    logLevel: logLevels.WARN,
  },
  [environments.DEV]: {
    enableAuthorization: true,
    enableMock: false,
    logLevel: logLevels.DEBUG,
  },
  [environments.SIT]: {
    enableAuthorization: true,
    enableMock: false,
    logLevel: logLevels.DEBUG,
  },
  [environments.UAT]: {
    enableAuthorization: true,
    enableMock: false,
    logLevel: logLevels.DEBUG,
  },
};

const currentEnvironmentConfig = environmentConfigs[currentEnvironment];

/* Exports */
export {
  environments,
  currentEnvironment,
  apiUrlPrefixes,
  currentApiUrlPrefix,
  environmentConfigs,
  currentEnvironmentConfig,
  logLevels,
};
