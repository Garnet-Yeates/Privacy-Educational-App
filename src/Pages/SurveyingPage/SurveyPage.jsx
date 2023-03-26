import React, { useCallback } from 'react'
import '../../scss/SurveyingPage.scss';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { individualSurveyAnimate, individualSurveyInitial, infoOverlayAnimate, infoOverlayInitial, letsSeeAnimation, questionDetailsAnimate, questionDetailsInitial, selectSurveysError, selectSurveysPageAnimate, selectSurveysPageExit, selectSurveysPageInitial, submitSurveyAnimate, submitSurveyExit, submitSurveyInitial, surveysPageAnimate, surveysPageInitial, zeroHeightInvisible } from '../../animations/SurveyPageAnimations'
import { useEffect } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../..';
import { lockScroll, unlockScroll } from '../App';
import MaterialCheckbox from '../../components/MaterialCheckbox';
import MaterialInput from '../../components/MaterialInput';

import FacebookLogo from '../../Images/Facebook_Logo.png'
import AmazonLogo from '../../Images/Amazon_Logo.png'
import LinkedInLogo from '../../Images/LinkedIn_Logo.png'
import TikTokLogo from '../../Images/TikTok_Logo.png'
import SnapchatLogo from '../../Images/Snapchat_Logo.png'
import TwitterLogo from '../../Images/Twitter_Logo.png'
import YoutubeLogo from '../../Images/Youtube_Logo.png'
import PinterestLogo from '../../Images/Pinterest_Logo.png'

// Made this a function to return the object so we dont make the mistake of shallow cloning and having our states be mysteriously connected
const defaultGuessesState = (length) => Array(length).fill(false);

// Survey page will contain both the initial box to choose which surveys they will take
// And will also contain the survey itself. Only one will be shown at a time

const facebookAnswers = [true, true, false, false, true]

const facebookQuestions = [
    "Facebook stores your data whether you have an account or not.",
    "Your identity is used in ads that are shown to others.",
    "When you delete content on Facebook, it is gone forever.",
    "Facebook does not infringe upon/analyze your private messages.",
    "Facebook can view your browser history."
]

const facebookQuotes = [
    `Facebook uses cookies and receives information when you visit those sites and apps, including device information and information about your activity, 
    without any further action from you. This occurs whether or not you have a Facebook account or are logged in.`,

    `You give us permission to use your name and profile picture and information about actions you have taken on Facebook next to or in connection with ads, 
    offers, and other sponsored content that we display across our Products, without any compensation to you.`,

    `In addition, content you delete may continue to appear if you have shared it with others and they have not deleted it.`,

    `Our systems automatically process content and communications you and others provide to analyze context and what's in them for the purposes described below [...].`,

    `You can review your Off-Facebook activity, which is a summary of activity that businesses and organizations share with us about your interactions with them, 
    such as visiting their apps or websites. They use our Business Tools, like Facebook Pixel, to share this information with us. This helps us do things like give 
    you a more personalized experience on Facebook.`,
]

const amazonAnswers = [true, true, false, false, false]

const amazonQuestions = [
    "Amazon services with a microphone/camera can collect and process voice/video data.",
    "Amazon uses your personal data and behavioral data for advertisement.",
    "Amazon can not sell your data.",
    "Amazon does not copyright license (claim as their own) your data.",
    "Amazon can not track you on other websites."
]

const amazonQuotes = [
    `When you use our voice, image and camera services, we use your voice input, images, videos, and other personal information to respond to your requests, 
    provide the requested service to you, and improve our services.`,

    `To serve you interest-based ads, we use information such as your interactions with Amazon sites, content, or services.`,

    `As we continue to develop our business, we might sell or buy other businesses or services. In such transactions, customer information generally is one 
    of the transferred business assets but remains subject to the promises made in any pre-existing Privacy Notice (unless, of course, the customer 
    consents otherwise). Also, in the unlikely event that Amazon.com, Inc. or substantially all of its assets are acquired, customer information will of course be 
    one of the transferred assets.`,

    `If you do post content or submit material, and unless we indicate otherwise, you grant Amazon a nonexclusive, royalty-free, perpetual, irrevocable, 
    and fully sublicensable right to use, reproduce, modify, adapt, publish, perform, translate, create derivative works from, distribute, and display 
    such content throughout the world in any media. You grant Amazon and sublicensees the right to use the name that you submit in connection with such content, 
    if they choose.`,

    `Like many websites, we use "cookies" and other unique identifiers, and we obtain certain types of information when your web browser or device accesses 
    Amazon Services and other content served by or on behalf of Amazon on other websites.`,
]

