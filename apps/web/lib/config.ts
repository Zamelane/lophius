// types.ts
export type EnvType = {
  [key: string]: string | undefined;
  CONFIGURED?: 'false' | 'true';
}

// config.ts
declare global {
  // eslint-disable-next-line no-var
  var __env_config__: {
    isConfigured: boolean;
    env: EnvType;
    loaded: boolean;
  };
}

// Инициализация глобальной переменной
if (!global.__env_config__) {
  global.__env_config__ = {
    isConfigured: false,
    env: {},
    loaded: false
  };
}

export const getIsConfigured = () => global.__env_config__.isConfigured;
export const getEnv = () => global.__env_config__.env;

function loadConfiguredStatus() {
  console.log('Configured is loaded');
  console.log(getEnv().CONFIGURED);
  global.__env_config__.isConfigured = getEnv().CONFIGURED === 'true';
}

export function loadConfig(configToSet?: EnvType) {
  console.log(configToSet);
  
  const currentEnv = getEnv();
  
  if (configToSet) {
    Object.keys(configToSet).forEach(key => {
      currentEnv[key] = configToSet[key];
    });
  } else {
    Object.keys(process.env).forEach(key => {
      currentEnv[key] = process.env[key];
    });
  }

  loadConfiguredStatus();
}

// DEVELOPMENT инициализация
if (!global.__env_config__.loaded) {
  loadConfig();
  global.__env_config__.loaded = true;
}