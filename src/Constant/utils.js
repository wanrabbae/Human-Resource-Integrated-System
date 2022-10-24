var removeSpace = (str) => {
    var matches = str.match(/\b(\w)/g);
    return matches.join('');
}

export { removeSpace }