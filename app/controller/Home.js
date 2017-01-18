module.exports = {
    index() {
        this.render('home/index');
    },
    construction() {
        this.render('home/construction');
    },
    ping() {
        this.terminate(200, 'OK');
    }
};
