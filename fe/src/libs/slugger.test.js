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
    it("returns a config if the slug is set correctly", () => {
        const slug = 'm4';
        const result = fromSlug(slug);

        expect(result).toEqual({ weapon: map.weapons.m4, attachments: [] });
    });

    it("returns a config with attachment if the slug is set correctly", () => {
        const slug = 'm4.csg257';
        const result = fromSlug(slug);

        expect(result).toEqual({ weapon: map.weapons.m4, attachments: [{ ...map.attachments[map.weapons.m4.attachments[0]] }] });
    });

    it.each(['m4.csg257', 'm4.csg257.', 'm4.csg257.cs33357'])("returns a config with attachment if the slug is set correctly with some edgecases", (slug) => {
        const result = fromSlug(slug);

        expect(result).toEqual({ weapon: map.weapons.m4, attachments: [{ ...map.attachments[map.weapons.m4.attachments[0]] }] });
    });

});