# VR Fire Extinguisher Trainer

A **WebXR** interaction prototype for practising a guided fire-response sequence. Two controllers operate constrained mechanical parts, hold an extinguisher and aim a separate nozzle.

[Open the live demo](https://daniel-aguilar03.github.io/vr-fire-extinguisher-trainer/) · [Watch the walkthrough](https://youtu.be/MzX0x555P3k)

[![Fire extinguisher walkthrough](https://img.youtube.com/vi/MzX0x555P3k/hqdefault.jpg)](https://youtu.be/MzX0x555P3k)

> Educational interaction prototype only—not emergency certification or a substitute for workplace training. The help call is simulated and never contacts emergency services.

## Highlights

- Seven explicit outcomes: alarm, simulated help call, suitable-tool validation, Pull, Aim, Squeeze and Sweep.
- Two-handed controller interaction with handle-based pickup and predictable nozzle aiming.
- Constrained alarm slider, removable pin, squeeze lever and tethered nozzle.
- Correct-type and pressure checks, recoverable errors and automatic completion.
- One current instruction, active-part highlights and optional hints.
- Curved rubber-hose visuals and pooled white powder particles emitted from the nozzle.

## Try it

For immersive use, open the live HTTPS link in a compatible **Quest browser**, then select **Enter VR**. Two tracked controllers are required; this is not hand tracking.

| Control | Action |
| --- | --- |
| Side grip near a part | Hold, pull or release it |
| Free-hand trigger | Select raised controls |
| Tank-hand trigger | Squeeze the extinguisher valve |
| Nozzle hand | Aim at the fire base |
| Left X / Recenter Bench | Bring the workspace in front of you |
| Hint / Reset | Show guidance / restart the procedure |

Suggested hand assignment: left hand holds the tank; right hand pulls the pin and holds the nozzle.

In this authored scenario, activate the alarm, simulate calling help and validate the **left red ABC with green pressure**. The low-pressure ABC and WATER choices are rejected without erasing completed outcomes. Pull the pin, aim at the base, squeeze with the tank hand and sweep all three sections.

The desktop version offers current-step buttons for inspection. Space toggles spray; arrows and J control the sweep. Desktop controls are not a replacement for controller interaction.

## Run locally

Requires Node.js 20 or newer.

```sh
npm ci
npm start
npm test
npm run check
npm run build
```

Open [localhost:8080](http://localhost:8080/) on the development machine. Remote headset access requires HTTPS; the published Pages link supplies it. The `dist/` build contains only the application, and GitHub Actions tests and deploys it.

## How it works

- `src/procedure.js` stores states, prerequisites, errors and coverage.
- `src/main.js` connects controller grabs, trigger actions and scene feedback.
- `src/mechanics.js` checks constrained motion, spray range and base targeting.
- `src/visuals.js` renders the hose, nozzle, pressure control and particle pool.
- `src/shared/` includes the complete runtime and pinned Three.js dependency.

The alarm and pin move along their local mechanical axes. The held tank and nozzle must use different controllers. Range-limited, obstruction-checked aim coverage determines success; particle collisions do not. Dropping either tool stops discharge.

## Validation and limitations

Tests cover step ordering, recovery, pressure/type checks, two-handed conditions, grabbing, pointing and visual geometry. The underlying prototype has been operated on Quest; this standalone packaging does not claim a new exhaustive device or performance benchmark.

Interaction uses scripted constraints, not a general rigidbody solver. Hose sag and powder are visual effects, pressure is an authored condition, and no smoke, fire chemistry or fluid pressure is simulated.

References: [USFA extinguisher guidance](https://www.usfa.fema.gov/prevention/home-fires/prepare-for-fire/fire-extinguishers/), [OSHA extinguisher use](https://www.osha.gov/etools/evacuation-plans-procedures/emergency-standards/portable-extinguishers/use), [WebXR controller spaces](https://www.w3.org/TR/webxr/#xrinputsource-interface).

Created by **Daniel Aguilar**. See [credits and development provenance](CREDITS.md).
