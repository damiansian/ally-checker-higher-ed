# RUOnline Con 2026 Presentation Outline

**Title:** Getting to 100% Is the Starting Line
**Subtitle:** What Ally Catches, What It Misses, and What Only You Can Fix
**Duration:** 50 minutes (10 intro / 30 presentation / 10 Q&A)
**Format:** Workshop. Questions welcome throughout. Participants have full reference library for deep dives after the session.

---

## Ground Rules for This Talk

- The reference site and workshop document cover everything in depth. This session is not a walkthrough of that material.
- This session will show where automated testing reaches its limits, where manual testing is required, and what the impact looks like for students when content falls through the gaps.
- Ask questions any time. If your question takes us somewhere useful, that is the talk. The library exists so nothing gets lost.

---

## Part 1: Introduction (10 min)

### The Setup (3 min)

- Who I am. Why I care about this. Brief context on the role and the work.
- Who is in the room. Quick pulse: How many of you have used Ally? Have you hit 100%? Have you used a screen reader?
- Frame the session: This is not a compliance training. This is about developing accessibility judgment.

### The Central Claim (4 min)

- **Getting to 100% in Ally is the starting line, not the finish.**
- Automated tools catch roughly 25-57% of accessibility barriers (range from UK GDS audit through Deque's axe-core analysis). The rest requires human judgment.
- A document can score 100% in Ally and be massively inaccessible. That is not a hypothetical. I have one uploaded to Canvas right now, and we are going to look at it together.

### What This Means for You (3 min)

- 21% of undergraduates report a disability. Many do not disclose. Accessible content is not an edge case accommodation; it is baseline participation.
- Ally is an excellent first pass. The Microsoft Accessibility Checker catches things Ally does not. Neither catches what a human review does. You need all three, and then you need your own eyes and ears.
- The reference library covers every category, every file type, step-by-step fixes. After today, you will know *when* to use it, not just *that* it exists.

---

## Part 2: Presentation (30 min)

### Block A: The 100% Lie (8 min)

*Goal: Shatter the assumption that a green score means accessible content. Establish credibility by showing what the tools get wrong.*

#### Live Demo in Canvas: A 100% Document That Is Completely Inaccessible (5 min)

Open the pre-built document in Canvas. Show the Ally score: 100%. Then walk through every category and show the barrier it creates:

- **Text alternatives:** Every image has alt text that reads "image." Ally passes because the field is not empty. A screen reader user hears "image" and gets no information.
- **Semantic structure:** Every paragraph is styled as Heading 2. Ally passes because headings exist. A screen reader user's heading list is useless: every line is the same level with no hierarchy.
- **Tables:** A layout table forces content into two columns. The header row is designated. Ally passes. A screen reader reads the content in the wrong order and announces column headers that have nothing to do with the data.
- **Language:** An untranslated Spanish paragraph sits inside an English document with no language attribute. Ally's language check is unreliable for Word, so it passes. A screen reader reads Spanish with English pronunciation.

**The point:** This document passes every automated check. Every single category is a failure with substantial barriers to access. Presence is not quality.

#### False Positives: When Ally Is Wrong (3 min)

Three false positives I have confirmed through testing:

1. **Alt text over ~120 characters (Canvas).** Ally flags it. There is no WCAG basis for a character limit. Do not shorten your alt text to clear this flag. If a chart needs 200 characters to describe, it needs 200 characters.

2. **Image contrast in photographs.** Ally flags student photos and other photographic content with "This image has contrast issues." Ally cannot distinguish text from non-text content in an image, cannot determine font size or weight, and cannot apply the correct WCAG threshold. Its own guidance says "Guidance not available yet." Ignore these flags.

3. **Ally's Tagged PDF from PowerPoint.** Ally generates alternative formats including Tagged PDF. From PowerPoint sources, the conversion introduces raw SVG path data as text ("PathPathPathPath..."), creates empty Figure tags, flattens list and table structure, and loses document language. The alternative format is less accessible than the source. Word-to-Tagged-PDF is fine. PowerPoint-to-Tagged-PDF is not.

**The point:** I am not telling you to distrust Ally. I am telling you to understand what it is doing so you know when to override it.

---

### Block B: What It Sounds Like When It Breaks (12 min)

*Goal: Make the invisible visible. Screen reader demonstrations are the most effective way to build intuition about what accessibility failures actually do to students.*

#### Demo 1: Alt Text Quality (4 min)

Play (or live-demonstrate with VoiceOver) three versions of the same chart image:

1. **No alt text.** Screen reader says: "Graphic. IMG_3847.png." The student knows an image exists. They know nothing else.
2. **Vague alt text.** "Quiz comparison chart." The student knows it is a chart. They still have none of the data.
3. **Good alt text.** "Grouped bar chart comparing Quiz 1 and Quiz 2 averages across three sections. Section 1: 85% and 82%. Section 2: 83% and 81%. Section 3: 85% and 82%." The student has the data.

Versions 2 and 3 both score 100% in Ally. Only version 3 is accessible.

**Pause for questions.** Ask the room: What would your chart alt text look like right now?

#### Demo 2: Language Pronunciation (4 min)

Play (or live-demonstrate) a Spanish paragraph read three ways:

1. **Correct language attribute (Spanish).** Natural Spanish pronunciation.
2. **Missing language attribute (defaults to English).** "JOO-lee-oh say des-per-TOE con MOO-cho FREE-oh." Incomprehensible.
3. **Wrong language attribute (French).** Different but equally wrong pronunciation.

**The point:** No automated tool reliably detects this in Word or PowerPoint. Ally's language check is unreliable for DOCX and PPTX. The Microsoft checker does not check language at all. The only reliable test is to listen.

**Pause for questions.** Ask: Does anyone have multilingual content in their courses?

#### Demo 3: Table Headers (4 min)

Live screen reader navigation through two versions of a data table:

1. **No header row.** Screen reader reads: "85." Student has no idea what 85 means: which column, which row, what unit.
2. **With header row.** Screen reader reads: "Quiz 1, Section 1: 85." Full context.

Then show the sneaky one: a table with a designated header row where the header cells are empty. Ally is the only tool that catches this. The Microsoft checker and Acrobat both pass it.

**The point:** Tables are where the gap between "technically tagged" and "actually usable" is most visceral. Two seconds of screen reader audio makes the problem obvious in a way no dashboard metric can.

---

### Block C: The Manual Review Checklist (5 min)

*Goal: Give them a practical framework they can use Monday morning.*

#### The Things No Tool Checks (rapid fire)

Walk through the issues that are invisible to every automated tool:

- **Color as sole means of communication.** Red/green rubric with no text labels. If it were grayscale, would the meaning survive? Show the deuteranopia and achromatopsia simulations of the bar chart.
- **Decorative images.** Every unmarked decorative image adds noise for screen readers. No tool can decide if an image is decorative. That is your call.
- **Reading order.** PowerPoint slides and PDFs can look correct visually and read in the wrong sequence. Selection Pane and Tags panel are the only way to verify.
- **Seizure risk beyond GIFs.** Ally checks animated GIFs. It does not check video, PowerPoint transitions, or auto-playing media. Flashing content has the highest possible impact (5/5) and the lowest detection rate.

#### The Three-Tool Stack

| Step | Tool | What it catches that others miss |
|------|------|--------------------------------|
| 1 | Microsoft Accessibility Checker | AI-generated alt text, in-place fixes before upload |
| 2 | Ally (after upload to Canvas) | Faked lists, file-name alt text, overall score |
| 3 | Manual review + screen reader | Alt text quality, language, color, reading order, decorative images |

**The point:** No single tool is sufficient. This stack closes the most gaps with the least effort. Run them in this order.

---

### Block D: Closing and Handoff to Resources (5 min)

#### What You Have Access To

- **The reference site** (deployed on Vercel): Every category, every file type, detection tables, fix instructions, false positive documentation. This is the deep-dive resource.
- **The workshop document**: A sample document with intentional accessibility errors for hands-on practice.
- **The test files**: Pre-built broken files (Word, PowerPoint, PDF) for each scenario, ready to upload to Canvas and test.

#### The Three Things to Remember

1. **100% in Ally means you passed the checks Ally can run.** It does not mean your content is accessible. It means you are ready to start the work that matters.
2. **Listen to your content.** Even a 30-second screen reader test reveals problems no dashboard can show you. VoiceOver is built into every Mac. NVDA is free on Windows.
3. **Fix at the source.** Fixing a Word doc before export is always easier than remediating a PDF after. Fixing a PowerPoint before upload is always easier than fighting Ally's alternative format pipeline.

---

## Part 3: Q&A (10 min)

### If Questions Are Flowing

Let them flow. The library handles everything we did not get to cover.

### If Questions Need Prompting

Seed questions:

- "Who has content with charts or data visualizations? What does your alt text look like for those?"
- "Has anyone gotten a flag in Ally that felt wrong? Let's talk about whether it was a real issue."
- "Anyone working with multilingual content? What has your experience been with language settings?"
- "What is the most common file type you publish? Let's talk about what to watch for in that format."

### Closing (1 min)

- Share the reference site URL and resource links.
- "The goal is not perfection. The goal is knowing where the tools stop and your judgment starts."

---

## Presenter Notes

### Equipment and Setup

- [ ] Laptop with VoiceOver enabled (or NVDA if on Windows)
- [ ] Pre-built 100% Ally document ready to show
- [ ] Screen reader audio clips as backup if live demo has issues
- [ ] Reference site open in a tab
- [ ] Colour Contrast Analyser (CCA) installed for ad-hoc checks during Q&A
- [ ] Test files ready to distribute or show uploading to Canvas

### Timing Checkpoints

| Clock | Section | Notes |
|-------|---------|-------|
| 0:00 | Part 1 starts | |
| 10:00 | Part 2 starts | If running long on intro, cut the pulse questions |
| 18:00 | Should be starting Block B | If behind, cut one demo to two |
| 30:00 | Should be starting Block C | If behind, rapid-fire the checklist |
| 40:00 | Part 3 starts | |
| 49:00 | Closing | Share links, final thought |

### Flex Points (If Running Short or Long)

- **Short on time:** Block C (manual checklist) can be delivered in 2 minutes as a single slide with the three-tool table. Point to the reference site for details.
- **Short on time:** Block A false positives can be reduced to one example (alt text length, since it is the most universally encountered).
- **Ahead of schedule:** Expand Block B with additional screen reader demos (reading order in PowerPoint, faked list vs. real list).
- **Audience very engaged in Q&A during presentation:** Let it happen. Trim Block D (closing/resources) to a single URL share. The library is self-service.

### Key Lines to Land

- "Getting to 100% is the starting line, not the finish."
- "Typing 'asdf' into an alt text field clears every automated warning. The content scores 100%. The screen reader user hears 'asdf.'"
- "Presence is not quality."
- "The only reliable test for language is to listen."
- "If your chart were printed in grayscale, would all the meaning still be present?"
