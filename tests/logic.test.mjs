import test from "node:test";
import assert from "node:assert/strict";
import { Procedure } from "../src/procedure.js";
test("procedure rejects skipped steps and recovers without losing progress", () => {
  const p = new Procedure();
  assert.equal(p.event("pin"), false);
  assert.equal(p.step, 0);
  p.event("alarm", { slide: 0.11 });
  p.event("wrong-part");
  assert.equal(p.step, 1);
  assert.equal(p.errors, 2);
  p.event("call");
  p.event("ready", { held: true, type: "ABC", pressure: "green" });
  p.event("pin", { tankHeld: true, slide: 0.2 });
  p.event("aim", { nozzleHeld: true, atBase: true });
  assert.equal(p.event("squeeze", { twoHands: false, atBase: true }), false);
  assert.equal(p.step, 5);
  p.event("squeeze", { twoHands: true, atBase: true });
  assert.equal(p.step, 6);
  for (let i = 0; i < 25; i++) p.spray(0, 0.05);
  for (let i = 0; i < 25; i++) p.spray(1, 0.05);
  assert.equal(p.step, 6);
  for (let i = 0; i < 25; i++) p.spray(2, 0.05);
  assert.equal(p.step, 7);
  assert.equal(p.complete, true);
  p.reset();
  assert.equal(p.step, 0);
  assert.equal(p.errors, 0);
});
test("guided completion freezes progress and reset starts a clean walkthrough", () => {
  const p = new Procedure();
  for (const [action, context] of [
    ["alarm", { slide: 0.11 }],
    ["call", {}],
    ["ready", { held: true, type: "ABC", pressure: "green" }],
    ["pin", { tankHeld: true, slide: 0.2 }],
    ["aim", { nozzleHeld: true, atBase: true }],
  ]) {
    assert.equal(p.event(action, context), true);
    assert.equal(p.message, "");
  }
  p.event("squeeze", { twoHands: true, atBase: true });
  for (let i = 0; i < 3; i++)
    for (let frame = 0; frame < 25; frame++) p.spray(i, 0.05);
  assert.equal(p.complete, true);
  assert.equal(p.ended, true);
  assert.match(p.message, /Fire out/);
  const final = JSON.stringify(p);
  for (const action of ["alarm", "wrong-part", "verify"]) p.event(action);
  p.spray(0, 2);
  assert.equal(JSON.stringify(p), final);
  p.reset();
  assert.equal(p.step, 0);
  assert.equal(p.errors, 0);
  assert.equal(p.complete, false);
  assert.equal(p.ended, false);
  assert.deepEqual(p.coverage, [0, 0, 0]);
  assert.equal(p.message, "");
});
