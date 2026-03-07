import { useTheme } from "@/components/theme.jsx";
import { ContentPageLayout } from "@/components/layout.jsx";
import {
  AllyErrorBox,
  Step,
  CompareBoxes,
  RefTable,
  ResourceLink,
  Callout,
} from "@/components/content.jsx";

function SH({ id, children }) {
  const { t } = useTheme();
  return (
    <h2 id={id} style={{
      fontSize: 22, fontWeight: 700, color: t.text,
      fontFamily: "var(--font-display)",
      letterSpacing: "-0.01em",
      marginTop: 56, marginBottom: 16,
      paddingTop: 20, scrollMarginTop: 80,
    }}>{children}</h2>
  );
}

function H3({ children }) {
  const { t } = useTheme();
  return (
    <h3 style={{
      fontSize: 16, fontWeight: 700, color: t.text,
      fontFamily: "var(--font-display)",
      margin: "28px 0 14px",
    }}>{children}</h3>
  );
}

function P({ children }) {
  const { t } = useTheme();
  return (
    <p style={{
      fontSize: 15.5, lineHeight: 1.75, color: t.text,
      fontFamily: "var(--font-body)",
      margin: "0 0 18px",
    }}>{children}</p>
  );
}

export default function LanguagePowerPointPage() {
  return (
    <ContentPageLayout
      categorySlug="language"
      fileTypeSlug="powerpoint"
      title="DRAFT - Language"
      subtitle="PowerPoint Presentations"
    >
      <SH id="ally-error">The Ally Error</SH>
      <AllyErrorBox
        message="Presentation does not have a language set"
        severity="Severe"
        wcag="3.1.1 Language of Page (Level A)"
      />
      <P>
        Ally may report that a presentation does not have a language set, or
        that it has the wrong language. PowerPoint files should have a
        document language so screen readers know which pronunciation rules
        to use.
      </P>
      <AllyErrorBox
        message="Presentation does not have the correct language set"
        severity="Severe"
        wcag="3.1.2 Language of Parts (Level AA)"
      />

      <SH id="why-matters">Why This Matters</SH>
      <P>
        Without a set language, screen readers assume a default (often
        English) and mispronounce content in other languages. For
        presentations that include quotations or content in multiple
        languages, correct language tagging is essential.
      </P>

      <SH id="unreliable">Unreliable Detection</SH>
      <Callout type="warning">
        <div style={{
          fontWeight: 600, fontFamily: "var(--font-display)",
          marginBottom: 6, fontSize: 14,
        }}>
          Ally&apos;s language detection may not work reliably for PowerPoint
        </div>
        In testing, Ally&apos;s language checks failed to fire for DOCX,
        PPTX, and PDF despite documentation claiming coverage. Language is
        checked reliably in Canvas (HTML via axe-core). For PowerPoint,
        do not assume that the absence of an Ally error means the file is
        correctly set; verify in PowerPoint and fix proactively.
      </Callout>

      <SH id="how-to-fix">How to Fix It</SH>
      <H3>Setting document language in PowerPoint</H3>
      <Step number="1">Open the presentation and go to <strong>File → Options</strong>.</Step>
      <Step number="2">Select <strong>Language</strong>. Under &quot;Choose Display and Help Languages,&quot; ensure the primary editing language (and, if needed, the proofing language) is correct.</Step>
      <Step number="3">Set the document language: In some versions, <strong>Review → Language → Set Proofing Language</strong> can affect the document language. Set the default language for the presentation to match the primary content.</Step>
      <Step number="4">Save and re-upload to your LMS. If Ally still does not flag issues, the file may still have incorrect or missing language metadata; manual verification is recommended.</Step>

      <H3>Slides with content in another language</H3>
      <P>
        <a href="https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html" target="_blank" rel="noopener noreferrer">WCAG 3.1.2 (Language of Parts)</a> applies when a passage is in a
        different language than the page default. PowerPoint does not
        offer a built-in way to tag a selection or slide with a different
        language. Best practice is to note in the speaker notes or in the
        slide text that content is in another language, and to set the
        document language to the primary language of the presentation.
      </P>

      <SH id="ally-catches">What Ally Catches and Misses</SH>
      <CompareBoxes
        catches="In theory: missing or incorrect document language. In practice, detection for PPTX has been unreliable in testing."
        misses="Language of parts (passages in a different language), reliable firing of the check for PowerPoint uploads"
      />

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally errors", "Presentation does not have a language set / correct language set"],
        ["WCAG", "3.1.1 Language of Page (A) / 3.1.2 Language of Parts (AA)"],
        ["Detection", "Unreliable for PPTX - verify in PowerPoint and fix proactively"],
        ["Fix", "File → Options → Language; set proofing/document language"],
      ]} />

      <SH id="resources">Resources</SH>
      <ResourceLink
        title="W3C: Understanding Language of Page"
        href="https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html"
        description="WCAG 3.1.1 explained"
      />
      <ResourceLink
        title="Microsoft: Add a language or set language preferences in Office"
        href="https://support.microsoft.com/en-us/office/add-a-language-or-set-language-preferences-in-office-b5c6a5ef-7e50-4d82-a42b-8338-2b603b2a385d"
        description="Office language and proofing options"
      />
    </ContentPageLayout>
  );
}
