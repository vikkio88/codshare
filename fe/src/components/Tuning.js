import { useEffect, useState } from "react";
import { isTuningEmpty } from "../libs/validators";
import "./styles/Tuning.css";

const Tuning = ({ tuning = {}, number, onTune }) => {
    const [thisTuning, setThisTuning] = useState({ values: [undefined, undefined], show: false });
    useEffect(() => {
        const newCurrentTuning = tuning?.[number] ?? [undefined, undefined];
        setThisTuning({ values: newCurrentTuning, show: !isTuningEmpty(newCurrentTuning) });
    }, [tuning, number]);

    return (
        <div className="tuningSwitch">
            <button onClick={() => setThisTuning({ ...thisTuning, show: !thisTuning.show })}>🔧</button>
            {thisTuning.show && (
                <div className="tuning">
                    <input type="number" placeholder="↕" size={3} value={thisTuning.values[0]} onChange={e => {
                        const { value } = e.target;
                        onTune({ index: number, subIndex: 0, value });
                    }} />
                    <input type="number" placeholder="↔" size={3} value={thisTuning.values[1]} onChange={e => {
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