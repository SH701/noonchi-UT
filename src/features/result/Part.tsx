export default function Part({
  title,
  desc,
  desc2,
  icon,
}: {
  title: string;
  desc: string;
  desc2?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {icon}
        <h3 className="text-base font-semibold leading-[140%] text-gray-900">
          {title}
        </h3>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <p className="whitespace-pre-line pb-4 text-sm font-medium leading-[140%] text-gray-700">
          {desc}
        </p>
        {desc2 && (
          <>
            <div className="flex border-t border-gray-200 pt-5" />
            <div className="flex gap-3">
              <p className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold leading-[140%] text-blue-500">
                Try
              </p>
              <p className="pt-1.5 text-sm leading-[140%] text-gray-700">
                {desc2}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
