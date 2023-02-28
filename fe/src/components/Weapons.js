import Select from 'react-select';
import list from "../data/db/list.json";

const toOption = (weapon) => {
    if (!Boolean(weapon)) return null;

    return { value: weapon, label: weapon.name };
};


function Weapons({ onSelect, config }) {
    const options = list.weapons.map(w => toOption(w));
    return (
        <Select
            placeholder="Select Weapon..."
            value={toOption(config?.weapon)}
            onChange={onSelect}
            options={options}
            isSearchable
        />
    );
}

export default Weapons;