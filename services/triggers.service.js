
const { TriggerDataContext } = require('../DAL/trigger.datacontext')
const { getAllTriggers, addUpdateTriggers, deleteTriggers } = TriggerDataContext


const getAllTriggersService = async () => {
  return new Promise((resp, rejp) => {
    _getAllTriggersService(resp, rejp)
  });
}

const _getAllTriggersService = async(resp, rejp) => {
  try {  
    let data = await getAllTriggers()

    resp({
      StatusCode: 200,
      Status: "Success",
      data
    })

    } catch (error) {
      rejp({
        StatusCode: 500,
        Status: "Internal server error",
        error
      })
    }
}


const addUpdateTriggersService = async (triggerObj) => {
  return new Promise((resp, rejp) => {
    _addUpdateTriggersService(resp, rejp, triggerObj)
  });
}

const _addUpdateTriggersService = async(resp, rejp, triggerObj) => {

  try {

    let data = await addUpdateTriggers(triggerObj)

    resp({
      StatusCode: 200,
      Status: "Success",
      data
    })
    
    } catch (error) {
      rejp({ error })
    }
}
  

const deleteTriggersService = async (trigger_id) => {
  return new Promise((resp, rejp) => {
    _deleteTriggersService(resp, rejp, trigger_id)
  });
}

const _deleteTriggersService = async(resp, rejp, trigger_id) => {

  try {
    
    let data = await deleteTriggers(trigger_id)

    resp({
      StatusCode: 200,
      Status: "Success",
      data
    })
    
    } catch (error) {
      rejp({ error })
    }
}
  

TriggerService = {
  getAllTriggersService,
  addUpdateTriggersService,
  deleteTriggersService
}

module.exports = {
  TriggerService
}