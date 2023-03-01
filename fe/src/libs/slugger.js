import { MAX_ATTACHMENTS } from "../config";
import attachmentsMap from "../data/db/attachmentsIdMap.json";
import map from "../data/db/map.json";

const directMap = attachmentsMap.direct;
const reversedMap = attachmentsMap.reversed;

export const slugger = ({ weapon, attachments = [] }) => {
    if (!Boolean(weapon)) return '';
    const attachmentString = attachments.map(a => reversedMap[a.id]).join('.') || null;
    return `${weapon.id}${attachmentString ? `.${attachmentString}` : ''}`;
};

export const fromSlug = slug => {
    const parts = slug.split('.');
    let [weaponCode, ...attachmentsConfigs] = parts;
    // parse tuning
    let attachmentsIds = attachmentsConfigs;
    const weapon = map.weapons[weaponCode];
    attachmentsIds = attachmentsIds.filter(a => String.toString(a).length > 0)
        .map(a => directMap[a]).filter(Boolean).slice(0, MAX_ATTACHMENTS).filter(a => weapon.attachments.includes(a));
    const attachments = attachmentsIds.map(a => map.attachments[a]);
    return { weapon, attachments };
};