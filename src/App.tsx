import React from 'react';
import './App.css';
import Navbar from './layouts/NavbarAndFooter/Navbar';
import Footer from './layouts/NavbarAndFooter/Footer';
import HomePage from './layouts/HomePage/HomePage';
import SearchMangaPage from './layouts/SearchMangaPage/SearchMangaPage';
import { Route, Switch } from 'react-router-dom';
import MangaCheckoutPage from './layouts/MangaCheckoutPage/MangaCheckoutPage';

import ShelfPage from './layouts/ShelfPage/ShelfPage';
import MessagesPage from './layouts/MessagesPage/MessagesPage';
import ManageLibraryPage from './layouts/ManageLibraryPage/ManageLibraryPage';
import Register from './layouts/RegisterPage/Register';
import Login from './layouts/LoginPage/Login';
import { AuthProvider } from './context/authContext';


function App() {

  return (
    <div className='d-flex flex-column min-vh-100'>
      <AuthProvider>
          <Navbar/>
          <div className='flex-grow-1'>
            <Switch>
              <Route path='/' exact>
                <HomePage/>
              </Route>
              <Route path='/search'>
                <SearchMangaPage/>
              </Route>
              <Route path='/checkout/:bookId'>
                <MangaCheckoutPage/>
              </Route>

              <Route path='/login'>
                <Login/>
              </Route>
              <Route path='/register'>
                <Register/>
              </Route>

              <Route path='/shelf'>
                <ShelfPage/>
              </Route>


              <Route path='/messages'>
                <MessagesPage/>
              </Route>

              <Route path='/admin'>
                <ManageLibraryPage/>
              </Route>
            </Switch>
          </div>
          <Footer/>
      </AuthProvider>
    </div>
  );
}

export default App;
