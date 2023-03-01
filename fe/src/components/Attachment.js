import Select from 'react-select';
import map from "../data/db/map.json";

import "./styles/Attachment.css";
import Tuning from './Tuning';

const toOption = attachment => {
    if (!Boolean(attachment)) return null;

    const category = map.attachmentCategories[attachment.category_id].name;
    return { value: attachment, label: `${attachment.name} (${category})` };
};



function Attachment({ number, onSelect, onRemove, onTune, config }) {
    const { weapon, attachments = [] } = config;
    const options = [];
    for (const attachId of weapon?.attachments) {
        const attachment = map.attachments[attachId];
        if (attachments.find(a => a.category_id === attachment.category_id)) continue;
        // might need to add grouping here
        // https://codesandbox.io/s/yn8hzk?module=/example.tsx&file=/docs/data.ts:4628-4686
        options.push(toOption(attachment));
    }

    const isAttachmentSelected = Boolean(attachments?.[number]);
    return (
        <>
            <Select
                placeholder="Add Attachment..."
                onChange={onSelect}
                options={options}
                value={toOption(attachments?.[number])}
                isSearchable
            />
            <div className="buttons">
                {isAttachmentSelected && <Tuning config={config.tuning} number={number} onTune={onTune} />}
                <button
                    onClick={() => onRemove(attachments?.[number])}
                    disabled={!isAttachmentSelected}
                >
                    🗑️
                </button>
            </div>
        </>
    );
}



export default Attachment;