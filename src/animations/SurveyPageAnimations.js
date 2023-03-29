export const zeroHeightInvisible = { opacity: 0, height: "0px" }

// ----------------For select-surveys-subpage, which contains the 'surveys-selection-container'---------------------------------
// This is where the user selects which surveys they want to take. After they choose them, this page animates out and surveys-subpage animates in
export const selectSurveysPageInitial = {
    opacity: 0,
    y: "200px",
}

export const selectSurveysPageAnimate = {
    opacity: 1,
    y: "0px",
    transition: {
        duration: 1,
        delay: 0.75,
    },
}

export const selectSurveysPageExit = {
    opacity: 0,
    y: "-200px",
    transition: {
        duration: 0.75,
    },
}



export const selectSurveysError = {
    opacity: 1,
    height: "auto",
}

// ----------------For surveys-subpage, which contains the individual-surveys-container as well as the 'lets see' heading/subheadings---------------------

export const surveysPageInitial = {
    opacity: 0,
    y: "200px",
}

export const surveysPageAnimate = {
    opacity: 1,
    y: "0px",
    transition: {
        duration: 0.75,
    },
}

// Probably not needed, unless I make a third page transition in after they view their results
export const surveysPageExit = {}

// After they submit the survey, a div containing a header and subheader appears saying "let's see how you did"
export const letsSeeAnimation = {
    opacity: 1,
    height: "auto",
    transition: {
        delay: 0,
        opacity: {
            duration: 1,
        },
        height: {
            duration: 1,
        },
    }
}

export const individualSurveyInitial = {
    opacity: 0,
}

const individulSurveyStagger = 0.4;

export const individualSurveyAnimate = (index) => ({
    opacity: 1,
    transition: {
        duration: 1,
        delay: individulSurveyStagger * index,
    },
})

// For the submit survey button
export const submitSurveyInitial = {
    opacity: 0,
}

export const submitSurveyAnimate = (index) => ({
    opacity: 1,
    transition: {
        duration: 1,
        delay: individulSurveyStagger * index,
    }
})

export const submitSurveyExit = {
    opacity: 0,
    height: 0,
    transition: {
        opacity: {
            duration: 1,
        },
        height: {
            duration: 0.75,
        },
    }
}

export const infoOverlayInitial = {
    opacity: 0,
}

export const infoOverlayAnimate = {
    opacity: 1,
    transition: {
        duration: 0.25,
    },
}

export const questionDetailsInitial = {
    opacity: 0,
    y: "200px",
}

export const questionDetailsAnimate = {
    opacity: 1,
    y: "0px",
    transition: {
        type: "spring",
        damping: 10,
        mass: 0.75,
        stiffness: 200,
        
        delay: 0.3,
        duration: 0.5,
    },
}