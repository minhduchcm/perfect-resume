function requiredValidator(values, errors, field, displayName) {
  if (!errors[field] && !values[field])
    return { ...errors, [field]: `${displayName} is required.` };
  return errors;
}

export default requiredValidator;
