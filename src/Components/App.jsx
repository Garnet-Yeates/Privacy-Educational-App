import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import '../scss/App.scss';

import SurveyingPage from './SurveyingPage/SurveyPage';
import NotFound from './NotFound';
import { useRef } from 'react';
import PhishingPage from './PhishingPage/PhishingPage';

function App() {

  const topOfPageRef = useRef(null);
  const bottomOfPageRef = useRef(null);

  const scrollToBottom = (delay) => {
    if (delay) {
      setTimeout(() => bottomOfPageRef.current?.scrollIntoView({ behavior: "smooth" }), delay);
      return
    }
    bottomOfPageRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const scrollToTop = (delay) => {
    if (delay) {
      setTimeout(() => topOfPageRef.current?.scrollIntoView({ behavior: "smooth" }), delay);
      return
    }
    topOfPageRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div id='app-wrapper'>
      <div id="top-of-page-div" ref={topOfPageRef}></div>
      <Router>
        <Routes>
          <Route path='/' element={<PhishingPage scrollToBottom={scrollToBottom} scrollToTop={scrollToTop} />} />
          <Route path='/survey' element={<SurveyingPage scrollToTop={scrollToTop} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
