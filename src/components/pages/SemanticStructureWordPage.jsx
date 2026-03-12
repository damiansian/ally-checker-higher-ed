import { useTheme } from "@/components/theme.jsx";
import { ContentPageLayout } from "@/components/layout.jsx";
import {
  AllyErrorBox,
  Step,
  CompareBoxes,
  RefTable,
  ResourceLink,
  Placeholder,
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
      fontSize: "var(--fs-lg)", fontWeight: 700, color: t.text,
      fontFamily: "var(--font-display)",
      margin: "28px 0 14px",
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

export default function SemanticStructureWordPage() {
  return (
    <ContentPageLayout
      categorySlug="semantic-structure"
      fileTypeSlug="word"
      title="Semantic Structure"
      subtitle="Word Documents"
    >
      <SH id="ally-error">The Ally Error</SH>
      <AllyErrorBox
        message="Document does not have any headings"
        severity="Major"
        wcag="1.3.1 Info and Relationships (Level A)"
      />
      <P>
        Ally flags Word documents that lack proper heading structure. Screen
        reader users depend on headings (Heading 1, 2, 3, etc.) to navigate
        long documents. Without them, the entire file is read as one block of
        text.
      </P>

      <SH id="why-matters">Why This Matters</SH>
      <P>
        Headings define the document outline. They allow assistive technology
        to jump between sections and announce context. Bold or large text
        that looks like a heading but is not styled as a heading is
        invisible to that navigation.
      </P>

      <SH id="how-to-fix">How to Fix It</SH>
      <H3>Adding and styling headings</H3>
      <Step number="1">Select the text that should be a heading (e.g. a section title).</Step>
      <Step number="2">On the <strong>Home</strong> tab, open the <strong>Styles</strong> gallery and choose <strong>Heading 1</strong>, <strong>Heading 2</strong>, or <strong>Heading 3</strong> as appropriate.</Step>
      <Step number="3">Use Heading 1 for the main title, Heading 2 for major sections, Heading 3 for subsections. Do not skip levels (e.g. avoid going from Heading 1 to Heading 4).</Step>
      <Step number="4">Repeat for all section titles. Avoid using bold or font size alone instead of heading styles.</Step>
      <Placeholder label="Screenshot: Word Styles gallery with Heading 1, 2, 3 applied" />

      <H3>Checking structure</H3>
      <P>
        Use <strong>View → Navigation Pane</strong> and select
        &quot;Headings&quot; to see the document outline. Gaps or a flat
        list of &quot;Heading 1&quot; indicate missing or inconsistent
        structure.
      </P>

      <SH id="lists">Lists</SH>
      <P>
        Ally flags <strong>faked lists</strong> - content that looks like a
        list but was created by typing bullets (•), dashes, or
        &quot;1.&quot; &quot;2.&quot; instead of using Word&apos;s list
        tools. Screen readers need real list structure to announce
        &quot;list of X items.&quot;
      </P>
      <H3>Using list styles</H3>
      <Step number="1">Select the lines that should be a list (or place the cursor in the first line).</Step>
      <Step number="2">On the <strong>Home</strong> tab, click <strong>Bullets</strong> or <strong>Numbering</strong> in the Paragraph group. Do not type bullet characters or numbers manually.</Step>
      <Step number="3">For multi-level lists, use Increase/Decrease Indent with the list style applied so nesting is programmatically correct.</Step>
      <Placeholder label="Screenshot: Word Home tab Bullets and Numbering buttons" />

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="Missing headings, skipped heading levels, documents with no heading styles, faked lists (typed bullets/numbers instead of list styles)"
        misses="Whether heading text is meaningful, logical order, reading order in complex layouts, correct list nesting"
      />

      <SH id="ally-misses">What Ally Misses</SH>
      <P>
        Ally does not evaluate whether heading text actually describes the
        section. It also may not catch every skipped level or
        order-of-content issue in multi-column or text-box layouts.
      </P>

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally errors", "No headings; lists should be formatted as lists"],
        ["WCAG", "1.3.1 Info and Relationships (Level A)"],
        ["Headings", "Home → Styles → Heading 1, 2, 3; do not skip levels"],
        ["Lists", "Home → Bullets or Numbering; do not type bullets/numbers"],
        ["Check", "View → Navigation Pane → Headings"],
      ]} />

      <SH id="resources">Resources</SH>
      <ResourceLink
        title="W3C: Understanding Info and Relationships"
        href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html"
        description="WCAG 1.3.1 explained"
      />
      <ResourceLink
        title="Microsoft: Add a heading"
        href="https://support.microsoft.com/en-us/office/add-a-heading-3eb8b917-56dc-4a17-891a-a026b2c790f2"
        description="Word heading styles"
      />
    </ContentPageLayout>
  );
}
