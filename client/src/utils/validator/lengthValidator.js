function lengthValidator(values, errors, field, displayName, min, max) {
  const hasMin = !isNaN(min);
  const hasMax = !isNaN(max);
  const length = (values[field] && values[field].length) || 0;
  if (errors[field]) return errors;
  if (hasMin && hasMax && (length < min || length > max)) {
    return {
      ...errors,
      [field]: `${displayName}  must be between ${min} and ${max} characters length respectively.`,
    };
  } else if (hasMin && length < min) {
    return {
      ...errors,
      [field]: `${displayName}  must be more than ${min} characters respectively.`,
    };
  } else if (hasMax && length > max) {
    return {
      ...errors,
      [field]: `${displayName}  must be more less ${max} characters respectively.`,
    };
  }
  return errors;
}

export default lengthValidator;
