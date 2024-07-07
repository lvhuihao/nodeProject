import Winston from 'winston';
const { createLogger, transports, format } = Winston
const getCurrentDateFormatted = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}${month}${day}`;
};


export default createLogger({
    transports: [
        new transports.File({
            filename: `logs/${getCurrentDateFormatted()}.log`,
            level: "info",
            format: format.combine(
                format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
                format.align(),
                format.printf(
                    (info) =>
                        `${info.level}: ${[info.timestamp]}: ${info.message}`
                )
            ),
        }),
    ],
});