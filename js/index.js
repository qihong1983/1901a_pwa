function Index(opt) {
    if (!(this instanceof Index)) {
        return new Index(opt)
    }

    this.name = 'xxx';
}

Index.prototype = {
    /**
     * 初始化
     */
    init:function () {
        console.log(`init load ${this.name}`);
    }
    /**
     * to do function
     */
}