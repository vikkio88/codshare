#!/usr/bin/env zx
import fs from 'fs';

const URL = 'https://github.com/tzurbaev/codarmory.com/archive/refs/heads/main.zip';

async function generateAttachmentIdMap() {
    const list = JSON.parse(fs.readFileSync("data/db/list.json"));
    const data = list.attachments;
    const attachmentMap = new Map;
    const reversedMap = new Map;

    for (const attachment of data) {
        const parts = attachment.slug.split('-');
        const joined = `${parts.map(p => p.substring(0, 1)).join('')}${attachmentMap.size}`;
        if (attachmentMap.has(joined)) {
            console.log({ joined, new: attachment, existing: attachmentMap.get(joined), done: attachmentMap.size });
            process.exit(1);
        }

        attachmentMap.set(joined, attachment.id);
        reversedMap.set(attachment.id, joined);
    }

    const direct = Object.fromEntries(attachmentMap);
    const reversed = Object.fromEntries(reversedMap);
    
    fs.writeFileSync("data/db/attachmentsIdMap.json", JSON.stringify({direct, reversed}, null, 2));
};

async function downloadData() {
    await $`wget ${URL}`;
    await $`mv main.zip data/`;
    await $`unzip data/main.zip -d data/temp`;
    await $`rm data/main.zip`;
    await $`mv data/temp/c*/src/database/* data/`;
    await $`rm -rf data/temp`;
    await $`rm data/*.ts`;
}

function indexed(objects) {
    const map = {};
    for (let obj of objects) {
        map[obj["id"]] = obj;
    }

    return map;
}

async function mergeData() {
    const weapons = JSON.parse(fs.readFileSync(`data/weapons.json`));
    const categories = JSON.parse(fs.readFileSync(`data/categories.json`));
    const attachments = JSON.parse(fs.readFileSync(`data/attachments.json`));
    const attachmentCategories = JSON.parse(fs.readFileSync(`data/attachment-categories.json`));
    const attachmentStats = JSON.parse(fs.readFileSync(`data/attachment-stats.json`));

    const list = { weapons, categories, attachments, attachmentCategories, attachmentStats };
    const map = { weapons: indexed(weapons), categories: indexed(categories), attachments: indexed(attachments), attachmentCategories: indexed(attachmentCategories), attachmentStats: indexed(attachmentStats) };

    await $`mkdir data/db`;
    fs.writeFileSync("data/db/list.json", JSON.stringify(list));
    fs.writeFileSync("data/db/map.json", JSON.stringify(map));
    fs.writeFileSync("data/db/cl.json", JSON.stringify({ generated: (new Date()).toJSON().slice(0, 16).replace('T', '_').replace(':', '-'), weapons: Object.keys(map.weapons).length, attachments: Object.keys(map.attachments).length }));
    await $`rm data/*.json`;

}

async function moveToFE() {
    await $`cp -r data/db fe/src/data`;
}

async function main() {
    await downloadData();
    await mergeData();
    await generateAttachmentIdMap();
    await moveToFE();
}



main();