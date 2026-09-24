# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

React 18 SPA (Create React App, `react-scripts` 5.0.1) — the frontend for the Spring Boot attendance API at
`D:\POC\Backend\Springboot\attendance_management`. JavaScript only, no TypeScript. Bootstrap 5 + react-bootstrap for UI,
RTK Query for data, Formik + Yup for the one form, SweetAlert2 for toasts/confirms.

> There is a near-identical copy of this project at `D:\POC\FrontEnd\React\attendance_mamangement` (same `package.json`
> name `attendance_mamangement`, same `src/` layout). **This directory is the one to edit.** Leave the copy alone.

## Commands

`node_modules` is not checked in and not present — install before anything else.

```powershell
npm install          # required first run
npm start            # dev server on :3000 — the backend CORS allowlist only permits :3000 and :3001
npm run build        # production bundle into build/
npm test             # CRA/Jest watch mode
```

The backend must be running on `http://localhost:8080` for anything past the login screen to work.

**There is no `.env` and no proxy.** The API base URL is hardcoded in **two** places and both must change together:

- `src/redux/ApiSlice.jsx` — `fetchBaseQuery({ baseUrl: 'http://localhost:8080' })`
- `src/components/forms/Login.jsx` — `axios.post('http://localhost:8080/login', ...)`

`src/components/private-Router/AxiosConfig.jsx` defines a third axios instance with a base URL and a response
interceptor, but **nothing imports it** — it is dead code. Don't assume errors flow through it.

There are no meaningful tests: `src/App.test.js` is the untouched CRA template and will fail if run (it looks for a
"learn react" link that no longer exists).

## Architecture

```
src/
  index.js                    Redux <Provider> + <App>, imports bootstrap CSS
  App.js                      all routing
  redux/Store.jsx             configureStore, only reducer is userApi
  redux/ApiSlice.jsx          THE endpoint registry — every backend call lives here except login
  pages/                      route-level screens + the tiny count widgets
  components/                 forms, header, sidebar, table, modals, charts, pagination, private-Router
  css/                        one plain .css file per screen, imported directly by the component
  assets/                     images (logo.png, profilepic.png, lock.png, logout.png, backgrounds)
```

### Auth

Login is the only call that bypasses RTK Query: `Login.jsx` posts to `/login` with raw axios. The backend answers with a
**bare JWT string** (not JSON, not the `ApiResponse` envelope), which is stored as `sessionStorage.token`. The `role`
claim is pulled out with `jwt-decode` and stored as `sessionStorage.role`, then the user is routed to
`/admindashboard` or `/userdashboard`.

Every later request attaches the token in `ApiSlice.prepareHeaders` — `Authorization: Bearer <token>`.

`sessionStorage` (not `localStorage`) — closing the tab logs the user out. There is no refresh-token flow and no
global 401 handler: an expired token surfaces as a failed query in whatever component asked for it.

Two route guards in `components/private-Router/Private-Router.jsx`:

- `PrivateRoute` (default export) — token present → `<Outlet/>`, else redirect to `/login`.
- `PrivateRoutes` (named export) — wraps `/login` only; if already logged in, bounces to the dashboard for the role.

Role checks are **not centralized** — they are inline `sessionStorage.getItem('role') === 'admin'` comparisons in
`SideBar.jsx`, `GetUsers.jsx` and `Usertable.jsx`. Match that pattern when gating new UI, or extract a helper for all
three at once.

### Routes (`App.js`)

| Path | Component | Notes |
| --- | --- | --- |
| `/login` | `Login` | wrapped in `PrivateRoutes` |
| `/admindashboard` | `AdminDashBoard` | stat cards + embedded `GetAttendance` |
| `/userdashboard` | `UserDashBoard` | renders `AdminDashboard` verbatim — no user-specific view exists |
| `/user` | `GetUsers` | user table, search, pagination, admin-only Add/Delete |
| `/leavechart` | `LeavePage` | tabbed leave tables (despite the path, no chart) |
| `/attendance` | `PostAttendance` | **empty shell** — header + sidebar, no content |
| `*` | `NotFoundPage` | only inside the private branch |

There is no route for `/`, so an unauthenticated visit to the root lands on the private branch, fails the token check
and redirects to `/login`. `Header.jsx` links to `/myprofile`, which has no route → falls through to `NotFoundPage`.

### Data fetching

One RTK Query API slice (`userApi`, `reducerPath: 'userApi'`) holds every endpoint; components use the generated
hooks. There are **no `tagTypes`, no `providesTags`/`invalidatesTags`** — cache invalidation is manual, which is why
pages call `refetch()` inside `useEffect` and `AddUser` resorts to `window.location.reload()`.

The list-screen pattern is repeated in `GetUsers`, `GetAttendance` and `LeavePage`:

