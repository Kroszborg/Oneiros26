'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import CosmicBackground from './CosmicBackground';
import './Team.css';

const TEAM = {
    convenors: [
        { name: 'Agam Bhasin', role: 'Convenor', image: '/team/Agam_Bhasin.webp' },
        { name: 'Jahnvi Chawla', role: 'Convenor', image: '/team/Jahnvi Chawla.webp' }
    ],
    coConvenors: [
        { name: 'Harsh Mangal', role: 'Co-Convenor', image: '/team/Harsh_Mangal.webp' },
        { name: 'Kamlnayan Panda', role: 'Co-Convenor', image: '/team/Kamlnayan_Panda.webp' },
        { name: 'Shambhavi Sharma', role: 'Co-Convenor', image: '/team/Shambhavi_Sharma.webp' },
        { name: 'Sidham Gupta', role: 'Co-Convenor', image: '/team/Sidham_Gupta.webp' },
        { name: 'Dinesh Choudhary', role: 'Co-Convenor', image: '/team/Dinesh_Choudhary.webp' }
    ],
    organisingSecretaries: [
        { name: 'Kali Vithlani', role: 'Organising Secretary', image: '/team/Kali_Vithlani.webp' },
        { name: 'Sukrit Sinha', role: 'Organising Secretary', image: '/team/Sukrit_sinha.webp' },
        { name: 'Tanmay Shah', role: 'Organising Secretary', image: '/team/Tanmay_Shah.webp' },
    ]
};

// Advanced Card Component with Mouse Tracking Glow
const TeamCard = ({ member, colorClass }: { member: { name: string; role: string; image: string }, colorClass: string }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };

    return (
        <div
            className={`team-card-elite ${colorClass}`}
            ref={cardRef}
            onMouseMove={handleMouseMove}
        >
            <div className="team-card-border" />
            <div className="team-card-glow" />

            <div className="team-card-inner">
                <div className="team-avatar-container">
                    <div className="team-avatar-ring team-avatar-ring-1"></div>
                    <div className="team-avatar-ring team-avatar-ring-2"></div>
                    <div className="team-avatar-ring team-avatar-ring-3"></div>
                    <div className="team-avatar-wrapper">
                        {member.image ? (
                            <Image
                                src={member.image}
                                alt={member.name}
                                className="team-avatar-img"
                                width={120}
                                height={120}
                                loading="lazy"
                                sizes="120px"
                            />
                        ) : (
                            <div className="team-avatar-placeholder">✦</div>
                        )}
                    </div>
                </div>
                <div className="team-info">
                    <h3 className="team-name">{member.name}</h3>
                    <div className="team-role-badge">
                        <span className="team-role-text">{member.role}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Team() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const elements = sectionRef.current?.querySelectorAll('.team-animate');
        if (!elements) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const renderTeamSection = (members: { name: string; role: string; image: string }[], title: string, subtitle: string, delayClass: string, colorClass: string) => (
        <section className={`team-content ${colorClass}`}>
            <div className={`team-content-inner team-animate ${delayClass}`}>
                <div className="team-section-header">
                    <p className="team-label">{subtitle}</p>
                    <h2 className="team-heading">{title}</h2>
                    <div className="team-divider" />
                </div>

                <div className="team-grid">
                    {members.map((member, idx) => (
                        <TeamCard key={idx} member={member} colorClass={colorClass} />
                    ))}
                </div>
            </div>
        </section>
    );

    return (
        <div className="team-page" ref={sectionRef}>
            <div className="team-fixed-bg">
                <CosmicBackground />
            </div>

            <section className="team-hero">
                <div className="team-hero-content team-animate visible">
                    <h1 className="team-hero-title">
                        <span className="title-layer-1">Meet The Team</span>
                        <span className="title-layer-2">Meet The Team</span>
                    </h1>
                    <p className="team-hero-tagline">
                        THE VISIONARIES
                        <span className="tagline-dot">·</span>
                        THE CREATORS
                    </p>
                </div>
                <div className="team-hero-scroll">
                    <div className="team-hero-scroll-line" />
                    <span className="team-hero-scroll-text">Scroll</span>
                </div>
            </section>

            <div className="team-lower-wrapper">
                {renderTeamSection(TEAM.convenors, 'Convenors', 'LEADING THE COSMOS', 'team-animate-delay-1', 'color-pink')}
                {renderTeamSection(TEAM.coConvenors, 'Co-Convenors', 'GUIDING THE STELLAR PATH', 'team-animate-delay-2', 'color-cyan')}
                {renderTeamSection(TEAM.organisingSecretaries, 'Organising Secretaries', 'ORCHESTRATING THE GALAXY', 'team-animate-delay-3', 'color-purple')}
            </div>
        </div>
    );
}
