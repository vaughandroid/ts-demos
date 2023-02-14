import {apiCall, onFailure, onSuccess, throwUnsupportedTypeError} from "./core.ts";

function doStuffWithDiscriminatedUnions(): string {
  const result = apiCall();

  if (result.__type === 'success') {
    return onSuccess(result);
  } else {
    return onFailure(result);
  }
}

function doStuffWithFallback(): string {
  const result = apiCall();

  switch (result.__type) {
    case 'success':
      return onSuccess(result);
    case 'failure':
      return onFailure(result);
    default:
      return throwUnsupportedTypeError(result);
  }
}

if (import.meta.main) {
  doStuffWithDiscriminatedUnions();
  doStuffWithFallback();
}
