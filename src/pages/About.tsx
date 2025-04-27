import React from 'react';
import './About.css';
import Header from '../components/Header';

const AboutPage: React.FC = () => {
    return (
        <>
            <Header />

            <div className="aboutpage">
                <section className="hero">
                    <div className="hero-text">
                        <h1>About Us</h1>
                    </div>
                </section>

                <section className="quick-access">
                    <h2>Our Team</h2>
                    <div className="quick-cards">
                        <div className="quick-card">
                            <img src="https://media.licdn.com/dms/image/v2/D5603AQF63FomAG95eA/profile-displayphoto-shrink_400_400/B56ZZ1SPLiHUAk-/0/1745724437681?e=1751500800&v=beta&t=H8Nfnb5ro9TcfaXYnJo73CQ_H6kVf4_hNl_gg7_s9aI" alt="Hector Rios" />
                            <h3>Hector Rios</h3>
                            <p>2nd Year Computer Science Student</p>
                        </div>
                        <div className="quick-card">
                            <img src="https://media.licdn.com/dms/image/v2/D5603AQGQX4xunE6IWg/profile-displayphoto-shrink_800_800/B56ZZ1SYR9HgAg-/0/1745724475026?e=1751500800&v=beta&t=gvOEnDNPESyvigeCi5VYgbojjK-03f69Du24-0W3-WU" alt="Vaishnavi Panchal" />
                            <h3>Vaishnavi Panchal</h3>
                            <p>2nd Year Computer Science Student</p>
                        </div>
                        <div className="quick-card">
                            <img src="https://media.licdn.com/dms/image/v2/D5603AQEL1Ej8j3G84w/profile-displayphoto-shrink_400_400/B56ZZ1RFhBGoAg-/0/1745724136668?e=1751500800&v=beta&t=OoUPcxjYdJouRl2zmkCs_UfQO47b1p0ZGBPBcUeiPx8" alt="Alisha Pol" />
                            <h3>Alisha Pol</h3>
                            <p>2nd Year Computer Science Student</p>
                        </div>
                    </div>
                </section>

                <section className="statistics">
                    <section className="inspiration-card">
                        <h2>🌟 Our Inspiration</h2>
                        <hr className="section-divider" />
                        <p>
                            SafeRoute was born from our own experiences as young adults living in downtown San Jose. At just 19 years old, we often felt unsafe walking alone at night or through unfamiliar areas.
                        </p>
                        <p>
                            What should have been simple walks turned into moments of anxiety and caution. We envisioned a tool that uses real-time data, community reports, and smart tech to help people travel with confidence.
                        </p>
                        <p>
                            With public records from the San Jose Police Department, we analyzed trends and crime locations to build SafeRoute’s smart routing system based on real reports, not assumptions.
                        </p>
                        <p>
                            SafeRoute isn’t just an app. It’s a mission to make neighborhoods feel safer, starting with our own community.
                        </p>
                    </section>
                </section>

                <footer className="footer">
                    <p>© 2025 SafeRoute. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
};

export default AboutPage;
