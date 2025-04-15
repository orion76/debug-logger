import { IDebugLoggerConfig, IDebugLoggerInstanceConfig } from "./types";


export function getRedefinedKeys(): (keyof IDebugLoggerInstanceConfig)[] {
    return ['label', 'log', 'enabled', 'format'];
}

export function getGlobalConfig(): IDebugLoggerConfig {
    return globalThis.DEBUG_LOGGER_CONFIG;
}

export function setGlobalConfig(config: IDebugLoggerConfig | undefined) {
    if (config) {
        globalThis.DEBUG_LOGGER_CONFIG = prepareGlobalConfig(config);
    } else {
        globalThis.DEBUG_LOGGER_CONFIG = undefined;
    }
}

export function addDefaultSetting(config: IDebugLoggerInstanceConfig) {
    if (!config.log) {
        config.log = console.log
    };
}

function prepareGlobalConfig(config: IDebugLoggerConfig): IDebugLoggerConfig {
    if (isEmpty(config.enabled)) {
        config.enabled = false;
    }
    if (!Array.isArray(config.instances)) {
        config.instances = [];
    }
    return config;
}

export function getLoggerGlobalConfig(id: string): IDebugLoggerInstanceConfig | undefined {
    return getGlobalConfig()?.instances.find((conf) => conf.id === id);
}

function isEmpty(value: unknown) {
    return value === undefined || value === null;
}

function mergeConfig<T extends IDebugLoggerInstanceConfig = IDebugLoggerInstanceConfig>(
    globalConfig: T,
    localConfig: T,

) {
    const { mergePrioritet } = getGlobalConfig();
    const overrideFields: (keyof T)[] = getRedefinedKeys();

    const { master, slave } = mergePrioritet === 'global'
        ? { master: globalConfig, slave: { ...localConfig } }
        : { master: localConfig, slave: { ...globalConfig } }

    overrideFields.forEach(prop => {
        if (!isEmpty(master[prop])) {
            slave[prop] = master[prop]
        }
    })

    return slave;
}

export function mergeWithGlobalConfig(localConfig: IDebugLoggerInstanceConfig): IDebugLoggerInstanceConfig {
    const { id } = localConfig;
    const globalConfig = getLoggerGlobalConfig(id);
    let returnConfig: IDebugLoggerInstanceConfig;
    if (globalConfig) {
        returnConfig = mergeConfig(globalConfig, localConfig)
    } else {
        returnConfig = localConfig;
    }

    return returnConfig;
}