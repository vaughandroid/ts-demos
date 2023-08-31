import {apiCall, onFailure, onSuccess, throwUnsupportedTypeError} from "./core";

function doStuffWithDiscriminatedUnions(): string {
  const result = apiCall();

  if (result.kind === 'success') {
    return onSuccess(result);
  } else {
    return onFailure(result);
  }
}

function doStuffWithFallback(): string {
  const result = apiCall();

  switch (result.kind) {
    case 'success':
      return onSuccess(result);
    case 'failure':
      return onFailure(result);
    default: {
      throwUnsupportedTypeError(result);
    }
  }
}

if (require.main === module) {
  doStuffWithDiscriminatedUnions();
  doStuffWithFallback();
}
