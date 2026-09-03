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
 * Everything below is expressed for a right-handed golfer and mirrored in the UI
 * for left-handers, so the logic table only has to exist once.
 */

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

const key = (s: Start, c: Curve) => `${s}-${c}`;

export const FLIGHTS: Record<string, Flight> = {
  [key('left', 'right')]: {
    id: 'pull-slice',
    name: 'Pull slice',
    impact:
      'The face was left of your target at impact, and the path was even further left of the face. ' +
      'That combination starts the ball left and tilts the spin axis hard to the right.',
    causes: [
      'An out-to-in swing path — the club is travelling left across the ball through impact',
      'Shoulders aimed left at address, which makes the out-to-in path feel natural',
      'The upper body starting the downswing before the lower body, throwing the club outside',
      'A grip weak enough that the face cannot square, so you steer left to compensate',
    ],
    fixes: [
      'Fix alignment first — most pull slices start with shoulders open to the target line',
      'Strengthen the grip until you see two to three knuckles on your lead hand at address',
      'Use an alignment stick just outside the ball to force an in-to-out delivery',
      'Feel the downswing starting from the ground up, with pressure moving into the lead foot',
    ],
    href: '/fixes/slice/',
    severity: 'common',
  },
  [key('straight', 'right')]: {
    id: 'fade-slice',
    name: 'Straight slice',
    impact:
      'The face was close to square to your target, but the path was left of the face. ' +
      'The start line looks fine, which is why this one is so frustrating.',
    causes: [
      'An out-to-in path with a face that happens to match the target line',
      'Early extension — the hips moving toward the ball, forcing the arms out and across',
      'Ball position too far forward, so you catch the ball after the path has moved left',
    ],
    fixes: [
      'Check ball position before you change anything in the swing',
      'Work on maintaining the space between your hips and the ball through impact',
      'Practise hitting deliberate draws; the exaggeration usually lands you on neutral',
    ],
    href: '/fixes/slice/',
    severity: 'common',
  },
  [key('right', 'right')]: {
    id: 'push-slice',
    name: 'Push slice',
    impact:
      'The face was open to your target, and the path was left of that open face. ' +
      'This is the biggest miss in golf — it starts right and keeps going right.',
    causes: [
      'The face wide open at impact, usually from a weak grip or a lack of forearm rotation',
      'Hanging back on the trail foot, which leaves the face open and the path across',
      'Trying to lift the ball into the air rather than compressing it',
    ],
    fixes: [
      'Strengthen the grip and check it at address every single time',
      'Rehearse the release: trail forearm rotating over the lead through impact',
      'Get weight forward — a simple step-through drill exposes this quickly',
    ],
    href: '/fixes/slice/',
    severity: 'common',
  },
  [key('right', 'left')]: {
    id: 'push-hook',
    name: 'Push hook',
    impact:
      'The face was right of your target, and the path was even further right of the face. ' +
      'The ball starts right, then turns hard left.',
    causes: [
      'An excessively in-to-out path, often from an over-active lower body slide',
      'A grip strong enough that the face closes rapidly through impact',
      'Getting stuck — the arms trapped behind the body, then flipping to catch up',
    ],
    fixes: [
      'Neutralise the grip one hand at a time and re-test',
      'Rotate the body through impact rather than sliding toward the target',
      'Feel the chest covering the ball so the arms stay in front of the body',
    ],
    href: '/fixes/', // TODO: point at /fixes/hook/ once that page ships
    severity: 'occasional',
  },
  [key('straight', 'left')]: {
    id: 'straight-hook',
    name: 'Straight hook',
    impact:
      'The face was near square to your target, with the path to the right of it. ' +
      'The ball sets off on line and then dives left.',
    causes: [
      'An in-to-out path with a face closing through impact',
      'Hands too active through the strike, flipping the face shut',
      'Ball position too far back, catching the ball before the path returns to neutral',
    ],
    fixes: [
      'Check ball position first — it is the cheapest fix and often the whole answer',
      'Quieten the hands and let body rotation deliver the club',
      'Hold the finish with the chest facing the target to encourage rotation over flip',
    ],
    href: '/fixes/', // TODO: point at /fixes/hook/ once that page ships
    severity: 'occasional',
  },
  [key('left', 'left')]: {
    id: 'pull-hook',
    name: 'Pull hook',
    impact:
      'The face was left of your target and the path was right of the face — a closed face ' +
      'with an in-to-out path. The two-way miss golfers fear most.',
    causes: [
      'A strong grip combined with active hands through impact',
      'The body stalling so the arms and club overtake it',
      'Aim drifting right while the hands instinctively pull the face closed',
    ],
    fixes: [
      'Re-check alignment — this miss often hides an aim problem, not a swing problem',
      'Weaken the grip slightly and keep body rotation going through the ball',
      'Practise with feet together to stop the lower body from stalling',
    ],
    href: '/fixes/', // TODO: point at /fixes/hook/ once that page ships
    severity: 'occasional',
  },
  [key('left', 'straight')]: {
    id: 'pull',
    name: 'Straight pull',
    impact:
      'Face and path were matched, but both were aimed left of your target. ' +
      'Mechanically this is a good strike sent to the wrong address.',
    causes: [
      'Aim and alignment left of where you think you are aimed',
      'An out-to-in path with the face square to that path',
      'Ball position too far forward, catching the ball late in the arc',
    ],
    fixes: [
      'Lay a club on the ground and check your actual alignment — almost nobody aims where they think',
      'Move ball position back a fraction and re-test',
      'Pick an intermediate target a foot in front of the ball and aim at that instead',
    ],
    href: '/fixes/',
    severity: 'common',
  },
  [key('right', 'straight')]: {
    id: 'push',
    name: 'Straight push',
    impact:
      'Face and path matched each other but both pointed right of the target. ' +
      'A well-struck shot with the wrong start line.',
    causes: [
      'Alignment aimed right of the target',
      'An in-to-out path with the face square to it',
      'Ball position too far back in the stance',
    ],
    fixes: [
      'Check alignment with a stick before assuming the swing is at fault',
      'Move ball position forward slightly',
      'Make sure your trail shoulder is not dropping well below the lead at address',
    ],
    href: '/fixes/',
    severity: 'common',
  },
  [key('straight', 'straight')]: {
    id: 'straight',
    name: 'Straight',
    impact:
      'Face and path were both square to the target and matched each other. ' +
      'There is nothing to fix here.',
    causes: ['Nothing. This is the shot you are trying to hit.'],
    fixes: [
      'A dead-straight ball is actually the hardest shot to repeat, because it needs two ' +
      'variables to be perfect at once. Most good players prefer a small, predictable curve ' +
      'they can aim off — it only needs one variable to stay consistent.',
    ],
    severity: 'rare',
  },
};

