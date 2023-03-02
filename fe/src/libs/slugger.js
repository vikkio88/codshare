import { MAX_ATTACHMENTS, SLUG_SEPARATORS, MAX_TUNING } from "../config";
import attachmentsMap from "../data/db/attachmentsIdMap.json";
import map from "../data/db/map.json";

const directMap = attachmentsMap.direct;
const reversedMap = attachmentsMap.reversed;

const slugTuning = tuning => {
    if (!Boolean(tuning) || tuning.length < 2) return '';

    const tuningStrings = tuning.map(t => t === undefined ? '' : `${t}`);

    return `${SLUG_SEPARATORS.TUNING}${tuningStrings[0]}${SLUG_SEPARATORS.SUB_TUNING}${tuningStrings[1]}`;
};

export const slugger = ({ weapon, attachments = [], tuning = {} }) => {
    if (!Boolean(weapon)) return '';
    const attachmentString = attachments.map((a, i) => `${reversedMap[a.id]}${slugTuning(tuning[i])}`).join(SLUG_SEPARATORS.CONFIG) || null;
    return `${weapon.id}${attachmentString ? `${SLUG_SEPARATORS.CONFIG}${attachmentString}` : ''}`;
};


const parseTuning = tuningSlug => {
    const parts = tuningSlug.split(SLUG_SEPARATORS.SUB_TUNING);
    const tuning = parts.map(p => {
        const value = parseFloat(p);
        return isNaN(value) ? undefined : value;
    });

    if (tuning.length < 2) tuning.push(undefined);


    return tuning.slice(0, MAX_TUNING);
};

export const fromSlug = slug => {
    const parts = slug.split(SLUG_SEPARATORS.CONFIG);
    let [weaponCode, ...attachmentsConfigs] = parts;
    // parse tuning
    attachmentsConfigs = attachmentsConfigs.filter(a => String.toString(a).length > 0).slice(0, MAX_ATTACHMENTS);
    const rawIds = [];
    const tuning = {};
    for (const index in attachmentsConfigs) {
        const aConf = attachmentsConfigs[index];
        const parts = aConf.split(SLUG_SEPARATORS.TUNING);
        if (parts.length < 1) continue;
        rawIds.push(parts[0]);

        if (parts.length < 2) continue;
        tuning[index] = parseTuning(parts[1]);
    }
    const weapon = map.weapons[weaponCode];
    let attachmentsIds = rawIds.map(a => directMap[a]).filter(Boolean).filter(a => weapon.attachments.includes(a));
    const attachments = attachmentsIds.map(a => map.attachments[a]);
    return { weapon, attachments, tuning };
};