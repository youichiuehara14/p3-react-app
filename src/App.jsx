import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import AboutPage from './pages/AboutPage';
import ContactUs from './pages/ContactUs';
import AppPage from './pages/AppPage';
import PageNotFound from './pages/PageNotFound';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div>
      <Router basename="/p3-react-app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/App" element={<AppPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
