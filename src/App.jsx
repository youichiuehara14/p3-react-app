import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import AboutPage from './pages/AboutPage';
import ContactUs from './pages/ContactUs';
import AppPage from './pages/AppPage';
import PageNotFound from './pages/PageNotFound';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/App" element={<AppPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
