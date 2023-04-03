import '../../scss/PhishingPage.scss'

import QuestionMarkCircle from '../../Images/Question_Mark_Circle.png';
import { useNavigate } from 'react-router-dom';

function PhishingPage() {

    const nav = useNavigate();

    // When you set "state" in nav, then useLocation() hook on the page you nav to (SurveyPage) will have the state
    const fellForScamNav = () => {
        nav("/survey", { replace: true, state: { fellForScam: true } })
    }

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
                            <input className="form-input"/>
                        </section>
                        <section className="form-section">
                            <label>Password:</label>
                            <input type="password" className="form-input" onChange={fellForScamNav} />
                        </section>
                        <input type="button" className="submit-button" value="LOGIN" onClick={fellForScamNav}></input>
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