import { useNavigate, useParams } from 'react-router-dom';
import { fromSlug } from '../libs/slugger';
import AttachIndicators from '../components/AttachIndicators';
import './styles/View.css';

import map from "../data/db/map.json";

const View = () => {
    const params = useParams();
    const to = useNavigate();
    const config = fromSlug(params.slug);
    const share = () => navigator.clipboard.writeText(`${window.location.origin}/view/${params.slug}`);
    return (
        <div className="View">
            <h1 className="weaponShow">{config.weapon.name}</h1>
            <h2>({map.categories[config.weapon.category_id].name})</h2>
            <AttachIndicators attachmentsCount={config.attachments.length} />
            {config.attachments.map((a, i) => (
                <div className="attachmentRow" key={a.id}>
                    <h2>
                        {a.name} ({map.attachmentCategories[a.category_id].name})
                    </h2>
                    {config.tuning?.[i] && (
                        <div>
                            {Boolean(config.tuning?.[i][0]) && <h2 className="tuningVal">↕️ {config.tuning?.[i][0]}</h2>}
                            {Boolean(config.tuning?.[i][1]) && <h2 className="tuningVal">↔️ {config.tuning?.[i][1]}</h2>}
                        </div>
                    )}
                </div>
            ))}
            <div className="actionButtons">
                <button onClick={() => to(`/edit/${params.slug}`)}>✏️</button>
                <button onClick={() => to(`/`)}>➕</button>
                <button onClick={share}>🔗</button>
            </div>
        </div>
    );
};

export default View;