import { getGlobalConfig, getLoggerGlobalConfig, getRedefinedKeys, mergeWithGlobalConfig, setGlobalConfig } from "../src/debug-log.config";
import { IDebugLoggerConfig, IDebugLoggerInstanceConfig, TFormatFunction, TLogFunction, ULoggerConfigLevelPrioritet } from "../src/types";
import { createGlobalConfigMock, instanceGlobalConfig2 } from "./globa-config.mock";

function initGlobalConfig(config?: Partial<IDebugLoggerConfig>): IDebugLoggerConfig {
    const configSouorce = createGlobalConfigMock(config);
    setGlobalConfig(configSouorce);

    return configSouorce;
}

function deleteGlobalConfig() {
    setGlobalConfig(undefined);
}


const fakeFormat: TFormatFunction = (message: string, data?: unknown[]) => message;
const fakeLog: TLogFunction = (...vars: unknown[]) => undefined;

describe('Global config', () => {
    beforeEach(() => {
        deleteGlobalConfig();
    })

    describe('functions setGlobalConfig(config) and getGlobalConfig()', () => {
        it('Without execute setGlobalConfig(config), should return undefined', () => {
            const config = getGlobalConfig();
            expect(config).toBeUndefined();
        });
        it('With execute setGlobalConfig(config), should return undefined', () => {
            const configSouorce = initGlobalConfig();

            const config = getGlobalConfig();
            expect(config).toEqual(configSouorce);
        });
    });

    describe('function getLoggerGlobalConfig(id)', () => {
        it('Global logger config is missing, should return undefined.', () => {
            const globalConfig = getLoggerGlobalConfig(instanceGlobalConfig2.id);
            expect(globalConfig).toBeUndefined();
        });
        it('Logger instance  witch "id" is missing, should return undefined.', () => {
            initGlobalConfig();
            const FAKE_CONFIG_ID = 'FAKE_CONFIG_ID';
            const globalConfig = getLoggerGlobalConfig(FAKE_CONFIG_ID);
            expect(globalConfig).toBeUndefined();
        });
    });


    describe('function mergeWithGlobalConfig(localConfig: IDebugLoggerInstanceConfig)', () => {

        it('Global config is undefined, showld return not modified localConfig', () => {
            const localConfig: IDebugLoggerInstanceConfig = { id: 'id-1', label: 'Label 1' };
            const mergedConfig = mergeWithGlobalConfig(localConfig);
            expect(mergedConfig).toEqual(localConfig);
        });
        it('Logger instance global config is missing, showld return not modified localConfig', () => {
            initGlobalConfig();

            const localConfig: IDebugLoggerInstanceConfig = { id: 'id-1', label: 'Label 1' };
            const mergedConfig = mergeWithGlobalConfig(localConfig);
            expect(mergedConfig).toEqual(localConfig);
        });
        describe('mergePrioritet setted:', () => {
            it('global, fields of gloBalConfig should replace fields localConfig', () => {
                const mergePrioritet: ULoggerConfigLevelPrioritet = 'global';
                initGlobalConfig({ mergePrioritet });

                const { id } = instanceGlobalConfig2;
                const redefinedKeys = getRedefinedKeys();

                const globalConfig = getLoggerGlobalConfig(id);
                expect(globalConfig).toBeDefined();
                expect(globalConfig?.id).toEqual(id);


                const localConfig: IDebugLoggerInstanceConfig = {
                    id,
                    label: 'Local label',
                    enabled: false,
                    format: fakeFormat,
                    log: fakeLog
                };

                const masterConfig = globalConfig;
                const mergedConfig = mergeWithGlobalConfig(localConfig);

                redefinedKeys.forEach((key) => {
                    expect(mergedConfig[key]).withContext(key).toEqual(masterConfig?.[key]);
                })
            });

            it('local, fields of localConfig should replace fields gloBalConfig', () => {
                const mergePrioritet: ULoggerConfigLevelPrioritet = 'local';
                initGlobalConfig({ mergePrioritet });

                const { id } = instanceGlobalConfig2;
                const redefinedKeys = getRedefinedKeys();

                const globalConfig = getLoggerGlobalConfig(id);
                expect(globalConfig).toBeDefined();
                expect(globalConfig?.id).toEqual(id);


                const localConfig: IDebugLoggerInstanceConfig = {
                    id,
                    label: 'Local label',
                    enabled: false,
                    format: fakeFormat,
                    log: fakeLog
                };

                const masterConfig = localConfig;
                const mergedConfig = mergeWithGlobalConfig(localConfig);

                redefinedKeys.forEach((key) => {
                    expect(mergedConfig[key]).withContext(key).toEqual(masterConfig?.[key]);
                })
            });
        });
    });
});