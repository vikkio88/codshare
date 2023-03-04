import { useNavigate } from "react-router-dom";
import T from "../components/T";

import './styles/Main.css';

const Main = () => {
    const to = useNavigate();
    return (
        <div className="Main page">
            <h1>CoDShare</h1>
            <h2>Share your CoD MW2 weapon Setup</h2>
            <div className="actionButtons">
                <T title="Create new Loadout">
                    <button onClick={() => to(`/create`)}>➕</button>
                </T>
            </div>
            <div className="footer">
                made with ♥ by <a href="https://github.com/vikkio88/codshare" target="_blank" rel="noreferrer">vikkio</a>
            </div>
        </div>
    );
};

export default Main;