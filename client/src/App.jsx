import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import LoginPage from './views/LoginPage';
import CollaboratersList from './views/CollaboratersList';
import Collaborater from './views/Collaborater';
import NewCollaborater from './views/NewCollaborater';
import Profile from './views/Profile';
import Banner from './components/Banner';
import { initServiceWorker } from "./services/ServiceWorker.service";
import PrivateRoute from "./features/PrivateRoute";
import IndexPageRoute from "./features/IndexPageRoute";
import IsNotOnlineRoute from "./features/IsNotOnlineRoute";
import IsAdminRoute from "./features/IsAdminRoute";
import { useState } from 'react';

function App() {
  //lance le service worker
  initServiceWorker()

  const [isConnected, setIsConnected] = useState(false)
  
  return (
    <BrowserRouter>
      <div>
        {
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

            <Route path="/collaboraters/new" element={
                                                      <PrivateRoute  setIsConnected={setIsConnected}>
                                                        <IsAdminRoute>
                                                          <NewCollaborater />
                                                        </IsAdminRoute>
                                                      </PrivateRoute>
                                                    } />                                                    
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}


export default App;