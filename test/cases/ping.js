const { expect, baseUrl, request } = require('../index');

describe(`ping GET ${baseUrl}/ping`, function() {
    it('should return a 200 response', function*() {
        const res = yield request.get('/ping')
            .send()
            .expect(200);
        expect(res.text).to.equal('OK');
    });
});
