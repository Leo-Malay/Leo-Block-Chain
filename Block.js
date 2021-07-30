const SHA256 = require("crypto-js/sha256");

module.exports = class Block {
    constructor(index, timestamp, data, nextHash = " ") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.nextHash = nextHash;
        this.hash = this.computeHash();
    }

    computeHash() {
        return SHA256(
            this.index +
                "#_#" +
                this.nextHash +
                "#_#" +
                this.timestamp +
                "#_#" +
                JSON.stringify(this.data)
        ).toString();
    }
};
