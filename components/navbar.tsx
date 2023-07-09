import { redirect } from "next/navigation";

import StoreSwitcher from "@/components/store-switcher";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import prismadb from "@/lib/prismadb";
import { getDataFromToken } from "@/actions/get-data-from-token";
import { UserNav } from "@/components/user-nav";

const Navbar = async () => {
  const { userId, userName, userEmail } = getDataFromToken();

  if (!userId) {
    redirect('/sign-in');
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    }
  });

  return ( 
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserNav {...{ userName, userEmail }} />
        </div>
      </div>
    </div>
  );
};
 
export default Navbar;
