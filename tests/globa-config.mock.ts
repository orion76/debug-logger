import { IDebugLoggerConfig, IDebugLoggerInstanceConfig, TFormatFunction, TLogFunction } from "../src/types";

const fakeFormat: TFormatFunction = (message: string, data?: unknown[]) => message;
const fakeLog: TLogFunction = (...vars: unknown[]) => undefined;

export const instanceGlobalConfig1: IDebugLoggerInstanceConfig = {
    id: 'logger-instance-1',
    label: 'LOGGER INSTANCE 1',
    enabled: true,
    format: fakeFormat,
    log: fakeLog
};
export const instanceGlobalConfig2: IDebugLoggerInstanceConfig = {
    id: 'logger-instance-2',
    label: 'LOGGER INSTANCE 2',
    enabled: true,
    format: fakeFormat,
    log: fakeLog
};
export const instanceGlobalConfig3: IDebugLoggerInstanceConfig = {
    id: 'logger-instance-3',
    label: 'LOGGER INSTANCE 3',
    enabled: true,
    format: fakeFormat,
    log: fakeLog
};

export function createGlobalConfigMock(config?: Partial<IDebugLoggerConfig>): IDebugLoggerConfig {
    const _config = config ?? {};
    return {
        enabled: true,
        mergePrioritet: 'global',
        instances: [
            instanceGlobalConfig1,
            instanceGlobalConfig2,
            instanceGlobalConfig3,
        ],
        ..._config
    }
}