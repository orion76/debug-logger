import { addDefaultSetting, mergeWithGlobalConfig } from "./debug-log.config";
import { TFormatFunction, TConditionFunction, IDebugLoggerInstanceConfig } from "./types";


export function createDebugLogger(config: IDebugLoggerInstanceConfig) {
    if (!config.enabled) {
        return () => undefined;
    }
    addDefaultSetting(config);
    mergeWithGlobalConfig(config);
    const { label, format: globalFormat, log } = config;

    return (message?: string, data?: unknown[] | Function, localFormat?: TFormatFunction, condition?: TConditionFunction) => {
        if (!condition || condition()) {
            const _data = typeof data === 'function' ? data() : data;
            const _format = localFormat || globalFormat;
            const output: unknown[] = [label];
            if (_format) {
                if (message) {
                    output.push(_format(message, _data));
                }
            } else {
                if (message) {
                    output.push(message);
                }
                if (_data) {
                    output.push(_data);
                }
            }
            log!(...output);
        }
    }
}