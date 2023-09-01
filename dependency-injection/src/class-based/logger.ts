export function createLogger(): Logger {
  // Using a factory function gives us control over how many instances are created.
  return loggerInstance;
}

export class Logger {
  log(text: string): void {
    console.log(text);
  }
}

const loggerInstance = new Logger();
