"use client";

export default function SignupTemplate({
  header,
  children,
  footer,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white max-w-[375px] mx-auto">
      {header}
      <div className="flex-1 px-6 py-8 space-y-4 pb-32">{children}</div>
      {footer && (
        <div className="fixed bottom-24 left-0 w-full flex justify-center items-center">
          <div className="w-full max-w-[375px] px-6">{footer}</div>
        </div>
      )}
    </div>
  );
}
