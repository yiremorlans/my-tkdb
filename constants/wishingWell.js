// Tokyo Debunker Wishing Well start times, as Unix seconds (docs/countdown.md
// §7). Global: every server's Wishing Well channel and /wishingwell read this
// list. Updated by hand when new dates are announced and shipped with a
// deploy. Ended Wishing Wells are ignored, so pruning them is optional cleanup.

// Every Wishing Well runs this long from its start time. While one is running
// the channel counts down to its end, not to the next start.
export const WISHING_WELL_DURATION_SECONDS = 4 * 86_400;

export const WISHING_WELL_DATES = [
  1793458800, // Sat Oct 31 2026 11:00 AM EDT
  1794538800, // Thu Nov 12 2026 10:00 PM EST
  1796050800, // Mon Nov 30 2026 10:00 AM EST
  1797562800, // Thu Dec 17 2026 10:00 PM EST
  1798729200, // Thu Dec 31 2026 10:00 AM EST
];
