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
                            <input className="form-input" />
                        </section>
                        <input type="button" className="submit-button" value="LOGIN"></input>
                        <div className="forgot-password-container">
                            <img src={QuestionMarkCircle} className="question-circle">

                            </img>
                            <span>Forgot your password?</span>
                        </div>
                        <p>
                            For security reasons, please log out and exit your web browser when you are done accessing services that require authentication!                        </p>
                    </div>
                </div>
            </div>
        </div >)
}

export default PhishingPage;