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
      fontSize: "var(--fs-2xl)", fontWeight: 700, color: t.text,
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
      fontSize: "var(--fs-base)", fontWeight: 700, color: t.text,
      fontFamily: "var(--font-display)",
      margin: "28px 0 14px",
    }}>{children}</h3>
  );
}

function P({ children }) {
  const { t } = useTheme();
  return (
    <p style={{
      fontSize: "var(--fs-base)", lineHeight: 1.75, color: t.text,
      fontFamily: "var(--font-body)",
      margin: "0 0 18px",
    }}>{children}</p>
  );
}

export default function ListsPdfPage() {
  return (
    <ContentPageLayout
      categorySlug="lists"
      fileTypeSlug="pdf"
      title="Lists"
      subtitle="PDF"
    >
      <SH id="ally-error">The Ally Error</SH>
      <AllyErrorBox
        message="Lists should be formatted as lists"
        severity="Minor"
        wcag="1.3.1 Info and Relationships (Level A)"
      />
      <P>
        Ally flags this when a PDF contains content that appears to be a list
        but lacks proper list tag structure (<code>&lt;L&gt;</code>,{" "}
        <code>&lt;LI&gt;</code>, <code>&lt;LBody&gt;</code> in the PDF tag
        tree). This typically happens when a PDF is exported from a Word or
        PowerPoint file that already had faked lists, or when a scanned document
        is processed without proper tagging.
      </P>

      <SH id="why-matters">Why This Matters</SH>
      <P>
        In a tagged PDF, a screen reader can announce &ldquo;List of 5
        items&rdquo; when entering a list and allow users to navigate between
        items. Without list tags, each line reads as an independent paragraph.
        A student using a screen reader cannot distinguish a five-item list from
        five consecutive sentences.
      </P>

      <SH id="how-to-fix">How to Fix It</SH>
      <H3>Best approach: fix at the source</H3>
      <P>
        If the PDF was exported from Word or PowerPoint, fix the faked lists in
        the source document first (see the{" "}
        <a href="/lists/word">Word</a> or{" "}
        <a href="/lists/powerpoint">PowerPoint</a> pages), then re-export to
        PDF. Fixing at the source is almost always faster and more reliable
        than remediating in Acrobat after export.
      </P>
      <Step number="1">Open the source Word or PowerPoint file.</Step>
      <Step number="2">Select the faked list content and apply real Bullets or Numbering formatting.</Step>
      <Step number="3">Re-export to PDF: <strong>File &rarr; Save As &rarr; PDF</strong> (or <strong>File &rarr; Export &rarr; Create PDF/XPS</strong> in Word). Ensure &ldquo;Document structure tags for accessibility&rdquo; is checked in the export options.</Step>
      <Step number="4">Re-upload the corrected PDF to Canvas and verify with Ally.</Step>

      <H3>Remediating in Acrobat Pro</H3>
      <P>
        If the source file is unavailable, list structure can be added directly
        in Acrobat Pro using the Tags panel.
      </P>
      <Step number="1">Open the PDF in Acrobat Pro and go to <strong>View &rarr; Show/Hide &rarr; Navigation Panes &rarr; Tags</strong>.</Step>
      <Step number="2">Locate the paragraph tags corresponding to the faked list items.</Step>
      <Step number="3">Create an <code>&lt;L&gt;</code> (List) tag as the parent, then wrap each item in an <code>&lt;LI&gt;</code> (List Item) tag with an <code>&lt;LBody&gt;</code> child.</Step>
      <Step number="4">Save the PDF and re-upload to Canvas.</Step>

      <SH id="ally-catches">What Ally Catches and Misses</SH>
      <CompareBoxes
        catches="Faked lists: content that looks like a list but lacks PDF list tag structure."
        misses="Whether a list should be ordered vs. unordered, correct nesting of multi-level lists."
      />
      <Callout type="warning">
        <strong>Acrobat does not flag faked lists.</strong> The Acrobat
        Accessibility Checker verifies whether the PDF is tagged but does not
        specifically detect faked lists. Ally is the primary tool that catches
        this issue in uploaded PDFs.
      </Callout>

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally error", "Lists should be formatted as lists"],
        ["WCAG", "1.3.1 Info and Relationships (Level A)"],
        ["Best fix", "Fix in source Word/PowerPoint file, re-export to PDF"],
        ["Acrobat fix", "Use Tags panel to add <L>, <LI>, <LBody> structure"],
        ["Acrobat checker", "Does not detect faked lists"],
      ]} />

      <SH id="resources">Resources</SH>
      <ResourceLink
        title="Adobe: Create and verify PDF accessibility"
        href="https://helpx.adobe.com/acrobat/using/create-verify-pdf-accessibility.html"
        description="Guide to creating accessible PDFs and using Acrobat's tag tree for remediation."
      />
      <ResourceLink
        title="WebAIM: PDF Accessibility"
        href="https://webaim.org/techniques/acrobat/"
        description="Comprehensive guide to accessible PDFs including list structure."
      />
      <ResourceLink
        title="W3C: Understanding Info and Relationships"
        href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html"
        description="WCAG 1.3.1 explained with examples including lists."
      />
      <ResourceLink
        title="PAC: PDF Accessibility Checker"
        href="https://pdfua.foundation/en/pdf-accessibility-checker-pac/"
        description="Free tool for checking PDF/UA conformance including list tags"
      />
    </ContentPageLayout>
  );
}
