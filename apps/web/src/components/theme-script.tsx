// Server Component. Renders a blocking inline script in <head> so the saved theme
// is applied before the first paint, which prevents a light-to-dark flash.
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export function ThemeScript() {
  return (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: static script constant, no user input
    <script dangerouslySetInnerHTML={{ __html: themeScript }} />
  );
}