const tikTokAnswers = [false, true, true, true, true]

const tikTokQuestions = [
    "Private messages can not be read by the service.",
    "Your content can be deleted at any time without prior notice for any reason.",
    "Information such as age, username/password, email, phone number can be collected by TikTok.",
    "Data on your content is collected at the time of creation, regardless of if you choose to upload or save it.",
    "Some browsers transmit “do-not-track” signals to websites. TikTok ignores these."
]

const tikTokQuotes = [
    `Messages: We collect and process, which includes scanning and analyzing, information you provide when you compose, send, or receive 
    messages through the Platform's messaging functionality. That information includes the content of the message and information about 
    when the message has been sent, received and/or read, as well as the participants of the communication.`,

    `We reserve the right, at any time and without prior notice, to remove or disable access to content at our discretion for any reason 
    or no reason.`,

    `Information, such as age, username and password, language, and email or phone number. Profile information, such as name, social media 
    account information, and profile image. User-generated content, including comments, photographs, live streams, audio recordings, videos, 
    and virtual item videos that you choose to create with or upload to the Platform.`,

    `We collect User Content through pre-loading at the time of creation, import, or upload, regardless of whether you choose to save or upload 
    that User Content, in order to recommend audio options and provide other personalized recommendations.`,

    `Some browsers transmit “do-not-track” signals to websites. Because of differences in how browsers incorporate and activate this feature, 
    we currently do not take action in response to these signals.`,
]

const linkedInAnswers = [true, true, false, false, true]

const linkedInQuestions = [
    "LinkedIn stores data on you even if you did not interact with the service.",
    "The LinkedIn mobile app can scan both your contacts and your calendar.",
    "Your identity can not be used in ads that are shown to other users.",
    "Your private messages cannot be scanned or read by the service.",
    "Specific content can be removed without reason or notice."
]

const linkedInQuotes = [
    `We receive personal data (including contact information) about you when others import or sync their contacts or calendar with our Services, 
    associate their contacts with Member profiles, scan and upload business cards, or send messages using our Services.`,

    `If you opt to import your address book, we receive your contacts (including contact information your service provider(s) or app automatically 
    added to your address book when you communicated with addresses or numbers not already in your list). If you sync your contacts or calendars 
    with our Services, we will collect your address book and calendar meeting information to keep growing your network.`,

    `We have the right, without payment to you or others, to serve ads near your content and information, and your social actions (e.g. likes, 
    comments, follows, shares may be visible and included with ads, as noted in the Privacy Policy). If you use a Service feature, we may mention 
    that with your name or photo to promote that feature within our Services, subject to your settings.`,

    `We also use automatic scanning technology on messages to support and protect our site. For example, we use this technology to suggest possible 
    responses to messages and to manage or block content that violates our User Agreement or Professional Community Policies from our Services.`,

    `We are not obligated to publish any information or content on our service and can remove it with or without notice.`,
]

const snapchatAnswers = [true, false, false, true, false]

const snapchatQuestions = [
    "Snapchat can edit and distribute your content through any media known now or that may exist in the future.",
    "Snapchat does not hold onto content that you have deleted.",
    "Your personal data is not given to third parties that work for Snapchat.",
    "Snapchat may not only collect your location data, but they can also use it and share it.",
    "Snapchat can not share your personal data with third parties that are not involved in its operation."
]

