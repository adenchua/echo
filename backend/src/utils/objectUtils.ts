const removeUndefinedKeysFromObject = (obj: object) => {
  const result = Object.assign(obj, {});
  Object.keys(result).forEach(
    (key) =>
      result[key as keyof typeof result] === undefined && delete result[key as keyof typeof result],
  );
  return result;
};

export default { removeUndefinedKeysFromObject };
