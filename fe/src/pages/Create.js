import { useEffect, useState } from "react";
import Weapons from "../components/Weapons";
import Attachments from "../components/Attachments";
import { fromSlug, slugger } from "../libs/slugger";

import './styles/Create.css';
import { useNavigate, useParams } from "react-router-dom";

const initialConfig = { weapon: null, attachments: [], tuning: {} };

const Create = () => {
    const params = useParams();
    const to = useNavigate();
    const [config, setConfig] = useState({ ...initialConfig });

    useEffect(() => {
        const initial = params?.slug ? { ...fromSlug(params.slug) } : { ...initialConfig };
        setConfig(initial);
    }, [params]);
    const appendConfig = udpates => {
        const newConfig = { ...config, ...udpates };
        setConfig({ ...newConfig });
    };
    return (
        <>
            <Weapons
                onSelect={({ value: weapon }) => appendConfig({ weapon, attachments: [], tuning: {} })}
                onReset={() => setConfig({ ...initialConfig })}
                config={config}
            />
            <Attachments
                config={config}
                appendConfig={appendConfig}
            />

            <div className="actionButtons">
                <button disabled={!Boolean(config.weapon)} onClick={() => to(`/view/${slugger(config)}`)}>💾</button>
            </div>
        </>
    );
};

export default Create;