'use client';
import { useState } from 'react';

interface MonitorWebsiteProps {
    isVisible: boolean;
}

const MonitorWebsite = ({ isVisible }: MonitorWebsiteProps) => {
    const [activeTab, setActiveTab] = useState('home');

    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            backgroundColor: '#0a0a2a',
            color: 'white',
            opacity: isVisible ? 1 : 0,
            pointerEvents: isVisible ? 'auto' : 'none',
            fontFamily: 'Arial, sans-serif',
            overflow: 'hidden'
        }}>
            <nav style={{
                backgroundColor: '#1a1a3a',
                padding: '1rem',
                display: 'flex',
                gap: '1rem'
            }}>
                {['Home', 'About', 'Projects', 'Contact'].map((tab) => (
                    <button
                        key={tab.toLowerCase()}
                        onClick={() => setActiveTab(tab.toLowerCase())}
                        style={{
                            backgroundColor: activeTab === tab.toLowerCase() ? '#3a3a5a' : 'transparent',
                            border: 'none',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            cursor: 'pointer',
                            borderRadius: '4px'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </nav>
            <main style={{ padding: '2rem' }}>
                {activeTab === 'home' && (
                    <div>
                        <h1>Welcome to My Portfolio</h1>
                        <p>This is an interactive website running inside a 3D monitor!</p>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '1rem',
                            marginTop: '2rem'
                        }}>
                            {[1, 2, 3].map((i) => (
                                <div key={i} style={{
                                    backgroundColor: '#1a1a3a',
                                    padding: '1rem',
                                    borderRadius: '8px'
                                }}>
                                    <h3>Feature {i}</h3>
                                    <p>Interactive 3D Environment</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {/* Add more content for other tabs as needed */}
            </main>
        </div>
    );
};

export default MonitorWebsite;
