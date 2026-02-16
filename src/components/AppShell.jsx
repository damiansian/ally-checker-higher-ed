import { ThemeProvider } from "./theme.jsx";
import { AxeDev } from "./AxeDev.jsx";

import HomePage from "./pages/HomePage.jsx";
import TextAlternativesWordPage from "./pages/TextAlternativesWordPage.jsx";
import TextAlternativesCanvasPage from "./pages/TextAlternativesCanvasPage.jsx";
import LanguageWordPage from "./pages/LanguageWordPage.jsx";
import LanguageCanvasPage from "./pages/LanguageCanvasPage.jsx";
import TextAlternativesPowerPointPage from "./pages/TextAlternativesPowerPointPage.jsx";
import LanguagePdfPage from "./pages/LanguagePdfPage.jsx";
import TextAlternativesPdfPage from "./pages/TextAlternativesPdfPage.jsx";
import TextAlternativesImagePage from "./pages/TextAlternativesImagePage.jsx";

const pages = {
  home: HomePage,
  "text-alternatives-word": TextAlternativesWordPage,
  "text-alternatives-powerpoint": TextAlternativesPowerPointPage,
  "text-alternatives-pdf": TextAlternativesPdfPage,
  "text-alternatives-canvas": TextAlternativesCanvasPage,
  "text-alternatives-image": TextAlternativesImagePage,
  "language-word": LanguageWordPage,
  "language-canvas": LanguageCanvasPage,
  "language-pdf": LanguagePdfPage,
};

/**
 * Wraps the app with ThemeProvider and AxeDev (dev-only a11y).
 * Accepts a `page` string key to resolve the page component from the
 * internal registry. This avoids passing a component reference as an
 * Astro prop (which can't be serialized for client hydration).
 */
export function AppShell({ page }) {
  const Page = pages[page];
  return (
    <ThemeProvider>
      <AxeDev />
      {Page ? <Page /> : null}
    </ThemeProvider>
  );
}
