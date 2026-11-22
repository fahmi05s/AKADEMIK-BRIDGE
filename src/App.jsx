import { useHash, useList } from './hooks/useStore'
import { Nav, Footer } from './components/ui'
import { Landing, Dashboard, Search, Detail, Saved, About, NotFound } from './pages'

export default function App() {
  const hash = useHash()
  const [path, qs] = hash.split('?')
  const params = new URLSearchParams(qs || '')
  const [saved, setSaved] = useList('ab_saved')
  const [recent, setRecent] = useList('ab_recent')
  const toggle = (id) => setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  let page
  const m = path.match(/^\/kata\/(\d+)$/)
  if (path === '/') page = <Landing />
  else if (path === '/dashboard') page = <Dashboard saved={saved} recent={recent} />
  else if (path === '/cari') page = <Search key={hash} params={params} saved={saved} toggle={toggle} />
  else if (m) page = <Detail key={m[1]} id={+m[1]} saved={saved} toggle={toggle} setRecent={setRecent} />
  else if (path === '/kosakata-saya') page = <Saved saved={saved} toggle={toggle} />
  else if (path === '/tentang') page = <About />
  else page = <NotFound />

  return (
    <div className="flex min-h-screen flex-col">
      <Nav path={path} savedCount={saved.length} />
      <main className="flex-1">{page}</main>
      <Footer />
    </div>
  )
}
