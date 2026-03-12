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

export default function ListsWordPage() {
  return (
    <ContentPageLayout
      categorySlug="lists"
      fileTypeSlug="word"
      title="Lists"
      subtitle="Word Documents"
    >
      <SH id="ally-error">The Ally Error</SH>
      <AllyErrorBox
        message="Lists should be formatted as lists"
        severity="Minor"
        wcag="1.3.1 Info and Relationships (Level A)"
      />
      <P>
        Ally flags this when text that visually looks like a list is not
        marked up as a real list. In Word, a faked list is content where someone
        typed a dash, bullet character, or &ldquo;1.&rdquo; &ldquo;2.&rdquo;
        by hand instead of using the Bullets or Numbering toolbar buttons.
      </P>

      <SH id="why-matters">Why This Matters</SH>
      <P>
        When a list is faked, a screen reader reads it as a series of plain
        paragraphs. The student hears no announcement of list type or item
        count. There is no way to jump to a specific item using list navigation
        commands. A 10-item &ldquo;list&rdquo; with a typed dash before each
        line reads identically to 10 unrelated short paragraphs.
      </P>
      <P>
        Real list markup (using Word&rsquo;s Bullets or Numbering styles)
        produces accessible HTML or DOCX structure that screen readers can
        announce as &ldquo;List of 10 items&rdquo; and allow navigation
        through with list commands.
      </P>

      <SH id="how-to-fix">How to Fix It</SH>
      <H3>Converting a faked list to a real list</H3>
      <Step number="1">Select all the faked list items (the lines starting with typed dashes, asterisks, or numbers).</Step>
      <Step number="2">On the <strong>Home</strong> tab, click the <strong>Bullets</strong> button (for unordered lists) or the <strong>Numbering</strong> button (for ordered lists) in the Paragraph group.</Step>
      <Step number="3">Delete the manually typed bullet characters, dashes, or numbers that were there before. Word will add the proper list formatting automatically.</Step>
      <Step number="4">Save the document and re-upload to Canvas. Run Ally again to confirm the error is resolved.</Step>

      <H3>Starting a new list correctly</H3>
      <P>
        Type your first list item, then press <strong>Enter</strong> to add
        the next. Word will continue the list style automatically. To end the
        list, press <strong>Enter</strong> twice or click the Bullets/Numbering
        button again to toggle it off.
      </P>

      <SH id="ally-catches">What Ally Catches and Misses</SH>
      <CompareBoxes
        catches="Faked lists: lines of text that look like lists but use typed characters instead of Word list styles."
        misses="Whether a list should be ordered vs. unordered, correct nesting of multi-level lists, or whether content would be clearer as a list vs. paragraphs."
      />
      <Callout type="warning">
        <strong>Other checkers miss this.</strong> The Microsoft Accessibility
        Checker does not flag faked lists in Word. Acrobat does not flag them
        either. Ally is the only tool in a typical workflow that catches this
        issue.
      </Callout>

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally error", "Lists should be formatted as lists"],
        ["WCAG", "1.3.1 Info and Relationships (Level A)"],
        ["Fix", "Select lines, apply Bullets or Numbering from the Home tab"],
        ["MS checker", "Does not detect faked lists"],
        ["Acrobat", "Does not detect faked lists"],
      ]} />

      <SH id="resources">Resources</SH>
      <ResourceLink
        title="Microsoft: Create a bulleted or numbered list"
        href="https://support.microsoft.com/en-us/office/create-a-bulleted-or-numbered-list-9ff81241-58a8-4d88-8d8c-acab3006a23e"
        description="Step-by-step instructions for creating and formatting lists in Word."
      />
      <ResourceLink
        title="W3C: Understanding Info and Relationships"
        href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html"
        description="WCAG 1.3.1 explained with examples including lists."
      />
      <ResourceLink
        title="WebAIM: Microsoft Word"
        href="https://webaim.org/techniques/word/"
        description="Comprehensive guide to creating accessible Word documents including list structure"
      />
    </ContentPageLayout>
  );
}
