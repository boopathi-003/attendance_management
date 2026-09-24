# Attendance Management — Web App

React 18 dashboard for the attendance management API: employee records, daily attendance, and leave tracking, with
separate admin and user views.

The Spring Boot API it talks to lives in
[boopathi-003/attendance_management_backend](https://github.com/boopathi-003/attendance_management_backend).

## Stack

| | |
| --- | --- |
| Framework | React 18 (Create React App, `react-scripts` 5) |
| Data | Redux Toolkit Query (`@reduxjs/toolkit/query`) |
| UI | Bootstrap 5, react-bootstrap, Bootstrap Icons |
| Forms | Formik + Yup |
| Charts | Chart.js via react-chartjs-2 |
| Dialogs | SweetAlert2 |
| Routing | react-router-dom 6 |

## Getting started

**Prerequisites**

- Node.js 20 or newer
- The backend API running on `http://localhost:8080`, with a login account created (see the backend README)

```bash
npm install
npm start
```

The app runs on `http://localhost:3000`. That port matters — the backend's CORS configuration only allows
`http://localhost:3000` and `:3001`, so serving from any other port breaks every request in the browser.

```bash
npm run build     # production bundle into build/
```

## Configuration

There is no `.env` file. The API base URL is hardcoded in **two** places and both must be changed together:

- `src/redux/ApiSlice.jsx` — the RTK Query `baseUrl`
- `src/components/forms/Login.jsx` — the axios call to `/login`

Moving these to a `REACT_APP_API_URL` environment variable is a worthwhile follow-up.

## How it works

**Authentication.** `Login` posts to `/login` and receives a raw JWT string. The token goes into `sessionStorage`,
and the `role` claim is decoded with `jwt-decode` to choose a dashboard. Every later request attaches
`Authorization: Bearer <token>` via `prepareHeaders` in the API slice. Because it is `sessionStorage`, closing the
tab logs you out.

**Routing.** `PrivateRoute` guards the authenticated pages; `PrivateRoutes` bounces an already-logged-in user off
the login screen to the dashboard for their role.

| Path | Screen |
| --- | --- |
| `/login` | Login form |
| `/admindashboard` | Stat cards + attendance overview |
| `/userdashboard` | Currently renders the admin dashboard |
| `/user` | Employee table — search, pagination, admin-only add/delete |
| `/leavechart` | Leave records, tabbed by type |
| `/attendance` | Placeholder — not yet implemented |

**Data.** All backend calls are declared in `src/redux/ApiSlice.jsx` and consumed through the generated hooks. List
screens fetch a whole collection and then filter and paginate in the browser; the API has no search or paging
endpoints.

## Project layout

```
src/
  App.js              routing
  index.js            Redux provider + bootstrap CSS
  redux/              store and the single RTK Query API slice
  pages/              route-level screens and the dashboard stat widgets
  components/         forms, header, sidebar, tables, modals, charts, pagination, route guards
  css/                one stylesheet per screen
  assets/             images
```

## Known gaps

Tracked so they are not mistaken for regressions — see [`CLAUDE.md`](CLAUDE.md) for the full list.

- Deleting a user updates the table but never calls the API; the row returns on refresh
- `/attendance` is an empty shell — the posting form is not built
- `src/App.test.js` is still the CRA template and fails, so CI does not run tests yet
- Dashboard card counts are partly hardcoded placeholders
- `LeaveChart.jsx` is not mounted on any route
