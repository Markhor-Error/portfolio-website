/**
 * Space and budget planning data for /tools/simulator-budget/.
 *
 * Two deliberate constraints on what lives here:
 *
 * 1. NO MARKET PRICES. The percentages below are our recommended split of the
 *    reader's own budget, not a claim about what anything costs. Standing rule 1
 *    forbids publishing figures we have not verified, and launch monitor pricing in
 *    particular moves fast enough that any number we baked in would be misleading
 *    within a year — which is exactly the decay visible on competing guides.
 *
 * 2. THE GEOMETRY MODEL IS SHOWN, NOT ASSERTED. `reachFactor` is an approximation of
 *    overhead fingertip reach as a multiple of standing height, and the tool says so
 *    and lets the reader override it with a real measurement. The definitive test is
 *    still swinging a driver in the room, and the tool says that too.
 *
 * The JSON is the single source shared with the WordPress theme
 * (assets/js/sim-budget-data.js is generated from it by `npm run sync:theme`).
 * Editing the JSON updates both; editing the generated copy by hand will be lost.
 */
import data from './simbudget.json';

export interface SimComponent {
  id: string;
  name: string;
  /** Share of the reader's stated budget. Each build's components sum to 100. */
  pct: number;
  why: string;
  href?: string;
}

export interface SimBuild {
  label: string;
  summary: string;
  components: SimComponent[];
}

export interface SimModel {
  /** Overhead fingertip reach ≈ standing height × this. An approximation, labelled as one. */
  reachFactor: number;
  /**
   * Vertical contribution of the club above the fingertips at the highest point of
   * the swing. Roughly half a driver, because the club is nowhere near vertical when
   * it is highest — at the top it lies back behind the head, and through the finish
   * it swings up across the lead shoulder.
   */
  clubOverheadIn: number;
  /** Planning margin so the ceiling verdict is not decided by an inch. */
  swingMarginIn: number;
  /** Minimum ball-to-net distance to let the ball slow and the rebound lose energy. */
  ballToNetMinIn: number;
  /** Clearance either side of the ball before a mishit reaches something solid. */
  sideClearanceIn: number;
  /** Roughly how far behind the ball the golfer's stance and trail shoulder sit. */
  shoulderToBallIn: number;
}

export const MODEL = data.MODEL as SimModel;
export const BUILDS = data.BUILDS as Record<string, SimBuild>;

export type BuildId = keyof typeof BUILDS;

/** Split a budget across a build, largest first, with the remainder on the last row. */
export function allocate(build: SimBuild, budget: number) {
  const rows = build.components.map((c) => ({
    ...c,
    amount: Math.round((budget * c.pct) / 100),
  }));
  // Rounding each row independently can drift from the total; absorb it on the reserve.
  const drift = budget - rows.reduce((n, r) => n + r.amount, 0);
  if (rows.length) rows[rows.length - 1].amount += drift;
  return rows;
}
