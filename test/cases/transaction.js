/* eslint quotes: off */
const jwt = require('../../app/utils/jwt');
const { expect, request } = require('../index');
const { authenticate } = require('./authentication');

let merchant;
let transaction;
let transactionResponse;
const transaction_form = {
    "customer": {
        "udid": "6f3da3fca0b611e680f576304dec7eb7",
        "ip": "192.168.17.139",
        "latitude": "11.576052",
        "longitude": "104.923393"
    },
    "description": "5 x Pepperoni Pizza",
    "total_amt": "38.75",
    "total_qty": 5,
    "currency_code": "USD",
    "items": [{
        "name": "Pepperoni Pizza",
        "unit_price": "7.75",
        "qty": 5
    }],
    "payment_code": "PNG",
    "payment_options": {
        "account_type": "",
        "account": "",
        "point_id": "516"
    },
    "signature": "RNZcDIdlSn2ujOl8dN8KPlRiTfs="
};

describe('Transaction', function() {
    before(function*() {
        merchant = yield authenticate();
    });
    describe('Merchant authenticates', function() {
        it('should get an access token', function() {
            expect(merchant.access_token).to.not.be.null;
        });
        it('should get valid access token', function*() {
            const valid = yield jwt.verifyAsync(merchant.access_token);
            expect(valid).to.not.be.null;
        });
    });
    describe('Merchant creates a transaction', function() {
        it('should complete without any error', function* () {
            transactionResponse = yield request.post('/v1/payments/transactions')
                .set('X-Auth', 'Bearer ' + merchant.access_token)
                .send(transaction_form);
            expect(transactionResponse.body.reason).to.be.undefined;
            transaction = transactionResponse.body;
        });
        it('should return a 200 response', function() {
            expect(transactionResponse.status).to.equal(200);
        });
        if (transaction) {
            it('should get a transaction state created', function() {
                expect(transaction.state).to.equal('created');
                expect(transaction.uid).to.not.be.null;
            });
        }
    });
});
