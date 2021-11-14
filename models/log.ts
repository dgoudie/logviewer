export interface LogMeta {
    index: {
        _index: string;
    };
}

export interface Index {
    _index: string;
    _type: string;
}

export interface Log {
    message: string;
    context: { [key: string]: any };
    level: number;
    level_name: LogLevel;
    datetime: string;
    extra?: { [key: string]: any };
}

export type LogLevel =
    | 'MARK'
    | 'TRACE'
    | 'DEBUG'
    | 'INFO'
    | 'WARN'
    | 'ERROR'
    | 'FATAL';

export const parseLog = (log: string): [LogMeta, Log] => {
    const split = log.split('\n');
    return [JSON.parse(split[0]), JSON.parse(split[1])];
};

export interface DatabaseLog extends Omit<Log, 'datetime'> {
    application: string;
    datetime: Date;
}

export const convertToDatabaseLog = (
    logAndMeta: [LogMeta, Log]
): DatabaseLog => {
    let log = {
        ...logAndMeta[1],
        application: logAndMeta[0].index._index,
        datetime: new Date(logAndMeta[1].datetime),
    };
    delete log.extra;
    return log;
};
