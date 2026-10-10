# @now-holdings/analytics

Shared PostHog wrapper for Now Holdings products. Apps do **not** import `posthog-js` or `posthog-react-native` directly.

## Rules (policy)

- `door`: `customer` | `admin` — Aundar pilot is **customer only**
- **Anonymous**: no `identify()` in v1 (`person_profiles: identified_only`)
- **No PII** in event properties (no email, phone, name, address)
- Local / missing key: **no-op** (analytics disabled)

## Web

```js
import { initAnalytics, capture, captureException } from "@now-holdings/analytics/web";

initAnalytics({
  apiKey: process.env.POSTHOG_KEY, // omit or empty → disabled
  host: process.env.POSTHOG_HOST || "https://us.i.posthog.com",
  product: "aundar",
  door: "customer",
  platform: "web",
  environment: "production",
});

capture("$pageview");
capture("contact_submitted");
```

## Native (Expo)

`@now-holdings/analytics/native` is a **stub** until Phase 5 (Expo). It no-ops so web bundles never pull the RN SDK.

## Events (Aundar)

| Event | When |
| --- | --- |
| `$pageview` | Marketing page load |
| `contact_submitted` | `POST /api/contact` succeeded (no form fields) |
