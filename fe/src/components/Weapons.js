import Select from 'react-select';
import list from "../data/db/list.json";


function Weapons({ onSelect, config }) {
    const options = list.weapons.map(w => ({ value: w, label: w.name }));
    return (
        <Select
            defaultValue={config?.weapon}
            onChange={onSelect}
            options={options}
        />
    );
}

export default Weapons;