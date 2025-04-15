import { TFormatFunction } from "./types";


export const fprint: TFormatFunction = (message: string, values?: unknown[]) => {
    return !values ?
        message :
        values.reduce((output: string, value, i) => output.replaceAll(`%${i}`, String(value)), message);
}
