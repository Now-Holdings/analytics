import assert from "node:assert/strict";
import { test } from "node:test";
import { baseProperties, eventProperties, isEnabled, sanitizeProperties } from "./core.js";

test("isEnabled requires non-empty apiKey", () => {
  assert.equal(isEnabled({ apiKey: "", product: "aundar", door: "customer" }), false);
  assert.equal(isEnabled({ product: "aundar", door: "customer" }), false);
  assert.equal(isEnabled({ apiKey: "phc_x", product: "aundar", door: "customer" }), true);
});

test("sanitizeProperties drops PII and reserved keys", () => {
  const out = sanitizeProperties({
    email: "a@b.c",
    name: "Ada",
    door: "customer",
    extra: "ok",
  });
  assert.deepEqual(out, { extra: "ok" });
});

test("baseProperties includes door and product", () => {
  const p = baseProperties({ product: "aundar", door: "customer", platform: "web" });
  assert.equal(p.door, "customer");
  assert.equal(p.product, "aundar");
  assert.equal(p.platform, "web");
});

test("eventProperties does not let callers override door or product", () => {
  const p = eventProperties(
    { product: "aundar", door: "customer", platform: "web", environment: "production" },
    { door: "admin", product: "evil", email: "a@b.c", extra: "ok" },
  );
  assert.equal(p.door, "customer");
  assert.equal(p.product, "aundar");
  assert.equal(p.platform, "web");
  assert.equal(p.environment, "production");
  assert.equal(p.extra, "ok");
  assert.equal("email" in p, false);
});
