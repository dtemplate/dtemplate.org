export function validateTypesAndKeysJson(json: any, validTypes: any): boolean {
  const jsonKeys = Object.keys(json);
  const validTypesKeys = Object.keys(validTypes);
  let isValid = true;

  if (jsonKeys.length !== validTypesKeys.length) {
    isValid = false;
  }

  for (const key of jsonKeys) {
    if (!validTypesKeys.includes(key)) {
      isValid = false;
    }

    const jsonValue = json[key];
    const validType = validTypes[key];

    if (
      (typeof jsonValue).toLocaleLowerCase() === 'object' &&
      validType !== 'object'
    ) {
      isValid = validateTypesAndKeysJson(jsonValue, validType);
    } else if ((typeof jsonValue).toLocaleLowerCase() !== validType) {
      isValid = false;
    }
  }

  return isValid;
}
