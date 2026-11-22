import { useState, useEffect } from 'react'

const read = (k) => { try { return JSON.parse(localStorage.getItem(k)) || [] } catch { return [] } }

export function useList(key) {
  const [list, setList] = useState(() => read(key))
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(list)) } catch { /* storage unavailable */ } }, [key, list])
  return [list, setList]
}

export function useHash() {
  const get = () => window.location.hash.replace(/^#/, '') || '/'
  const [hash, setHash] = useState(get)
  useEffect(() => {
    const on = () => { setHash(get()); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return hash
}
