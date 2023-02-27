import { MAX_ATTACHMENTS } from "../config";
import map from "../data/db/map.json";

export const validateLoadout = ({ weapon, attachments }) => {
    if (!Boolean(weapon) || !Object.keys(map.weapons).includes(weapon.id)) {
        return { weapon: null, attachments: [] };
    }
    const filteredAttachments = attachments.filter(a => weapon.attachments.includes(a.id)).slice(0, MAX_ATTACHMENTS);
    const correctAttachments = [];
    const categories = new Map();
    for (const attachment of filteredAttachments) {
        if (categories.has(attachment.category_id)) {
            continue;
        }

        correctAttachments.push(attachment);
        categories.set(attachment.category_id, true);
    }


    return { weapon: weapon, attachments: correctAttachments };
};