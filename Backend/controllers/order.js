import { Order, ProductCart } from "../models/order.js"

class OrderController {
    
    getOrderById = (req, res, next, id) => {
        Order.findById(id)
            .populate("products.product", "name price")
            .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                error: "NO order found in DB"
                });
            }
            req.order = order;
            next();
            });
        };

    createOrder = (req, res) => {
        req.body.order.user = req.profile;
        const order = new Order(req.body.order);
        order.save((err, order) => {
            if (err) {
            return res.status(400).json({
                error: "Failed to save your order in DB"
            });
            }
            res.json(order);
        });
        };

    getAllOrders = (req, res) => {
        Order.find()
            .populate("user", "_id name")
            .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                error: "No orders found in DB"
                });
            }
            res.json(order);
            });
        };

    getOrderStatus = (req, res) => {
        res.json(Order.schema.path("status").enumValues);
        };

    updateStatus = (req, res) => {
        Order.update(
            { _id: req.body.orderId },
            { $set: { status: req.body.status } },
            (err, order) => {
            if (err) {
                return res.status(400).json({
                error: "Cannot update order status"
                });
            }
            res.json(order);
            }
        );
    };
}

export default new OrderController();