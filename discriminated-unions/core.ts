export interface Success {
  __type: 'success',
  data: string
}

export interface Failure {
  __type: 'failure',
  reason: string
}

export type Result = Success | Failure;

export function apiCall(): Result {
  return Math.random() > 0.5 ? {__type: 'success', data: 'I worked'} : {__type: 'failure', reason: 'I failed'};
}

export function onSuccess(success: Success): string {
  console.log(`Succeeded: ${success.data}`);
  return success.data;
}

export function onFailure(failure: Failure): string {
  console.log(`Failed: ${failure.reason}`);
  return failure.reason;
}

export function throwUnsupportedTypeError(result: unknown): never {
  throw new Error(`Unknown type: ${result}`);
}
