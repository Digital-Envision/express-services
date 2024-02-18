import _ from 'lodash';
import bcrypt from 'bcrypt';

export const hashText = async (text: string) => {
  const salt = await bcrypt.genSalt(+_.get(process.env, 'SALT', 10));

  return bcrypt.hash(text, salt);
};

export const compareText = async (text: string, original: string) => bcrypt.compare(text, original);
