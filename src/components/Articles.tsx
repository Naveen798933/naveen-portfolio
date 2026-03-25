import { useState, useEffect } from "react";
import { FiBookOpen, FiArrowRight } from "react-icons/fi";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Articles.css";

interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string | null;
  published_at: string;
  reading_time_minutes: number;
  tag_list: string[];
}

const fallbackArticles: Article[] = [
  {
    id: 1,
    title: "Mastering React 18 and Concurrent Rendering",
    description: "A deep dive into how Concurrent Rendering fundamentally changes how we build React applications for the better.",
    url: "#",
    cover_image: "/images/Solidx.png",
    published_at: "2025-01-15T12:00:00Z",
    reading_time_minutes: 5,
    tag_list: ["React", "JavaScript", "Frontend"]
  },
  {
    id: 2,
    title: "Integrating WebGL & Three.js for Mind-Blowing Portfolios",
    description: "Step-by-step guide to merging 3D graphics into a standard DOM hierarchy without sacrificing performance or SEO.",
    url: "#",
    cover_image: "/images/radix.png",
    published_at: "2024-11-20T12:00:00Z",
    reading_time_minutes: 8,
    tag_list: ["Three.js", "WebGL", "Portfolio"]
  },
  {
    id: 3,
    title: "The Future of AI in Web Development",
    description: "How generative AI and machine learning are shifting the paradigm of what it means to be a modern day Full Stack Developer.",
    url: "#",
    cover_image: "/images/bond.png",
    published_at: "2024-09-05T12:00:00Z",
    reading_time_minutes: 6,
    tag_list: ["AI", "MachineLearning", "WebDev"]
  }
];

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("https://dev.to/api/articles?username=naveenkota&per_page=3");
        if (res.ok) {
          const data = await res.json();
          setArticles(data.length > 0 ? data : fallbackArticles);
        } else {
          setArticles(fallbackArticles);
        }
      } catch {
        setArticles(fallbackArticles);
      } finally {
        setLoading(false);
        setTimeout(() => ScrollTrigger.refresh(), 100);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="articles-section section-container" id="articles">
      <h2>Latest <span>Articles</span></h2>
      <p className="section-subtitle">Writing about modern web dev, AI, and creative engineering.</p>

      {loading ? (
        <div className="articles-loading">Loading thoughts...</div>
      ) : (
        <div className="articles-grid">
          {articles.map((article) => (
            <a href={article.url} target="_blank" rel="noreferrer" className="article-card" key={article.id}>
              <div className="article-image">
                {article.cover_image ? (
                  <img src={article.cover_image} alt={article.title} />
                ) : (
                  <div className="article-image-placeholder">
                    <FiBookOpen size={48} />
                  </div>
                )}
              </div>
              <div className="article-content">
                <div className="article-meta">
                  <span>{new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span>•</span>
                  <span>{article.reading_time_minutes} min read</span>
                </div>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <div className="article-tags">
                  {article.tag_list.slice(0, 3).map((tag, i) => (
                    <span key={i} className="article-tag">#{tag}</span>
                  ))}
                </div>
                <div className="article-read-more">
                  Read Article <FiArrowRight />
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Articles;
