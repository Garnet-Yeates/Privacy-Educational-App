import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import '../scss/App.scss'

import SurveyingPage from './SurveyingPage/SurveyPage';
import NotFound from './NotFound/NotFound';
import { useRef } from 'react';
import PhishingPage from './PhishingPage/PhishingPage';
import ReportingPage from './ReportingPage/ReportingPage';

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
          <Route path='/report' element={<ReportingPage scrollToTop={scrollToTop} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export const lockScroll = () => {
  const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${scrollBarCompensation}px`;
}

export const unlockScroll = () => {
  document.body.style.overflow = '';
  document.body.style.paddingRight = ''
}

export default App;
