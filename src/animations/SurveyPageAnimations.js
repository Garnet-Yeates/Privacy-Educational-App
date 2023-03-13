export const zeroHeightInvisible = { opacity: 0, height: "0px" }

// ---------------------For the submit survey button--------------------------------------

export const submitSurveyInitial = {
    opacity: 0,
}

export const submitSurveyAnimate = (index) => ({ 
    opacity: 1, 
    transition: { 
        duration: 1, 
        delay: 0.5 * index,
    }
})

export const submitSurveyExit = { 
    opacity: 0, 
    height: 0, 
    transition: { 
        duration: 0.5 ,
    } 
}


// ----------------For surveys-subpage, which contains the individual-surveys-container as well as the 'lets see' heading/subheadings---------------------

export const surveysSubPageInitial = { 
    opacity: 0, 
    y: "200px" 
}

export const surveysSubPageAnimate = { 
    opacity: 1, 
    y: "0px", 
    transition: { 
        duration: 0.75 
    } 
}

export const surveysSubPageExit = {

}


// After they submit the survey, a div containing a header and subheader appears saying "let's see how you did"1
export const letsSeeAnimation = {
    opacity: 1,
    height: "auto",
    transition: {
        delay: 0,
        opacity: {
            duration: 1,
        },
        height: {
            duration: 0.5,
        }
    }
}