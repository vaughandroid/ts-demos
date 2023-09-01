export interface Logger {
  log(text: string): void
}

export function createLogger(): Logger {
  // Using a factory function gives us control over how many instances are created.
  return loggerInstance;
}

class LoggerImpl implements Logger {
  log(text: string): void {
    console.log(text);
  }
}

const loggerInstance = new LoggerImpl();
