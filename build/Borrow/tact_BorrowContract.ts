import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type UserInfo = {
    $$type: 'UserInfo';
    creditScore: bigint;
    totalBorrowed: bigint;
    totalCollateral: bigint;
    erc20Collateral: Dictionary<Address, bigint>;
    nftCollateral: Dictionary<Address, bigint>;
}

export function storeUserInfo(src: UserInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.creditScore, 257);
        b_0.storeInt(src.totalBorrowed, 257);
        b_0.storeInt(src.totalCollateral, 257);
        b_0.storeDict(src.erc20Collateral, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
        b_0.storeDict(src.nftCollateral, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
    };
}

export function loadUserInfo(slice: Slice) {
    let sc_0 = slice;
    let _creditScore = sc_0.loadIntBig(257);
    let _totalBorrowed = sc_0.loadIntBig(257);
    let _totalCollateral = sc_0.loadIntBig(257);
    let _erc20Collateral = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), sc_0);
    let _nftCollateral = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), sc_0);
    return { $$type: 'UserInfo' as const, creditScore: _creditScore, totalBorrowed: _totalBorrowed, totalCollateral: _totalCollateral, erc20Collateral: _erc20Collateral, nftCollateral: _nftCollateral };
}

function loadTupleUserInfo(source: TupleReader) {
    let _creditScore = source.readBigNumber();
    let _totalBorrowed = source.readBigNumber();
    let _totalCollateral = source.readBigNumber();
    let _erc20Collateral = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _nftCollateral = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'UserInfo' as const, creditScore: _creditScore, totalBorrowed: _totalBorrowed, totalCollateral: _totalCollateral, erc20Collateral: _erc20Collateral, nftCollateral: _nftCollateral };
}

function loadGetterTupleUserInfo(source: TupleReader) {
    let _creditScore = source.readBigNumber();
    let _totalBorrowed = source.readBigNumber();
    let _totalCollateral = source.readBigNumber();
    let _erc20Collateral = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _nftCollateral = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'UserInfo' as const, creditScore: _creditScore, totalBorrowed: _totalBorrowed, totalCollateral: _totalCollateral, erc20Collateral: _erc20Collateral, nftCollateral: _nftCollateral };
}

function storeTupleUserInfo(source: UserInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.creditScore);
    builder.writeNumber(source.totalBorrowed);
    builder.writeNumber(source.totalCollateral);
    builder.writeCell(source.erc20Collateral.size > 0 ? beginCell().storeDictDirect(source.erc20Collateral, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.nftCollateral.size > 0 ? beginCell().storeDictDirect(source.nftCollateral, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257)).endCell() : null);
    return builder.build();
}

function dictValueParserUserInfo(): DictionaryValue<UserInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUserInfo(src)).endCell());
        },
        parse: (src) => {
            return loadUserInfo(src.loadRef().beginParse());
        }
    }
}

export type SetCreditScore = {
    $$type: 'SetCreditScore';
    user: Address;
    creditScore: bigint;
}

export function storeSetCreditScore(src: SetCreditScore) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(291, 32);
        b_0.storeAddress(src.user);
        b_0.storeInt(src.creditScore, 257);
    };
}

export function loadSetCreditScore(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 291) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _creditScore = sc_0.loadIntBig(257);
    return { $$type: 'SetCreditScore' as const, user: _user, creditScore: _creditScore };
}

function loadTupleSetCreditScore(source: TupleReader) {
    let _user = source.readAddress();
    let _creditScore = source.readBigNumber();
    return { $$type: 'SetCreditScore' as const, user: _user, creditScore: _creditScore };
}

function loadGetterTupleSetCreditScore(source: TupleReader) {
    let _user = source.readAddress();
    let _creditScore = source.readBigNumber();
    return { $$type: 'SetCreditScore' as const, user: _user, creditScore: _creditScore };
}

function storeTupleSetCreditScore(source: SetCreditScore) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.creditScore);
    return builder.build();
}

function dictValueParserSetCreditScore(): DictionaryValue<SetCreditScore> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetCreditScore(src)).endCell());
        },
        parse: (src) => {
            return loadSetCreditScore(src.loadRef().beginParse());
        }
    }
}

export type Borrow = {
    $$type: 'Borrow';
    collateralToken: Address;
    collateralAmount: bigint;
    borrowAmount: bigint;
}

export function storeBorrow(src: Borrow) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1110, 32);
        b_0.storeAddress(src.collateralToken);
        b_0.storeInt(src.collateralAmount, 257);
        b_0.storeInt(src.borrowAmount, 257);
    };
}

export function loadBorrow(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1110) { throw Error('Invalid prefix'); }
    let _collateralToken = sc_0.loadAddress();
    let _collateralAmount = sc_0.loadIntBig(257);
    let _borrowAmount = sc_0.loadIntBig(257);
    return { $$type: 'Borrow' as const, collateralToken: _collateralToken, collateralAmount: _collateralAmount, borrowAmount: _borrowAmount };
}

