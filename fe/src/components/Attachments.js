import { MAX_ATTACHMENTS } from "../config";
import Attachment from "./Attachment";
import "./styles/Attachments.css";


const Attachments = ({ weapon = null, attachments = [], onSet }) => {
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
                            weapon={weapon}
                            attachments={attachments}
                        />
                        <button onClick={() => {
                            // this needs to remove the specific attachment
                            const newAttachments = [...attachments];
                            newAttachments.splice(i, 1);
                            onSet({ attachments: newAttachments });
                        }}>x</button>
                    </div>
                )
            );
        })}
    </div>;
};


export default Attachments;