"use strict";

var request = require("request");
var Tx = require("ethereumjs-tx");
var ethUtil = require("ethereumjs-util");
var crypto = require("crypto");
var Web3 = require("web3");

var web3 = new Web3();

var hostApi = "http://liquium.solucionesblockchain.com/api";
var organizationAbi = [{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_parentCategory","type":"uint256"}],"name":"addCategory","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPoll","type":"uint256"},{"name":"_ballots","type":"bytes32[]"},{"name":"_amounts","type":"uint256[]"}],"name":"vote","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_idPoll","type":"uint256"},{"name":"_voter","type":"address"}],"name":"getVoteInfo","outputs":[{"name":"_time","type":"uint256"},{"name":"_total","type":"uint256"},{"name":"_nBallots","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"nCategories","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idDelegate","type":"uint256"},{"name":"_categoryIds","type":"uint256[]"},{"name":"_delegates","type":"uint256[]"}],"name":"dSetDelegates","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idDelegate","type":"uint256"},{"name":"_idPoll","type":"uint256"}],"name":"dUnvote","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"}],"name":"addDelegate","outputs":[{"name":"_idDelegate","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_idCategory","type":"uint256"},{"name":"_voter","type":"address"}],"name":"getCategoryDelegate","outputs":[{"name":"_idDelegate","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPoll","type":"uint256"},{"name":"_delegate","type":"uint256"}],"name":"setDelegateSinglePoll","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPoll","type":"uint256"}],"name":"unvote","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_idPoll","type":"uint256"},{"name":"_voter","type":"address"},{"name":"_idx","type":"uint256"}],"name":"getBallotInfo","outputs":[{"name":"_ballot","type":"bytes32"},{"name":"_amount","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"test2","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_idPoll","type":"uint256"},{"name":"_idDelegate","type":"uint256"}],"name":"dGetPollDelegaet","outputs":[{"name":"_idDelegateDelegate","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"test1","outputs":[{"name":"","type":"int256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_categoryIds","type":"uint256[]"},{"name":"_delegates","type":"uint256[]"}],"name":"setDelegates","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_voter","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"nDelegates","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"nPolls","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idCategory","type":"uint256"}],"name":"removeCategory","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_voter","type":"address"},{"name":"_amount","type":"uint256"}],"name":"removeVoter","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_idPoll","type":"uint256"},{"name":"_idDelegate","type":"uint256"}],"name":"dGetVoteInfo","outputs":[{"name":"_time","type":"uint256"},{"name":"_total","type":"uint256"},{"name":"_nBallots","type":"uint256"},{"name":"_motivation","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idDelegate","type":"uint256"},{"name":"_idPoll","type":"uint256"},{"name":"_delegate","type":"uint256"}],"name":"dSetDelegateSinglePoll","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_idPoll","type":"uint256"}],"name":"polls","outputs":[{"name":"_pollType","type":"bytes32"},{"name":"_title","type":"string"},{"name":"_closeDelegateTime","type":"uint256"},{"name":"_closeTime","type":"uint256"},{"name":"_idCategory","type":"uint256"},{"name":"_pollContractAddr","type":"address"},{"name":"_delegateStatusAddr","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idDelegate","type":"uint256"},{"name":"_idPoll","type":"uint256"},{"name":"_ballots","type":"bytes32[]"},{"name":"_amounts","type":"uint256[]"},{"name":"_motivation","type":"string"}],"name":"dVote","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"delegates","outputs":[{"name":"name","type":"string"},{"name":"owner","type":"address"},{"name":"deleted","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_voter","type":"address"},{"name":"_amount","type":"uint256"}],"name":"addVoter","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"categories","outputs":[{"name":"name","type":"string"},{"name":"deleted","type":"bool"},{"name":"delegateStatus","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idDelegate","type":"uint256"}],"name":"removeDelegate","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_title","type":"string"},{"name":"_closeDelegateTime","type":"uint256"},{"name":"_closeTime","type":"uint256"},{"name":"_categoryId","type":"uint256"},{"name":"_pollContractAddr","type":"address"}],"name":"addPoll","outputs":[{"name":"_idPoll","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_idPoll","type":"uint256"},{"name":"_voter","type":"address"}],"name":"getPollDelegate","outputs":[{"name":"_idDelegate","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_voter","type":"address"},{"name":"_categoryIds","type":"uint256[]"},{"name":"_delegates","type":"uint256[]"}],"name":"doSetDelegates","outputs":[{"name":"_success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_idPoll","type":"uint256"},{"name":"_idDelegate","type":"uint256"},{"name":"_idx","type":"uint256"}],"name":"dGetBallotInfo","outputs":[{"name":"_ballot","type":"bytes32"},{"name":"_amount","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_idCategory","type":"uint256"},{"name":"_idDelegate","type":"uint256"}],"name":"dGetCategoryDelegate","outputs":[{"name":"_idDelegateDelegate","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"_delegateStatusFactory","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"idPoll","type":"uint256"}],"name":"PollAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"idDelegate","type":"uint256"}],"name":"DelegateAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"idCategory","type":"uint256"}],"name":"CategoryAdded","type":"event"}];

