export type TFormatFunction = (message: string, data?: unknown[]) => string
export type TConditionFunction = (
    config: IDebugLoggerInstanceConfig,
    messsage?: string,
    data?: unknown[] | Function
) => boolean

export type TDebugLogger = (message: string, data?: unknown[] | Function, format?: TFormatFunction, condition?: TConditionFunction) => void;
export type TLogFunction = (...vars: unknown[]) => void;

export type ULoggerConfigLevelPrioritet = 'global' | 'local';


export interface IDebugLoggerConfig {
    mergePrioritet: ULoggerConfigLevelPrioritet;
    enabled?: boolean;
    instances: IDebugLoggerInstanceConfig[];
}

export interface IDebugLoggerInstanceConfig<C extends object = object> {
    id: string,
    label: string,
    enabled?: boolean;
    format?: TFormatFunction,
    log?: TLogFunction,
    condition?: C
}