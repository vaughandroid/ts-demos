import {apiCall, Failure, onFailure, onSuccess, Success, throwUnsupportedTypeError} from "./core";

function doStuffWithCallbacks() {
  apiCallWithCallbacks(onSuccess, onFailure);
  // or explicitly...
  apiCallWithCallbacks(
    (success: Success) => onSuccess(success),
    (failure: Failure) => onFailure(failure)
  );
  // or inline...
  apiCallWithCallbacks(
    (success: Success) => { console.log(`Succeeded: ${success.data}`); },
    (failure: Failure) => { console.log(`Failed: ${failure.reason}`); }
  );
}

function apiCallWithCallbacks(
  successCallback: (success: Success) => void,
  failureCallback: (failure: Failure) => void
) {
  const result = apiCall();

  switch (result.kind) {
    case 'success':
      successCallback(result);
      break;
    case 'failure':
      failureCallback(result);
      break;
    default:
      throwUnsupportedTypeError(result);
  }
}

if (require.main === module) {
  doStuffWithCallbacks();
}
