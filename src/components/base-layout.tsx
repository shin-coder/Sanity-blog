export default function BaseLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <main className="px-8 md:px-20">{children}</main>
    </>
  );
}
