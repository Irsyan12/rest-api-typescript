import pino from 'pino'
import moment from 'moment'

export const logger = pino({
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${moment().format()}"`,
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    }
})
