import { validateLoadout } from "./validators";
import { fromSlug } from "./slugger";
import { MAX_ATTACHMENTS } from "../config";
import map from "../data/db/map.json";


describe("Validate Loadout", () => {
    it("Returns the same loadout if it is correct", () => {
        const correctM4 = 'm4.csg257.h2b11.spbi395.sm693.dfps14';
        const { weapon, attachments } = fromSlug(correctM4);
        const result = validateLoadout({ weapon, attachments });
        expect(result.weapon).toEqual(weapon);
        expect(result.attachments).toEqual(attachments);
    });

    it("Returns the filtered loadout if it contains duplicated categories", () => {
        //                      csg and dk are on the same category
        const wrongM4 = 'm4.csg257.dk230.spbi395.sm693.dfps14';
        const { weapon, attachments } = fromSlug(wrongM4);
        const result = validateLoadout({ weapon, attachments });
        expect(result.weapon).toEqual(weapon);
        expect(result.attachments.length).toEqual(attachments.length - 1);
    });

    it("Returns the filtered loadout if it contains too many attachments", () => {
        const wrongM4 = 'm4.csg257.h2b11.spbi395.sm693.dfps14.cb849';
        const { weapon, attachments } = fromSlug(wrongM4);
        expect(attachments.length).toEqual(MAX_ATTACHMENTS);
        // from slug already filters it

        // will add manually
        // corebp2 or cv849 is 98794c56963e5558
        attachments.push(map.attachments["97c540099bb0626f"]);
        const result = validateLoadout({ weapon, attachments });
        expect(result.weapon).toEqual(weapon);
        expect(result.attachments.length).toEqual(MAX_ATTACHMENTS);
        expect(result.attachments.length).toEqual(attachments.length - 1);
    });

    it("Returns the filtered loadout if it contains an attachment that does not belong to the weapon", () => {
        //                                             5ap is armor piercing of SMGs
        const wrongM4 = 'm4.csg257.h2b11.spbi395.sm693.5ap459';
        const { weapon, attachments } = fromSlug(wrongM4);
        expect(attachments.length).toEqual(MAX_ATTACHMENTS - 1);
        // from slug already filters it

        // will add manually
        // 5.7x28mm armor piercing or 5ap459 is 97c641828c647f6a
        attachments.push(map.attachments["97c641828c647f6a"]);
        const result = validateLoadout({ weapon, attachments });
        expect(result.weapon).toEqual(weapon);
        expect(result.attachments.length).toEqual(MAX_ATTACHMENTS - 1);
        expect(result.attachments.length).toEqual(attachments.length - 1);
    });

});