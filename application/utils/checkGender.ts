export const checkGender = (name: string) => {
  if (name?.endsWith('a')) {
    return 'female';
  } else if (!name?.endsWith('a')) {
    return 'male';
  } else {
    return 'unknown';
  }
};
