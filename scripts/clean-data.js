#!/usr/bin/env zx

async function removeData() {
    await $`rm -rf data`
    await $`mkdir data`
    await $`rm -rf fe/src/data`
    await $`mkdir fe/src/data`
}

removeData();