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

export default function ListsCanvasPage() {
  return (
    <ContentPageLayout
      categorySlug="lists"
      fileTypeSlug="canvas"
      title="Lists"
      subtitle="Canvas editor"
    >
      <SH id="ally-error">The Ally Error</SH>
      <AllyErrorBox
        message="Lists should be formatted as lists"
        severity="Minor"
        wcag="1.3.1 Info and Relationships (Level A)"
      />
      <P>
        In Canvas, this error appears when content in a page or discussion
        looks like a list but uses plain text paragraphs with typed dashes,
        asterisks, or numbers instead of the Rich Content Editor (RCE)&rsquo;s
        list toolbar controls. In the HTML source, a faked list is a series of{" "}
        <code>&lt;p&gt;</code> elements starting with a dash or &ldquo;1.
        &rdquo;, rather than a proper <code>&lt;ul&gt;</code> or{" "}
        <code>&lt;ol&gt;</code> with <code>&lt;li&gt;</code> items.
      </P>

      <SH id="why-matters">Why This Matters</SH>
      <P>
        A screen reader navigating a Canvas page with a faked list hears each
        line as a separate paragraph with no list announcement. There is no
        &ldquo;List of 4 items&rdquo; cue and no way to jump between items
        using list navigation shortcuts. A sighted student skims the visual
        structure; a screen reader user must listen to every line in sequence.
      </P>

      <SH id="how-to-fix">How to Fix It</SH>
      <H3>Using the RCE toolbar</H3>
      <Step number="1">Open the page, discussion, or assignment and click <strong>Edit</strong> to open the RCE.</Step>
      <Step number="2">Select all the lines of the faked list.</Step>
      <Step number="3">Click the <strong>Unordered List</strong> button (bulleted list icon) or the <strong>Ordered List</strong> button (numbered list icon) in the RCE toolbar.</Step>
      <Step number="4">Delete any manually typed dashes, numbers, or bullet characters that were part of the original faked list. The RCE inserts proper list markup automatically.</Step>
      <Step number="5">Click <strong>Save</strong>. The Accessibility Checker will confirm the issue is resolved.</Step>

      <H3>Fixing via the HTML editor</H3>
      <P>
        If you prefer to work directly in HTML, click the <strong>HTML
        Editor</strong> button in the RCE toolbar (<code>&lt;/&gt;</code>).
        Replace the paragraph structure:
      </P>
      <pre style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", overflowX: "auto", padding: "14px 16px", borderRadius: 6, backgroundColor: "var(--color-surface-alt)", marginBottom: 18 }}>{`<!-- Faked list (before) -->
<p>- Item one</p>
<p>- Item two</p>
<p>- Item three</p>

<!-- Real list (after) -->
<ul>
  <li>Item one</li>
  <li>Item two</li>
  <li>Item three</li>
</ul>`}</pre>

      <SH id="rce-vs-dashboard">RCE Accessibility Checker vs. Accessibility Dashboard</SH>
      <Callout type="info">
        The &ldquo;Lists should be formatted as lists&rdquo; issue may appear
        in the <strong>RCE Accessibility Checker</strong> (the icon in the RCE
        toolbar) but not in the <strong>Course Accessibility Dashboard</strong>.
        Both report the same WCAG violation; fix it when the RCE flags it and
        the Dashboard will reflect the corrected score. Do not assume content is
        accessible just because the Dashboard does not list a list issue for
        that item.
      </Callout>

      <SH id="ally-catches">What Ally Catches and Misses</SH>
      <CompareBoxes
        catches="Faked lists in Canvas HTML: paragraphs that visually look like lists but use typed characters instead of ul/ol/li markup."
        misses="Whether a list should be ordered vs. unordered, correct nesting of multi-level lists, or whether list items are semantically meaningful."
      />

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally error", "Lists should be formatted as lists"],
        ["WCAG", "1.3.1 Info and Relationships (Level A)"],
        ["Fix (RCE)", "Select lines, click Unordered List or Ordered List button"],
        ["Fix (HTML)", "Replace <p> tags with <ul>/<ol> and <li>"],
        ["Dashboard vs. RCE", "Issue may show in RCE checker but not Dashboard; fix it anyway"],
      ]} />

      <SH id="resources">Resources</SH>
      <ResourceLink
        title="Canvas: How do I use the Accessibility Checker in the Rich Content Editor?"
        href="https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-is-the-Accessibility-Checker/ta-p/618611"
        description="How to run the RCE Accessibility Checker and interpret its results."
      />
      <ResourceLink
        title="W3C: Understanding Info and Relationships"
        href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html"
        description="WCAG 1.3.1 explained with examples including lists."
      />
    </ContentPageLayout>
  );
}
