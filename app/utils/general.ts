export function shortenDescription(description: string) {
  if (!description) return "";

  const words = description.split(" ");
  return words.length > 25 ? words.slice(0, 25).join(" ") + "..." : description;
};
