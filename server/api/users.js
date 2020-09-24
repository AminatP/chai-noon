const router = require('express').Router()
const {User} = require('../db/models')
const Order = require('../db/models/order')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// get user by id and load their current active order
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Order,
        where: {
          purchased: false
        }
      },
      attributes: []
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})
