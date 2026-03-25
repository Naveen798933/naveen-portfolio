import { portfolioData } from "../data/portfolioData";
import "./styles/Stats.css";
import { useEffect, useState, useRef } from "react";

const Stats = () => {
    const stats = portfolioData.stats;

    return (
        <div className="stats-section section-container">
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <StatItem key={index} stat={stat} />
                ))}
            </div>
        </div>
    );
};

const StatItem = ({ stat }: { stat: { label: string; value: number; suffix: string } }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                let start = 0;
                const end = stat.value;
                const duration = 2000;
                const increment = end / (duration / 16);

                const timer = setInterval(() => {
                    start += increment;
                    if (start >= end) {
                        setCount(end);
                        clearInterval(timer);
                    } else {
                        setCount(Math.floor(start));
                    }
                }, 16);
            }
        });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [stat.value]);

    return (
        <div className="stat-item" ref={ref}>
            <h2 className="stat-value">{count}{stat.suffix}</h2>
            <p className="stat-label">{stat.label}</p>
        </div>
    );
};

export default Stats;
