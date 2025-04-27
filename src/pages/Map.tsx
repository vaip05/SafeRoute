import React, { useState, useEffect } from 'react';
import { GoogleMap, Autocomplete, Polyline, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import Papa from 'papaparse';
import Header from '../components/Header';
import './Map.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: 37.3382,
    lng: -121.8863,
};

const crimeWeights: Record<string, number> = {
    THEFT: 4,
    ASSAULT: 5,
    VANDALISM: 3,
    TRESPASSING: 2,
};

type CrimeReport = {
    address: string;
    city: string;
    state: string;
    incident_type_primary: string;
    lat: number;
    lng: number;
};

type FirebaseReport = {
    title: string;
    coordinates: { lat: number; lng: number };
    severity: string;
    description: string;
};

const MapPage: React.FC = () => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: apiKey,
        libraries: ['places'],
    });

    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [routesWithScores, setRoutesWithScores] = useState<{ route: google.maps.DirectionsRoute, score: number }[]>([]);
    const [crimeData, setCrimeData] = useState<CrimeReport[]>([]);
    const [reportPins, setReportPins] = useState<FirebaseReport[]>([]);
    const [selectedReport, setSelectedReport] = useState<FirebaseReport | null>(null);

    const [startAutocomplete, setStartAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const [endAutocomplete, setEndAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const [mapKey, setMapKey] = useState(0);
    const [hoveredRouteIndex, setHoveredRouteIndex] = useState<number | null>(null);

    useEffect(() => {
        fetch('/Crime_Reports_GEO.csv')
            .then(response => response.text())
            .then(csvText => {
                Papa.parse<CrimeReport>(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        setCrimeData(results.data as CrimeReport[]);
                    },
                    error: (error: unknown) => {
                        console.error('Error parsing CSV:', error);
                    }
                });
            });

        const fetchReports = async () => {
            const querySnapshot = await getDocs(collection(db, 'reports'));
            const pins: FirebaseReport[] = [];
            querySnapshot.forEach(doc => {
                const data = doc.data();
                if (data.coordinates?.lat && data.coordinates?.lng) {
                    pins.push({
                        title: data.title,
                        coordinates: data.coordinates,
                        severity: data.severity || 'Medium',
                        description: data.description || '',
                    });
                }
            });
            setReportPins(pins);
        };

        fetchReports();
    }, []);

    const handleStartPlaceChanged = () => {
        if (startAutocomplete) {
            const place = startAutocomplete.getPlace();
            if (place.formatted_address) {
                setStart(place.formatted_address);
            }
        }
    };

    const handleEndPlaceChanged = () => {
        if (endAutocomplete) {
            const place = endAutocomplete.getPlace();
            if (place.formatted_address) {
                setEnd(place.formatted_address);
            }
        }
    };

    const haversineDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLng = (lng2 - lng1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLng / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const calculateRoute = async () => {
        if (!start || !end) {
            alert('Please enter valid Start and Destination.');
            return;
        }

        const directionsService = new google.maps.DirectionsService();
        const result = await new Promise<google.maps.DirectionsResult>((resolve, reject) => {
            directionsService.route(
                {
                    origin: start,
                    destination: end,
                    travelMode: google.maps.TravelMode.WALKING,
                    provideRouteAlternatives: true,
                },
                (result, status) => {
                    if (status === 'OK' && result) {
                        resolve(result);
                    } else {
                        reject(new Error('Directions request failed: ' + status));
                    }
                }
            );
        });

        const routes = result.routes;

        const scoredRoutes = routes.map((route) => {
            let dangerScore = 0;
            for (const point of route.overview_path) {
                for (const crime of crimeData) {
                    const distance = haversineDistance(point.lat(), point.lng(), crime.lat, crime.lng);
                    if (distance < 0.2) {
                        const weight = crimeWeights[crime.incident_type_primary] || 1;
                        dangerScore += weight;
                    }
                }
            }
            return { route, score: dangerScore };
        });

        scoredRoutes.sort((a, b) => a.score - b.score);
        setRoutesWithScores(scoredRoutes);
        setMapKey(prev => prev + 1);
    };

    const getColorByIndex = (index: number) => {
        if (index === 0) return 'green';
        if (index === 1) return 'yellow';
        return 'red';
    };

    const getSeverityColor = (severity: string) => {
        switch (severity.toLowerCase()) {
            case 'high':
                return '#fee2e2'; // light red
            case 'medium':
                return '#fef3c7'; // light yellow
            case 'informational':
                return '#d1fae5'; // light green
            default:
                return '#e5e7eb'; // light gray
        }
    };

    const handleStartNavigation = () => {
        if (!start || !end || routesWithScores.length === 0) {
            alert('Please enter valid Start and Destination.');
            return;
        }

        const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(start)}&destination=${encodeURIComponent(end)}&travelmode=walking`;
        window.open(url, '_blank');
    };

    return (
        <>
            <Header />
            <div className="home-container">
                <div className="map-container">
                    {isLoaded ? (
                        <>
                            <div className="input-container">
                                <Autocomplete onLoad={setStartAutocomplete} onPlaceChanged={handleStartPlaceChanged}>
                                    <input className="input-box" value={start} onChange={(e) => setStart(e.target.value)} placeholder="Start Location" />
                                </Autocomplete>
                                <Autocomplete onLoad={setEndAutocomplete} onPlaceChanged={handleEndPlaceChanged}>
                                    <input className="input-box" value={end} onChange={(e) => setEnd(e.target.value)} placeholder="End Location" />
                                </Autocomplete>
                                <button onClick={calculateRoute} className="find-route-button">Find Safest Route</button>
                            </div>

                            <GoogleMap key={mapKey} mapContainerStyle={containerStyle} center={center} zoom={13}>
                                {routesWithScores.map((r, index) => (
                                    <Polyline
                                        key={index}
                                        path={r.route.overview_path}
                                        options={{
                                            strokeColor: getColorByIndex(index),
                                            strokeOpacity: hoveredRouteIndex === null ? 0.8 : (hoveredRouteIndex === index ? 1 : 0.2),
                                            strokeWeight: hoveredRouteIndex === index ? 10 : 6,
                                        }}
                                    />
                                ))}

                                {reportPins.map((pin, index) => (
                                    <MarkerF
                                        key={index}
                                        position={pin.coordinates}
                                        onClick={() => setSelectedReport(pin)}
                                    />
                                ))}

                                {selectedReport && (
                                    <InfoWindowF
                                        position={selectedReport.coordinates}
                                        onCloseClick={() => setSelectedReport(null)}
                                    >
                                        <div style={{ padding: '12px', textAlign: 'center' }}>
                                            <h3 style={{ margin: '0 0 8px' }}>{selectedReport.title}</h3>
                                            <p
                                                style={{
                                                    backgroundColor: getSeverityColor(selectedReport.severity),
                                                    borderRadius: '999px',
                                                    display: 'inline-block',
                                                    padding: '4px 10px',
                                                    fontWeight: 600,
                                                    fontSize: '0.8rem',
                                                    marginBottom: '6px',
                                                }}
                                            >
                                                Severity: {selectedReport.severity}
                                            </p>
                                            {selectedReport.description && (
                                                <p style={{ fontSize: '0.85rem', marginTop: 4 }}>{selectedReport.description}</p>
                                            )}
                                        </div>
                                    </InfoWindowF>
                                )}
                            </GoogleMap>
                        </>
                    ) : (
                        <p className="loading">Loading map...</p>
                    )}
                </div>

                <div className="sidebar-container">
                    <h2 className="sidebar-title-bold">Route Options</h2>
                    <div className="feedback-section">
                        <button className="start-button" onClick={handleStartNavigation}>Start Navigation</button>
                    </div>
                    {routesWithScores.map((r, idx) => (
                        <div
                            key={idx}
                            className={`route-card ${getColorByIndex(idx)}-card`}
                            onMouseEnter={() => setHoveredRouteIndex(idx)}
                            onMouseLeave={() => setHoveredRouteIndex(null)}
                        >
                            <h3 className="sidebar-title-bold">
                                {idx === 0 ? "Safest Route" : idx === 1 ? "Alternate Route" : "Least Safe Route"}
                            </h3>
                            <p>🚶 {r.route.legs[0]?.duration?.text || 'N/A'}</p>
                            <p>📍 {r.route.legs[0]?.distance?.text || 'N/A'}</p>
                            <p>Route color: {getColorByIndex(idx).toUpperCase()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default MapPage;
