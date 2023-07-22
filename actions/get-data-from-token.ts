import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string,
  userName: string,
  userEmail: string,
  isAdmin: boolean,
}

export function getDataFromToken ():JwtPayload {
  const cookieStore = cookies();
  const token = cookieStore?.get('token')?.value || '';
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  return decodedToken?.isAdmin ? decodedToken : {} as JwtPayload;

}

