import { useState } from "react";
import "./styles/Tuning.css";

const Tuning = ({ tuning = null }) => {
    const [showTuning, setShowTuning] = useState(Boolean(tuning));

    return (
        <div className="tuningSwitch">
            <button onClick={() => setShowTuning(!showTuning)}>🔧</button>
            {showTuning && (
                <div className="tuning">    
                    <input type="number" placeholder="↕" size={6} />
                    <input type="number" placeholder="↔" size={6} />
                </div>
            )
            }
        </div>
    );
};

export default Tuning;