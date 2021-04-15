const Card = require('./card.model')
const Category = require('../category.model')
const ReturnObj = require('../../../models/return-object.model')


module.exports = {

    save: async function(req,res){
     try {
        try {
            const _card = new Card(req.body)
            const _categoryid = req.params.category_id
            const _projectId = req.params.project_id

            _card.Project = _projectId
            _card.Category = _categoryid
            await _card.save()
            res.send(new ReturnObj(true, 'MSG_USER_ADDED_ON_BOARD', 200, _card))
         
          } catch (error) {
            res.status(500).send(new ReturnObj(false, 'ERR_MEMBER_NOT_ADDED', 500, error.message))
          }
     } catch (error) {
         
     }
    },

    remove: async function(req,res){
        try {
         
        } catch (error) {
            
        }
    }

}