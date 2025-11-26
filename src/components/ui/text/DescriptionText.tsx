export default function DescriptionText({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className="text-sm text-gray-500 leading-[140%]">{children}</p>;
}
