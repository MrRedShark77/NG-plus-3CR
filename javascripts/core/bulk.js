/*
function test(x) {
    return Math.ceil(x**x**2*(x+1)**(x-1)+4)
}
*/

const BULK_FUNCS = { // x is MAIN
    td: (x,param) => timeDimCost(param[0],x+param[1]),
    rdu: (x,param) => getRDUCost(param[0],x+param[1]),
}

function bulkNumberFromFunction(def,y,o=0) {
    let i = .5, c = 0, s = 0

    while (y >= def(i*2-o)) i *= 2
    while (i >= 1) {
        c = s + i
        if (y >= def(c-o)) s += i
        i/=2
    }

    return s+1
}

function bulkNumberFromDecimalFunction(def,y,o=0) {
    let i = .5, c = 0, s = 0

    while (Decimal.gte(y,def(i*2-o))) i *= 2
    while (i >= 1) {
        c = s + i
        if (Decimal.gte(y,def(c-o))) s += i
        i/=2
    }

    return s+1
}

function bulkNumberFromFunctionWithObject(def,y,key,o=0) {
    let i = .5, c = 0, s = 0

    while (y >= def(i*2-o)[key]) i *= 2
    while (i >= 1) {
        c = s + i
        if (y >= def(c-o)[key]) s += i
        i/=2
    }

    return s+1
}

function bulkNumberFromDecimalFunctionWithObject(def,y,key,o=0) {
    let i = .5, c = 0, s = 0

    while (Decimal.gte(y,def(i*2-o)[key])) i *= 2
    while (i >= 1) {
        c = s + i
        if (Decimal.gte(y,def(c-o)[key])) s += i
        i/=2
    }

    return s+1
}

function bulkNumberFromFunctionWithName(id,y,param,o=0) {
    let i = .5, c = 0, s = 0

    let bf = BULK_FUNCS[id]

    while (y >= bf(i*2-o,param)) i *= 2
    while (i >= 1) {
        c = s + i
        if (y >= bf(c-o,param)) s += i
        i/=2
    }

    return s+1
}

function bulkNumberFromDecimalFunctionWithName(id,y,param,o=0) {
    let i = .5, c = 0, s = 0

    let bf = BULK_FUNCS[id]

    while (Decimal.gte(y,bf(i*2-o,param))) i *= 2
    while (i >= 1) {
        c = s + i
        if (Decimal.gte(y,bf(c-o,param))) s += i
        i/=2
    }

    return s+1
}