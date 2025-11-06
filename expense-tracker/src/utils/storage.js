export const loadStorage = (key) => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : null
    } catch(e){ console.error(e); return null }
  }
  export const saveStorage = (key, payload)=>{
    try { localStorage.setItem(key, JSON.stringify(payload)) } catch(e){ console.error(e) }
  }
  