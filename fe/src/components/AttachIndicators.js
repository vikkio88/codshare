import { MAX_ATTACHMENTS } from "../config";
import './styles/AttachIndicators.css';

const Empty = () => <div className="attach empty" />;
const Full = () => <div className="attach full" />;

const AttachIndicators = ({ attachmentsCount }) => {
    return (
        <div className="attachIndicators">
            {[...Array(MAX_ATTACHMENTS).keys()].map(i =>  i < attachmentsCount ? <Full key={`ai_${i}f`} /> : <Empty key={`ai_${i}e`} />)}
            <h1>{attachmentsCount}/{MAX_ATTACHMENTS}</h1>
        </div>
    );
};

export default AttachIndicators;