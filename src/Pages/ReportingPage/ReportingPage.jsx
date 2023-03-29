import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../..';
import '../../scss/ReportingPage.scss';

function ReportingPage({ scrollToTop }) {

    return (
        <div className="reporting-page-container">
            <div className="reporting-page">
                
            </div>
        </div>
    )
}

function Report() {
    const [reportData, setReportData] = useState({});

    useEffect(() => {
        setReportData(getReportData());
    }, [])


}

// For each participant, display score for each survey, as well as average 
// (col headers are: [ParticipantName, Facebook, Amazon, ..., Avg])
function ParticipantReportTable(allSubmissions) {


}

// For each survey, display the average
// (col headers are: [Survey, AvgScore])
function SurveyReportTabpe(surveyAverages) {

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
