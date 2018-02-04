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
    isInBounds: function(cc, bounds) {
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
        let direction = Math.sign(count);
        let bounds = this.getBounds(cc);
        let range = (bounds.top - bounds.bottom + 1);
        count = count % range;
        while(count !== 0) {
            cc = ((cc + direction - bounds.bottom) % range);
            cc += bounds.bottom + ((cc < 0 ) ? range : 0);
            count -= direction;
        }
        return cc;
    },
};
