import Select from 'react-select';
import map from "../data/db/map.json";



function Attachment({ number, onSelect, weapon, attachments = [] }) {
    const options = [];
    for (const attachId of weapon?.attachments) {
        const attachment = map.attachments[attachId];
        const category = map.attachmentCategories[attachment.category_id].name;
        if (attachments.find(a => a.category_id === attachment.category_id)) continue;
        // might need to add grouping here
        // https://codesandbox.io/s/yn8hzk?module=/example.tsx&file=/docs/data.ts:4628-4686
        options.push({ value: attachment, label: `${attachment.name} (${category})` });
    }

    // might want to add tuning here
    return (
        <Select
            defaultValue={attachments?.[number]}
            onChange={onSelect}
            options={options}
        />
    );
}



export default Attachment;