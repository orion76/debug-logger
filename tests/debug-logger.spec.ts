import { createDebugLogger } from "../src/debug-logger-factory";
import { fprint } from "../src/formatters";
import { IDebugLoggerInstanceConfig, TFormatFunction, TLogFunction } from "../src/types";


function createConfig(log: TLogFunction, enabled: boolean, format: TFormatFunction = fprint): IDebugLoggerInstanceConfig {
    return {
        id: 'debug-logger',
        label: '[DEBUG LOGGER]',
        format,
        enabled,
        log
    }
}


describe('Debug Logger', () => {
    let log: jasmine.Spy<TLogFunction>;

    beforeEach(() => {
        log = jasmine.createSpy('LOG_FUNCTION');

    })

    it('is enabled, should work', () => {
        const enabled = true;
        const config = createConfig(log, enabled)
        const debug = createDebugLogger(config);

        spyOn({ debug }, 'debug');

        const MESSAGE = 'LOG MESSAGE';

        debug(MESSAGE);

        expect(log.calls.mostRecent().args[0]).toEqual(config.label);
        expect(log.calls.mostRecent().args[1]).toEqual(MESSAGE);

    });

    it('is not enabled, should be silent', () => {
        const enabled = false;

        const config = createConfig(log, enabled)
        const debug = createDebugLogger(config);

        const MESSAGE = 'LOG MESSAGE';
        debug(MESSAGE);

        expect(log.calls.mostRecent()).toBeUndefined();
    });

    it('With global format function, should format output', () => {
        const enabled = true;

        const gFormat: TFormatFunction = (message: string, data?: unknown[]) => {
            return !data ? message : data.join(message);
        }
        const config = createConfig(log, enabled, gFormat)
        const debug = createDebugLogger(config);


        const MESSAGE = '<>';
        const data = [1, 2, 3];

        debug(MESSAGE);
        expect(log.calls.mostRecent().args[1]).toEqual(MESSAGE);


        debug(MESSAGE, data);
        expect(log.calls.mostRecent().args[1]).toEqual(`${data[0]}${MESSAGE}${data[1]}${MESSAGE}${data[2]}`);
    });
});