export function checkAndTriggerReminders(reminders, callback){
    if(!reminders || reminders.length===0) return
    const now = new Date()
    reminders.forEach(r=>{
      const d = new Date(r.date)
      const todayStr = now.toISOString().slice(0,10)
      if(r.lastTriggered === todayStr) return
      if(d <= now){
        callback(r)
        r.lastTriggered = todayStr
      }
    })
  }
  