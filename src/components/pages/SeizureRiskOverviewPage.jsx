import { useTheme } from "@/components/theme.jsx";
import { ContentPageLayout } from "@/components/layout.jsx";
import {
  AllyErrorBox,
  CompareBoxes,
  RefTable,
  Callout,
  ResourceLink,
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

export default function SeizureRiskOverviewPage() {
  return (
    <ContentPageLayout
      categorySlug="seizure-risk"
      fileTypeSlug="overview"
      title="Seizure Risk"
      subtitle="Overview"
    >
      <SH id="overview">Overview</SH>
      <P>
        Flashing or rapidly animated content can trigger seizures in students
        with photosensitive epilepsy. WCAG <a href="https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html" target="_blank" rel="noopener noreferrer">2.3.1</a> requires that content does
        not flash more than three times per second.
      </P>
      <P>
        Ally only checks <strong>Image</strong> files (GIFs) for seizure
        risk. Document formats (Word, PowerPoint, PDF) and Canvas content
        are <strong>not checked</strong> for flashing content, leaving
        significant gaps in automated detection.
      </P>
      <Callout type="warning">
        <div style={{
          fontWeight: 600, fontFamily: "var(--font-display)",
          marginBottom: 6, fontSize: "var(--fs-sm)",
        }}>
          Cannot be safely demonstrated
        </div>
        Flashing content that triggers seizures cannot be safely shown as an
        example. This category relies on documentation and guidelines rather
        than live demonstrations.
      </Callout>

      <SH id="ally-errors">Ally Error Messages</SH>
      <AllyErrorBox
        message="Image can induce seizures"
        severity="Major"
        wcag="2.3.1 Three Flashes or Below Threshold (Level A)"
      />
      <P>
        This is the only seizure-related message Ally surfaces. It applies
        to <strong>Image</strong> files (e.g. animated GIFs). Word,
        PowerPoint, PDF, and Canvas are not checked for flashing content,
        so no Ally error message is shown for those formats even when
        they contain risky material.
      </P>

      <SH id="ally-catches">What Ally Catches</SH>
      <CompareBoxes
        catches="Animated images (GIFs) with rapid flashing"
        misses="Flashing in embedded video, auto-playing media, PowerPoint animations/transitions, CSS animations"
      />

      <SH id="ally-misses">What Ally Misses</SH>
      <P>
        The most significant gaps are in video content and PowerPoint
        animations. Ally does not analyze video files for flashing, does not
        check PowerPoint slide transitions or animation effects, and does
        not evaluate CSS animations in Canvas content.
      </P>
      <P>
        In practice, most course materials that could pose a seizure risk
        are <strong>videos</strong> (e.g. clips with strobe effects) or
        <strong> PowerPoint</strong> (transitions, animated objects).
        Neither is covered by Ally&apos;s single image check. Rely on
        authoring-tool guidance (e.g. avoid rapid flashes in video
        editing, use subtle PowerPoint transitions) and institutional
        policy rather than Ally for this criterion.
      </P>

      <SH id="quick-ref">Quick Reference</SH>
      <RefTable rows={[
        ["Ally checks", "1 check (animated GIFs only)"],
        ["WCAG criterion", "2.3.1 Three Flashes or Below Threshold (Level A)"],
        ["Likelihood", "1 / 5 \u2014 rare but critical"],
        ["Impact", "5 / 5 \u2014 can trigger medical emergency"],
        ["File types checked", "Image only"],
        ["File types not checked", "Word, PowerPoint, PDF, Canvas"],
      ]} />

      <SH id="resources">Resources</SH>
      <ResourceLink
        title="Photosensitive Epilepsy Analysis Tool (PEAT)"
        href="https://trace.umd.edu/peat/"
        description="Free tool from the Trace R&D Center for testing video and animation content for seizure risk. Analyzes flash rate and luminance changes against the Harding test thresholds."
      />
      <ResourceLink
        title="W3C: Understanding Three Flashes or Below Threshold"
        href="https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html"
        description="WCAG 2.3.1 explained: what counts as a flash, the thresholds, and how to apply them to web and document content."
      />
    </ContentPageLayout>
  );
}