const snapchatQuotes = [
    `You grant Snap and its affiliates  a license to archive, copy, cache, encode, store, reproduce, record, sell, sublicense, distribute, 
    transmit, broadcast, synchronize, adapt, edit, modify, publicly display, publicly perform, publish, republish, promote, exhibit, 
    create derivative works based upon, and otherwise use the Asset on or in connection with the Services and the advertising, marketing, 
    and promotion thereof, in all formats, on or through any means or media now known or hereafter developed, and with any technology or 
    devices now known or hereafter developed.`,

    `After a Snap is deleted, we'll mainly be able to see the basic details — like when it was sent and who it was sent to.`,

    `We may share information about you with business partners that provide services and functionality on our services.`,

    `[...] to provide and improve our advertising services, ad targeting, and ad measurement, including through the use of your precise location 
    information (again, if you've given us permission to collect that information).`,

    `We may let other companies use cookies on our services. These companies may collect information about how you use our services over time and 
    combine it with similar information from other services and companies.`,
]

const twitterAnswers = [true, true, true, true, false]

const twitterQuestions = [
    "Users own the content they submit, post or display on Twitter.",
    "Twitter is licensed to use your Content without restrictions.",
    "Twitter collects information outside of the app on your devices.",
    "Twitter collects information on non-user activity within the products and services.",
    "Information collected by Twitter will be removed from the web after deleting an account."
]

const twitterQuotes = [
    `You retain your rights to any Content you submit, post or display on or through the Services. What's yours is yours — you own your Content 
    (and your incorporated audio, photos and videos are considered part of the Content).`,

    `By submitting, posting or displaying Content on or through the Services, you grant us a worldwide, non-exclusive, royalty-free license 
    (with the right to sublicense) to use, copy, reproduce, process, adapt, modify, publish, transmit, display and distribute such Content in 
    any and all media or distribution methods now known or later developed.`,

    `Information about your connection, such as your IP address and browser type. Information about your device and its settings, such as device 
    and advertising ID, operating system, carrier, language, memory, apps installed, and battery level. Your device address book, if you've chosen 
    to share it with us.`,

    `We may receive information when you view content on or otherwise interact with our products and services, even if you have not created an 
    account or are signed out, such as IP address; browser type and language; operating system; the referring webpage; access times; pages visited; 
    location; your mobile carrier; device information (including device and application IDs); search terms and IDs (including those not submitted as 
    queries); ads shown to you on Twitter; Twitter-generated identifiers; and identifiers associated with cookies. We also receive log information 
    when you click on, view, or interact with links on our services, including when you install another application through Twitter.`,

    `Remember public content can exist elsewhere even after you remove it from Twitter. For example, search engines and other third parties may 
    retain copies of your Tweets longer, based upon their own privacy policies, even after they are deleted or expire on Twitter.`,
]

const youtubeAnswers = [true, true, true, true]

const youtubeQuestions = [
    "Youtube may retain your content after you remove it.",
    "Youtube is able to use and modify your content to their discretion. ",
    "Google services may obtain and store location information from the device you're using.",
    "The service can relocate your data to outside of your country."
]

const youtubeQuotes = [
    `The licenses granted by you continue for a commercially reasonable period of time after you remove or delete your Content from the Service. 
    You understand and agree, however, that YouTube may retain, but not display, distribute, or perform, server copies of your videos that have been 
    removed or deleted.`,

    `By providing Content to the Service, you grant to YouTube a worldwide, non-exclusive, royalty-free, sublicensable and transferable license to 
    use that Content (including to reproduce, distribute, prepare derivative works, display and perform it) in connection with the Service and 
    YouTube's (and its successors' and Affiliates') business, including for the purpose of promoting and redistributing part or all of the Service.`,

    `Your location can be determined with varying degrees of accuracy by: GPS and other sensor data from your device, IP address, and activity on 
    Google services, such as your searches and places you label like home or work. As well as information about things near your device, such as 
    Wi-Fi access points, cell towers, and Bluetooth-enabled devices.`,

    `We maintain servers around the world and your information may be processed on servers located outside of the country where you live. Data 
    protection laws vary among countries, with some providing more protection than others.`,
]

