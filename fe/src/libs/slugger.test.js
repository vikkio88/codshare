import { slugger, fromSlug } from "./slugger";

import map from "../data/db/map.json";

describe("Slugger", () => {
    it("returns empty string if there is no weapon", () => {
        const config = { weapon: null };
        expect(slugger(config)).toBe('');
    });

    it("returns a slug if weapons is set", () => {
        const config = { weapon: map.weapons.m4 };
        const slug = slugger(config);
        expect(slug).toBe('m4');
    });

    it("returns a slug if weapons and attachment are set", () => {
        const config = { weapon: map.weapons.m4, attachments: [{ id: map.weapons.m4.attachments[0] }] };
        const slug = slugger(config);
        expect(slug).not.toBe('');
        expect(slug).toBe('m4.csg257');
    });
});

describe("fromSlug", () => {

});