// handles caesar-encryption
// requires global ascii-object
window.caesar = {
    // returns object with encrypt(str) and decrypt(str) functions shifting by <amount> and -<amount> respectively
    makeCryptoObject: function(amount) {
        let obj = {};
        for(let [k, v] of Object.entries({'en': amount, 'de': -amount})) {
            obj[k + 'crypt'] = str => caesar.shift(str, v);
        }
        return obj;
    },
    // shifts each letter in <str> by <amount> characters (amount may be negative)
    shift: function(str, amount) {
        return Array.from(str).map(symbol => this.shiftSymbol(symbol, amount)).join('');
    },
    // shifts <symbol> by <amount> characters if it's a letter (amount my be negative)
    shiftSymbol: function(symbol, amount) {
        let cc = symbol.charCodeAt(0);
        if(ascii.isLetter(cc)) {
            symbol = String.fromCharCode(ascii.shiftBy(cc, amount));
        }
        return symbol;
    }
}

window.ghol367 = caesar.makeCryptoObject(367);
window.rot13 = caesar.makeCryptoObject(13);
window.schorsch3 = caesar.makeCryptoObject(3);
