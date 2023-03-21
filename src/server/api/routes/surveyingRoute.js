import { submitSurvey } from "../controllers/surveyingController.js";

export default function (app) {
    app.route('/surveying/submitsurvey')
        .post(submitSurvey);
};