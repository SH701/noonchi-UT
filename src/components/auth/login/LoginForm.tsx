interface Props {
  email: string;
  password: string;
  error: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  handleLogin: () => void;
}

export default function LoginForm({
  email,
  password,
  error,
  setEmail,
  setPassword,
  handleLogin,
}: Props) {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          placeholder="example@gmail.com"
          className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />
      </div>

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
    </>
  );
}
