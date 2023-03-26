import { generateReport, submitSurvey } from "../controllers/surveyingController.js";

export default function (app) {
    app.route('/surveying/submitsurvey')
        .post(submitSurvey);
    app.route('/surveying/generateReport')
        .get(generateReport);
};