export const expectedViolationPages = [
  {
    routes: ["/color", "/color/"],
    requiredRuleIds: ["color-contrast"],
    demoSelector: '[data-a11y-demo="intentional-contrast-fail"]',
  },
  {
    routes: ["/tables/canvas"],
    requiredRuleIds: ["scrollable-region-focusable"],
  },
];

export function isExpectedViolationRoute(pathname) {
  return expectedViolationPages.some((page) => page.routes.includes(pathname));
}
