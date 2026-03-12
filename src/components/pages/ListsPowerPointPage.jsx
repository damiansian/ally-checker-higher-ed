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

export default function ListsPowerPointPage() {
  return (
    <ContentPageLayout
      categorySlug="lists"
      fileTypeSlug="powerpoint"
      title="Lists"
      subtitle="PowerPoint Presentations"
    >
      <SH id="ally-error">The Ally Error</SH>
      <AllyErrorBox
        message="Lists should be formatted as lists"
        severity="Minor"
        wcag="1.3.1 Info and Relationships (Level A)"
      />
      <P>
        Ally flags this when slide content that looks like a list uses typed
        characters (dashes, bullet symbols, or manual numbers) instead of
        PowerPoint&rsquo;s built-in list indentation. This most commonly occurs
        in text boxes where someone typed a dash at the start of each line.
      </P>

      <SH id="why-matters">Why This Matters</SH>
      <P>
        Screen readers process presentation text boxes as plain text runs.
        When a list is faked with typed characters, the screen reader reads
        each dash or number as a literal character and has no way to
        communicate list structure, item count, or nesting level. A student
        using keyboard navigation cannot jump between list items because there
        are no list items to jump to.
      </P>

      <SH id="how-to-fix">How to Fix It</SH>
      <H3>Using the built-in list controls</H3>
      <Step number="1">Click inside the text box containing the faked list.</Step>
      <Step number="2">Select all the lines that make up the list (or press <strong>Ctrl+A</strong> to select all text in the box).</Step>
      <Step number="3">On the <strong>Home</strong> tab, click the <strong>Bullets</strong> or <strong>Numbering</strong> button in the Paragraph group.</Step>
      <Step number="4">Delete any manually typed dashes, bullet symbols, or numbers that were already there. The PowerPoint list formatting replaces them.</Step>
      <Step number="5">Save the file and re-upload to Canvas. Re-check with Ally to confirm the error is resolved.</Step>

      <H3>Content placeholder text boxes vs. freeform text boxes</H3>
      <P>
        Lists in <strong>content placeholder</strong> text boxes (the areas
        built into the slide layout) are more reliably exported as structured
        content than lists in freeform text boxes drawn manually on the slide.
        Where possible, use the layout&rsquo;s built-in content area for
        bulleted content.
      </P>

      <SH id="ally-catches">What Ally Catches and Misses</SH>
      <CompareBoxes
        catches="Faked lists using typed characters in PowerPoint text boxes."
        misses="Whether a list should be ordered vs. unordered, correct nesting of multi-level lists, or whether content would be clearer as a list vs. paragraphs."
      />
      <Callout type="warning">
        <strong>Other checkers miss this.</strong> The Microsoft Accessibility
        Checker does not flag faked lists in PowerPoint. Ally is the only
        tool in a typical workflow that catches this issue.
      </Callout>

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally error", "Lists should be formatted as lists"],
        ["WCAG", "1.3.1 Info and Relationships (Level A)"],
        ["Fix", "Select lines, apply Bullets or Numbering from the Home tab"],
        ["MS checker", "Does not detect faked lists"],
        ["Best practice", "Use content placeholder text boxes, not freeform text boxes, for bulleted content"],
      ]} />

      <SH id="resources">Resources</SH>
      <ResourceLink
        title="Microsoft: Add bullets or numbers to text"
        href="https://support.microsoft.com/en-us/office/add-bullets-or-numbers-to-text-553db7a8-e9a9-42be-85df-a9b6e9a1a5e4"
        description="Instructions for adding and formatting lists in PowerPoint text boxes."
      />
      <ResourceLink
        title="W3C: Understanding Info and Relationships"
        href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html"
        description="WCAG 1.3.1 explained with examples including lists."
      />
      <ResourceLink
        title="WebAIM: PowerPoint Accessibility"
        href="https://webaim.org/techniques/powerpoint/"
        description="Techniques for creating accessible PowerPoint presentations including list structure"
      />
    </ContentPageLayout>
  );
}
