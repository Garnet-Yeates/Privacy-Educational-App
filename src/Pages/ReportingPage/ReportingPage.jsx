import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../..';
import '../../scss/ReportingPage.scss';

function ReportingPage({ scrollToTop }) {

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

    const [reportData, setReportData] = useState({});

    const { allSubmissions = [], surveyAverages = {} } = reportData;

    useEffect(() => {
        const fetchData = async () => {
            setReportData(await getReportData());
        }

        fetchData();
    }, [])

    return (
        <div className="tables-container">
            <ParticipantReportTable allSubmissions={allSubmissions} />
            <SurveyReportTable />
        </div>
    )
}

// For each participant, display score for each survey, as well as average 
// (col headers are: [ParticipantName, Facebook, Amazon, ..., Avg])
function ParticipantReportTable({ allSubmissions }) {

    console.log("all sub", allSubmissions)
    return (
        <table className="reporting-table">
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
            {allSubmissions.map((submission) => {

                // Destructure Assignment, default evertything to "N/A"
                const {
                    participantFullName,
                    facebook = "N/A",
                    amazon = "N/A",
                    tikTok = "N/A",
                    linkedIn = "N/A",
                    snapchat = "N/A",
                    twitter = "N/A",
                    youtube = "N/A",
                    pinterest = "N/A",
                    average } = submission;

                const arr = [participantFullName, facebook, amazon, tikTok, linkedIn, snapchat, twitter, youtube, pinterest, average]

                return (
                    <tr>
                        {arr.map((element) => <td>{element}</td>)}
                    </tr>
                )
            })}
        </table>
    )
}

// For each survey, display the average
// (col headers are: [Survey, AvgScore])
function SurveyReportTable(surveyAverages) {
    return (
        <></>
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
    }
}

export default ReportingPage
