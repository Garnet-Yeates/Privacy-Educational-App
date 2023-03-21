import { model } from 'mongoose';

const SurveySubmission = model('SurveySubmission');

// POST to /surveying/submitsurvey
export async function submitSurvey(req, res) {

    const { participant } = req.body;

    if (typeof participant !== 'string' || participant.length < 2) {
        return res.status(400).json({ error: 'Participant name must be defined' })
    }

    const surveys = ['facebook', 'amazon', 'tikTok', 'linkedIn', 'snapchat', 'twitter', 'youtube', 'pinterest'];

    // Request body must have at LEAST one survey result inside of it (i.e participant must complete at least 1 survey)
    for (let survey of surveys) {
        if (survey in req.body)
            break;
        return res.status(400).json({ error: 'At least one survey must be completed' })
    }

    // Input validation: survey properties must be a number representing the accuracy
    for (let survey of surveys)
        if (survey in req.body && (typeof req.body[survey] !== "number" || req.body[survey] < 0 || req.body[survey] > 100))
            return res.status(400).json({ error: 'Invalid input. Survey properties must be a number between 0 and 100, representing the accuracy' })

    let surveySubmission = new SurveySubmission({ ...req.body });

    surveySubmission.save((err) => {
        if (err)
            return res.status(500).json({ error: 'Internal error saving submission results to MongoDB database' });
        else
            return res.send('Survey Submitted Successfully')
    });
}