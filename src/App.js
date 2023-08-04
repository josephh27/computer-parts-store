import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './default.scss';

// Layouts 
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

// Pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';

const HomepageWrapper = ({}) => {
  return (
    <HomepageLayout>
      <Homepage />
    </HomepageLayout>
  )
}

const RegistrationWrapper = ({}) => {
  return (
    <MainLayout>
      <Registration />
    </MainLayout>
  )
}

function App() {
  return (
    <div className="App">
      <Routes>
          <Route exact path="/" element={<HomepageWrapper />} />
          <Route path="/registration" element={<RegistrationWrapper />} />
      </Routes>
    </div>
  );
}

export default App;
