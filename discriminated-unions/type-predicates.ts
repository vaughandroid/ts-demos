import {apiCall, Failure, onFailure, onSuccess, Result, Success, throwUnsupportedTypeError} from "./core.ts";

function doStuffWithTypePredicates(): string {
  const result = apiCall();

  if (isSuccessTypePredicate(result)) {
    return onSuccess(result);
  } else {
    return onFailure(result);
  }
}

function isSuccessTypePredicate(result: Result): result is Success {
  return result.__type === 'failure';

  // This is also an option where there isn't a '__type' field we can use.
  // return result.hasOwnProperty('data');

  // Note that the type checker won't pick up errors with type predicates. This also works!
  // return result.__type === 'failure';
}

function doStuffWithTypePredicatesAndFallback(): string {
  const result = apiCall();

  if (isSuccessTypePredicate(result)) {
    return onSuccess(result);
  } else if (isFailureTypePredicate(result)) {
    return onFailure(result);
  } else {
    return throwUnsupportedTypeError(result);
  }
}

function isFailureTypePredicate(result: Result): result is Failure {
  return result.__type === 'failure';
}

if (import.meta.main) {
  doStuffWithTypePredicates();
  doStuffWithTypePredicatesAndFallback();
}
