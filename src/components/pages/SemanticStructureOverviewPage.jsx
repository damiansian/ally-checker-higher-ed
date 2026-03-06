import { useTheme } from "@/components/theme.jsx";
import { ContentPageLayout } from "@/components/layout.jsx";
import {
  AllyErrorBox,
  CompareBoxes,
  RefTable,
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

export default function SemanticStructureOverviewPage() {
  return (
    <ContentPageLayout
      categorySlug="semantic-structure"
      fileTypeSlug="overview"
      title="DRAFT - Semantic Structure"
      subtitle="Overview"
    >
      <SH id="overview">Overview</SH>
      <P>
        Headings, titles, lists, and document structure let students navigate
        and understand content organization. Without them, a 20-page document
        is a wall of text. Screen reader users rely on headings to jump
        between sections and on proper list structure to hear &quot;list of
        X items&quot; and list type. Content that <em>looks</em> like a
        list (typed bullets, dashes, or &quot;1.&quot; &quot;2.&quot;) but
        is not marked as a list is invisible to that structure.
      </P>
      <P>
        This category covers WCAG 1.3.1 (Info and Relationships), 2.4.1
        (Bypass Blocks), and 2.4.6 (Headings and Labels). Ally checks for
        headings, titles, and list structure in <strong>Word</strong>,{" "}
        <strong>PowerPoint</strong>, <strong>PDF</strong>, and{" "}
        <strong>Canvas</strong> files.
      </P>

      <SH id="ally-errors">Ally Error Messages</SH>
      <AllyErrorBox
        message="Document does not have any headings"
        severity="Major"
        wcag="1.3.1 Info and Relationships (Level A)"
      />
      <P>
        Ally runs multiple structure checks; wording varies by file type for
        headings:
      </P>
      <ul style={{ margin: "0 0 18px", paddingLeft: 24, fontFamily: "var(--font-body)", fontSize: 15.5, lineHeight: 1.75, color: "inherit" }}>
        <li><strong>Word:</strong> &ldquo;Document does not have any headings&rdquo;</li>
        <li><strong>PowerPoint:</strong> &ldquo;Presentation does not have slide titles&rdquo;</li>
        <li><strong>PDF:</strong> &ldquo;PDF does not have any headings&rdquo;</li>
        <li><strong>Canvas:</strong> &ldquo;Headings should be present&rdquo;</li>
      </ul>
      <AllyErrorBox
        message="Lists should be formatted as lists"
        severity="Major"
        wcag="1.3.1 Info and Relationships (Level A)"
      />
      <P>
        Ally also flags <strong>faked lists</strong> - content that looks like
        a list (bullets, dashes, &quot;1.&quot; &quot;2.&quot;) but was
        created with typed characters instead of the application&apos;s list
        tools. Severity is typically <strong>Major</strong>. Use the
        file-type pages for fix steps and testing notes.
      </P>

      <SH id="lists">Lists</SH>
      <P>
        Lists must be programmatically determinable so screen readers can
        announce list type and item count. In <strong>Word</strong> and{" "}
        <strong>PowerPoint</strong>, use the Bullets or Numbering commands
        (list styles), not typed characters. In <strong>HTML</strong> (e.g.
        Canvas), use <code>&lt;ul&gt;</code>, <code>&lt;ol&gt;</code>, and{" "}
        <code>&lt;li&gt;</code>. Microsoft Accessibility Checker and Acrobat
        often do not flag faked lists; Ally does in Word, PowerPoint, PDF,
        and Canvas. In Canvas, the list error may appear in the editor
        Accessibility Checker but not on the Course Dashboard.
      </P>
      <P>
        <strong>Quick check:</strong> Use list tools instead of typing
        bullets or numbers. Confirm a screen reader announces &quot;List of
        X items.&quot; If you only use Microsoft or Acrobat checkers, also
        verify in Ally.
      </P>

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="Missing headings, skipped levels, missing slide/page titles, untagged PDFs, faked lists (manual bullets/numbers instead of list styles)"
        misses="Whether heading text is meaningful, logical content order, reading sequence, correct nesting of multi-level lists, whether content should be a list vs paragraphs"
      />

      <SH id="ally-misses">What Ally Misses</SH>
      <P>
        Ally checks for the <em>presence</em> of headings and titles, not
        whether they are meaningful or in a logical order. A document with
        &quot;Heading 1&quot; style on every paragraph may pass even though
        it gives no real structure. Skipped levels (e.g. H1 to H4) are
        sometimes caught, but not always. Correct nesting of multi-level
        lists and whether content should be a list vs. paragraphs may require
        manual judgment.
      </P>
      <P>
        <strong>Reading order</strong> and <strong>content order</strong>
        in complex layouts (multi-column, text boxes, sidebars) are not
        fully evaluated. Screen reader users may encounter content in an
        illogical sequence that Ally does not flag. Manual testing with a
        screen reader is the only way to verify structure and order.
      </P>

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally checks", "8 checks"],
        ["WCAG criteria", "1.3.1 / 2.4.1 / 2.4.6"],
        ["Likelihood", "5 / 5"],
        ["Impact", "4 / 5"],
        ["File types", "Word, PowerPoint, PDF, Canvas"],
        ["Lists", "Use list tools, not typed bullets/numbers; verify in Ally"],
      ]} />
    </ContentPageLayout>
  );
}
