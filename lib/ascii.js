// handles ascii-operations
// deals only with charcodes
window.ascii = {
    // known bounds for uppercase and lowercase characters
    bounds: {
        uppercase: { bottom: 65, top: 90 },
        lowercase: { bottom: 97, top: 122 }
    },
    // returns whether <cc> is known to be a letter
    isLetter: function(cc) {
        return (this.isInBounds(cc, this.bounds.uppercase) || this.isInBounds(cc, this.bounds.lowercase));
    },
    // returns whether <cc> is in <bounds>
    isInBounds(cc, bounds) {
        return (cc >= bounds.bottom && cc <= bounds.top);
    },
    // returns known bounds for <cc> or null if unknown
    getBounds: function(cc) {
        for(let [name, bound] of Object.entries(this.bounds)) {
            if(this.isInBounds(cc, bound)) {
                return bound;
            }
        }
        return null;
    },
    // shifts <cc> by <count> characters (shift backwards using negative count)
    shiftBy: function(cc, count) {
        // recursive internal shifter
        const shiftRecursive = function(cc, bounds, count) {
            if(count === 0) {
                return cc;
            }
            let direction = Math.sign(count);
            let max = (bounds.top - bounds.bottom + 1);
            cc = (cc + direction - bounds.bottom) % max;
            while(cc < 0) {
                cc += max;
            }
            return shiftRecursive(cc + bounds.bottom, bounds, count - direction);
        }
        return shiftRecursive(cc, this.getBounds(cc), count);
    },
};
