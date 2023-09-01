export type LogFn = (text: string) => void;

const logFnInstance: LogFn = (text) => console.log(text);

export function createLogFn(): LogFn {
  // Using a factory function gives us control over how many instances are created.
  return logFnInstance;
}
