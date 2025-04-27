import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ReportCard from '../components/ReportCard';
import { collection, getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '/Users/hectorrios/mysaferouteapp/firebase.ts';
import './ReportsMainPage.css';

const ReportMainPage: React.FC = () => {
    const navigate = useNavigate();
    const [reports, setReports] = useState<any[]>([]);
    const [lastDoc, setLastDoc] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() => {
        fetchInitialReports();
    }, []);

    const fetchInitialReports = async () => {
        const q = query(
            collection(db, 'reports'),
            orderBy('time', 'desc'),
            limit(4)
        );

        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map(doc => {
            const data = doc.data();
            const timestamp = data.time;
            const timeString = timestamp?.seconds
                ? new Date(timestamp.seconds * 1000).toLocaleString()
                : 'Unknown';
            return { id: doc.id, ...data, time: timeString };
        });

        setReports(docs);
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
        setHasMore(snapshot.docs.length === 4);
        setLoading(false);
    };

    const fetchMoreReports = async () => {
        if (!lastDoc) return;

        const q = query(
            collection(db, 'reports'),
            orderBy('time', 'desc'),
            startAfter(lastDoc),
            limit(4)
        );

        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setReports(prev => [...prev, ...docs]);
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
        setHasMore(snapshot.docs.length === 4);
    };

    const handleNewReport = () => {
        navigate('/reports');
    };

    return (
        <>
            <Header />
            <div className="report-main">

                {/* Top Bar */}
                <div className="top-bar">
                    <div>
                        <h1>Community Safety Reports</h1>
                        <p>Browse, filter, and submit safety reports in your community</p>
                    </div>
                    <button className="new-report-btn" onClick={handleNewReport}>
                        + New Report
                    </button>
                </div>

                {/* Reports Section */}
                <div className="reports-section">
                    <h2>Recent Reports</h2>
                    <div className="reports-list">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            reports.map((report) => (
                                <ReportCard key={report.id} {...report} />
                            ))
                        )}
                    </div>

                    {hasMore && (
                        <button className="load-more-btn" onClick={fetchMoreReports}>
                            Load More Reports
                        </button>
                    )}
                </div>
            </div>
            <footer className="footer">
                <p>© 2025 SafeRoute. All rights reserved.</p>
            </footer>
        </>
    );
};

export default ReportMainPage;
