export function colorNameToHex(color) {
  const el = document.createElement("div");
  el.style.color = color;

  document.body.appendChild(el);

  const computedColor = getComputedStyle(el).color;
  document.body.removeChild(el);

  // If invalid, browser returns "rgb(0, 0, 0)" or empty
  if (!computedColor || !computedColor.startsWith("rgb")) {
    return null;
  }

  const rgb = computedColor
    .match(/\d+/g)
    ?.map(Number);

  if (!rgb || rgb.length < 3) return null;

  const [r, g, b] = rgb;

  return (
    "#" +
    [r, g, b]
      .map(x => x.toString(16).padStart(2, "0"))
      .join("")
  );
}
