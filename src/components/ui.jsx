import { useState } from 'react'
import { Menu, X, Bookmark, BookmarkCheck, Search } from 'lucide-react'
import { CATEGORIES } from '../data/vocabulary'

export const Badge = ({ cat }) => (
  <span className="inline-block rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">{CATEGORIES[cat]}</span>
)

const LINKS = [['/', 'Beranda'], ['/dashboard', 'Dashboard'], ['/cari', 'Cari Kosakata'], ['/kosakata-saya', 'Kosakata Saya'], ['/tentang', 'Tentang']]

export function Logo() {
  return (
    <a href="#/" className="flex items-center gap-2 font-extrabold tracking-tight">
      <img src="/favicon.svg" alt="" className="h-8 w-8" /> AKADEMIK BRIDGE
    </a>
  )
}

export function Nav({ path, savedCount }) {
  const [open, setOpen] = useState(false)
  const active = (p) => (p === '/' ? path === '/' : path.startsWith(p))
  return (
    <header className="sticky top-0 z-20 border-b border-primary/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />
        <nav className="hidden gap-1 md:flex">
          {LINKS.map(([p, l]) => (
            <a key={p} href={'#' + p} className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-canvas ${active(p) ? 'bg-canvas text-secondary' : ''}`}>
              {l}{p === '/kosakata-saya' && savedCount > 0 && <span className="ml-1.5 rounded-full bg-secondary px-1.5 text-xs text-white">{savedCount}</span>}
            </a>
          ))}
        </nav>
        <button className="rounded-lg p-2 md:hidden" aria-label="Buka menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="border-t border-primary/10 bg-white px-4 py-2 md:hidden">
          {LINKS.map(([p, l]) => (
            <a key={p} href={'#' + p} onClick={() => setOpen(false)} className={`block rounded-lg px-3 py-3 font-medium ${active(p) ? 'text-secondary' : ''}`}>{l}</a>
          ))}
        </nav>
      )}
    </header>
  )
}

export const Footer = () => (
  <footer className="mt-20 border-t border-primary/10 bg-white">
    <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-primary/70 md:flex-row md:justify-between">
      <span>© 2026 AKADEMIK BRIDGE · Prototipe PKM-KC</span>
      <span>Bridge the Language Gap, Understand Academic Knowledge.</span>
    </div>
  </footer>
)

export function SaveButton({ saved, onClick, big }) {
  const Icon = saved ? BookmarkCheck : Bookmark
  return (
    <button onClick={onClick} aria-pressed={saved}
      className={`inline-flex items-center gap-2 rounded-xl font-semibold transition-colors ${big ? 'px-4 py-2.5' : 'p-2'} ${saved ? 'bg-accent text-white' : 'bg-canvas text-primary hover:bg-secondary/10'}`}
      aria-label={saved ? 'Hapus dari kosakata saya' : 'Simpan kosakata'}>
      <Icon size={18} />{big && (saved ? 'Tersimpan' : 'Simpan Kosakata')}
    </button>
  )
}

export function WordCard({ w, saved, toggle }) {
  return (
    <div className="flex flex-col rounded-2xl border border-primary/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <a href={`#/kata/${w.id}`} className="text-lg font-bold hover:text-secondary">{w.word}</a>
        <SaveButton saved={saved} onClick={() => toggle(w.id)} />
      </div>
      <div className="mt-1"><Badge cat={w.category} /></div>
      <p className="mt-3 line-clamp-2 text-sm text-primary/80">{w.definition_id}</p>
      <p className="mt-2 line-clamp-1 text-sm text-primary/60">{w.explanation_th}</p>
    </div>
  )
}

export function SearchBox({ defaultValue = '', onSubmit, onChange, big }) {
  const [v, setV] = useState(defaultValue)
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit?.(v) }} className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={20} />
      <input value={v} onChange={(e) => { setV(e.target.value); onChange?.(e.target.value) }} placeholder="Cari kosakata atau penjelasan Thai…"
        aria-label="Cari kosakata" className={`w-full rounded-xl border border-primary/15 bg-white pl-12 pr-4 shadow-sm focus:border-secondary focus:outline-none ${big ? 'py-4' : 'py-3'}`} />
    </form>
  )
}
