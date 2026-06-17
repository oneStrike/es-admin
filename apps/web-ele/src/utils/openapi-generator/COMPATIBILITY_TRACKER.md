# OpenAPI Generator Compatibility Tracker

This file tracks compatibility paths that compensate for known `es-server` OpenAPI export gaps. Remove these paths once the backend export carries the same contract directly.

## Response Page-Envelope Requiredness Shim

- Location: `generator.ts`
- Why it exists: `es-server` `ApiPageDoc` treats `list`, `pageIndex`, `pageSize`, and `total` as required page response fields, while the exported OpenAPI can omit the parent `required[]` array for `data`.
- Removal condition: `es-server` exports parent `required: ['list', 'pageIndex', 'pageSize', 'total']` for `ApiPageDoc` data envelopes.
- Verification before removal: remove the `response-page-envelope` special context, run `pnpm -F @vben/web-ele run att`, and confirm page responses remain required plus the request-body negative fixture still passes.

Keep the request-body negative fixture while the page-envelope compatibility path exists.
