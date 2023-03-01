import { slugger, fromSlug } from "./slugger";
import map from "../data/db/map.json";
import m4loadout from "./__fixtures__/m4loadout.json";

const m4loadoutSlug = 'm4.vkfh146.1cs25.fovl262.drs151.r833';


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

    it("returns a slug from a complex loadout", () => {
        expect(slugger(m4loadout)).toBe(m4loadoutSlug);
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


    it('returns a complex loadout from a complex slug', () => {
        expect(fromSlug(m4loadoutSlug)).toEqual(m4loadout);
    });

});