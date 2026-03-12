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
      fontSize: "var(--fs-2xl)", fontWeight: 700, color: t.text,
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
      fontSize: "var(--fs-md)", lineHeight: 1.75, color: t.text,
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
      title="Semantic Structure"
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
        This category covers WCAG <a href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html" target="_blank" rel="noopener noreferrer">1.3.1 Info and Relationships</a>,{" "}
        <a href="https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html" target="_blank" rel="noopener noreferrer">2.4.1 Bypass Blocks</a>, and{" "}
        <a href="https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html" target="_blank" rel="noopener noreferrer">2.4.6 Headings and Labels</a>. Ally checks for
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
      <ul style={{ margin: "0 0 18px", paddingLeft: 24, fontFamily: "var(--font-body)", fontSize: "var(--fs-md)", lineHeight: 1.75, color: "inherit" }}>
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
        Bulleted and numbered content must use real list markup so screen
        readers can announce list type and item count (e.g., &ldquo;List of
        5 items&rdquo;) and allow list-based navigation. A{" "}
        <strong>faked list</strong> is content that looks like a list (lines
        prefixed with a typed dash, bullet character, or &ldquo;1.&rdquo;{" "}
        &ldquo;2.&rdquo;) but is not marked up as a list.
      </P>
      <P>
        In <strong>Word</strong> and <strong>PowerPoint</strong>, use the
        Bullets or Numbering commands on the Home tab, not typed characters.
        In <strong>Canvas</strong> HTML, use <code>&lt;ul&gt;</code>,{" "}
        <code>&lt;ol&gt;</code>, and <code>&lt;li&gt;</code> via the RCE
        toolbar, not plain paragraphs. The Microsoft Accessibility Checker
        and Acrobat typically do not flag faked lists. Ally is the primary
        tool that catches this issue in Word, PowerPoint, PDF, and Canvas.
      </P>
      <P>
        In Canvas, the &ldquo;Lists should be formatted as lists&rdquo; issue
        may appear in the <strong>Rich Content Editor (RCE)</strong>{" "}
        Accessibility Checker but not on the Course Dashboard. Fix faked
        lists when the editor flags them.
      </P>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "4px 0 20px" }}>
        {[
          { label: "Lists in Word", href: "/lists/word" },
          { label: "Lists in PowerPoint", href: "/lists/powerpoint" },
          { label: "Lists in PDF", href: "/lists/pdf" },
          { label: "Lists in Canvas", href: "/lists/canvas" },
        ].map(({ label, href }) => (
          <a
            key={href}
            href={href}
            style={{
              fontSize: "var(--fs-sm)", fontWeight: 600,
              fontFamily: "var(--font-display)",
              color: "inherit",
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            {label} &rarr;
          </a>
        ))}
      </div>

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="Missing headings, skipped levels, missing slide/page titles, untagged PDFs, faked lists (manual bullets/numbers instead of list styles)"
        misses="Whether heading text is meaningful, logical content order, reading sequence, correct nesting of multi-level lists, whether content should be a list vs paragraphs"
      />
      <P>
        For a broader comparison across all categories and tools, see the{" "}
        <a href="/guide#tools">Accessibility Guide</a>.
      </P>

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
        ["Ally checks", "5 checks (headings, titles, lists)"],
        ["WCAG criteria", "1.3.1 / 2.4.1 / 2.4.6"],
        ["Likelihood", "5 / 5"],
        ["Impact", "4 / 5"],
        ["File types", "Word, PowerPoint, PDF, Canvas"],
      ]} />
    </ContentPageLayout>
  );
}
