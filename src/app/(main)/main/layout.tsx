import { RoleplayHeader } from "@/features/roleplay";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RoleplayHeader />
      <div className="flex flex-1 flex-col">{children}</div>
    </>
  );
}
