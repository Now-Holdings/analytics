import assert from "node:assert/strict";
import { test } from "node:test";
import { capture, identify, initAnalytics } from "./web.js";

test("init with empty key is a no-op and capture does not throw", () => {
  initAnalytics({ apiKey: "", product: "aundar", door: "customer", platform: "web" });
  capture("$pageview", { door: "admin" });
});

test("identify is a no-op", () => {
  identify("user-1");
});
