import '../../scss/PhishingPage.scss';
import logo from '../../Images/WITLogo.png';


function PhishingPage() {


    return (
        <div className="phishing-page">
            <nav className="navbar navbar-expand-md fixed-top">
                <div className="page-header--left">
                    <img src={logo}></img>
                </div>
            </nav>
        </div>)
}

export default PhishingPage;