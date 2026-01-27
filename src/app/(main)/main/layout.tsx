import Header from "@/components/roleplay/RoleplayHeader";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex flex-col flex-1">{children}</div>
    </>
  );
}
