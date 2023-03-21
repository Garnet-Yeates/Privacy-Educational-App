import { Schema, model } from 'mongoose';

const SurveySubmissionSchema = new Schema({
    participantName: {
        type: String,
        required: true,
        trim: true,
    },
    facebook: Number,
    amazon: Number,
    tikTok: Number,
    linkedIn: Number,
    snapchat: Number,
    twitter: Number,
    youtube: Number,
    pinterest: Number,
})

model('SurveySubmission', SurveySubmissionSchema)