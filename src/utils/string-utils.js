export const isSuccessNow = (_old, _new) => {
    if (_old !== 'SUCCESS' && _new === 'SUCCESS')
        return true;
    else return false;
}

export const isFailNow = (_old, _new) => {
    if (_old !== 'FAILED' && _new === 'FAILED')
        return true;
    else return false;
}