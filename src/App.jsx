import React, { useEffect } from 'react'
import './App.css';
import Navbar from './components/Navbar/Navbar'
import Sidecar from './components/Sidecar/Sidecar';
import { BrowserRouter as Router , Route , Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Members from './pages/Members/Members';
import { ProtectedRoute } from "protected-route-react";
import Login from './pages/Login/Login';
import { ADMIN } from './constants';
import Books from './pages/Books/Books';
import IssueBooks from './pages/IssueBooks/IssueBooks';
import ReturnBooks from './pages/ReturnBooks/ReturnBooks';
import MyIssues from './pages/MyIssues/MyIssues';
import IssueHistory from './pages/IssueHistory/IssueHistory';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import VerifyUser from './pages/VerifyUser/VerifyUser';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import toast, {Toaster} from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, clearMessages, loadUser } from './redux/actions/userAction';

function App() {

const { isAuthenticated, error, user, message } = useSelector((state)=>state.user);

const dispatch = useDispatch();

useEffect(()=>{
  dispatch(loadUser());
},[dispatch])

useEffect(()=>{
  if(error){
    dispatch(clearErrors());
  }
  if(message){
      toast.success(message);
      dispatch(clearMessages());
  }

},[dispatch,error,message])

  return (
    <>
     <Router>
      <div className='App'>
      <Routes>
          <Route 
        element={
          <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/member/dashboard" />
        }>
          <Route exact path='/forgot-password' element={<ForgotPassword />} />
          <Route exact path='/' element={<Login />} />
          <Route exact path='/user/verify/:token' element={<VerifyUser />} />
          <Route exact path='/user/reset-password/:token' element={<ResetPassword />} />
          </Route>
      </Routes>
         { isAuthenticated && <Navbar user={user} />}
      <div className='main-content'>
          <div className='main-left'>
          {isAuthenticated &&  <Sidecar user={user} />}
          </div>
          <div style={isAuthenticated ? {display: "block"} : {display: "none"}} className='main-right'>
          <Routes>
            {/* ADMIN ROUTES */}
          <Route
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              adminRoute={true}
              isAdmin={user && user.role === ADMIN}
              redirect="/"
            />
          }
        >
            <Route exact path='/admin/members' element={<Members />} />
            <Route exact path='/admin/members/:keyword' element={<Members />} />
            <Route exact path='/admin/issue-books' element={<IssueBooks />} />
            <Route exact path='/admin/issue-books/:userId' element={<IssueBooks />} />
            <Route exact path='/admin/return-books' element={<ReturnBooks />} />
            <Route exact path='/admin/return-books/:userId' element={<ReturnBooks />} />
            <Route exact path='/admin/issue-history' element={<IssueHistory />} />
            <Route exact path='/admin/issue-history/:userId' element={<IssueHistory />} />
        </Route>
        {/* MEMBER ROUTES */}
        <Route
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated} redirect="/" />
        }
        >
          <Route exact path='/member/dashboard' element={<Dashboard />} />
          <Route exact path='/member/books' element={<Books />} />
          <Route exact path='/member/books/:keyword' element={<Books />} />
          <Route exact path='/member/my-issues' element={<MyIssues />} />
        </Route>
          </Routes>

          </div>

      </div>
      </div>
        <Toaster 
        position='top-right'
        />
      </Router>
    </>
  )
}

export default App
