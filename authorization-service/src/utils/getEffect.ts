import { EffectType } from '../constants';

const getEffect = (username: string, password: string): EffectType => {
  const storedPassword = process.env[username];

  if (!storedPassword) {
    console.log('Empty stored password for the user');
    return EffectType.Deny;
  }

  const isCorrectPassword = storedPassword === password;

  if (!isCorrectPassword) {
    console.log('Wrong password for the user');
    return EffectType.Deny;
  }

  return EffectType.Allow;
}

export default getEffect;
