import { useTheme } from "../context/ThemeContext";
import "./styles/ThemeSwitcher.css";
import { FiMonitor, FiSun, FiMoon, FiCpu, FiCoffee } from "react-icons/fi";

const ThemeSwitcher = () => {
    const { theme, cycleTheme } = useTheme();

    const getIcon = () => {
        switch (theme) {
            case "light": return <FiSun />;
            case "dark": return <FiMoon />;
            case "cyberpunk": return <FiCpu />;
            case "matrix": return <FiMonitor />;
            case "zen": return <FiCoffee />;
            default: return <FiMoon />;
        }
    };

    const getLabel = () => {
        return theme.charAt(0).toUpperCase() + theme.slice(1);
    };

    return (
        <button 
            className={`theme-switcher-btn theme-${theme}`} 
            onClick={cycleTheme}
            aria-label="Toggle Theme"
        >
            <span className="theme-icon">{getIcon()}</span>
            <span className="theme-label">{getLabel()}</span>
        </button>
    );
};

export default ThemeSwitcher;
