import { redirect } from 'next/navigation';
import { getDataFromToken } from '@/actions/get-data-from-token';

import prismadb from '@/lib/prismadb';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = getDataFromToken();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    }
  });

  if (store) {
    redirect(`/${store.id}`);
  };

  return (
    <div className="flex items-center justify-center h-full w-full antialiased bg-gradient-to-br from-green-100 to-white">
      {children}
    </div>
  );
};
