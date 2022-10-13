import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import LoginPage from './views/LoginPage';
import CollaboratersList from './views/CollaboratersList';
import Collaborater from './views/Collaborater';
import NewCollaborater from './views/NewCollaborater';
import Profile from './views/Profile';
import PageNotFound from './views/PageNotFound';
import Banner from './components/Banner';
import { initServiceWorker } from "./services/ServiceWorker.service";
import PrivateRoute from "./customRoutes/PrivateRoute";
import IndexPageRoute from "./customRoutes/IndexPageRoute";
import IsNotOnlineRoute from "./customRoutes/IsNotOnlineRoute";
import IsAdminRoute from "./customRoutes/IsAdminRoute";
import { useState } from 'react';

function App() {
  //lance le service worker
  initServiceWorker()

  const [isConnected, setIsConnected] = useState(false)
  
  return (
    <BrowserRouter>
      <div>
        {
          // si l'utilisateur est connecté, on affiche la barre de navigation
          isConnected && 
          <Banner  setIsConnected={setIsConnected}/>
        }
        <div className="container">
          <Routes>
            <Route path="/" element={<IndexPageRoute  setIsConnected={setIsConnected}/>} />

            <Route path="/login" element={
                                          <IsNotOnlineRoute>
                                            <LoginPage setIsConnected={setIsConnected}/>
                                          </IsNotOnlineRoute>
                                        } 
            />
            
            <Route path="/home" element={
                                          <PrivateRoute  setIsConnected={setIsConnected}>
                                            <Home />
                                          </PrivateRoute>
                                        }
            />
            <Route path="/collaboraters" element={
                                          <PrivateRoute  setIsConnected={setIsConnected}>
                                            <CollaboratersList />
                                          </PrivateRoute>
                                        }
            />

            <Route path="/profile" element={
                                              <PrivateRoute  setIsConnected={setIsConnected}>
                                                <Profile />
                                              </PrivateRoute>
                                            }
            />

            <Route path="/collaboraters/:id" element={
                                                      <PrivateRoute  setIsConnected={setIsConnected}>
                                                        <IsAdminRoute>
                                                          <Collaborater />
                                                        </IsAdminRoute>
                                                      </PrivateRoute>
                                                    } />

            <Route path="/collaborater/new" element={
                                                      <PrivateRoute  setIsConnected={setIsConnected}>
                                                        <IsAdminRoute>
                                                          <NewCollaborater />
                                                        </IsAdminRoute>
                                                      </PrivateRoute>
                                                    } /> 
                                                      
            <Route path="/*" element={<PageNotFound />} />                                                                                                     
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}


export default App;