function loadTupleBorrow(source: TupleReader) {
    let _collateralToken = source.readAddress();
    let _collateralAmount = source.readBigNumber();
    let _borrowAmount = source.readBigNumber();
    return { $$type: 'Borrow' as const, collateralToken: _collateralToken, collateralAmount: _collateralAmount, borrowAmount: _borrowAmount };
}

function loadGetterTupleBorrow(source: TupleReader) {
    let _collateralToken = source.readAddress();
    let _collateralAmount = source.readBigNumber();
    let _borrowAmount = source.readBigNumber();
    return { $$type: 'Borrow' as const, collateralToken: _collateralToken, collateralAmount: _collateralAmount, borrowAmount: _borrowAmount };
}

function storeTupleBorrow(source: Borrow) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.collateralToken);
    builder.writeNumber(source.collateralAmount);
    builder.writeNumber(source.borrowAmount);
    return builder.build();
}

function dictValueParserBorrow(): DictionaryValue<Borrow> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBorrow(src)).endCell());
        },
        parse: (src) => {
            return loadBorrow(src.loadRef().beginParse());
        }
    }
}

export type RedeemERC20 = {
    $$type: 'RedeemERC20';
    collateralToken: Address;
    collateralAmount: bigint;
}

export function storeRedeemERC20(src: RedeemERC20) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1929, 32);
        b_0.storeAddress(src.collateralToken);
        b_0.storeInt(src.collateralAmount, 257);
    };
}

export function loadRedeemERC20(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1929) { throw Error('Invalid prefix'); }
    let _collateralToken = sc_0.loadAddress();
    let _collateralAmount = sc_0.loadIntBig(257);
    return { $$type: 'RedeemERC20' as const, collateralToken: _collateralToken, collateralAmount: _collateralAmount };
}

function loadTupleRedeemERC20(source: TupleReader) {
    let _collateralToken = source.readAddress();
    let _collateralAmount = source.readBigNumber();
    return { $$type: 'RedeemERC20' as const, collateralToken: _collateralToken, collateralAmount: _collateralAmount };
}

function loadGetterTupleRedeemERC20(source: TupleReader) {
    let _collateralToken = source.readAddress();
    let _collateralAmount = source.readBigNumber();
    return { $$type: 'RedeemERC20' as const, collateralToken: _collateralToken, collateralAmount: _collateralAmount };
}

function storeTupleRedeemERC20(source: RedeemERC20) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.collateralToken);
    builder.writeNumber(source.collateralAmount);
    return builder.build();
}

function dictValueParserRedeemERC20(): DictionaryValue<RedeemERC20> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRedeemERC20(src)).endCell());
        },
        parse: (src) => {
            return loadRedeemERC20(src.loadRef().beginParse());
        }
    }
}

export type PerformLiquidation = {
    $$type: 'PerformLiquidation';
    user: Address;
}

export function storePerformLiquidation(src: PerformLiquidation) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2748, 32);
        b_0.storeAddress(src.user);
    };
}

export function loadPerformLiquidation(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2748) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    return { $$type: 'PerformLiquidation' as const, user: _user };
}

function loadTuplePerformLiquidation(source: TupleReader) {
    let _user = source.readAddress();
    return { $$type: 'PerformLiquidation' as const, user: _user };
}

function loadGetterTuplePerformLiquidation(source: TupleReader) {
    let _user = source.readAddress();
    return { $$type: 'PerformLiquidation' as const, user: _user };
}

function storeTuplePerformLiquidation(source: PerformLiquidation) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    return builder.build();
}

function dictValueParserPerformLiquidation(): DictionaryValue<PerformLiquidation> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePerformLiquidation(src)).endCell());
        },
        parse: (src) => {
            return loadPerformLiquidation(src.loadRef().beginParse());
        }
    }
}

export type BorrowContract$Data = {
    $$type: 'BorrowContract$Data';
    owner: Address;
    softLiquidationThreshold: bigint;
    maxCreditScore: bigint;
    maxThresholdPercent: bigint;
    users: Dictionary<Address, UserInfo>;
}

