/**
 * Expo / React Native entry. Phase 5 is deferred — this stub never loads
 * posthog-react-native (keeps web bundles free of the RN SDK).
 */

import { isEnabled } from "./core.js";

/** @param {import("./core.js").InitOptions} opts */
export function initAnalytics(opts) {
  if (isEnabled(opts) && typeof console !== "undefined" && console.info) {
    console.info("[analytics/native] deferred until Phase 5 (Expo); init ignored");
  }
}

export function capture() {}
export function captureException() {}
export function identify() {}

export { baseProperties, eventProperties, sanitizeProperties, isEnabled } from "./core.js";
