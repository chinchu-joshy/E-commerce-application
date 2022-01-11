const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const shortId = require("shortid");
var mongoose = require("mongoose");
const Product = require("../model/productModel");
const Category = require("../model/categoryModel");
const { response } = require("express");
const Cart = require("../model/cartModel");
const Order = require("../model/orderModel");
const moment = require("moment");
var Objid = mongoose.Types.ObjectId;
const Razorpay = require("razorpay");
const paypal = require("paypal-rest-sdk");
const Coupen = require("../model/coupenModel");
const dotenv = require("dotenv");
dotenv.config();
var instance = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
});
paypal.configure({
  mode: "sandbox",
  client_id: process.env.paypal_client_id,
  client_secret: process.env.paypal_client_secret,
});
module.exports = {
  registerUser: (data) => {
    console.log(data);
    return new Promise(async (resolve, reject) => {
      try {
        const secret = shortId.generate();

        const salt = await bcrypt.genSalt();
        const val = await bcrypt.hash(data.password, salt);
        if (data.referal) {
          User.updateOne(
            { referal: data.referal },
            { $inc: { wallet: 20 } }
          ).then(async (response) => {
            const userdata = new User({
              email: data.email,
              passwordHash: val,
              username: data.username,
              DOB: data.dob,
              phone: data.phone,
              state: data.state,
              referal: secret,
              wallet: 50,
              offer: true,
            });
            const saveUser = await userdata.save();
            console.log(saveUser);
            resolve(saveUser);
          });
        } else {
          const userdata = new User({
            email: data.email,
            passwordHash: val,
            username: data.username,
            DOB: data.dob,
            phone: data.phone,
            state: data.state,
            referal: secret,
            wallet: 0,
            offer: false,
          });
          const saveUser = await userdata.save();
          console.log(saveUser);
          resolve(saveUser);
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
  loginUser: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const value = {};

        console.log(data);
        const Password = data.password;
        const Email = data.email;
        const check = await User.findOne({ email: Email });
        console.log(check);

        if (check) {
          if (check.state === false) {
            resolve({ status: false, error: "You are blocked" });
          } else {
            bcrypt
              .compare(Password, check.passwordHash)
              .then(function (result) {
                if (result === true) {
                  value.user = check;
                  value.status = true;
                  resolve(value);
                } else {
                  value.status = false;
                  resolve({
                    status: false,
                    error: "Invalid email or password",
                  });
                }
              });
          }
        } else {
          value.status = false;
          resolve({ status: false, error: "Invalid email or password" });
        }
      } catch (err) {
        reject({ error: "Some unknown error occured" });
        console.log(err);
      }
    });
  },
  findBlocked: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("reached");
        const data = await User.findOne({ _id: Objid(id) });
        console.log(data);
        if (data.state === false) return resolve({ status: false });
        return resolve({ status: true, user: data });
      } catch (err) {
        console.log(err);
      }
    });
  },

  userFind: (id) => {
    return new Promise(async (resolve, reject) => {
      const data = await Product.find({ _id: Objid(id) });
      resolve(data);
      console.log(data);
    });
  },
  getCategory: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await Category.find({});
        resolve(category);
      } catch (err) {
        console.log("error");
      }
    });
  },
  findTheCategory: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const product = await Product.find({ category: id }).sort({
          createdAt: -1,
        });

        resolve(product);
      } catch (err) {}
    });
  },
  findTheSubCategory: (id, sub) => {
    return new Promise(async (resolve, reject) => {
      try {
        const product = await Product.find({
          $and: [{ category: id }, { subcategory: sub }],
        }).sort({
          createdAt: -1,
        });

        resolve(product);
      } catch (err) {}
    });
  },
  getNewArrival: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await Product.find(
          {},
          {},
          { sort: { createdAt: -1 } }
        ).limit(4);
        resolve(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    });
  },
  getSearchedProducts: (value) => {
    return new Promise(async (resolve, reject) => {
      try {
        const pattern = `${value}`;
        const data = await Product.find({
          productname: { $regex: pattern, $options: "i" },
        });
        resolve(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    });
  },
  addUserAdress: (sample, id) => {
    return new Promise(async (resolve, reject) => {
      const user = await User.aggregate([
        { $match: { _id: Objid(id) } },
        {
          $project: {
            numberOfAdress: {
              $cond: {
                if: { $isArray: "$adress" },
                then: { $size: "$adress" },
                else: "NA",
              },
            },
          },
        },
      ]);
      const data = user[0].numberOfAdress;
      console.log(data);
      if (data >= 4) {
        User.updateOne(
          { _id: Objid(id) },

          { $pop: { adress: -1 } },
          { new: true }
        ).then(async (response) => {
          if (response) {
            const data1 = await User.findOneAndUpdate(
              { _id: Objid(id) },
              { $push: { adress: sample } },

              { new: true }
            );
            resolve(data1);
          }
        });
      } else {
        const data2 = await User.findOneAndUpdate(
          { _id: Objid(id) },
          { $push: { adress: sample } },

          { new: true }
        );
        resolve(data2);
      }
    });
  },
  getAdressUser: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const adress = await User.findOne({ _id: Objid(id) }).sort({
          createdAt: -1,
        });

        resolve(adress);
      } catch (err) {}
    });
  },
  findTheEditAdress: (userId, id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const adress = await User.findOne(
          { _id: Objid(userId) },
          { _id: 0, adress: { $elemMatch: { secreatId: id } } }
        );

        resolve(adress);
      } catch (err) {}
    });
  },
  updateAdress: (userId, data) => {
    const id = data.secreatId;
    return new Promise((resolve, reject) => {
      User.updateOne(
        { _id: Objid(userId), "adress.secreatId": id },
        {
          $set: { "adress.$": data },
        }
      ).then((response) => {
        console.log(response);
        resolve(response);
      });
    });
  },
  deleteAdress: (id, userId) => {
    return new Promise((resolve, reject) => {
      try {
        User.updateOne(
          {
            _id: Objid(userId),
          },
          {
            $pull: { adress: { secreatId: id } },
          }
        ).then((response) => {
          console.log(response);
          resolve(response);
        });
      } catch (err) {}
    });
  },
  updateDetails: (id, data) => {
    return new Promise((resolve, reject) => {
      try {
        User.updateOne(
          { _id: Objid(id) },
          {
            $set: {
              username: data.username,
              DOB: data.dob,
              email: data.email,

              phone: data.phone,
            },
          }
        ).then((response) => {
          resolve(response);
        });
      } catch (err) {
        console.log(err);
      }
    });
  },
  checkPassword: (userId, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({ _id: Objid(userId) });
        if (user) {
          bcrypt.compare(password, user.passwordHash).then((result) => {
            if (result === true) {
              resolve({ status: true });
            } else {
              resolve({ status: false });
            }
          });
        }
      } catch (err) {}
    });
  },
  updateUserPassword: (data, id) => {
    console.log(data);
    return new Promise(async (resolve, reject) => {
      try {
        console.log(data.password);
        var salt = bcrypt.genSalt(10);
        var hash = bcrypt.hash(data.password, salt);
        User.updateOne({ _id: Objid(id) }, { passwordHash: hash }).then(
          (response) => {
            resolve(response);
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  },
  addToCart: (data, secret, userId) => {
    console.log("what is this");
    // console.log(data)
    const result = parseInt(data.price - data.offer);
    const value = {
      productId: Objid(data.id),
      quantity: data.quantity,
      size: data.size,
      secreatId: secret,

      orderStatus: "Placed",

      price: data.price,
      offer: result,
    };

    return new Promise(async (resolve, reject) => {
      try {
        const findCart = await Cart.findOne({
          $and: [
            { userId: userId },
            { "products.productId": value.productId },
            { "products.size": data.size },
          ],
        });
        const cart = await Cart.findOne({ userId: userId });

        if (cart) {
          if (findCart) {
            console.log("repeat");
            resolve({ status: false });
          } else {
            console.log("add");
            Cart.updateOne(
              { userId: userId },
              {
                $addToSet: { products: value },
              }
            ).then((response) => {
              resolve(response);
            });
          }
        } else {
          const cart = new Cart({
            userId: userId,
            products: value,
          });
          const saveCart = await cart.save();
          resolve(saveCart);
        }
      } catch (err) {}
    });
  },
  getCartProducts: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const products = await Cart.aggregate([
          { $sort: { createdAt: -1 } },
          { $match: { userId: id } },

          { $unwind: "$products" },
          {
            $lookup: {
              from: "products",
              localField: "products.productId",
              foreignField: "_id",
              as: "productdetails",
            },
          },
          {
            $addFields: {
              quantitys: { $sum: "$products.quantity" },
              totalprice: { $sum: "$productdetails.price" },
              totaloffer: { $sum: "$productdetails.offer" },
            },
          },
          {
            $addFields: {
              totalamount: { $multiply: ["$quantitys", "$totalprice"] },
            },
          },
          {
            $addFields: {
              totaloffamount: { $multiply: ["$quantitys", "$totaloffer"] },
            },
          },
          { $project: { quantitys: 0, totalprice: 0 } },
        ]);
        console.log(products);

        resolve(products);
      } catch (err) {}
    });
  },
  updateQuantity: (userId, secret) => {
    return new Promise((resolve, reject) => {
      try {
        Cart.updateOne(
          { $and: [{ userId: userId }, { "products.secreatId": secret }] },
          {
            $inc: { "products.$.quantity": 1 },
          }
        ).then((response) => {
          resolve(response);
        });
      } catch (err) {}
    });
  },
  updateQuantityDecrease: (userId, secret) => {
    return new Promise((resolve, reject) => {
      try {
        Cart.updateOne(
          {
            $and: [
              { userId: userId },
              { "products.secreatId": secret },
              { "products.quantity": { $gt: 1 } },
            ],
          },
          { $inc: { "products.$.quantity": -1 } }
        ).then((response) => {
          resolve(response);
        });
      } catch (err) {}
    });
  },
  deleteCartItem: (userId, cartId) => {
    return new Promise((resolve, reject) => {
      try {
        Cart.updateOne(
          { userId: userId },
          {
            $pull: { products: { secreatId: cartId } },
          }
        ).then((response) => {
          console.log(response);
          resolve(response);
        });
      } catch (err) {}
    });
  },
  placeOrder: (userId, data, secret) => {
    return new Promise(async (resolve, reject) => {
      try {
        const date = new Date();
        var newdate = moment(date).format("YYYY-MM-DD");

        const order = new Order({
          userId: Objid(userId),
          cartId: data.cartId,
          payment: data.payment,
          amount: data.price,
          adress: data.adress,
          orderStatus: data.status,
          date: newdate,
          secret: secret,
          products: data.products,
        });
        const saveOrder = await order.save();

        if (saveOrder) {
          User.updateOne(
            { _id: Objid(userId) },
            {
              $set: { offer: false },
            }
          ).then((res) => {
            console.log(res);
          });
          Cart.updateOne(
            { userId: userId },
            {
              $unset: { products: "" },
            }
          ).then((response) => {
            if (response) {
              console.log(data.products.length);
              for (i = 0; i < data.products.length; i++) {
                const count = data.products[i].quantity;
                const quantity = count * -1;
                const size = data.products[i].size;
                var update = { $inc: {} };
                update.$inc[size] = quantity;
                Product.updateOne(
                  { _id: Objid(data.products[i].productId) },
                  update
                ).then((response) => {
                  resolve(saveOrder);
                });
              }
            }
          });
        }
      } catch (err) {}
    });
  },
  getProductDetailsOrdered: (cartId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await Cart.aggregate([
          { $match: { _id: Objid(cartId) } },
          {
            $project: { products: 1 },
          },
        ]);

        resolve(data);
      } catch (err) {}
    });
  },
  getUserOrder: (userId) => {
    console.log("reached");
    return new Promise(async (resolve, reject) => {
      try {
        const data = await Order.aggregate([
          { $match: { userId: userId } },
          { $sort: { createdAt: -1 } },
          { $unwind: "$products" },
          {
            $project: {
              productId: { $toObjectId: "$products.productId" },
              amount: 1,

              date: 1,
              "products.size": 1,
              "products.quantity": 1,
              "products.orderStatus": 1,

              orderStatus: 1,
            },
          },
          {
            $lookup: {
              from: "products",
              localField: "productId",
              foreignField: "_id",
              as: "productdetails",
            },
          },
          { $unwind: "$productdetails" },
        ]).sort({ createdAt: -1 });

        resolve(data);
      } catch (err) {}
    });
  },
  cancelOrderByUser: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        Order.updateOne(
          {
            _id: Objid(data.id),
            products: {
              $elemMatch: { productId: data.productId, size: data.size },
            },
          },
          {
            $set: { "products.$.orderStatus": "Cancelled" },
          }
        ).then((response) => {
          resolve(response);
        });
      } catch (err) {}
    });
  },
  similarProduct: (value) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await Product.find({ subcategory: value })
          .limit(4)
          .sort({ createdAt: -1 });
        resolve(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    });
  },
  addUserImage: (data, id) => {
    return new Promise((resolve, reject) => {
      try {
        User.updateOne({ _id: Objid(id) }, { $set: { image: data } }).then(
          (response) => {
            resolve(response);
          }
        );
      } catch (err) {}
    });
  },
  generateRazorpay: (id, price) => {
    return new Promise((resolve, reject) => {
      console.log(id);
      console.log(price);
      const money = parseInt(price);
      try {
        const options = {
          amount: money,
          currency: "INR",
          receipt: id,
        };
        instance.orders.create(options, function (err, order) {
          if (err) {
            console.log(err);
          } else {
            resolve(order);
          }
        });
      } catch (err) {}
    });
  },
  verifyPayment: (data) => {
    return new Promise((resolve, reject) => {
      try {
        const crypto = require("crypto");
        let hmac = crypto.createHmac("sha256", "c8Y2ceJAh6fnimfCw3JnIZ2D");

        hmac.update(
          data.payment.razorpay_order_id +
            "|" +
            data.payment.razorpay_payment_id
        );
        hmac = hmac.digest("hex");

        if (hmac === data.payment.razorpay_signature) {
          resolve({ status: true });
        } else {
          reject();
        }
      } catch (err) {}
    });
  },
  updateOrderPaymentStatus: (data) => {
    console.log("udating");
    console.log(data);
    return new Promise((resolve, reject) => {
      try {
        Order.updateOne(
          { _id: Objid(data) },
          {
            $set: { orderStatus: "Paid" },
          }
        ).then((response) => {
          resolve({ status: true });
          console.log("updated");
        });
      } catch (err) {}
    });
  },

  checkReferal: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const value = data.referal;
        const user = await User.findOne({ referal: value });
        if (!user) {
          resolve({ status: false });
        }
      } catch (err) {}
    });
  },
  getCoupen: (id) => {
    console.log("coupen djhdbhm");
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({ _id: Objid(id) });
        const data = user.coupen;

        const coupen = await Coupen.find({ _id: { $nin: data } });

        if (coupen) {
          resolve(coupen);
        }
      } catch (err) {}
    });
  },
  checkCoupen: (user, coupen) => {
    return new Promise(async (resolve, reject) => {
      try {
        const coupen = await Coupen.find({});

        if (coupen) {
          resolve(coupen);
        }
      } catch (err) {}
    });
  },
  updateTheDiscount: (id, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (data.wallet) {
          console.log("wallet ok");
          const val = parseInt(data.wallet * -1);
          console.log(val);
          User.updateOne({ _id: Objid(id) }, { $inc: { wallet: val } }).then(
            (response) => {
              console.log(response);
              resolve({ status: true });
            }
          );
        }
        if (data.coupen) {
          console.log("coupen ok");
          User.updateOne(
            { _id: Objid(id) },
            {
              $addToSet: { coupen: data.coupen },
            }
          ).then((response) => {
            console.log(response);
            resolve({ status: true });
          });
        }
      } catch (err) {}
    });
  },
  topSellingProduct: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const orders = await Order.aggregate([
          {
            $match: {
              createdAt: {
                $gt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
              },
            },
          },

          { $unwind: "$products" },
          {
            $project: {
              userId: { $toObjectId: "$userId" },
              productId: { $toObjectId: "$products.productId" },
              "products.orderStatus": 1,
              "products.price": 1,
              "products.size": 1,
              "products.quantity": 1,
              secret: 1,
              date: 1,
              payment: 1,
              orderStatus: 1,
            },
          },
          {
            $group: {
              _id: "$productId",

              count: { $sum: 1 },
            },
          },
          { $sort: { count: -1 } },

          {
            $lookup: {
              from: "products",
              localField: "_id",
              foreignField: "_id",
              as: "productdetails",
            },
          },
          { $unwind: "$productdetails" },
          { $limit: 4 },
        ]);
        resolve(orders);
      } catch (err) {}
    });
  },
};
