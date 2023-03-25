import '../../scss/PhishingPage.scss'
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MaterialCheckbox from '../../components/MaterialCheckbox';

function PhishingPage() {

    return (
        <div className="phishing-page">
            <div className="opacity-overlay">
                <div className="card">
                    <div className="card-header">

                    </div>
                    <div className="card-body">
                        <h5 className="card-heading">
                            Enter your Username and Password
                        </h5>
                    </div>
                </div>
            </div>
        </div >)
}

export default PhishingPage;