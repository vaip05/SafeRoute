import React from 'react';
import './SOS.css';
import Header from '../components/Header';

const emergencyResources = [
    {
        name: "San Jose Police Department",
        phone: "(408) 277-8900",
        address: "201 W Mission St, San Jose, CA 95110",
        website: "https://www.sjpd.org"
    },
    {
        name: "Santa Clara Valley Medical Center",
        phone: "(408) 885-5000",
        address: "751 S Bascom Ave, San Jose, CA 95128",
        website: "https://scvmc.scvh.org"
    },
    {
        name: "Bill Wilson Center (Youth Crisis)",
        phone: "(408) 243-0222",
        address: "3490 The Alameda, Santa Clara, CA 95050",
        website: "https://www.billwilsoncenter.org"
    }
];

const faqs = [
    {
        question: "What should I do in a medical emergency?",
        answer: "Call 911 immediately and provide your location and the nature of the emergency. Stay calm and follow instructions from the operator."
    },
    {
        question: "Who should I contact for a mental health crisis?",
        answer: "Contact the Bill Wilson Center or call the National Suicide Prevention Lifeline at 988 for immediate help."
    },
    {
        question: "Can I file a report anonymously?",
        answer: "Yes, many local services allow anonymous tips through apps or websites. For police reports, check your local department's online reporting portal."
    }
];

const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
};

const SOS: React.FC = () => {
    return (
        <>
            <Header />

            <div className="sos-container">
                <div className="sos-hero">
                    <div className="sos-hero-left">
                        <h1>🚨 Emergency Help Center</h1>
                        <h2>Your guide for urgent help in San Jose</h2>
                        <p>
                            In critical situations, every second matters. Whether it's a medical emergency, public safety issue,
                            or mental health crisis—this hub connects you to trusted resources.
                        </p>
                        <p>
                            Save these numbers, share them with others, and remember: you're never alone when help is needed.
                            From police assistance to youth crisis support, SafeRoute has compiled the most essential local services.
                        </p>
                        <img src="/src/assets/firetruck.png" alt="firetruck" className="firetruck-img" />
                    </div>

                    <div className="sos-cards-column">
                        {emergencyResources.map((resource, index) => (
                            <div className="sos-card" key={index}>
                                <h3>{resource.name}</h3>
                                <p>
                                    📞 {resource.phone}
                                    <span className="copy" onClick={() => copyToClipboard(resource.phone)}>📋</span>
                                </p>
                                <p>
                                    📍 {resource.address}
                                    <span className="copy" onClick={() => copyToClipboard(resource.address)}>📋</span>
                                </p>
                                <a href={resource.website} target="_blank" rel="noopener noreferrer">
                                    Visit Website →
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="sos-faq">
                <h2>Emergency FAQs</h2>
                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-card">
                            <h4>{faq.question}</h4>
                            <p>{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="sos-additional">
                <h2>More Emergency Help</h2>
                <div className="additional-resources">
                    <div className="additional-card">
                        <h4>📞 San Jose Non-Emergency Line</h4>
                        <p>Use this number for non-life-threatening issues that still require police response.</p>
                        <p><strong>(408) 277-8900</strong></p>
                    </div>

                    <div className="additional-card">
                        <h4>🏠 Homeless Shelter Directory</h4>
                        <p>Find temporary housing and food assistance services in Santa Clara County.</p>
                        <a href="https://www.homelessscc.org/" target="_blank" rel="noreferrer">View Shelter Listings →</a>
                    </div>

                    <div className="additional-card">
                        <h4>🧠 Crisis & Suicide Prevention</h4>
                        <p>Call or text <strong>988</strong> for 24/7 confidential support from trained mental health counselors.</p>
                        <a href="https://988lifeline.org" target="_blank" rel="noreferrer">Visit 988 Lifeline →</a>
                    </div>

                    <div className="additional-card">
                        <h4>🌪️ Disaster Readiness Guide</h4>
                        <p>Get prepared for wildfires, earthquakes, and power outages in San Jose.</p>
                        <a href="https://www.sanjoseca.gov/your-government/departments/office-of-emergency-management" target="_blank" rel="noreferrer">
                            Read Emergency Management Info →
                        </a>
                    </div>
                </div>
            </div>

            <div className="sos-ending">
                <h2>You're Not Alone</h2>
                <p>
                    Whether it’s reporting a concern or finding the safest route, SafeRoute is here to guide and support you.
                </p>
                <div className="sos-cta-buttons">
                    <button onClick={() => window.location.href = '/map'}>Go to Map</button>
                    <button onClick={() => window.location.href = '/reports/main'}>View Community Reports</button>
                </div>
            </div>

            <footer className="sos-footer">
                <p>❤️ Built for the San Jose community — stay safe, stay informed.</p>
                <p>© 2025 SafeRoute</p>
            </footer>
        </>
    );
};

export default SOS;
