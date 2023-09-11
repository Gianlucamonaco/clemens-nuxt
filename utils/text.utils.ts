import {specialChars} from '../data/constants';

export const randomChars = (count: number): string => {
  const charset = Object.values(specialChars);
  let string = '';

  for (let i = 0; i < count; i++) {
    const index = ~~(Math.random() * charset.length);
    string += charset[index];
  }

  return string;
}