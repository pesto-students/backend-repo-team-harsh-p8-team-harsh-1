import { headers } from 'next/headers'
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string,
  userName: string,
  userEmail: string,
  isAdmin: boolean,
}

export function getUserFromHeaders ():JwtPayload {
  const headersInstance = headers()
  const authorization = headersInstance.get('authorization')
  const jwtToken = authorization?.split(' ')?.[1]!;
  const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET!) as JwtPayload;
  return decodedToken || {};

}
