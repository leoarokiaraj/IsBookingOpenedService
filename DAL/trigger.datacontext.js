const admin = require('firebase-admin');
const serviceAccount = require('../firebase-config/admin.json');

const getAllTriggers = async() => {
  try {
    let db = await connection()
    let triggerRef = db.ref("/triggers");
    return triggerRef.once("value").then((snapshot) => {
      return snapshot.val();
    }).catch((error) => { throw new Error(error.message) })
  } catch (error) {
    throw new Error(error.message)
  }
}

const getTriggersCount = async() => {
  let db = await connection()
  let triggerRef = db.ref("/triggers");
  return triggerRef.once("value").then((snapshot) => {
    return snapshot.numChildren();
  }).catch((error) => {
    throw new Error(error.message)
  })
}

const addUpdateTriggers = async(trigger) => {
try {
  let db = await connection()
  let triggerRef = db.ref("/triggers");

  if (trigger.trigger_id <= 0) {
    let triggerPushRef = triggerRef.push()
    trigger.trigger_id = triggerPushRef.key
    return triggerPushRef.set(trigger).then(() => {
      return {"msg":"trigger created sucessfully"};
    }).catch((error) => { 
      throw new Error(error.message)
    })
  }
  const triggerChild = triggerRef.child(trigger.trigger_id);
  return triggerChild.update(trigger).then(() => {
    return {"msg":"trigger update sucessfully"};
  }).catch((error) => { 
    throw new Error(error.message)
  })
} catch (error) {
  throw new Error(error.message)
}
 
}


const deleteTriggers = async(trigger_id) => {

  try {
    let db = await connection()
    let triggerRef = db.ref("/triggers/" + trigger_id);
    return triggerRef.remove().then( () => {
      return {"msg" : "deleted sucessfully"}
    }).catch( () => {
      return {"msg" : "an error occurred while deleting"}
    })
  } catch (error) {
    throw new Error(error.message)
  }

 
}

const connection = async() => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://isbookingopened1-default-rtdb.asia-southeast1.firebasedatabase.app/",
      databaseAuthVariableOverride: {
           uid: "is-booking-opened-service-account"
          }
      });
  }
  return admin.database();
}

TriggerDataContext = {
    getAllTriggers,
    addUpdateTriggers,
    deleteTriggers
}

module.exports = {
    TriggerDataContext
  }