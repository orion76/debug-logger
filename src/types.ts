export type TFormatFunction = (message: string, data?: unknown[]) => string
export type TConditionFunction = (...data: unknown[]) => boolean
export type TDebugLogger = (message: string, data?: unknown[] | Function, format?: TFormatFunction, condition?: TConditionFunction) => void;
export type TLogFunction = (...vars: unknown[]) => void;

export type ULoggerConfigLevelPrioritet = 'global' | 'local';


export interface IDebugLoggerConfig {
    mergePrioritet: ULoggerConfigLevelPrioritet;
    enabled?: boolean;
    instances: IDebugLoggerInstanceConfig[];
}

export interface IDebugLoggerInstanceConfig {
    id: string,
    label: string,
    enabled?: boolean;
    format?: TFormatFunction,
    log?: TLogFunction
}