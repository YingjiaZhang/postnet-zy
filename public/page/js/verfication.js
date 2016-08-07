/**
 * Created by Sunshine on 2016/8/6.
 */

function islegalBarcode(inputs) {
    return /^[\s|:|\|]+$/.test(inputs);
}

function isLegalFrame(barCode) {
    return /^\|\s[\||:|\s]+\s\|$/.test(barCode);
}

function matchBarcode(barCode) {
    let reg = /^:::\|\||::\|:\||::\|\|:|:\|::\||:\|:\|:|:\|\|::|\|:::\||\|::\|:|\|:\|::|\|\|:::$/;
    let exist = barCode.split(' ').find(function (code) {
        if (!reg.test(code)) {
            return true;
        }
    });
    if (exist) {
        return false;
    }
    return true;
}
function secBarCode(barCode) {
    console.log(barCode);
    if (!(barCode.length === 39 || barCode.length === 63)) {
        return false;
    }
    if (!isLegalFrame(barCode)) {
        return false;
    }
    if (!islegalBarcode(barCode)) {
        return false;
    }
    if (!matchBarcode(barCode.substring(2, barCode.length - 2))) {
        return false;
    }
    return true;

}

function secPostCode(postCode) {
    return /^\d{5}(-?\d{4})?$/.test(postCode);
}
