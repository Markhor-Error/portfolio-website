/**
 * Ball flight diagnosis, built on the modern (D-plane) ball flight laws rather than
 * the older "path decides start direction" model:
 *
 *   1. The ball starts close to where the CLUB FACE points at impact.
 *      Face is the dominant influence on start direction — most strongly with a
 *      driver, progressively less so as loft increases.
 *   2. The ball CURVES away from the club path, relative to the face.
 *      Path right of the face tilts the spin axis left, so the ball curves left.
 *      Path left of the face tilts it right, so the ball curves right.
 *
 * Everything is expressed for a right-handed golfer and mirrored in the UI for
 * left-handers, so the logic table only has to exist once.
 *
 * The data itself lives in ballflight.json, which is the single source shared with
 * the WordPress theme (assets/js/ball-flight-data.js is generated from it by
 * `npm run sync:theme`). Editing the JSON updates both; editing either generated
 * copy by hand will be overwritten.
 *
 * COPY RULE: body references must use lead/trail, never left/right, because the
 * left-handed mirroring flips every standalone "left" and "right" in this file.
 */
import data from './ballflight.json';

export type Start = 'left' | 'straight' | 'right';
export type Curve = 'left' | 'straight' | 'right';

export interface Flight {
  id: string;
  name: string;
  /** What the impact conditions must have been. */
  impact: string;
  causes: string[];
  fixes: string[];
  /** Cluster page that treats this in depth. Keeps the tool from being an orphan. */
  href?: string;
  severity: 'common' | 'occasional' | 'rare';
}

export interface StrikeIssue {
  id: string;
  name: string;
  symptom: string;
  impact: string;
  causes: string[];
  fixes: string[];
  href?: string;
}

export const FLIGHTS = data.FLIGHTS as Record<string, Flight>;
export const STRIKE = data.STRIKE as StrikeIssue[];

export const diagnose = (start: Start, curve: Curve): Flight => FLIGHTS[`${start}-${curve}`];
