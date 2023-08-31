export interface Success {
  kind: 'success',
  data: string
}

export interface Failure {
  kind: 'failure',
  reason: string
}

export type Result = Success | Failure;

export function apiCall(): Result {
  return Math.random() > 0.5 ? {kind: 'success', data: 'I worked'} : {kind: 'failure', reason: 'I failed'};
}

export function onSuccess(success: Success): string {
  console.log(`Succeeded: ${success.data}`);
  return success.data;
}

export function onFailure(failure: Failure): string {
  console.log(`Failed: ${failure.reason}`);
  return failure.reason;
}

export function throwUnsupportedTypeError(result: never): never {
  throw new Error(`Unknown type: ${JSON.stringify(result)}`);
}
