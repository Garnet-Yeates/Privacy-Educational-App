import { model } from 'mongoose';

const SurveySubmission = model('SurveySubmission');

export async function deleteDevEntries() {
    await SurveySubmission.deleteMany({ participantFullName: "DELETE LATER" });
}

// POST to /surveying/submitsurvey
export async function submitSurvey(req, res) {

    const { participantFullName } = req.body;

    if (typeof participantFullName !== 'string' || participantFullName.length < 2) {
        return res.status(400).json({ userError: 'Participant name must be defined' })
    }

    const surveys = ['facebook', 'amazon', 'tikTok', 'linkedIn', 'snapchat', 'twitter', 'youtube', 'pinterest'];

    // Request body must have at least one survey result inside of it (i.e participant must complete at least 1 survey)
    let atleastOne = false;
    for (let survey of surveys) {
        if (survey in req.body) {
            atleastOne = true;
            break;
        }
    }

    if (!atleastOne) {
        return res.status(400).json({ userError: 'At least one survey must be completed' })
    }

    // Input validation: survey properties must be a number representing the accuracy
    for (let survey of surveys)
        if (survey in req.body && (typeof req.body[survey] !== "number" || req.body[survey] < 0 || req.body[survey] > 100))
            return res.status(400).json({ userError: 'Invalid input. Survey properties must be a number between 0 and 100, representing the accuracy' })

    let surveySubmission = new SurveySubmission({ ...req.body });

    try {
        const savedDoc = await surveySubmission.save();
        return res.send('Survey Submitted Successfully')
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ serverError: 'Internal error saving submission results to MongoDB database' });
    }
}

const surveyNames = ["facebook", "amazon", "tikTok", "linkedIn", "snapchat", "twitter", "youtube", "pinterest"]

// GET to /surveying/generateReport
export async function generateReport(req, res) {

    let numScores = 0;
    let scoreTotal = 0;

    let allSubmissions = [];
    try {
        // Query all submissions that exist (no 'where' clause), selecting all fields (no 'select' clause). Essentially grabs
        // ALL participants' submissions that exist
        // Return these submissions, along with some extra data: the average score that the participant got, across all surveys they took
        allSubmissions = (await SurveySubmission.find()).map((submission) => {

            let prunedSubmission = {};

            prunedSubmission["participantFullName"] = submission["participantFullName"]

            let sum = 0;
            let totalSurveysDone = 0;
            for (let survey of surveyNames) {
                if (submission[survey] !== undefined) {
                    prunedSubmission[survey] = submission[survey];
                    totalSurveysDone++;
                    sum += submission[survey];

                    // For global average
                    numScores++;
                    scoreTotal += submission[survey];
                }
            }
            prunedSubmission["average"] = sum / totalSurveysDone;

            return prunedSubmission;
        });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ serverError: "Error getting all submissions from the database" })
    }

    let globalAverage;
    numScores > 0 && (globalAverage = scoreTotal / numScores);

    let surveyAverages = {};
    try {
        let sum = 0;
        let numEvaluated = 0;
        for (let survey of surveyNames) {
            const average = await getAverageScore(survey);

            if (average !== undefined) {
                sum += average || 0;
                numEvaluated++;
                surveyAverages[survey] = average;
            }
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ serverError: "Error getting average score for all surveys" })
    }

    return res.json({
        globalAverage,
        allSubmissions,
        surveyAverages,
    })
}

// Helper function
async function getAverageScore(surveyName) {
    try {
        let submissions = (await SurveySubmission.find({ [surveyName]: { $exists: true } })
            .select(surveyName))
            .map((element) => element[surveyName])

        if (submissions.length === 0) {
            return undefined;
        }

        let sum = submissions.reduce((prev, curr) => prev + curr, 0);
        return sum / submissions.length;
    }
    catch (err) {
        throw err; // Err here will be caught by try catch that defines 'surveyAverages' in GET /generateReport
    }
}