import { useNavigate, useParams } from 'react-router-dom';
import { fromSlug } from '../libs/slugger';
import AttachIndicators from '../components/AttachIndicators';
import './styles/View.css';

const View = () => {
    const params = useParams();
    const to = useNavigate();
    const config = fromSlug(params.slug);
    const share = () => navigator.clipboard.writeText(`${window.location.origin}/view/${params.slug}`);
    return (
        <>
            <h1 className="weaponShow">{config.weapon.name}</h1>
            <AttachIndicators attachmentsCount={config.attachments.length} />
            {config.attachments.map((a, i) => (
                <div className="attachmentRow" key={a.id}>
                    <h2>
                        {a.name}
                    </h2>
                </div>
            ))}
            <div className="actionButtons">
                <button onClick={() => to(`/edit/${params.slug}`)}>✏️</button>
                <button onClick={() => to(`/`)}>➕</button>
                <button onClick={share}>🔗</button>
            </div>
        </>
    );
};

export default View;