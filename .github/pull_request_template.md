## What changed

<!-- One or two sentences. What does this PR do, and why? -->

## How to verify

<!-- The screens to click through, or commands to run. -->

```bash
npm ci
npm start
```

## Checklist

- [ ] `npm run build` succeeds
- [ ] New API calls were added to `src/redux/ApiSlice.jsx` (not as stray axios calls)
- [ ] Backend endpoint exists — see boopathi-003/attendance_management_backend
- [ ] Admin-only UI is gated on `sessionStorage.getItem('role')`
