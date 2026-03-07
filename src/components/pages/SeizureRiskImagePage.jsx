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

export default function SeizureRiskImagePage() {
  return (
    <ContentPageLayout
      categorySlug="seizure-risk"
      fileTypeSlug="image"
      title="DRAFT - Seizure Risk"
      subtitle="Image (e.g. animated GIF)"
    >
      <SH id="ally-error">The Ally Error</SH>
      <AllyErrorBox
        message="Image can induce seizures"
        severity="Major"
        wcag="2.3.1 Three Flashes or Below Threshold (Level A)"
      />
      <P>
        Ally flags image files (typically animated GIFs) that it detects as
        containing rapid flashing. <a href="https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html" target="_blank" rel="noopener noreferrer">WCAG 2.3.1</a> requires that content does
        not flash more than three times per second, because such content
        can trigger seizures in people with photosensitive epilepsy.
      </P>

      <SH id="why-matters">Why This Matters</SH>
      <P>
        Even a short burst of rapid flashing can cause a seizure. The
        impact is severe (medical emergency), so this criterion is Level A.
        The likelihood of having such content in course materials is
        relatively low, but when it appears it must be removed or
        replaced.
      </P>

      <SH id="cannot-demonstrate">Why We Don&apos;t Demonstrate</SH>
      <Callout type="warning">
        <div style={{
          fontWeight: 600, fontFamily: "var(--font-display)",
          marginBottom: 6, fontSize: 14,
        }}>
          Flashing content cannot be safely shown
        </div>
        We do not provide example images or videos of flashing content.
        This page describes the Ally message, the criterion, and how to
        fix or avoid the issue using documentation and authoring
        practices.
      </Callout>

      <SH id="how-to-fix">How to Fix It</SH>
      <H3>Remove or replace the image</H3>
      <Step number="1">Identify the image Ally flagged (usually an animated GIF).</Step>
      <Step number="2">If the animation is essential, replace it with a static image or a version that does not flash more than three times per second. Avoid rapid strobe-like or red flashing.</Step>
      <Step number="3">If the image is not essential (e.g. decorative or redundant), remove it.</Step>
      <Step number="4">Re-upload or replace the file in your LMS so Ally rescans. Ensure the new asset does not contain rapid flashing.</Step>

      <H3>When creating or choosing GIFs</H3>
      <P>
        When sourcing or creating animated GIFs for course content, avoid
        rapid flashing, especially in red or high-contrast patterns. Use
        gentle animations or static images where possible. If you need
        motion, keep flash rate well below three per second and avoid
        full-screen or large-area flashes.
      </P>

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="Animated images (e.g. GIFs) that Ally detects as having rapid flashing"
        misses="Flashing in video, PowerPoint animations/transitions, Canvas CSS animations, and some GIFs depending on detection"
      />

      <SH id="ally-misses">What Ally Misses</SH>
      <P>
        Ally only checks image files. Video files, PowerPoint slide
        transitions, and animated content in Canvas are not evaluated for
        seizure risk. A GIF that flashes just under Ally&apos;s threshold
        may also pass. When in doubt, avoid rapid flashing entirely.
      </P>

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally error", "Image can induce seizures"],
        ["WCAG", "2.3.1 Three Flashes or Below Threshold (Level A)"],
        ["Fix", "Remove image or replace with non-flashing / static version"],
        ["File types Ally checks", "Image only (e.g. GIF)"],
        ["Do not", "Show or create flashing examples for demonstration"],
      ]} />

      <SH id="resources">Resources</SH>
      <ResourceLink
        title="W3C: Understanding Three Flashes or Below Threshold"
        href="https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html"
        description="WCAG 2.3.1 explained"
      />
      <ResourceLink
        title="W3C: Understanding Seizures and Physical Reactions"
        href="https://www.w3.org/WAI/WCAG22/Understanding/seizures-and-physical-reactions.html"
        description="Background on photosensitive seizures"
      />
    </ContentPageLayout>
  );
}
