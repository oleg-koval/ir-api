const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { validateFields } = require('../../validation')

const { post } = getTransport()

const validation = {
  orderGuid: ['isRequired', 'isGuid']
}

const cancelOrder = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async ({ orderGuid }) => {
    const payload = { orderGuid }
    validateFields(payload, validation)
    const path = 'Private/CancelOrder'
    return post(path, buildPayload(path, payload))
  }
}

module.exports = cancelOrder
