// components/layout.js
export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full">
      <main className="w-full bg-gray-100 dark:bg-gray-900">{children}</main>
    </div>
  );
}
