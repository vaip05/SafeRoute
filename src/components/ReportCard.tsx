import React from 'react';
import './ReportCard.css';

interface ReportCardProps {
    title: string;
    location: string;
    time: string;
    description: string;
    type: string;
    severity: string;
    status: string;
}

const ReportCard: React.FC<ReportCardProps> = ({
    title,
    location,
    time,
    description,
    type,
    severity,
    status,
}) => {
    // Strip emojis if present and generate class name
    const plainType = type.replace(/[^\p{L}\p{N} ]+/gu, '').trim();
    const typeClass = plainType.toLowerCase().replace(/\s/g, '');

    const statusClass =
        status === 'Backed by Community' ? 'community' :
            status === 'Out of Area' ? 'out-of-area' :
                'pending';

    return (
        <div className="report-card">
            <div className="report-header">
                <span className={`report-tag ${typeClass}`}>{plainType}</span>
                <span className="severity">{severity} Severity</span>
            </div>
            <h3>{title}</h3>
            <p className="location">
                {location} • {time}
            </p>
            <p className="desc">{description}</p>
            <div className="report-meta">
                <span className={`status ${statusClass}`}>{status}</span>
            </div>
        </div>
    );
};

export default ReportCard;
