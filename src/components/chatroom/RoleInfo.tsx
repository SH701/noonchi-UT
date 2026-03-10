interface RoleInfoProps {
  aiRole: string;
  userRole: string;
}

export default function RoleInfo({ aiRole, userRole }: RoleInfoProps) {
  return (
    <div className="pb-3 text-sm text-gray-600">
      <p>
        <span className="font-bold">AI: </span>
        {aiRole}
      </p>
      <p>
        <span className="font-bold">You: </span>
        {userRole}
      </p>
    </div>
  );
}
