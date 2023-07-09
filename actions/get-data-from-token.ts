import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken';
import { toast } from 'react-hot-toast';

export const getDataFromToken = () => {
  try {
    const cookieStore = cookies()
    const token = cookieStore?.get('token')?.value || '';
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as Record<string, string>;
    return decodedToken ?? {};
  } catch (error: any) {
    console.log(error);
    toast.error(error.message)
    throw new Error(error.message);
  }
}

