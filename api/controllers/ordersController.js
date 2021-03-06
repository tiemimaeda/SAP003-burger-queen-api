import OrdersService from '../server/ordersService'
import Util from '../utils/Utils'

const util = new Util()

class OrdersController {
  static async getAllOrders(req, res) {
    try {
      const getAllOrders = await OrdersService.getAllOrders()
      if (getAllOrders.length > 0) {
        util.setSuccess(200, 'Orders retrieved', getAllOrders)
      } else {
        util.setSuccess(200, 'No Orders found')
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }

  static async addOrders(req, res) {
    if (!req.body.client || !req.body.status || !req.body.tableNumber ) {
      util.setError(400, 'Please provide complete details')
      return util.send(res)
    }
    const newOrders = req.body
    try {
      const createdOrders = await OrdersService.addOrders(newOrders)
      util.setSuccess(201, 'Orders Added!', createdOrders)
      return util.send(res)
    } catch (error) {
      util.setError(400, error.message)
      return util.send(res)
    }
  }

  static async updatedOrders(req, res) {
    const alteredOrders = req.body
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }
    try {
      const updateOrders = await OrdersService.updateOrders(id, alteredOrders)
      if (!updateOrders) {
        util.setError(404, `Cannot find Orders with the id: ${id}`)
      } else {
        util.setSuccess(200, 'Orders updated', updateOrders)
      }
      return util.send(res)
    } catch (error) {
      util.setError(404, error)
      return util.send(res)
    }
  }

  static async getOrders(req, res) {
    const { id } = req.params

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }

    try {
      const theOrders = await OrdersService.getOrders(id)

      if (!theOrders) {
        util.setError(404, `Cannot find Orders with the id ${id}`)
      } else {
        util.setSuccess(200, 'Found Orders', theOrders)
      }
      return util.send(res)
    } catch (error) {
      util.setError(404, error)
      return util.send(res)
    }
  }

  static async deleteOrders(req, res) {
    const { id } = req.params

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value')
      return util.send(res)
    }

    try {
      const ordersToDelete = await OrdersService.deleteOrders(id)

      if (ordersToDelete) {
        util.setSuccess(200, 'Orders deleted')
      } else {
        util.setError(404, `Orders with the id ${id} cannot be found`)
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }
}

export default OrdersController;
