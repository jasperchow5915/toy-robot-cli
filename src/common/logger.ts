import { addColors, createLogger, format, transports } from 'winston';

export enum Level {
    BEGIN = 'BEGIN', 
    SUCCESS = 'SUCCESS',
    WARNING = 'WARNING',
    ERROR = 'ERROR',
    REPORT = 'REPORT',
    END = 'END'
}

type LevelConfig = {
    levels: { [key in Level]: number },
    colors: { [key in Level]: string }
}

const LevelsConfig : LevelConfig = {
    levels: {
        BEGIN: 0,
        SUCCESS: 1,
        WARNING: 2,
        ERROR: 3,
        REPORT: 4,
        END: 5
    },
    colors: {
        BEGIN: 'white',
        SUCCESS: 'green',
        WARNING: 'yellow',
        ERROR: 'red',
        REPORT: 'magenta',
        END: 'white'
    }
};

const logger = createLogger({
    level: 'BEGIN',
    levels: LevelsConfig.levels,
    format: format.json(),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            ),
            level: 'REPORT'
        })
    ]
});

addColors(LevelsConfig.colors);

module.exports = logger;