import assert from "node:assert/strict";
import { test } from "node:test";
import { baseProperties, isEnabled, sanitizeProperties } from "./core.js";

test("isEnabled requires non-empty apiKey", () => {
  assert.equal(isEnabled({ apiKey: "", product: "aundar", door: "customer" }), false);
  assert.equal(isEnabled({ product: "aundar", door: "customer" }), false);
  assert.equal(isEnabled({ apiKey: "phc_x", product: "aundar", door: "customer" }), true);
});

test("sanitizeProperties drops PII keys", () => {
  const out = sanitizeProperties({
    email: "a@b.c",
    name: "Ada",
    door: "customer",
  });
  assert.deepEqual(out, { door: "customer" });
});

test("baseProperties includes door and product", () => {
  const p = baseProperties({ product: "aundar", door: "customer", platform: "web" });
  assert.equal(p.door, "customer");
  assert.equal(p.product, "aundar");
  assert.equal(p.platform, "web");
});
