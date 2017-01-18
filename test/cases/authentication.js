const { expect, request } = require('../index');

let merchant;

const authenticate = function*() {
    const res = yield request.post('/v1/oauth/access-token')
        .set('authentication', 'PiCJgCFnpCOS8X+WJkDYVUz7rxI=')
        .send({
            'client_id': 'S1NhvrDyx',
            'permission': 'client_credentials'
        })
        .expect(200);
    return res.body;
};

describe('Authentication', function() {
    describe('Merchant Tesjor authenticates via POST /v1/oauth/access-token', function() {
        it('should return a 200 response', function*() {
            merchant = yield authenticate();
        });
        it('should return a legal name Tesjor', function() {
            expect(merchant.legal_name).to.equal('Tesjor');
        });
        it('should not have a null uid', function() {
            expect(merchant.uid).to.not.be.null;
        });
    });
});

module.exports = {
    authenticate
};
