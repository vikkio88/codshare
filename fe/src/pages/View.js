import { useNavigate, useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { fromSlug } from '../libs/slugger';
import AttachIndicators from '../components/AttachIndicators';
import './styles/View.css';

import map from "../data/db/map.json";
import { useState } from 'react';
import T from '../components/T';

const View = () => {
    const params = useParams();
    const to = useNavigate();
    const [showSharing, setShowSharing] = useState(false);
    const config = fromSlug(params.slug);
    const sharingUrl = `${window.location.origin}/view/${params.slug}`;
    const category = map.categories[config.weapon.category_id].name;
    const categoryString = category.substring(0, category.length - 1);
    return (
        <div className="View">
            <div className="weaponCategory">
                <h2>{categoryString}</h2>
            </div>
            <h1 className="weaponName">{config.weapon.name}</h1>
            <AttachIndicators attachmentsCount={config.attachments.length} />
            {config.attachments.map((a, i) => (
                <div className="attachmentRow" key={a.id}>
                    <h2>
                        {a.name} ({map.attachmentCategories[a.category_id].name})
                    </h2>
                    {config.tuning?.[i] && (
                        <div className="tuningVals">
                            {Boolean(config.tuning?.[i][0]) && <h2 className="tuningVal">↕️ {config.tuning?.[i][0]}</h2>}
                            {Boolean(config.tuning?.[i][1]) && <h2 className="tuningVal">↔️ {config.tuning?.[i][1]}</h2>}
                        </div>
                    )}
                </div>
            ))}
            <div className="actionButtons">
                <T title="Edit">
                    <button onClick={() => to(`/edit/${params.slug}`)}>✏️</button>
                </T>
                <T title="Create New">
                    <button onClick={() => to(`/create`)}>➕</button>
                </T>
                <T title="Share">
                    <button onClick={() => setShowSharing(!showSharing)}>🔗</button>
                </T>
            </div>

            {showSharing && (
                <div className="sharing">
                    <QRCodeSVG className="qr" value={sharingUrl} />
                    <input value={sharingUrl} onClick={e => e.target.select()} onChange={() => { }} />
                </div>
            )}
        </div>
    );
};

export default View;