const pinterestAnswers = [false, false, false, true, false]

const pinterestQuestions = [
    "Pinterest does not retain Content that has been removed.",
    "Pinterest does not track your location when you choose not to share your precise location.",
    "Pinterest does not transfer or store data outside of your country.",
    "Content you post is available to the public.",
    "Pinterest does not receive your information from outside of Pinterest."
]

const pinterestQuotes = [
    `Following termination or deactivation of your account, or if you remove any User Content from Pinterest, we may keep your User Content 
    for a reasonable period of time for backup, archival, or audit purposes. Pinterest and its users may retain and continue to use, store, 
    display, reproduce, re-pin, modify, create derivative works, perform, and distribute any of your User Content that other users have stored 
    or shared on Pinterest.`,

    `We will still use your IP address, which is used to approximate your location, even if you don't choose to share your precise location.`,

    `By using our products or services, you authorize us to transfer and store your information outside your home country, including in the United 
    States, for the purposes described in this policy.`,

    `Anyone can see the public boards and Pins you create and profile information you give us. We also make this public information available through 
    what are called APIs (basically a technical way to share information quickly).`,

    `We also get information about you and your activity outside Pinterest from our affiliates, advertisers, partners and other third parties we work 
    with.`,
]

function SurveyingPage({ scrollToTop }) {

    const [submitted, setSubmitted] = useState(false);

    const [facebook, setFacebook] = useState(false);
    const [amazon, setAmazon] = useState(false);
    const [tikTok, setTikTok] = useState(false);
    const [linkedIn, setLinkedIn] = useState(false);
    const [snapchat, setSnapchat] = useState(false);
    const [twitter, setTwitter] = useState(false);
    const [youtube, setYoutube] = useState(false);
    const [pinterest, setPinterest] = useState(false);

    const [participantFirstName, setParticipantFirstName] = useState("");
    const [participantLastName, setParticipantLastName] = useState("");

    const [facebookGuesses, setFacebookGuesses] = useState(defaultGuessesState(5));
    const [amazonGuesses, setAmazonGuesses] = useState(defaultGuessesState(5));
    const [tikTokGuesses, setTikTokGuesses] = useState(defaultGuessesState(5));
    const [linkedInGuesses, setLinkedInGuesses] = useState(defaultGuessesState(5));
    const [snapchatGuesses, setSnapchatGuesses] = useState(defaultGuessesState(5));
    const [twitterGuesses, setTwitterGuesses] = useState(defaultGuessesState(5));
    const [youtubeGuesses, setYoutubeGuesses] = useState(defaultGuessesState(4));
    const [pinterestGuesses, setPinterestGuesses] = useState(defaultGuessesState(5));

    // Can be set to the surveyInfo of any survey with a supplied questionIndex and it will show detailed information about that
    // question from the Q&A. This will disable page scrolling and add a gray overlay
    // { surveyInfo: ..., questionIndex: ...}, or null 
    const [showingDetailedInfoFor, setShowingDetailedInfoFor] = useState(null);

    const surveys = [];

    facebook && surveys.push({
        logo: FacebookLogo,
        name: "Facebook",
        quotes: facebookQuotes,
        questions: facebookQuestions,
        answers: facebookAnswers,
        guesses: facebookGuesses,
        setGuesses: setFacebookGuesses
    });

    amazon && surveys.push({
        logo: AmazonLogo,
        name: "Amazon",
        quotes: amazonQuotes,
        questions: amazonQuestions,
        answers: amazonAnswers,
        guesses: amazonGuesses,
        setGuesses: setAmazonGuesses
    });

    tikTok && surveys.push({
        logo: TikTokLogo,
        name: "TikTok",
        quotes: tikTokQuotes,
        questions: tikTokQuestions,
        answers: tikTokAnswers,
        guesses: tikTokGuesses,
        setGuesses: setTikTokGuesses
    });

    linkedIn && surveys.push({
        logo: LinkedInLogo,
        name: "LinkedIn",
        quotes: linkedInQuotes,
        questions: linkedInQuestions,
        answers: linkedInAnswers,
        guesses: linkedInGuesses,
        setGuesses: setLinkedInGuesses
    });

    snapchat && surveys.push({
        logo: SnapchatLogo,
        name: "Snapchat",
        quotes: snapchatQuotes,
        questions: snapchatQuestions,
        answers: snapchatAnswers,
        guesses: snapchatGuesses,
        setGuesses: setSnapchatGuesses
    });

    twitter && surveys.push({
        logo: TwitterLogo,
        name: "Twitter",
        quotes: twitterQuotes,
        questions: twitterQuestions,
        answers: twitterAnswers,
        guesses: twitterGuesses,
        setGuesses: setTwitterGuesses
    });

    youtube && surveys.push({
        logo: YoutubeLogo,
        name: "Youtube",
        quotes: youtubeQuotes,
        questions: youtubeQuestions,
        answers: youtubeAnswers,
        guesses: youtubeGuesses,
        setGuesses: setYoutubeGuesses
    });

    pinterest && surveys.push({
        logo: PinterestLogo,
        name: "Pinterest",
        quotes: pinterestQuotes,
        questions: pinterestQuestions,
        answers: pinterestAnswers,
        guesses: pinterestGuesses,
        setGuesses: setPinterestGuesses
    });

    // Lock scrolling when the "survey question details" modal is open
    useEffect(() => {
        showingDetailedInfoFor ? lockScroll() : unlockScroll();
    }, [showingDetailedInfoFor]);


    const [subPage, setSubPage] = useState("SelectSurveys")

    // ------------------------------------------------------------------------------------------------
    return (
        // TODO this will be <SelectSurveysSubPage> or <EnterInfoSubPage> or <SurveySubPage>, determined by string state "subpage/phase"
        <div className="surveying-page">
            {showingDetailedInfoFor && <SpecificQuestionDetails setShowingDetailedInfoFor={setShowingDetailedInfoFor} {...showingDetailedInfoFor} />}
            <AnimatePresence mode="wait">
                {subPage === "SelectSurveys" && <SelectSurveysSubPage
                    key="selectSurveys"
                    setSubPage={setSubPage}
                    participantFirstName={participantFirstName} setParticipantFirstName={setParticipantFirstName}
                    participantLastName={participantLastName} setParticipantLastName={setParticipantLastName}
                    facebook={facebook} setFacebook={setFacebook}
                    amazon={amazon} setAmazon={setAmazon}
                    tikTok={tikTok} setTikTok={setTikTok}
                    linkedIn={linkedIn} setLinkedIn={setLinkedIn}
                    snapchat={snapchat} setSnapchat={setSnapchat}
                    twitter={twitter} setTwitter={setTwitter}
                    youtube={youtube} setYoutube={setYoutube}
                    pinterest={pinterest} setPinterest={setPinterest}
                />}
                {subPage === "TakeSurveys" && <SurveysSubpage
                    key="surveys"
                    participantFirstName={participantFirstName}
                    participantLastName={participantLastName}
                    setSubPage={setSubPage}
                    scrollToTop={scrollToTop}
                    surveys={surveys}
                    submitted={submitted}
                    setSubmitted={setSubmitted}
                    showingDetailedInfoFor={showingDetailedInfoFor}
                    setShowingDetailedInfoFor={setShowingDetailedInfoFor} />}
            </AnimatePresence>
        </div>
    )
}

