import '../../scss/PhishingPage.scss'
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MaterialCheckbox from '../../components/MaterialCheckbox';

import QuestionMarkCircle from '../../Images/Question_Mark_Circle.png';

function PhishingPage() {

    return (
        <div className="phishing-page">
            <div className="opacity-overlay">
                <div className="card">
                    <div className="card-header" />
                    <div className="card-body">
                        <h5 className="card-heading">
                            Enter your Username and Password
                        </h5>
                        <section className="form-section">
                            <label>Username:</label>
                            <input className="form-input" />
                        </section>
                        <section className="form-section">
                            <label>Password:</label>
                            <input type="password" className="form-input" />
                        </section>
                        <input type="button" className="submit-button" value="LOGIN"></input>
                        <div className="forgot-password-container">
                            <img src={QuestionMarkCircle} className="question-circle" />
                            <span><a href="https://wit.edu/about/technology-services/help-docs/usernames">Forgot your password?</a></span>
                        </div>
                        <p>
                            For security reasons, please <a href="https://www.ftc.gov/news-events/topics/identity-theft/phishing-scams">log out</a> and exit your web browser when 
                            you are done accessing services that require authentication!
                        </p>
                    </div>
                </div>
            </div>
        </div >)
}

export default PhishingPage;