function equalValidator(
  values,
  errors,
  field,
  displayName,
  compareValue,
  message,
) {
  if (!errors[field] && values[field] !== compareValue)
    return { ...errors, [field]: message };
  return errors;
}

export default equalValidator;
