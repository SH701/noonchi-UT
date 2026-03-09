export function renderWithAction(text: string) {
  return text.split(/(\*[^*]*\*)/g).map((part, i) =>
    /^\*[^*]*\*$/.test(part) ? (
      <span key={i} className="text-gray-400">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}