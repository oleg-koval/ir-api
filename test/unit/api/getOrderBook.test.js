const { expect } = require('chai')
const { stub } = require('sinon')
const proxyquire = require('proxyquire')

describe('api/getOrderBook', () => {
  const expected = {
    BuyOrders: [
      {
        OrderType: 'LimitBid',
        Price: 497.02,
        Volume: 0.01
      },
      {
        OrderType: 'LimitBid',
        Price: 490.0,
        Volume: 1.0
      }
    ],
    SellOrders: [
      {
        OrderType: 'LimitOffer',
        Price: 500.0,
        Volume: 1.0
      },
      {
        OrderType: 'LimitOffer',
        Price: 505.0,
        Volume: 1.0
      }
    ],
    CreatedTimestampUtc: '2014-08-05T06:42:11.3032208Z',
    PrimaryCurrencyCode: 'Xbt',
    SecondaryCurrencyCode: 'Usd'
  }

  const get = stub().resolves(expected)
  const transport = {
    getTransport: stub().returns({ get })
  }

  const method = proxyquire('../../../src/api/getOrderBook', {
    '../utils/transport': transport
  })

  const resetHistory = () => {
    transport.getTransport.resetHistory()
    get.resetHistory()
  }

  const params = {
    primaryCurrencyCode: 'Xbt',
    secondaryCurrencyCode: 'Usd'
  }

  let result

  before(async () => {
    result = await method(params)
  })

  after(resetHistory)

  it('called getTransport', () => {
    expect(transport.getTransport).to.have.been.calledOnce
  })

  it('called get with the correct params', () => {
    expect(get).to.have.been.calledOnceWith(
      'Public/GetOrderBook?primaryCurrencyCode=Xbt&secondaryCurrencyCode=Usd'
    )
  })

  it('returned the expected result', () => {
    expect(result).to.deep.equal(expected)
  })
})
