import winston from 'winston';
import path from 'path';

export class Logger {
    private static logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
        transports: [
            new winston.transports.File({ 
                filename: path.join('logs', 'error.log'), 
                level: 'error' 
            }),
            new winston.transports.File({ 
                filename: path.join('logs', 'combined.log') 
            }),
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                )
            })
        ]
    });

    static info(message: string, meta?: any) {
        this.logger.info(message, meta);
    }

    static error(message: string, error?: any) {
        this.logger.error(message, error);
    }

    static debug(message: string, meta?: any) {
        this.logger.debug(message, meta);
    }
}