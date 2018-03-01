import { model as User } from '../models/user';

export default async email => {
  const user = await User.findOne({ email });
  if (user !== null) throw new Error();
};