export function storeBorrowContract$Data(src: BorrowContract$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeInt(src.softLiquidationThreshold, 257);
        b_0.storeInt(src.maxCreditScore, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.maxThresholdPercent, 257);
        b_1.storeDict(src.users, Dictionary.Keys.Address(), dictValueParserUserInfo());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadBorrowContract$Data(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _softLiquidationThreshold = sc_0.loadIntBig(257);
    let _maxCreditScore = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _maxThresholdPercent = sc_1.loadIntBig(257);
    let _users = Dictionary.load(Dictionary.Keys.Address(), dictValueParserUserInfo(), sc_1);
    return { $$type: 'BorrowContract$Data' as const, owner: _owner, softLiquidationThreshold: _softLiquidationThreshold, maxCreditScore: _maxCreditScore, maxThresholdPercent: _maxThresholdPercent, users: _users };
}

function loadTupleBorrowContract$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _softLiquidationThreshold = source.readBigNumber();
    let _maxCreditScore = source.readBigNumber();
    let _maxThresholdPercent = source.readBigNumber();
    let _users = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserUserInfo(), source.readCellOpt());
    return { $$type: 'BorrowContract$Data' as const, owner: _owner, softLiquidationThreshold: _softLiquidationThreshold, maxCreditScore: _maxCreditScore, maxThresholdPercent: _maxThresholdPercent, users: _users };
}

function loadGetterTupleBorrowContract$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _softLiquidationThreshold = source.readBigNumber();
    let _maxCreditScore = source.readBigNumber();
    let _maxThresholdPercent = source.readBigNumber();
    let _users = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserUserInfo(), source.readCellOpt());
    return { $$type: 'BorrowContract$Data' as const, owner: _owner, softLiquidationThreshold: _softLiquidationThreshold, maxCreditScore: _maxCreditScore, maxThresholdPercent: _maxThresholdPercent, users: _users };
}

function storeTupleBorrowContract$Data(source: BorrowContract$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeNumber(source.softLiquidationThreshold);
    builder.writeNumber(source.maxCreditScore);
    builder.writeNumber(source.maxThresholdPercent);
    builder.writeCell(source.users.size > 0 ? beginCell().storeDictDirect(source.users, Dictionary.Keys.Address(), dictValueParserUserInfo()).endCell() : null);
    return builder.build();
}

function dictValueParserBorrowContract$Data(): DictionaryValue<BorrowContract$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBorrowContract$Data(src)).endCell());
        },
        parse: (src) => {
            return loadBorrowContract$Data(src.loadRef().beginParse());
        }
    }
}

 type BorrowContract_init_args = {
    $$type: 'BorrowContract_init_args';
}

function initBorrowContract_init_args(src: BorrowContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function BorrowContract_init() {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initBorrowContract_init_args({ $$type: 'BorrowContract_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const BorrowContract_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    6935: { message: `Credit score not set` },
    7177: { message: `User not found` },
    21436: { message: `Only owner can perform liquidation` },
    26068: { message: `Credit score out of range` },
    47933: { message: `Insufficient collateral` },
    60323: { message: `Insufficient collateral balance` },
    60939: { message: `Only owner can set credit score` },
    61795: { message: `No collateral found` },
}

const BorrowContract_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UserInfo","header":null,"fields":[{"name":"creditScore","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"totalBorrowed","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"totalCollateral","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"erc20Collateral","type":{"kind":"dict","key":"address","value":"int"}},{"name":"nftCollateral","type":{"kind":"dict","key":"address","value":"int"}}]},
    {"name":"SetCreditScore","header":291,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"creditScore","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Borrow","header":1110,"fields":[{"name":"collateralToken","type":{"kind":"simple","type":"address","optional":false}},{"name":"collateralAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"borrowAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RedeemERC20","header":1929,"fields":[{"name":"collateralToken","type":{"kind":"simple","type":"address","optional":false}},{"name":"collateralAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PerformLiquidation","header":2748,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"BorrowContract$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"softLiquidationThreshold","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxCreditScore","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxThresholdPercent","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"users","type":{"kind":"dict","key":"address","value":"UserInfo","valueFormat":"ref"}}]},
]

const BorrowContract_getters: ABIGetter[] = [
]

export const BorrowContract_getterMapping: { [key: string]: string } = {
}

const BorrowContract_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"text","text":"Deploy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetCreditScore"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Borrow"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RedeemERC20"}},
    {"receiver":"internal","message":{"kind":"typed","type":"PerformLiquidation"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class BorrowContract implements Contract {
    
    static async init() {
        return await BorrowContract_init();
    }
    
    static async fromInit() {
        const init = await BorrowContract_init();
        const address = contractAddress(0, init);
        return new BorrowContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new BorrowContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  BorrowContract_types,
        getters: BorrowContract_getters,
        receivers: BorrowContract_receivers,
        errors: BorrowContract_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'Deploy' | SetCreditScore | Borrow | RedeemERC20 | PerformLiquidation | Deploy) {
        
        let body: Cell | null = null;
        if (message === 'Deploy') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetCreditScore') {
            body = beginCell().store(storeSetCreditScore(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Borrow') {
            body = beginCell().store(storeBorrow(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RedeemERC20') {
            body = beginCell().store(storeRedeemERC20(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'PerformLiquidation') {
            body = beginCell().store(storePerformLiquidation(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
}