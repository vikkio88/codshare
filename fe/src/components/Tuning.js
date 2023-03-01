import { useEffect, useState } from "react";
import { isTuningEmpty } from "../libs/validators";
import "./styles/Tuning.css";

const Tuning = ({ tuning = null, number, onTune }) => {
    const [thisTuning, setThisTuning] = useState([undefined, undefined]);
    const [showTuning, setShowTuning] = useState(!isTuningEmpty(thisTuning));
    useEffect(() => {
        const newCurrentTuning = tuning?.[number] ?? [undefined, undefined];
        setThisTuning(newCurrentTuning);
    }, [tuning, number]);

    return (
        <div className="tuningSwitch">
            <button onClick={() => setShowTuning(!showTuning)}>🔧</button>
            {showTuning && (
                <div className="tuning">
                    <input type="number" placeholder="↕" size={6} value={thisTuning[0]} onChange={e => {
                        const { value } = e.target;
                        onTune({ index: number, subIndex: 0, value });
                    }} />
                    <input type="number" placeholder="↔" size={6} value={thisTuning[1]} onChange={e => {
                        const { value } = e.target;
                        onTune({ index: number, subIndex: 1, value });
                    }} />
                </div>
            )
            }
        </div>
    );
};

export default Tuning;