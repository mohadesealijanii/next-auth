import { hash } from "bcryptjs";

async function hashPass(password) {
  const hashedPass = await hash(password, 12);
  return hashedPass;
}

export { hashPass };
