const Block = require("./Block");

module.exports = class Blockchain {
    constructor() {
        this.chain = [this.genesisBlock()];
    }
    genesisBlock() {
        return new Block(0, Date.now(), { id: "0000" }, "0");
    }
    lastBlock() {
        return this.chain[this.chain.length - 1];
    }
    lastIndex() {
        return this.chain.length;
    }
    newBlock(timestamp, data) {
        var tempBlock = new Block(this.lastIndex(), timestamp, data, "0");
        tempBlock.nextHash = this.lastBlock().hash;
        tempBlock.hash = tempBlock.computeHash();
        this.chain.push(tempBlock);
    }
    isValidChain() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const nextBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.computeHash()) {
                return false;
            }
            if (currentBlock.nextHash !== nextBlock.hash) {
                return false;
            }
        }
        return true;
    }
};
