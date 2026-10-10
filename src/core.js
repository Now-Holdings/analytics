/** @typedef {"admin" | "customer"} Door */
/** @typedef {"web" | "expo_web" | "ios" | "android"} Platform */

/**
 * @typedef {object} InitOptions
 * @property {string} [apiKey]
 * @property {string} [host]
 * @property {string} product
 * @property {Door} door
 * @property {Platform} [platform]
 * @property {string} [environment]
 */

const PII_KEYS = new Set([
  "email",
  "phone",
  "name",
  "address",
  "full_name",
  "phone_number",
  "user_email",
  "$email",
]);

const RESERVED_KEYS = new Set(["door", "product", "platform", "environment"]);

/**
 * @param {InitOptions} opts
 * @returns {Record<string, string>}
 */
export function baseProperties(opts) {
  return {
    product: opts.product,
    door: opts.door,
    platform: opts.platform || "web",
    environment: opts.environment || "production",
  };
}

/**
 * Drop keys that look like PII. Does not recurse into nested objects.
 * @param {Record<string, unknown>} [props]
 */
export function sanitizeProperties(props) {
  if (!props || typeof props !== "object") {
    return {};
  }
  /** @type {Record<string, unknown>} */
  const out = {};
  for (const [key, value] of Object.entries(props)) {
    const lower = key.toLowerCase();
    if (PII_KEYS.has(lower) || RESERVED_KEYS.has(lower)) {
      continue;
    }
    out[key] = value;
  }
  return out;
}

/**
 * Event properties: caller props first, then locked door/product/platform/environment.
 * @param {InitOptions} opts
 * @param {Record<string, unknown>} [props]
 */
export function eventProperties(opts, props) {
  return {
    ...sanitizeProperties(props),
    ...baseProperties(opts),
  };
}

export function isEnabled(opts) {
  return Boolean(opts && typeof opts.apiKey === "string" && opts.apiKey.trim());
}
