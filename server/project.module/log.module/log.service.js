const Log = require('./log.model')
const Category = require('./../category.module/category.model')
const User = require('./../../user.module/user.model')
const ReturnObj = require('./../../models/return-object.model')
const Project = require('./../project.model')
module.exports = {

    list: async function(req,res) {
        try {
            
            const _projectId = req.params.project_id
            const _data = await Log.find({$and:[{ "Project" : _projectId}]}).populate('Category', 'Title').exec()
            console.log(_data)
            res.send(new ReturnObj(true, 'MSG_SUCCESS', 200, _data))
        } catch (error) {
            res.status(500).send(new ReturnObj(false, 'ERR_SOMETHING_WENT_WRONG', 500, error.message))
        }
    },  

    listAll: async function(req,res) {
        try {
            const _userId = req.caller_id
            const _projectId = req.params.project_id
           
            var _dataProjectIds = await Project.find({ $or: [{ 'CreatedBy' : _userId }, { 'Members' : _userId}] }).select('_id').exec()

            const _data = await Log.find( { "Project" : {$in:  _dataProjectIds  }}).populate('Project', 'Title').sort({'CreatedDate':'-1'}).exec()
            console.log(_data)
            res.status(200).send(new ReturnObj(true, 'MSG_SUCCESS', 200, _data))
        } catch (error) {
            res.status(500).send(new ReturnObj(false, 'ERR_SOMETHING_WENT_WRONG', 500, error.message))
        }
    },  

    
    save: async function(res,log) {
      
        try {
            //TODO: Implement Firebase Notifications
            console.log('----------------------------')
            let text = await this.getTypeString(log)
            var _log = new Log()
            _log.Description = text
            _log.Project = log.projectid
            _log.User = log.userId
            _log.CreatedDate = Date.now()

            await _log.save()
            _log.populate = await Log.populate(_log,{path: 'Project',select: 'Title'})
            console.log(_log)
            await res.io.to(log.projectid).emit("new notification", _log);
        } catch (error) {
            console.log(error)
        }
    },
    // + log.card.Title + "to" + log.categoryId
    getTypeString: async function(log) {
        console.log('getTypeString')
        var user = await User.findById(log.userId).exec()
        switch (log.type) {
            case "Save_Card":
                  var category = await Category.findById(log.categoryId).exec()
                    return user.Name + ' ' + user.Surname + ' added ' + log.card.Title + ' to ' + category.Title; 
            case "Move_Card":
                console.log('Card Moved')

                var category = await Category.findById(log.categoryId).exec()
                var newCategory = await Category.findById(log.newCategoryId).exec()
         
                return user.Name + ' ' + user.Surname + ' moved ' + log.card.Title + " from " + category.Title + ' to ' + newCategory.Title; 
            default:
                    return 'dasddd';
                
        }
    }
}