var LiquiumMobileLib = function() {
    var self = this;

    if (window.localStorage.liquiumKey) {
        self.privKey = new Buffer(window.localStorage.liquiumKey, "hex");
        self.account = ethUtil.toChecksumAddress(ethUtil.bufferToHex(ethUtil.privateToAddress(self.privKey)));
    } else {
        crypto.randomBytes(32, function (err, buf) {
            if (!err) {
                if (!(window.localStorage.liquiumKey)) {
                    var bufH = buf.toString("hex");
                    window.localStorage.liquiumKey = bufH;
                    self.privKey = buf;
                    self.account = ethUtil.toChecksumAddress(ethUtil.bufferToHex(ethUtil.privateToAddress(self.privKey)));
                }
            }
        });
    }
};

LiquiumMobileLib.prototype.sendRawTransaction = function(dest, data, cb) {
    var self = this;
    if (!self.privKey) return cb(new Error("Key not defined"));

    request({
        url: hostApi+"/account/"+self.account,
        json: true
    }, function(err, result, body) {
        if (err) return cb(err);
        if (result.statusCode != 200) return cb(new Error(body));
        var rawTx = {
            nonce: body.nonce,
            gasPrice: body.gasPrice,
            gasLimit: 500000,
            to: dest,
            value: "0x00",
            data: data,
            chainId: 3
        };
        var tx = new Tx(rawTx);
        tx.sign(self.privKey);

        var serializedTx = tx.serialize();
        request({
            url: hostApi+"/transaction",
            json: {
                rawTx: ethUtil.bufferToHex(serializedTx)
            },
            method: "POST",
        }, function(err, result, body) {
            if (err) return cb(err);
            if (result.statusCode != 200) return cb(new Error(body));
            cb(null, body.txHash);
        });
    });
};

LiquiumMobileLib.prototype.waitTx = function(txHash, cb) {
    request({
        url: hostApi+"/transaction/"+txHash
    }, function(err, result, body) {
        if (err) return cb(err);
        if (result.statusCode != 200) return cb(new Error(body));
        cb(null, body);
    });
};


LiquiumMobileLib.prototype.vote = function(organizationAddr, idPoll, ballots, amounts, motivation, cb) {
    var organization = web3.eth.contract(organizationAbi).at(organizationAddr);
    var data = organization.vote.getData(idPoll, ballots, amounts, motivation);

    this.sendRawTransaction(organizationAddr, data, cb);
};

LiquiumMobileLib.prototype.setDelegates = function(organizationAddr, categoryIds, delegates, cb) {
    var organization = web3.eth.contract(organizationAbi).at(organizationAddr);
    var data = organization.setDelegates.getData(categoryIds, delegates);

    this.sendRawTransaction(organizationAddr, data, cb);
};

LiquiumMobileLib.prototype.getAllInfo = function(organizationAddr, cb) {
    request({
        url: hostApi+"/organization/"+organizationAddr+"?voter="+this.account
    }, function(err, result, body) {
        if (err) return cb(err);
        if (result.statusCode != 200) return cb(new Error(body));
        cb(null, body);
    });
};




window.liquiumMobileLib = new LiquiumMobileLib();
window.web3 = web3;

