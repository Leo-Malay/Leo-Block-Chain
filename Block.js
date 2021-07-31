const SHA256 = require("crypto-js/sha256");

module.exports = class Block {
    constructor(index, timestamp, data, prevHash = " ") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.computeHash();
    }
    computeHash() {
        return SHA256(
            this.index +
                "#_#" +
                this.prevHash +
                "#_#" +
                this.timestamp +
                "#_#" +
                JSON.stringify(this.data)
        ).toString();
    }
};
