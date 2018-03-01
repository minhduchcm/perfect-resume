function regexValidator(values, errors, field, displayName, regex, message) {
  if (!errors[field] && !regex.test(values[field]))
    return { ...errors, [field]: message };
  return errors;
}

export default regexValidator;
