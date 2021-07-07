const Card = require('./card.model')
const Category = require('../category.model')
const ReturnObj = require('../../../models/return-object.model')
const LogService = require('./../../log.module/log.service')
const Log = require('./../../log.module/log.model')

module.exports = {

    save: async function(req,res){
      try {
        const _card = new Card(req.body)
        const _categoryid = req.params.category_id
        const _projectId = req.params.project_id


        _card.Project = _projectId
        _card.Category = _categoryid

        await _card.save()
        
        var logs = { userId: req.caller_id, type: "Save_Card", card: _card, categoryId:_categoryid, projectid: _projectId }
        const resp1 = await LogService.save(res,logs)

        res.io.to(_projectId).emit("new card", _card);
        res.send(new ReturnObj(true, 'MSG_USER_ADDED_ON_BOARD', 200, _card))
      } catch (error) {
        res.status(500).send(new ReturnObj(false, 'ERR_MEMBER_NOT_ADDED', 500, error.message))
      }
    },

    list: async function(req,res){
      try {
        const _categoryid = req.params.category_id
        const _projectId = req.params.project_id
        var _data = await Card.find({$and:[{"Project" : _projectId}]}).exec()
        res.send(new ReturnObj(true, 'MSG_USER_ADDED_ON_BOARD', 200, _data))
      } catch (error) {
        res.status(500).send(new ReturnObj(false, 'ERR_MEMBER_NOT_ADDED', 500, error.message))
      }
    },

    move: async function(req,res){
      try {
        console.log(req.body)
        const _projectId = req.params.project_id
        const oldCard = req.body
        const newCategoryId = req.params.newCategoryId

        var _card = await Card.findByIdAndUpdate(oldCard._id, { Category: newCategoryId }).exec()
        _card.Category = newCategoryId

        
        var logs = { userId: req.caller_id, type: "Move_Card", card: _card, categoryId: oldCard.Category, newCategoryId: newCategoryId, projectid: _projectId }
        console.log(logs)
        const resp1 = await LogService.save(res,logs)

        var customResponse = { newCard: _card , oldCard: oldCard}
        res.io.to(_projectId).emit("move card", customResponse);
        console.log(customResponse)
        res.send(new ReturnObj(true, 'MSG_USER_ADDED_ON_BOARD', 200, customResponse))

      } catch (error) {
        res.status(500).send(new ReturnObj(false, 'ERR_MEMBER_NOT_UPDATED', 500, error.message))
      }
    },

    remove: async function(req,res){
        try {
          const _projectId = req.params.project_id
          console.log(req.params.id)
           _data = await Card.findByIdAndDelete(req.params.id).exec()
          res.io.to(_projectId).emit("remove card", _data);
          res.send(new ReturnObj(true, 'MSG_USER_ADDED_ON_BOARD', 200, _data))
        } catch (error) {
          res.status(500).send(new ReturnObj(false, 'ERR_MEMBER_NOT_ADDED', 500, error.message))
        }
    }

}