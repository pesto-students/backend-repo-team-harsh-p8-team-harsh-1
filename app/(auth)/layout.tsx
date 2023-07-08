export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-center h-full w-full antialiased bg-gradient-to-br from-green-100 to-white">
      {children}
    </div>
  );
};
