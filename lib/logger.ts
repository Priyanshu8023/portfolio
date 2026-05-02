type LogLevel = "info" | "warn" | "error";

type LogContext = Record<string, unknown>;

function writeLog(level: LogLevel, message: string, context: LogContext = {}) {
  const payload = {
    level,
    message,
    context,
    timestamp: new Date().toISOString(),
  };

  if (level === "error") {
    console.error(JSON.stringify(payload));
    return;
  }

  if (level === "warn") {
    console.warn(JSON.stringify(payload));
    return;
  }

  console.log(JSON.stringify(payload));
}

export const log = (message: string, context: LogContext = {}) => {
  writeLog("info", message, context);
};

export const warn = (message: string, context: LogContext = {}) => {
  writeLog("warn", message, context);
};

export const error = (message: string, context: LogContext = {}) => {
  writeLog("error", message, context);
};
