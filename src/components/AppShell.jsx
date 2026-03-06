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
import LanguagePowerPointPage from "./pages/LanguagePowerPointPage.jsx";
import ColorOverviewPage from "./pages/ColorOverviewPage.jsx";
import ColorWordPage from "./pages/ColorWordPage.jsx";
import ColorPowerPointPage from "./pages/ColorPowerPointPage.jsx";
import ColorPdfPage from "./pages/ColorPdfPage.jsx";
import ColorCanvasPage from "./pages/ColorCanvasPage.jsx";
import SemanticStructureOverviewPage from "./pages/SemanticStructureOverviewPage.jsx";
import SemanticStructureWordPage from "./pages/SemanticStructureWordPage.jsx";
import SemanticStructurePowerPointPage from "./pages/SemanticStructurePowerPointPage.jsx";
import SemanticStructurePdfPage from "./pages/SemanticStructurePdfPage.jsx";
import SemanticStructureCanvasPage from "./pages/SemanticStructureCanvasPage.jsx";
import TablesOverviewPage from "./pages/TablesOverviewPage.jsx";
import TablesWordPage from "./pages/TablesWordPage.jsx";
import TablesPowerPointPage from "./pages/TablesPowerPointPage.jsx";
import TablesPdfPage from "./pages/TablesPdfPage.jsx";
import TablesCanvasPage from "./pages/TablesCanvasPage.jsx";
import SeizureRiskOverviewPage from "./pages/SeizureRiskOverviewPage.jsx";
import SeizureRiskImagePage from "./pages/SeizureRiskImagePage.jsx";

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
  "language-powerpoint": LanguagePowerPointPage,
  "color-overview": ColorOverviewPage,
  "color-word": ColorWordPage,
  "color-powerpoint": ColorPowerPointPage,
  "color-pdf": ColorPdfPage,
  "color-canvas": ColorCanvasPage,
  "semantic-structure-overview": SemanticStructureOverviewPage,
  "semantic-structure-word": SemanticStructureWordPage,
  "semantic-structure-powerpoint": SemanticStructurePowerPointPage,
  "semantic-structure-pdf": SemanticStructurePdfPage,
  "semantic-structure-canvas": SemanticStructureCanvasPage,
  "tables-overview": TablesOverviewPage,
  "tables-word": TablesWordPage,
  "tables-powerpoint": TablesPowerPointPage,
  "tables-pdf": TablesPdfPage,
  "tables-canvas": TablesCanvasPage,
  "seizure-risk-overview": SeizureRiskOverviewPage,
  "seizure-risk-image": SeizureRiskImagePage,
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
