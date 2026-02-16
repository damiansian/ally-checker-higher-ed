import { ThemeProvider } from "./theme.jsx";
import { AxeDev } from "./AxeDev.jsx";

import HomePage from "./pages/HomePage.jsx";
import TextAlternativesOverviewPage from "./pages/TextAlternativesOverviewPage.jsx";
import TextAlternativesWordPage from "./pages/TextAlternativesWordPage.jsx";
import TextAlternativesCanvasPage from "./pages/TextAlternativesCanvasPage.jsx";
import TextAlternativesPowerPointPage from "./pages/TextAlternativesPowerPointPage.jsx";
import TextAlternativesPdfPage from "./pages/TextAlternativesPdfPage.jsx";
import TextAlternativesImagePage from "./pages/TextAlternativesImagePage.jsx";
import LanguageOverviewPage from "./pages/LanguageOverviewPage.jsx";
import LanguageWordPage from "./pages/LanguageWordPage.jsx";
import LanguageCanvasPage from "./pages/LanguageCanvasPage.jsx";
import LanguagePdfPage from "./pages/LanguagePdfPage.jsx";
import TextContrastOverviewPage from "./pages/TextContrastOverviewPage.jsx";
import SemanticStructureOverviewPage from "./pages/SemanticStructureOverviewPage.jsx";
import TablesOverviewPage from "./pages/TablesOverviewPage.jsx";
import SeizureRiskOverviewPage from "./pages/SeizureRiskOverviewPage.jsx";

const pages = {
  home: HomePage,
  "text-alternatives-overview": TextAlternativesOverviewPage,
  "text-alternatives-word": TextAlternativesWordPage,
  "text-alternatives-powerpoint": TextAlternativesPowerPointPage,
  "text-alternatives-pdf": TextAlternativesPdfPage,
  "text-alternatives-canvas": TextAlternativesCanvasPage,
  "text-alternatives-image": TextAlternativesImagePage,
  "language-overview": LanguageOverviewPage,
  "language-word": LanguageWordPage,
  "language-canvas": LanguageCanvasPage,
  "language-pdf": LanguagePdfPage,
  "text-contrast-overview": TextContrastOverviewPage,
  "semantic-structure-overview": SemanticStructureOverviewPage,
  "tables-overview": TablesOverviewPage,
  "seizure-risk-overview": SeizureRiskOverviewPage,
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
