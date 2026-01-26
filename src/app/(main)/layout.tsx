export default function MainsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen flex flex-col px-5 relative">
      {children}
    </div>
  );
}
