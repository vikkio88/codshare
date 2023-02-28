import { MAX_ATTACHMENTS } from "../config";
import Attachment from "./Attachment";
import "./styles/Attachments.css";


const Attachments = ({ config, onSet }) => {
    const { attachments, weapon } = config;
    const selects = [...Array(Math.min(attachments.length + 1, MAX_ATTACHMENTS)).keys()];
    return <div className="attachmentList">
        {selects.map(i => {
            return (
                Boolean(weapon)
                && (
                    <div key={`attach_${i}`}>
                        <Attachment
                            number={i}
                            onSelect={({ value: attachment }) => {
                                const newAttachments = [...attachments];
                                newAttachments[i] = attachment;
                                onSet({ attachments: newAttachments });
                            }}
                            onRemove={attachment => {
                                const newAttachments = attachments.filter(a => a.id !== attachment.id);
                                onSet({ attachments: newAttachments });
                            }}
                            config={config}
                        />
                    </div>
                )
            );
        })}
    </div>;
};


export default Attachments;