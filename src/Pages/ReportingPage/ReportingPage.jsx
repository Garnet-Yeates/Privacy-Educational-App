import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../..';
import { reportVariants } from '../../animations/ReportPageAnimations';
import ColoredScoreCounter from '../../components/ColoredScoreCounter';
import '../../scss/ReportingPage.scss';

function ReportingPage() {

    return (
        <div className="reporting-page-container">
            <div className="reporting-page">
                <Report />
            </div>
        </div>
    )
}

// Contains 2 tables
function Report() {

    const [reportData, setReportData] = useState(null);

    const { allSubmissions = [], surveyAverages = {} } = reportData ?? {};

    useEffect(() => {
        const fetchData = async () => {
            let reportData = await getReportData();
            setTimeout(() => setReportData(reportData), 1000);
        }
        fetchData()

    }, [])

    let phase;
    if (reportData === null) phase = "Loading" // Default state value, currently fetching
    else if (reportData === undefined) phase = "Failed" // Data fetching failed
    else if (allSubmissions.length === 0) phase = "No Data" // No data yet
    else phase = "Loaded"

    return (
        <AnimatePresence mode="wait">
            {phase === "Loading" && <motion.h1 key="Loading" variants={reportVariants} initial="int" animate="ani" exit="exi">Loading Report Data...</motion.h1>}
            {phase === "Failed" && <motion.h1 key="Failed" variants={reportVariants} initial="int" animate="ani" exit="exi">Failed to load report data (try refreshing)</motion.h1>}
            {phase === "No Data" && <motion.h1 key="No Data" variants={reportVariants} initial="int" animate="ani" exit="exi">No Data Yet</motion.h1>}
            {phase === "Loaded" && <motion.div class="reporting-page-data" key="Loaded" variants={reportVariants} initial="int" animate="ani" exit="exi">
                <h1 className="reporting-page-heading">Surveys Report</h1>
                <GlobalAverage surveyAverages={surveyAverages} />
                <SurveyAverages surveyAverages={surveyAverages} />
                <ParticipantReportTable allSubmissions={allSubmissions} surveyAverages={surveyAverages} />
            </motion.div>}
        </AnimatePresence>
    )
}

function GlobalAverage({ surveyAverages }) {

    const { globalAverage = "N/A" } = surveyAverages;

    if (globalAverage === "N/A")
        return <>/</>

    return (
        <div className="global-average-container">
            <ColoredScoreCounter score={globalAverage} delay={0.35} />
            <div className="global-average-subheading">
                Global Survey Average
            </div>
        </div>
    )
}

function SurveyAverages({ surveyAverages }) {

    return (
        <div className="survey-averages-container">
            <div className="container px-0">
                <div className="row justify-content-center">
                    <SurveyAverage surveyAverages={surveyAverages} surveyName="facebook" />
                    <SurveyAverage surveyAverages={surveyAverages} surveyName="amazon" />
                    <SurveyAverage surveyAverages={surveyAverages} surveyName="tikTok" />
                    <SurveyAverage surveyAverages={surveyAverages} surveyName="linkedIn" />
                    <SurveyAverage surveyAverages={surveyAverages} surveyName="snapchat" />
                    <SurveyAverage surveyAverages={surveyAverages} surveyName="twitter" />
                    <SurveyAverage surveyAverages={surveyAverages} surveyName="youtube" />
                    <SurveyAverage surveyAverages={surveyAverages} surveyName="pinterest" />
                </div>
            </div>
        </div>
    )
}

function SurveyAverage({ surveyAverages, surveyName }) {

    const score = surveyAverages[surveyName];

    const capitalizeFirst = (string) => string.substring(0, 1).toUpperCase() + string.substring(1, string.length);

    if (score === undefined)
        return <></>

    return (
        <div className="col-6 col-md-4 col-lg-3">
            <div className="individual-average-container">
                <ColoredScoreCounter score={score} delay={0.35} />
                <div className="individual-average-subheading">
                    {capitalizeFirst(surveyName)} Average
                </div>
            </div>
        </div>
    )
}

// For each participant, display score for each survey, as well as average 
// (col headers are: [ParticipantName, Facebook, Amazon, ..., Avg])
function ParticipantReportTable({ allSubmissions, surveyAverages }) {

    // Build surveyAveragesRow, which is the row of the report that shows the average score of each survey ('average' for this 'participant' represents globalAverage)
    surveyAverages.participantFullName = "Average Participant"
    const { participantFullName, facebook = "N/A", amazon = "N/A", tikTok = "N/A", linkedIn = "N/A", snapchat = "N/A", twitter = "N/A", youtube = "N/A", pinterest = "N/A", globalAverage = "N/A" } = surveyAverages;
    let surveyAveragesRow = [participantFullName, facebook, amazon, tikTok, linkedIn, snapchat, twitter, youtube, pinterest, globalAverage]
    surveyAveragesRow = surveyAveragesRow.map((element) => typeof element === 'number' && +(element).toFixed(2) || element);

    return (
        <div className="container participant-report-table-container px-0">
            <table className="reporting-table">
                <thead>
                    <tr>
                        <th>Participant Name</th>
                        <th>Facebook</th>
                        <th>Amazon</th>
                        <th>TikTok</th>
                        <th>LinkedIn</th>
                        <th>Snapchat</th>
                        <th>Twitter</th>
                        <th>Youtube</th>
                        <th>Pinterest</th>
                        <th>Average</th>
                    </tr>
                </thead>
                <tbody>
                    {<tr>{surveyAveragesRow.map((element, index) => <td key={index}>{element}</td>)}</tr>}
                    {allSubmissions.map((submission, index) => {

                        // Destructure Assignment, default evertything to "N/A"
                        const { participantFullName, facebook = "N/A", amazon = "N/A", tikTok = "N/A", linkedIn = "N/A", snapchat = "N/A", twitter = "N/A", youtube = "N/A", pinterest = "N/A", average } = submission;

                        const row = [participantFullName, facebook, amazon, tikTok, linkedIn, snapchat, twitter, youtube, pinterest, fixNumber(average)]

                        return (
                            <tr key={index}>
                                {row.map((element, index) => <td key={index}>{element}</td>)}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

const getReportData = async () => {

    try {
        const res = await axios.get(`${SERVER_URL}/surveying/generateReport`)
        console.log("GET /surveying/generateReport returns: ", res)
        return res.data;
    }
    catch (err) {
        console.log("Error generating report: ", err)
        return undefined;
    }
}

const fixNumber = (value) => {
    return +(value).toFixed(2);
}

export default ReportingPage
