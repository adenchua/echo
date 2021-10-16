module.exports.removeUndefinedKeysFromObject = (obj) => {
  const result = Object.assign(obj, {});
  Object.keys(result).forEach((key) => result[key] === undefined && delete result[key]);
  return result;
};
