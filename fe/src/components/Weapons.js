import Select from 'react-select';
import list from "../data/db/list.json";

import "./styles/Weapons.css";

const toOption = (weapon) => {
    if (!Boolean(weapon)) return null;

    return { value: weapon, label: weapon.name };
};


function Weapons({ onSelect, onReset, config }) {
    const options = list.weapons.map(w => toOption(w));
    return (
        <div className="weaponSelect">
            <Select
                placeholder="Select Weapon..."
                value={toOption(config?.weapon)}
                onChange={onSelect}
                options={options}
                isSearchable
            />
            {Boolean(config.weapon) && (
                <button onClick={onReset}>🗑️</button>
            )}
        </div>
    );
}

export default Weapons;