import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router';
import ContactUs from './pages/ContactUs';
import AppPage from './pages/AppPage';
import PageNotFound from './pages/PageNotFound';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/App" element={<AppPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
