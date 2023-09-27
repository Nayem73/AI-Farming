
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';


import ProfileScreen from './screens/ProfileScreen';
import UserListScreen from './screens/AdminUserListScreen';


import DiseaseDetailsScreen from './screens/DiseaseDetailsScreen';
import DiseaseCreateScreen from './screens/DiseaseCreateScreen';
import DiseaseEditScreeen from './screens/DiseaseEditScreen';
import DiseaseListScreen from './screens/AdminDiseaseScreen';
import AdminCropScreen from './screens/AdminCropScreen';
import AdminPictureScreen from './screens/AdminPictureScreen';
import AISearchScreen from './screens/AISearchScreen';

import ReviewScreen from './screens/ReviewScreen';

import SubcriptionsScreen from './screens/AdminSubscriptionsScreen';



function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' element={<HomeScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/review' element={<ReviewScreen />} />

        <Route path='/aisearch/' element={<AISearchScreen />} />
        <Route path='/profile/' element={<ProfileScreen />} />
        <Route path='/disease/:crop_title/:disease_title' element={<DiseaseDetailsScreen />} />
        <Route path='/admin/crop/' element={<AdminCropScreen />} />
        <Route path='/admin/userlist/' element={<UserListScreen />} />
        <Route path='/admin/disease/' element={<DiseaseListScreen />} />
        <Route path='/admin/disease/create' element={<DiseaseCreateScreen />} />
        <Route path='/admin/disease/edit/:crop_title/:disease_title' element={<DiseaseEditScreeen />} />
        <Route path='/admin/picture/:crop_title/:disease_title/:disease_id/' element={<AdminPictureScreen />} />
        <Route path='/admin/subscriptions' element={<SubcriptionsScreen />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
