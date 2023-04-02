import express, { json, urlencoded } from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Load models
import './api/models/SurveySubmissionModel.js'

// Load routes
import surveyingRoute from './api/routes/surveyingRoute.js'
import { deleteDevEntries } from './api/controllers/surveyingController.js';

dotenv.config();

const app = express()

// Set up cors (has to be first or HTTP req's get blocked)
app.use(cors());

// Set up JSON body parsing
app.use(json())
app.use(urlencoded({ extended: false }))

// Configure imported routes
surveyingRoute(app)

deleteDevEntries();

// Connect database
mongoose.connect(process.env.DATABASE_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Start
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("Server is up and running")
});


