import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/forms/Login';
import NotFound from './pages/NotFoundPage';
import PrivateRoute, { PrivateRoutes } from './components/private-Router/Private-Router';
import GetUsers from './pages/GetUsers';
import LeavePage from './pages/LeavePage';
import PostAttendance from './pages/PostAttendance';
import UserDashBoard from './pages/UserDashBoard';
import AdminDashBoard from './pages/AdminDashBoard';



function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <>
            <Route element={<PrivateRoutes />}>
              <Route path='/login' element={<Login />} />
            </Route>
          </>
          <Route element={<PrivateRoute />}>
            <Route path='/admindashboard' element={<AdminDashBoard/>}/>
            <Route path='/userdashboard' element={<UserDashBoard />} />
            <Route path='/user'  element={<GetUsers/>}/>
            <Route path='/leavechart'  element={<LeavePage/>}/>
            <Route path='/attendance'  element={<PostAttendance/>}/>
            <Route path='*' element={<NotFound />} />
          </Route>

        </Routes>

      </Router>

    </div>
  );
}

export default App;