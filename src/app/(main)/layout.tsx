export default function MainsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-primary relative flex min-h-dvh w-full flex-col px-5">
      {children}
    </div>
  );
}