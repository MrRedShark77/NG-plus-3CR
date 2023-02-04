const QU_SPEEDRUN = [
    [
        '12 Hours',
        60*60*12,
        'You start with 25,000 eternities, and you can bulk EC completions (WIP).',
    ],[
        '9 Hours',
        60*60*9,
        'Unlock the Time Theorem autobuyer.',
    ],[
        '6 Hours',
        60*60*8,
        'Start with EC1-12 completed and pre-dilation Eternity Upgrades bought.',
    ],[
        '4.5 Hours',
        60*60*4.5,
        'Start with Time Dilation and all eternity upgrades unlocked.',
    ],[
        '3 Hours',
        60*60*3,
        'Start with all dilation studies & non-rebuyable dilation upgrades before Meta-Dimensions unlocked, except for TT generation.',
        '10px',
    ],[
        '2 Hours',
        60*60*2,
        'Start with all eternity challenges completed.',
    ],[
        '1 Hour',
        60*60,
        'Unlock 1st Meta-Dimension autobuyer and rebuyable dilation upgrades autobuyer.',
    ],[
        '53.3 Minutes',
        60*(50+10/3),
        'Unlock 2nd Meta-Dimension autobuyer.',
    ],[
        '46.7 Minutes',
        60*(50-10/3),
        'Unlock 3rd Meta-Dimension autobuyer.',
    ],[
        '40 Minutes',
        60*40,
        'Unlock 4th Meta-Dimension autobuyer.',
    ],[
        '33.3 Minutes',
        60*(30+10/3),
        'Unlock 5th Meta-Dimension autobuyer, and keep all time studies Tier I.',
    ],[
        '26.7 Minutes',
        60*(30-10/3),
        'Unlock 6th Meta-Dimension autobuyer.',
    ],[
        '20 Minutes',
        60*20,
        'Unlock 7th Meta-Dimension autobuyer.',
    ],[
        '13.3 Minutes',
        60*(10+10/3),
        'Unlock 8th Meta-Dimension autobuyer, and keep all non-rebuyable dilation upgrades.',
    ],[
        '6.67 Minutes',
        60*(10-10/3),
        'Unlock the Meta-Dimension boost autobuyer.',
    ],[
        '5 Minutes',
        60*5,
        'You keep all time studies Tier II.',
    ],[
        '4 Minutes',
        60*4,
        'Start with 4 meta-dimension boosts.',
    ],[
        '3.5 Minutes',
        60*3.5,
        'Start with 2e25 meta-antimatter on reset.',
    ],[
        '3 Minutes',
        60*3,
        'You can turn on automatic replicated galaxies regardless of the second Time Study split path.',
    ],[
        '2 Minutes',
        60*2,
        'Start with 1e100 dilated time. Dilation Upgrades no longer spent dilated time.',
    ],[
        '1 Minute',
        60,
        'Unlock the Quantum autobuyer.',
    ],[
        '30 Seconds',
        30,
        'Keep replicanti on Eternity.',
    ],[
        '15 Seconds',
        15,
        'Keep replicated galaxies on Infinity.',
    ],[
        '5 Seconds',
        5,
        'You gain banked infinities based on your post-crunch infinitied stat.',
    ],
]

function updateQUSpeedrunHTML() {
    for (let i = 0; i < QU_SPEEDRUN.length; i++) {
        el('qu_reward'+i).className = player.quantum.speedruns > i ? 'qumilestonereward' : 'milestonerewardlocked'
    }
}

function setupQUSpeedrunHTML() {
    let sm = el('sm_table')
    let h = ''

    for (let i = 0; i < Math.floor((QU_SPEEDRUN.length-1)/4)+1; i++) {
        let l = Math.min(4,QU_SPEEDRUN.length-4*i), p = '', q = ''

        for (let j = 0; j < l; j++) {
            let qs = QU_SPEEDRUN[4*i+j]

            p += `
            <td class="milestoneText">${qs[0]}:</td>
            `
            q += `
            <td><button class="milestonerewardlocked" style="font-size: ${qs[3]||'12px'}" id="qu_reward${4*i+j}">${qs[2]}</button></td>
            `
        }

        h += `<tr>${p}</tr><tr>${q}</tr>`
    }

    sm.innerHTML = h
}