const Project = require('./../project.model')
const Category = require('./category.model')

const ReturnObj = require('../../models/return-object.model')



module.exports = {

    save: async function(req,res){
     try {
        try {
            const _projectId = req.params.project_id
            const _category = new Category(req.body)
            await _category.save()

            const qry = {  $addToSet: { 'Categories': _category } }
            const _project = await Project.findByIdAndUpdate({ _id: _projectId }, qry, { new: true })

            await _project.save()
                    
            res.io.to(_projectId).emit("new category", _category);
            res.send(new ReturnObj(true, 'MSG_USER_ADDED_ON_BOARD', 200, _category))
         
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
            io.on('connection', () => { /* … */ });
            res.send(new ReturnObj(true, 'MSG_USER_ADDED_ON_BOARD', 200, _data))
        } catch (error) {
            res.status(500).send(new ReturnObj(false, 'ERR_MEMBER_NOT_ADDED', 500, error.message))
        }
    }
}