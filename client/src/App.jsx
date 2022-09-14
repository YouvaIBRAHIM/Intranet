import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import LoginPage from './views/LoginPage';
import CollaboratersList from './views/CollaboratersList';
import Banner from './components/Banner';
import { initServiceWorker } from "./services/ServiceWorker.service";
import PrivateRoute from "./features/PrivateRoute";

function App() {
  //lance le service worker
  initServiceWorker()

  
  return (
    <BrowserRouter>
      <div>
        {/* <Banner /> */}
        <PrivateRoute>
          <Banner />
        </PrivateRoute>
        <div className="container">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={
                                          <PrivateRoute>
                                            <Home />
                                          </PrivateRoute>
                                        }
            />
            <Route path="/list" element={
                                          <PrivateRoute>
                                            <CollaboratersList />
                                          </PrivateRoute>
                                        }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}


export default App;