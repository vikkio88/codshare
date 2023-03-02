import { slugger, fromSlug } from "./slugger";
import map from "../data/db/map.json";
import m4loadout from "./__fixtures__/m4loadout.json";

const m4loadoutSlug = 'm4-vkfh146-1cs25-fovl262-drs151-r833';


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
        expect(slug).toBe('m4-csg257');
    });

    it("returns a slug from a complex loadout", () => {
        expect(slugger(m4loadout)).toBe(m4loadoutSlug);
    });

    it.each(
        [
            [{ tuning: { 0: [undefined, 0.2], }, attachments: [{ ...{ ...map.attachments[map.weapons.m4.attachments[0]] } }], weapon: { ...map.weapons.m4 } }, 'm4-csg257_:0.2'],
            [{ tuning: { 0: [1, 0.2], }, attachments: [{ ...{ ...map.attachments[map.weapons.m4.attachments[0]] } }], weapon: { ...map.weapons.m4 } }, 'm4-csg257_1:0.2'],
            [{ tuning: { 0: [1, undefined], }, attachments: [{ ...{ ...map.attachments[map.weapons.m4.attachments[0]] } }], weapon: { ...map.weapons.m4 } }, 'm4-csg257_1:'],
            [{
                tuning: { 1: [0.2, undefined], }, attachments: [
                    { ...{ ...map.attachments[map.weapons.m4.attachments[0]] } },
                    // r833 id is 97c547d7a7ef5e43
                    { ...map.attachments["97c547d7a7ef5e43"] }
                ], weapon: { ...map.weapons.m4 }
            }, 'm4-csg257-r833_0.2:'],
        ]
    )("returns a slug if tuning is added", (config, expected) => {
        expect(slugger(config)).toEqual(expected);
    });
});

describe("fromSlug", () => {
    it("returns a config if the slug is set correctly", () => {
        const slug = 'm4';
        const result = fromSlug(slug);

        expect(result).toEqual({ weapon: map.weapons.m4, attachments: [], tuning: {} });
    });

    it("returns a config with attachment if the slug is set correctly", () => {
        const slug = 'm4-csg257';
        const result = fromSlug(slug);

        expect(result).toEqual({ weapon: map.weapons.m4, attachments: [{ ...map.attachments[map.weapons.m4.attachments[0]] }], tuning: {} });
    });

    it.each(['m4-csg257', 'm4-csg257-', 'm4-csg257-cs33357'])("returns a config with attachment if the slug is set correctly with some edgecases", (slug) => {
        const result = fromSlug(slug);

        expect(result).toEqual({ weapon: map.weapons.m4, attachments: [{ ...map.attachments[map.weapons.m4.attachments[0]] }], tuning: {} });
    });


    it('returns a complex loadout from a complex slug', () => {
        expect(fromSlug(m4loadoutSlug)).toEqual(m4loadout);
    });

    it('returns a loadout if tuning is added', () => {
        const slug = 'm4-csg257_1.0:0.2';
        const result = fromSlug(slug);
        expect(result).toEqual({ weapon: map.weapons.m4, attachments: [{ ...map.attachments[map.weapons.m4.attachments[0]] }], tuning: { 0: [1.0, 0.2] } });
    });

    it.each(
        [
            ['m4-csg257_:0.2-r833_1.5', { 0: [undefined, 0.2], 1: [1.5, undefined] }],
            ['m4-csg257_:0.2-r833_1.5:', { 0: [undefined, 0.2], 1: [1.5, undefined] }],
            ['m4-csg257_:0.2-r833_:1.5:-', { 0: [undefined, 0.2], 1: [undefined, 1.5] }],
        ]
    )('returns a loadout if complex tuning is added', (slug, expectedTuning) => {
        const result = fromSlug(slug);

        expect(result).toEqual({
            weapon: map.weapons.m4,
            attachments: [
                { ...map.attachments[map.weapons.m4.attachments[0]] },
                // r833 id is 97c547d7a7ef5e43
                { ...map.attachments["97c547d7a7ef5e43"] }
            ],
            tuning: { ...expectedTuning }
        });
    });
});