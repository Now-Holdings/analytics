import posthog from "posthog-js";
import { eventProperties, isEnabled } from "./core.js";

/** @type {import("./core.js").InitOptions | null} */
let options = null;
let started = false;

/**
 * Initialize PostHog for web. Empty apiKey → no-op (safe for local / missing key).
 * Never calls identify().
 * @param {import("./core.js").InitOptions} opts
 */
export function initAnalytics(opts) {
  options = opts;
  started = false;
  if (!isEnabled(opts)) {
    return;
  }
  posthog.init(opts.apiKey.trim(), {
    api_host: opts.host || "https://us.i.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: false,
    autocapture: false,
    persistence: "localStorage+cookie",
  });
  started = true;
}

/**
 * @param {string} event
 * @param {Record<string, unknown>} [props]
 */
export function capture(event, props) {
  if (!started || !options) {
    return;
  }
  posthog.capture(event, eventProperties(options, props));
}

/**
 * @param {unknown} err
 * @param {Record<string, unknown>} [props]
 */
export function captureException(err, props) {
  if (!started || !options) {
    return;
  }
  const extra = eventProperties(options, props);
  if (typeof posthog.captureException === "function") {
    posthog.captureException(err, extra);
    return;
  }
  const message = err && typeof err === "object" && "message" in err ? String(err.message) : String(err);
  posthog.capture("$exception", { ...extra, message });
}

/** Intentionally not implemented in v1 (anonymous events). */
export function identify() {
  // Policy: no identify() until observability.md is updated.
}

export { baseProperties, eventProperties, sanitizeProperties, isEnabled } from "./core.js";
