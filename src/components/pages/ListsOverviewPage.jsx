import { useTheme } from "@/components/theme.jsx";
import { ContentPageLayout } from "@/components/layout.jsx";
import {
  AllyErrorBox,
  CompareBoxes,
  RefTable,
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

function H3({ id, children }) {
  const { t } = useTheme();
  return (
    <h3 id={id} style={{
      fontSize: "var(--fs-lg)", fontWeight: 700, color: t.text,
      fontFamily: "var(--font-display)",
      marginTop: 32, marginBottom: 12,
      scrollMarginTop: 80,
    }}>{children}</h3>
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

export default function ListsOverviewPage() {
  return (
    <ContentPageLayout
      categorySlug="lists"
      fileTypeSlug="overview"
      title="Lists"
      subtitle="Overview"
    >
      <SH id="overview">Overview</SH>
      <P>
        When content is presented as a list, the list structure must be
        programmatically determinable so that screen readers can announce list
        type and item count (e.g., &ldquo;List of 5 items&rdquo;) and allow
        list-based navigation.
      </P>
      <P>
        This category covers WCAG{" "}
        <a href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html" target="_blank" rel="noopener noreferrer">
          1.3.1 Info and Relationships
        </a>{" "}
        (Level A). Lists are very common in course content (likelihood 4/5). A{" "}
        <strong>faked list</strong> is content that looks like a list (lines
        prefixed with a dash, bullet character, or &ldquo;1.&rdquo;
        &ldquo;2.&rdquo; typed by hand) but is not marked up as a list.
      </P>
      <P>
        In Word, that means using the Bullets or Numbering commands (or list
        styles), not typing characters. In HTML, it means using{" "}
        <code>&lt;ul&gt;</code>, <code>&lt;ol&gt;</code>, and{" "}
        <code>&lt;li&gt;</code>, not plain paragraphs. When a list is faked, a
        screen reader reads a series of paragraphs and the student loses the
        benefit of list semantics and navigation.
      </P>

      <SH id="ally-errors">Ally Error Messages</SH>
      <AllyErrorBox
        message="Lists should be formatted as lists"
        severity="Minor"
        wcag="1.3.1 Info and Relationships (Level A)"
      />
      <P>
        Ally uses the same wording across all file types. Severity is typically{" "}
        <strong>Minor</strong>.
      </P>

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="Faked lists: content that visually appears as a list but lacks proper list markup. Ally detects this in Word, PowerPoint, PDF, and Canvas content."
        misses="Correct nesting of multi-level lists, whether content should be a list vs paragraphs. Microsoft checker and Acrobat typically do not flag faked lists."
      />

      <H3 id="tool-gap">Tool gap</H3>
      <Callout type="warning">
        <strong>Ally catches faked lists; the other common checkers generally
        do not.</strong> Content that passes the Microsoft Accessibility Checker
        or Acrobat can still contain faked lists that create barriers for
        screen reader users.
      </Callout>

      <H3 id="canvas-note">Where Ally shows the list error</H3>
      <Callout type="info">
        For Canvas content, the &ldquo;Lists should be formatted as
        lists&rdquo; issue may show up in the <strong>Rich Content
        Editor</strong> (when you run the Accessibility Checker from the
        editor) but not on the <strong>Course Dashboard</strong>. Fix faked
        lists when the editor flags them; the Dashboard may not list this issue
        for the same page.
      </Callout>

      <SH id="ally-misses">What Ally Misses</SH>
      <P>
        Ally focuses on whether content that looks like a list is actually
        marked up as one. It does not evaluate:
      </P>
      <ul style={{ margin: "0 0 18px", paddingLeft: 24, fontFamily: "var(--font-body)", fontSize: "var(--fs-md)", lineHeight: 1.75, color: "inherit" }}>
        <li>
          <strong>Nested and multi-level lists.</strong> Whether list hierarchy
          is correct in the source (e.g., list-in-list in Word, nested{" "}
          <code>&lt;ul&gt;</code>/<code>&lt;ol&gt;</code> in HTML) so reading
          order and structure make sense.
        </li>
        <li>
          <strong>When a &ldquo;list&rdquo; is really something else.</strong>{" "}
          A single run of short paragraphs may be clearer as a list; a run of
          numbered steps must be a real ordered list, not typed
          &ldquo;1.&rdquo; &ldquo;2.&rdquo; in plain text.
        </li>
      </ul>

      <SH id="quick-check">Quick Check</SH>
      <ul style={{ margin: "0 0 18px", paddingLeft: 24, fontFamily: "var(--font-body)", fontSize: "var(--fs-md)", lineHeight: 1.75, color: "inherit" }}>
        <li>
          Are bulleted and numbered lists created with the application&rsquo;s
          list tools (Bullets / Numbering in Word or PowerPoint, list controls
          in Canvas), not by typing dashes or numbers?
        </li>
        <li>
          Would a screen reader user hear list structure (e.g., &ldquo;List of
          4 items&rdquo;) when moving through the content?
        </li>
        <li>
          If you only ran the Microsoft checker or Acrobat, have you also
          checked the content in Ally (or verified list markup) so faked lists
          are not missed?
        </li>
      </ul>

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally checks", "1 check"],
        ["WCAG criterion", "1.3.1 Info and Relationships (Level A)"],
        ["Likelihood", "4 / 5"],
        ["Impact", "3 / 5"],
        ["File types", "Word, PowerPoint, PDF, Canvas"],
      ]} />
    </ContentPageLayout>
  );
}
