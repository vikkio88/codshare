import { MAX_ATTACHMENTS } from "../config";
import Attachment from "./Attachment";


const Attachments = ({ weapon = null, attachments = [], onSet }) => {
    const selects = [...Array(Math.min(attachments.length + 1, MAX_ATTACHMENTS)).keys()];
    return selects.map(i => {
        return (
            Boolean(weapon)
            && (
                <Attachment
                    key={`attach_${i}`}
                    number={i}
                    /** NEED TO REMOVE THE OLD ATTACHMENT FIRST */
                    onSelect={({ value: attachment }) => onSet({ attachments: [...attachments, attachment] })}
                    weapon={weapon}
                    attachments={attachments}
                />
            )
        );

    });
};

export default Attachments;