1. fetch the whole collection with a query hook;
2. copy it into local `filteredData` state in a `useEffect`;
3. filter client-side in `handleSearch`, paginate client-side by slicing `[firstIndex, lastIndex]`;
4. render a `components/table/*` component + `PaginationComponent` (react-paginate).

All filtering and paging is in the browser — the backend has no search or paging endpoints.

### Layout

Every page re-implements the same shell inline: a sticky `<Header/>` (desktop) plus `<Toggle/>` (mobile offcanvas),
then a `dashboard-scrollable` div containing `<SideBar/>` in a `lg={1}` column and content in `lg={11}`. **There is no
`Layout` component** — changing the chrome means editing `AdminDashBoard`, `GetUsers`, `LeavePage` and
`PostAttendance` together.

The dashboard stat cards (`TotalEmployees`, `Presents`, `Absents`, `SickLeave`, `PlannedLeave`, `UnPlannedLeave`) are
one-line components that each run their own query and render `data?.length`. Six cards = six independent requests.

## Backend contract

See the backend's `CLAUDE.md` for the full endpoint table. Things to know from this side:

- **Two hooks call endpoints that do not exist.** `useUpdateUserMutation` (`PUT /user/{id}`) and
  `useUpdateAttendanceMutation` (`PUT /attendance/{id}`) are declared in `ApiSlice.jsx` and exported, but the backend
  has no `@PutMapping` anywhere. Nothing calls them today; adding an edit feature means adding the backend endpoint too.
- `getDeleteAttendance` and `deleteAttendance` are duplicate declarations of the same
  `DELETE /attendance/id/{id}` — only `useDeleteAttendanceMutation` is used.
- Success shapes are inconsistent because the backend is: `/login` returns a raw string, `user/adduser` and the delete
  endpoints return plain strings, the list endpoints return raw JSON arrays, and only the `/register*` endpoints
  return the `ApiResponse` envelope. Errors from `GlobalExceptionHandler` always use the envelope — so an error body
  and a success body for the same call can have different shapes.
- Attendance rows nest the whole `UserInfo` object under `user`; user rows are flat `UserDto`.
- Dates and times are plain strings end to end (`date`, `recordIn`, `recordOut`); `moment` is only used for display of
  the current clock on the dashboard.

## Known issues (document, don't silently "fix")

These are pre-existing. Fix them when asked; don't fold drive-by repairs into unrelated work.

- **User delete never reaches the API.** `Usertable` → `GetUsers.onDeleteUser` only filters local state, and
  `UserModal` ignores the `onDelete` prop it is given. It calls `useDeleteUserMutation()`, but the returned
  `deleteUser` trigger is never fired. The row disappears until the next refresh.
- `UserModal` is rendered **inside the table row loop**, so one modal instance exists per row, all bound to a single
  shared `show` state.
- `AddUser` calls `window.location.reload()` after a successful create, and its `isAdding` flag is set to `true` but
  never back to `false`.
- `Login.jsx` has a hardcoded 2-second `setTimeout` spinner before the form renders.
- `Absents` uses `useGetLeaveRecordQuery` (all leave records) while `UnPlannedLeave` uses `useGetAbsentQuery` — the
  labels and the data sources are swapped relative to what the card names imply.
- `AdminDashBoard.leaveTypes[].count` values (12, 19, 3, 5, 7, 10) are hardcoded placeholders. They feed a `chartData`
  object that is built and then never rendered. `LeaveChart.jsx` has the same dead `chartData` and is not mounted on
  any route.
- `GetAttendance.handleSearch` filters on `attendance.user.status`, which does not exist — `status` is on the
  attendance record, not on `user`.
- Search is case-sensitive against a lowercased field (`value` is never lowercased), so typing a capital letter
  matches nothing.
- `Header.log()` removes `token` but leaves `role` in `sessionStorage`, and fires its "logged out" toast on a 3s delay
  after navigating away.
- `Header` is always rendered without a `userName` prop, so the dropdown label is blank.
- `src/pages/UnPlannedLeave.jsx.jsx` has a doubled extension. Imports say `./UnPlannedLeave.jsx` and webpack resolves
  it by appending `.jsx` — renaming the file means updating `AdminDashBoard.jsx` and `LeaveChart.jsx`.
- `src/rough.txt` is a scratch file left in `src/`.

## Conventions

- Components are `.jsx`, PascalCase, default-exported; plain-JS helpers are `.js`.
- Styling is Bootstrap utility classes inline, with a per-screen `../css/Name.css` imported at the top for the rest.
  No CSS modules, no styled-components.
- Confirmations and toasts go through SweetAlert2 (`Swal.fire`), not react-toastify — `react-toastify` is a dependency
  but is never imported.
- New API calls belong in `redux/ApiSlice.jsx` as a `builder.query`/`builder.mutation`, with the generated hook added
  to the export list at the bottom. Don't add stray axios calls; `Login` is the one deliberate exception.