export interface StrikeIssue {
  id: string;
  name: string;
  symptom: string;
  impact: string;
  causes: string[];
  fixes: string[];
  href?: string;
}

export const STRIKE: StrikeIssue[] = [
  {
    id: 'fat',
    name: 'Fat / chunked',
    symptom: 'The club hits the ground before the ball. Big divot behind the ball, distance falls off a cliff.',
    impact: 'The low point of your swing arc is behind the ball instead of in front of it.',
    causes: [
      'Weight hanging on the trail foot through impact',
      'Early extension raising the body then dropping it back down',
      'Trying to help the ball up rather than hitting down and through',
    ],
    fixes: [
      'Place a tee two inches in front of the ball and try to clip it after the ball',
      'Feel 60% of your pressure in the lead foot at impact with a mid iron',
      'Narrow your stance and hit half shots until the divot starts after the ball',
    ],
    href: '/fixes/fat-shots/',
  },
  {
    id: 'thin',
    name: 'Thin / bladed',
    symptom: 'A low screamer off the bottom edge. Stings the hands, runs forever, holds nothing.',
    impact: 'The leading edge strikes the equator of the ball — the low point is too far forward or the body has lifted.',
    causes: [
      'Standing up through impact, usually to help the ball into the air',
      'Weight moving backwards then the arms pulling in to avoid the ground',
      'Ball too far forward with a shallow angle of attack',
    ],
    fixes: [
      'Keep your chest covering the ball a fraction longer through the strike',
      'Practise brushing the grass in rehearsal swings before every shot',
      'Check that you are not backing away from the ball as you start down',
    ],
    href: '/fixes/topped-shots/',
  },
  {
    id: 'top',
    name: 'Topped',
    symptom: 'The club catches the top of the ball and it dribbles along the ground.',
    impact: 'The club is at or above the ball equator at impact — an extreme version of a thin strike.',
    causes: [
      'Lifting the whole body during the downswing',
      'Trying to scoop the ball into the air',
      'Losing posture — the spine angle straightening on the way down',
    ],
    fixes: [
      'Keep your trail knee flexed through the downswing',
      'Hit balls off a low tee to rebuild confidence in hitting down',
      'Ask someone to film you face-on; topping is nearly always visible as a stand-up',
    ],
    href: '/fixes/topped-shots/',
  },
  {
    id: 'shank',
    name: 'Shank',
    symptom: 'The ball fires almost sideways right, off the hosel. Instantly demoralising.',
    impact: 'Contact is on the hosel, not the face — the club is further from your body at impact than at address.',
    causes: [
      'The club moving out toward the ball on the downswing',
      'Weight shifting onto the toes through impact',
      'Standing too close to the ball at address',
    ],
    fixes: [
      'Put a headcover just outside the ball and swing without hitting it',
      'Feel your weight in your heels through the strike',
      'Hit shots off the toe of the club deliberately — it recalibrates fast',
    ],
    href: '/fixes/shank/',
  },
  {
    id: 'heel-toe',
    name: 'Heel or toe strikes',
    symptom: 'Contact is inconsistent across the face. Distance varies wildly on similar swings.',
    impact: 'Your low point and clubhead delivery are not repeating, so face contact wanders.',
    causes: [
      'Inconsistent distance from the ball at address',
      'Excessive lateral movement during the swing',
      'Grip pressure changing through the swing',
    ],
    fixes: [
      'Spray the face with foot powder and hit ten balls — find out where you actually strike it',
      'Build a repeatable setup routine so the distance to the ball is the same every time',
      'Work on rotation rather than sway; a mirror or a wall drill helps quickly',
    ],
    href: '/fixes/',
  },
];

export const diagnose = (start: Start, curve: Curve): Flight => FLIGHTS[key(start, curve)];
