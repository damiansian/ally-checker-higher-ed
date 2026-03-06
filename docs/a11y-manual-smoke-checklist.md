# Manual A11y Smoke Checklist

Run this before major releases.

## Keyboard Only

- Tab from top of page reaches "Skip to main content".
- Skip link moves focus to `<main>`.
- Top navigation links are reachable and actionable.
- Focus indicator is clearly visible on links/buttons.
- No keyboard traps.

## Screen Reader (NVDA/JAWS/VoiceOver)

- Page title and landmarks are announced.
- Exactly one clear `h1` per page.
- Heading navigation (`H`) follows logical order.
- Links/buttons announce meaningful names.
- Tables announce headers correctly.

## Content and Comprehension

- Alt text is meaningful and concise.
- Decorative images are skipped correctly.
- Instructions do not rely on color alone.
- Error/fix guidance is understandable without visuals.

## Visual Preference Modes

- 200% and 400% equivalents preserve content and function.
- Text spacing overrides do not break layout or hide text.
- Forced colors mode keeps controls readable and discoverable.
- Reduced motion does not remove required information.

## Pass/Fail Rule

Any failure above blocks release until fixed or explicitly risk-accepted.
