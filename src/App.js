import React, {useState, useEffect, setState} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUser, checkUserSession } from './redux/User/user.actions';
import './default.scss';

// Components
import AdminToolbar from './components/AdminToolbar';

// HOC 
import { WithAuth, WithoutAuth } from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';

// Layouts 
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';
import AdminLayout from './layouts/AdminLayout';
import DashboardLayout from './layouts/DashboardLayout';


// Pages
import Homepage from './pages/Homepage';
import Search from './pages/Search';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import ProductDetails from './pages/ProductDetails';
import Product from './components/ProductResults/Product';


const HomepageWrapper = () => {
  return (
    <HomepageLayout>
      <Homepage />
    </HomepageLayout>
  )
}

const RegistrationWrapper = () => {
  return (
    <WithoutAuth>
      <MainLayout>
        <Registration />
      </MainLayout>
    </WithoutAuth>
  )
}

const LoginWrapper = () => {
  return (
    <WithoutAuth>
      <MainLayout>
        <Login />
      </MainLayout>
    </WithoutAuth> 
  )
}

const RecoveryWrapper = () => {
  return (
      <MainLayout>
          <Recovery />
      </MainLayout>
  )
}

const DashboardWrapper = () => {
  return (
    <WithAuth>
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    </WithAuth>
  )
}

const AdminWrapper = () => {
  return (
    <WithAdminAuth>
      <AdminLayout>
          <Admin />
      </AdminLayout>
    </WithAdminAuth>
  )
}

const SearchWrapper = () => {
  return (
    <MainLayout>
      <Search />
    </MainLayout>
  )
}

const SearchFilterWrapper = () => {
  return (
    <MainLayout>
      <Search />
    </MainLayout>
  )
}

const ProductDetailsWrapper = () => {
  return (
    <MainLayout>
      <ProductDetails />
    </MainLayout>
  )
}

function App(props) { 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession());
 
  }, []);

  return (
    <div className="App">
      <AdminToolbar />
      <Routes>
          <Route exact path="/" element={<HomepageWrapper />} />
          <Route exact path="/search" element={<SearchWrapper />} />
          <Route path="/search/:filterType" element={<SearchFilterWrapper />} />
          <Route path="/product/:productID" element={<ProductDetailsWrapper />} />
          <Route path="/registration" element={<RegistrationWrapper />} />
          <Route path="/login" element={<LoginWrapper />} />
          <Route path="/recovery" element={<RecoveryWrapper />} />
          <Route path="/dashboard" element={<DashboardWrapper />} />
          <Route path="/admin" element={<AdminWrapper />} />
      </Routes>
    </div>
  );
}

export default App;
