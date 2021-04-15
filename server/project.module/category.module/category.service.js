const Project = require('./../project.model')
const Category = require('./category.model')

const ReturnObj = require('../../models/return-object.model')


module.exports = {

    save: async function(req,res){
     try {
        try {
            const _projectId = req.params.project_id
            const _category = new Category(req.body)
           
            const qry = {  $addToSet: { 'Category': _category } }
            // const _data = await Category.findByIdAndUpdate({ _id: _category }, qry, { new: true })
            const _project = await Project.findByIdAndUpdate({ _id: _projectId }, qry, { new: true })

            await _project.save()
            res.send(new ReturnObj(true, 'MSG_USER_ADDED_ON_BOARD', 200, _project))
         
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
    },

    list: async function(req,res){
        try {
            const _projectId = req.params.project_id
            const _data = await Category.find({ Project: _projectId }).populate('Cards', 'Tile').exec()
      
            res.send(new ReturnObj(true, 'MSG_USER_ADDED_ON_BOARD', 200, _data))
        } catch (error) {
            res.status(500).send(new ReturnObj(false, 'ERR_MEMBER_NOT_ADDED', 500, error.message))
        }
    }
}