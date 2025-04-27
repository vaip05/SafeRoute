import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './Home.css';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <div className="homepage">
                <section className="hero">
                    <div className="hero-text">
                        <h1>Welcome to<br />SafeRoute!</h1>
                        <p>SafeRoute combines real-time community reports, smart route planning, and safety alerts to help you travel stress-free.</p>
                        <div className="hero-buttons">
                            <button className="primary" onClick={() => navigate('/map')}>Find Your Route</button>
                            <button className="secondary" onClick={() => navigate('/about')}>Learn More</button>
                        </div>
                    </div>
                </section>

                <section className="quick-access">
                    <h2>Get Started</h2>
                    <div className="quick-cards">
                        <div className="quick-card">
                            <img src="https://developers.google.com/static/maps/images/landing/react-codelab-thumbnail.png" alt="Plan Your Route" />
                            <h3>Plan Your Route</h3>
                            <p>Find the safest path to your destination using real-time data.</p>
                            <button className="primary" onClick={() => navigate('/map')}>Open Map</button>
                        </div>
                        <div className="quick-card">
                            <img src="https://cdn-attachments.timesofmalta.com/a3b16c83958c1c62058472b941e66d70ad03d35e-1610553392-65e030bf-960x640.jpg" alt="Community Reports" />
                            <h3>Community Reports</h3>
                            <p>Stay informed about your surroundings through real-time reports.</p>
                            <button className="secondary" onClick={() => navigate('/reports/main')}>View Reports</button>
                        </div>
                    </div>
                </section>

                <section className="features">
                    <h2>Key Features</h2>
                    <p>Discover how SafeRoute helps you navigate your community with confidence and awareness.</p>
                    <div className="feature-cards">
                        <div className="feature-card same-size">
                            <div className="feature-icon" style={{ backgroundColor: '#E0E7FF' }}>🗺️</div>
                            <h3>Smart Route Planning</h3>
                            <p>Plan your journey with routes that prioritize safety based on community data and official crime statistics.</p>
                            <a onClick={() => navigate('/map')} style={{ cursor: 'pointer' }}>Plan Your Route →</a>
                        </div>
                        <div className="feature-card same-size">
                            <div className="feature-icon" style={{ backgroundColor: '#FFF7ED' }}>📢</div>
                            <h3>Community Reports</h3>
                            <p>Access and contribute to real-time safety reports from community members to stay informed about your surroundings.</p>
                            <a onClick={() => navigate('/reports/main')} style={{ cursor: 'pointer' }}>View Reports →</a>
                        </div>
                        <div className="feature-card same-size">
                            <div className="feature-icon" style={{ backgroundColor: '#DCFCE7' }}>🤝</div>
                            <h3>Join the Community</h3>
                            <p>Become a part of SafeRoute’s growing network. Your reports, feedback, and support help make neighborhoods safer.</p>
                            <a onClick={() => navigate('/about')} style={{ cursor: 'pointer' }}>Get Involved →</a>
                        </div>
                    </div>
                </section>

                <section className="statistics">
                    <h2>San Jose Safety Statistics</h2>
                    <p>Our community-driven approach aims to make neighborhoods safer every day.</p>
                    <div className="stats">
                        <div className="stat">
                            <p>More Than <h3>1,100</h3> Crimes Against People Commited Per Month</p>
                        </div>
                        <div className="stat">
                            <p>More Than <h3>2,800</h3> Crimes Against Property Commited Per Month</p>
                        </div>
                        <div className="stat">
                            <p>More Than <h3>350</h3> Crimes Against Society Commited Per Month</p>
                        </div>
                    </div>
                </section>

                <footer className="footer">
                    <p>© 2025 SafeRoute. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
};

export default HomePage;
