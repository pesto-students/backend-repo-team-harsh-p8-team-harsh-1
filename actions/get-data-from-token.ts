import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string,
  userName: string,
  userEmail: string,
}

export function getDataFromToken () {
  const cookieStore = cookies();
  const token = cookieStore?.get('token')?.value || '';
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  return decodedToken ?? {};

}

