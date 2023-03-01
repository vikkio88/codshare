import { MAX_ATTACHMENTS } from "../config";
import Attachment from "./Attachment";
import AttachIndicators from "./AttachIndicators";
import "./styles/Attachments.css";
import { mergeTuning } from "../libs/validators";


const Attachments = ({ config, appendConfig }) => {
    const { attachments, weapon } = config;

    if (!Boolean(weapon)) return <></>;

    const selects = [...Array(Math.min(attachments.length + 1, MAX_ATTACHMENTS)).keys()];
    return (
        <>
            <AttachIndicators attachmentsCount={config.attachments.length} />
            <div className="attachmentList">
                {selects.map(i => {
                    return (
                        <div key={`attach_${i}`}>
                            <Attachment
                                number={i}
                                onSelect={({ value: attachment }) => {
                                    const newAttachments = [...attachments];
                                    newAttachments[i] = attachment;
                                    appendConfig({ attachments: newAttachments });
                                }}
                                onRemove={attachment => {
                                    const newAttachments = attachments.filter(a => a.id !== attachment.id);
                                    // TODO: maybe link attachments and change their index instead of removing the tuning
                                    appendConfig({ attachments: newAttachments, tuning: {} });
                                }}
                                onTune={({ index, subIndex, value }) => {
                                    const newTuning = mergeTuning({ tuning: { ...config.tuning }, index, subIndex, value });
                                    appendConfig({ tuning: newTuning });
                                }}
                                config={config}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};


export default Attachments;