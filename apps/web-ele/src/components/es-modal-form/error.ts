const handledFormErrorFlag = Symbol.for('es-admin.handled-form-error');

function markHandledFormError<T>(error: T): T {
  if (error && typeof error === 'object') {
    Object.defineProperty(error, handledFormErrorFlag, {
      configurable: true,
      value: true,
    });
  }

  return error;
}

function isHandledFormError(error: unknown) {
  return Boolean(
    error &&
    typeof error === 'object' &&
    (error as Record<PropertyKey, unknown>)[handledFormErrorFlag],
  );
}

export { isHandledFormError, markHandledFormError };
