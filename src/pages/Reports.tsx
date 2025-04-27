import React, { useState } from 'react';
import Header from '../components/Header';
import ReportCard from '../components/ReportCard';
import writingImg from '../assets/writing.png';
import './Reports.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { db } from '/Users/hectorrios/mysaferouteapp/firebase.ts';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { Autocomplete } from '@react-google-maps/api';

const Reports: React.FC = () => {
    const locationHook = useLocation();

    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('Hazard');
    const [severity, setSeverity] = useState('High');
    const [status, setStatus] = useState('Backed by Community');
    const [submittedReport, setSubmittedReport] = useState<any | null>(null);
    const [autocompleteRef, setAutocompleteRef] = useState<any>(null);
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    useEffect(() => {
        setTitle('');
        setLocation('');
        setDescription('');
        setType('Hazard');
        setSeverity('High');
        setStatus('Backed by Community');
        setSubmittedReport(null);
        setCoordinates(null);
    }, [locationHook]);

    const handlePlaceChanged = () => {
        if (!autocompleteRef) return;
        try {
            const place = autocompleteRef.getPlace();
            const loc = place.geometry?.location;
            if (!loc || !place.formatted_address) return;
            setLocation(place.formatted_address);
            setCoordinates({ lat: loc.lat(), lng: loc.lng() });
        } catch (err) {
            console.error('Place fetch error:', err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmissionStatus('loading');
        const newReport = {
            title,
            location,
            time: Timestamp.now(),
            description,
            type,
            severity,
            status,
            coordinates: coordinates ?? null,
        };
        try {
            await addDoc(collection(db, 'reports'), newReport);
            setSubmittedReport({ ...newReport, time: 'Reported just now' });
            setTitle('');
            setLocation('');
            setDescription('');
            setType('Hazard');
            setSeverity('High');
            setStatus('Backed by Community');
            setCoordinates(null);
            setSubmissionStatus('success');
            setTimeout(() => setSubmissionStatus('idle'), 3000);
        } catch (error) {
            console.error('Error submitting report:', error);
            setSubmissionStatus('error');
            setTimeout(() => setSubmissionStatus('idle'), 5000);
        }
    };

    return (
        <>
            <Header />
            <div className="report-container">
                <div className="form-image-section">
                    <div className="form-card">
                        <h1>Submit a Safety Report</h1>
                        <p className="subtitle">Help others stay safe by sharing location-based safety issues.</p>

                        {submissionStatus === 'loading' && <p className="submission-message">Submitting report...</p>}
                        {submissionStatus === 'success' && <p className="submission-message success">Report submitted successfully!</p>}
                        {submissionStatus === 'error' && <p className="submission-message error">Failed to submit report. Please try again.</p>}

                        <form onSubmit={handleSubmit} className="report-form">
                            <input
                                type="text"
                                placeholder="Title (e.g. Broken Street Light)"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />

                            <div className="location-input-wrapper">
                                <Autocomplete
                                    onLoad={(autocomplete) => setAutocompleteRef(autocomplete)}
                                    onPlaceChanged={handlePlaceChanged}
                                    onUnmount={() => setAutocompleteRef(null)}
                                >
                                    <input
                                        type="text"
                                        placeholder="Location (e.g. Maple Ave & 5th Street)"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        required
                                        className="location-input"
                                    />
                                </Autocomplete>
                            </div>

                            <textarea
                                placeholder="Description of the issue"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                required
                            />

                            <div className="form-row">
                                <select value={type} onChange={(e) => setType(e.target.value)}>
                                    <option>🚫 Hazard</option>
                                    <option>🔍 Suspicious Activity</option>
                                    <option>🧱 Infrastructure</option>
                                    <option>✅ Safe Area</option>
                                </select>

                                <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Informational</option>
                                </select>

                                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option>🧑‍🧒‍🧒 Backed by Community</option>
                                    <option>✈️ Out of Area</option>
                                </select>
                            </div>

                            <button type="submit" className="submit-btn">Submit Report</button>
                        </form>
                    </div>

                    <div className="form-image-wrapper">
                        <img src={writingImg} alt="writing a report" className="form-image" />
                    </div>
                </div>

                {submittedReport && (
                    <div className="preview-section">
                        <h2>Live Preview</h2>
                        <ReportCard {...submittedReport} />
                    </div>
                )}
            </div>
        </>
    );
};

export default Reports;