const anySelected = (options) => {
    for (let option of options)
        if (option)
            return true;
    return false;
}

function SelectSurveysSubPage({ setSubPage, participantFirstName, setParticipantFirstName, participantLastName, setParticipantLastName,
    facebook, setFacebook, amazon, setAmazon, tikTok, setTikTok, linkedIn, setLinkedIn, snapchat, setSnapchat, twitter, setTwitter, youtube,
    setYoutube, pinterest, setPinterest }) {

    const [surveySelectionError, setSurveySelectionError] = useState("");

    const onPressContinue = () => {

        if (participantFirstName.length < 2) {
            setSurveySelectionError("Please enter your first name")
            return;
        }

        if (participantLastName.length < 2) {
            setSurveySelectionError("Please enter your last name")
            return;
        }

        if (!anySelected([facebook, amazon, tikTok, linkedIn, snapchat, twitter, youtube, pinterest])) {
            setSurveySelectionError("Please select at least 1 technology to take a survey on")
            return;
        }

        // Move to the next phase, which will take this SubPage out of view and put the EnterInfoSubPage into view
        setSubPage("TakeSurveys");
    }

    return (
        <motion.div className="select-surveys-subpage" exit={selectSurveysPageExit} initial={selectSurveysPageInitial} animate={selectSurveysPageAnimate}>
            <div className="select-surveys-container">
                <div className="select-surveys-header">
                    <h3 className="select-surveys-heading">Enter Participant Information</h3>
                </div>
                <div className="select-surveys-form">
                    <div className="container-fluid px-0 select-surveys-inputs-container">
                        <div className="row gy-4 mb-4">
                            <div className="col-lg-6">
                                <div className="d-flex justify-content-center justify-content-lg-end">
                                    <MaterialInput size={14} label="First Name" state={participantFirstName} setState={setParticipantFirstName} />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="d-flex justify-content-center justify-content-lg-start">
                                    <MaterialInput size={14} label="Last Name" state={participantLastName} setState={setParticipantLastName} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <h4 className="select-socials-heading text-center mb-3">Select Services That You Use</h4>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="d-flex justify-content-center justify-content-lg-end">
                                <div>
                                    <SelectSurveyCheckbox name="Facebook" state={facebook} setState={setFacebook} />
                                    <SelectSurveyCheckbox name="Amazon" state={amazon} setState={setAmazon} />
                                    <SelectSurveyCheckbox name="TikTok" state={tikTok} setState={setTikTok} />
                                    <SelectSurveyCheckbox name="LinkedIn" state={linkedIn} setState={setLinkedIn} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="d-flex justify-content-center justify-content-lg-start">
                                <div>
                                    <SelectSurveyCheckbox name="Snapchat" state={snapchat} setState={setSnapchat} />
                                    <SelectSurveyCheckbox name="Twitter" state={twitter} setState={setTwitter} />
                                    <SelectSurveyCheckbox name="Youtube" state={youtube} setState={setYoutube} />
                                    <SelectSurveyCheckbox name="Pinterest" state={pinterest} setState={setPinterest} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {surveySelectionError && <motion.div initial={zeroHeightInvisible} animate={selectSurveysError} className="select-surveys-error">{surveySelectionError}</motion.div>}
                    <div className="d-flex justify-content-center w-100">
                        <button className="select-surveys-button" onClick={onPressContinue}>
                            <span>Continue</span>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

function SelectSurveyCheckbox({ name, state, setState }) {
    return (
        <div className="checkbox-with-label">
            <MaterialCheckbox className="select-survey-checkbox" state={state} setState={setState} />
            <div className="select-survey-checkbox-label">{name}</div>
        </div>
    )
}

// Will contain a bunch of sub components, based on which socials are set to true in props
function SurveysSubpage({ scrollToTop, participantFirstName, participantLastName, surveys, submitted, setSubmitted, setShowingDetailedInfoFor }) {

    const onClickSubmit = async () => {

        if (submitted) {
            //   return;
        }

        // No server-side validation for determining survey accuracy (i.e the accuracy is determined on the client as the client has all the needed info)
        scrollToTop(100)
        setTimeout(() => setSubmitted(true), 1200);

        submitReportToServer(`${participantFirstName} ${participantLastName}`, surveys)
    }

    return (
        <motion.div className="surveys-subpage" initial={surveysPageInitial} animate={surveysPageAnimate}>
            {submitted && <motion.div className="lets-see text-center mb-3" initial={zeroHeightInvisible} animate={letsSeeAnimation}>
                <h2 className="lets-see-heading">Let's See How You Did</h2>
                <h4>Underlined statements are ones that you got wrong. Click on incorrect statements to get a detailed explanation</h4>
            </motion.div>}
            <div className="individual-surveys-container">
                {surveys.map((surveyInfo, surveyIndex) => <IndividualSurvey key={surveyInfo.name} flipped={submitted} surveyIndex={surveyIndex} surveyInfo={surveyInfo} surveys={surveys} setShowingDetailedInfoFor={setShowingDetailedInfoFor} />)}
                <AnimatePresence>
                    {!false && <motion.div className="w-100" initial={submitSurveyInitial} animate={submitSurveyAnimate(surveys.length)} exit={submitSurveyExit}>
                        <button className="submit-surveys-button button blue hover-dim w-100" onClick={onClickSubmit}>
                            <span>SUBMIT SURVEY{(surveys.length > 1 ? "S" : "")}</span>
                        </button>
                    </motion.div>}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

function SpecificQuestionDetails({ setShowingDetailedInfoFor, surveyInfo, questionIndex }) {

    const { name, questions, answers, guesses, quotes } = surveyInfo

    const answer = answers[questionIndex]
    const userGuess = guesses[questionIndex]

    const answerElement = <span className={answer ? "green-text" : "red-text"}>{String(answer)}</span>
    const guessElement = <span className={userGuess ? "green-text" : "red-text"}>{String(userGuess)}</span>

    return (
        <motion.div className="fixed-info-overlay" initial={infoOverlayInitial} animate={infoOverlayAnimate}>
            <motion.div className="specific-question-details-container" initial={questionDetailsInitial} animate={questionDetailsAnimate}>
                <h3 className="question-details-heading">{name} Question {questionIndex + 1} Details</h3>
                <h6 className="question-details-question">
                    "{questions[questionIndex].substring(0, questions[questionIndex].length - 1)}"
                </h6>
                <div className="question-details-comparison">
                    This statement is {answerElement}. You guessed that it was {guessElement}
                </div>
                <div className="question-details-quote">
                    "{quotes[questionIndex].substring(0, quotes[questionIndex].length - 1)}"
                </div>
                <div className="exit-details-container">
                    <button className="button exit-details-button blue hover-dim" onClick={() => setShowingDetailedInfoFor(null)}>
                        <span>Close</span>
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}

function IndividualSurvey({ flipped, surveyIndex, surveyInfo, setShowingDetailedInfoFor }) {

    const { name, questions, answers, guesses, logo } = surveyInfo;

    const accuracyPerc = calculateAccuracy(guesses, answers);

    const additionalText = accuracyPerc < 100 ? " (click on invalid answers for more info)" : "";
    const flipStagger = 0.3 // The delay between each survey flipping 
    const flipStyle = { "--flip-delay": `${1 + surveyIndex * flipStagger}s` }

    const flipClass = "survey-flip-card " + (surveyIndex % 2 === 0 ? "opposite-flip" : "normal-flip") + (flipped ? " flipped" : "")

    return (
        <motion.div className="individual-survey-perspective-container" initial={individualSurveyInitial} animate={individualSurveyAnimate(surveyIndex)}>
            <div style={flipStyle} className={flipClass}>
                <div className="flip-card-front flip-card-size-controller">
                    <div className="survey-header">
                        <img src={logo} className="survey-logo" />
                        <h4 className="survey-heading">{name}</h4>
                    </div>
                    <h5 className="survey-subheading">Please check all that you believe apply</h5>
                    <div className={"survey-checkbox-container" + (flipped ? " no-tab" : "")}>
                        {questions.map((question, questionIndex) => ( // Element itself is the key (i.e, the keys are the question themselves)
                            <SurveyQACheckbox key={question} noTab={flipped} questionIndex={questionIndex} surveyInfo={surveyInfo} />))}
                    </div>
                </div>
                <div className="flip-card-back">
                    <div className="survey-header">
                        <img src={logo} className="survey-logo" />
                        <h4 className="survey-heading">{name}</h4>
                    </div>
                    <h5 className="survey-subheading">Accuracy: {accuracyPerc}%{additionalText}</h5>
                    <div className={"survey-checkbox-container" + (flipped ? "" : " no-tab")}>
                        {questions.map((question, questionIndex) => ( // Element itself is the key (i.e, the keys are the question themselves)
                            <SurveyAnswerDisplay key={question} noTab={!flipped} questionIndex={questionIndex} surveyInfo={surveyInfo} setShowingDetailedInfoFor={setShowingDetailedInfoFor} />))}
                    </div>
                    {/* The back will have some comparison between guesses and answers to show red or green if they got it right, and you can click to pull up the quote*/}
                </div>
            </div>
        </motion.div>
    )
}

function SurveyQACheckbox({ questionIndex, surveyInfo, noTab }) {

    const { questions, guesses, setGuesses } = surveyInfo;

    let additionalProps = noTab ? { tabIndex: -1 } : {}

    return (
        <div className="checkbox-with-label survey">
            <MaterialCheckbox className="survey-checkbox"
                checked={guesses[questionIndex]}
                onChange={() => {
                    guesses[questionIndex] = !guesses[questionIndex]
                    setGuesses([...guesses]) // ... might not be required but I am being overcautious for now
                }}
                {...additionalProps} />
            <span className="survey-checkbox-label">
                {questions[questionIndex]}
            </span>
        </div>
    )
}

function SurveyAnswerDisplay({ surveyInfo, questionIndex, setShowingDetailedInfoFor, noTab }) {

    const { questions, answers, guesses } = surveyInfo;

    const wrongGuess = guesses[questionIndex] !== answers[questionIndex];
    const underlineClasses = wrongGuess ? " link-underline red-underline" : ""

    const onUnderlineClick = () => {
        if (wrongGuess) {
            setShowingDetailedInfoFor({ surveyInfo, questionIndex });
        }
    }

    let additionalProps = noTab ? { tabIndex: -1 } : {}

    return (
        <div className="checkbox-with-label survey">
            <MaterialCheckbox className={"survey-checkbox " + (wrongGuess ? "invalid" : "valid")} readOnly checked={guesses[questionIndex]} {...additionalProps} />
            <span className={"survey-checkbox-label" + underlineClasses} onClick={onUnderlineClick}>
                {questions[questionIndex]}
            </span>

        </div>
    )
}

const calculateAccuracy = (guesses, answers) => {
    let total = answers.length;
    let correct = 0;
    for (let i = 0; i < total; i++)
        if (guesses[i] === answers[i])
            correct++;
    const accuracyDec = correct / total;
    const accuracyPerc = +(accuracyDec * 100.0).toFixed(2)

    return accuracyPerc;
}

const submitReportToServer = async (participantFullName, surveys) => {
    // Send report to server

    try {
        const request = {};

        for (let survey of surveys) {
            let { name, guesses, answers } = survey;

            // Lowercase the first letter of name because in the HTTP request they need to be lowercase camel-cased
            name = name.toLowerCase().substring(0, 1) + name.substring(1, name.length);
            const accuracyPerc = calculateAccuracy(guesses, answers);

            request[name] = accuracyPerc;
        }

        request.participantFullName = participantFullName; // TODO this needs to be a react state that is set at the beginning of the survey

        console.log("Sending the following request to the REST API: ", request)

        const res = await axios.post(`${SERVER_URL}/surveying/submitsurvey`, request);
        console.log("Got the following request from server: ", res)
    }
    catch (error) {
        console.log("Received error from server", error)

        if (error.code === "ERR_NETWORK") {
            console.log("Error communicating/connecting to the server")
        }

        const { response: { data: { userError, serverError } = {} } = {} } = error;

        if (userError) { // This joke is basically saying there should never be user error
            console.log("You need to learn how to code: ", userError)
        }

        if (serverError) { // Possible DB pushing exception
            console.log("Internal error querying the database: ", serverError)
        }
    }

    try {
        const res = await axios.get(`${SERVER_URL}/surveying/generateReport`)
        console.log("GET /surveying/generateReport returns: ", res)

    }
    catch (err) {
        console.log("Error generating report: ", err)
    }
}

export default SurveyingPage
