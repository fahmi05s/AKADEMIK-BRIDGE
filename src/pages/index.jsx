import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, Languages, Layers, Trash2, Clock, Quote } from 'lucide-react'
import { VOCABULARY, CATEGORIES } from '../data/vocabulary'
import { Badge, WordCard, SaveButton, SearchBox } from '../components/ui'

const byWord = (name) => VOCABULARY.find((v) => v.word === name)
const norm = (s) => s.toLowerCase().trim()
const go = (h) => { window.location.hash = h }
const H2 = ({ children }) => <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{children}</h2>

export function Landing() {
  const demo = byWord('Implementasi')
  const features = [
    [Layers, 'Definisi yang jelas', 'Setiap istilah dijelaskan dalam Bahasa Indonesia yang ringkas dan akademik.'],
    [Languages, 'Penjelasan Thai', 'Makna dijelaskan dalam Bahasa Thailand, bukan sekadar diterjemahkan kata demi kata.'],
    [BookOpen, 'Contoh konteks akademik', 'Kalimat contoh dari skripsi, kuliah, dan jurnal beserta terjemahan Thai.'],
  ]
  const steps = [['Cari', 'Ketik istilah Indonesia atau kata Thai.'], ['Pahami', 'Baca definisi, penjelasan Thai, dan contoh.'], ['Simpan', 'Tambahkan ke Kosakata Saya untuk diulang kembali.']]
  const users = ['Mahasiswa Thailand di universitas Indonesia', 'Mahasiswa pertukaran dan program internasional', 'Dosen dan pembimbing yang mendampingi mahasiswa asing']
  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">Understand Academic Indonesian, Beyond Translation.</h1>
          <p className="mt-5 max-w-xl text-lg text-primary/75">Platform pembelajaran kosakata akademik bilingual yang membantu mahasiswa internasional memahami istilah Bahasa Indonesia melalui penjelasan kontekstual.</p>
          <a href="#/cari" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white transition-colors hover:bg-secondary">Mulai Belajar <ArrowRight size={18} /></a>
        </div>
        <a href={`#/kata/${demo.id}`} className="block rounded-3xl border border-primary/10 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
          <Badge cat={demo.category} />
          <p className="mt-3 text-3xl font-extrabold">{demo.word}</p>
          <p className="mt-3 text-primary/80">{demo.definition_id}</p>
          <p className="mt-3 rounded-xl bg-canvas p-3 text-primary/80">{demo.explanation_th}</p>
          <p className="mt-4 flex gap-2 text-sm italic text-primary/65"><Quote size={16} className="mt-0.5 shrink-0 text-accent" />{demo.example_id}</p>
        </a>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <H2>Fitur utama</H2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {features.map(([Icon, t, d]) => (
            <div key={t} className="rounded-2xl border border-primary/10 bg-white p-6">
              <Icon className="text-secondary" /><h3 className="mt-3 font-bold">{t}</h3><p className="mt-1 text-sm text-primary/70">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <H2>Cara kerja</H2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {steps.map(([t, d], i) => (
            <li key={t} className="flex gap-4 rounded-2xl bg-white p-5 border border-primary/10">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent font-bold text-white">{i + 1}</span>
              <div><h3 className="font-bold">{t}</h3><p className="text-sm text-primary/70">{d}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <H2>Untuk siapa?</H2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {users.map((u) => <li key={u} className="rounded-2xl bg-primary p-5 font-medium text-white">{u}</li>)}
        </ul>
      </section>
    </>
  )
}

export function Dashboard({ saved, recent }) {
  const recents = recent.map((id) => VOCABULARY.find((v) => v.id === id)).filter(Boolean)
  const stats = [['Total kosakata', VOCABULARY.length], ['Kosakata tersimpan', saved.length]]
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Selamat datang kembali 👋</h1>
        <p className="mt-1 text-primary/70">Cari istilah akademik yang ingin kamu pahami hari ini.</p>
        <div className="mt-5 max-w-2xl"><SearchBox big onSubmit={(q) => go(`/cari?q=${encodeURIComponent(q)}`)} /></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {stats.map(([l, n]) => <div key={l} className="rounded-2xl border border-primary/10 bg-white p-5"><p className="text-4xl font-extrabold text-secondary">{n}</p><p className="text-sm text-primary/70">{l}</p></div>)}
      </div>
      <section>
        <h2 className="flex items-center gap-2 text-xl font-bold"><Clock size={20} /> Terakhir dilihat</h2>
        {recents.length === 0 ? <p className="mt-3 rounded-2xl bg-white p-5 text-primary/70">Belum ada kosakata yang dilihat. <a className="font-semibold text-secondary" href="#/cari">Mulai mencari</a>.</p> : (
          <div className="mt-3 flex flex-wrap gap-2">{recents.map((w) => <a key={w.id} href={`#/kata/${w.id}`} className="rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-medium hover:border-secondary">{w.word}</a>)}</div>
        )}
      </section>
      <section>
        <h2 className="text-xl font-bold">Kategori akademik</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(CATEGORIES).map(([k, l]) => (
            <a key={k} href={`#/cari?c=${k}`} className="rounded-2xl border border-primary/10 bg-white p-5 transition-shadow hover:shadow-md">
              <p className="font-bold">{l}</p><p className="text-sm text-primary/70">{VOCABULARY.filter((v) => v.category === k).length} kosakata</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

export function Search({ params, saved, toggle }) {
  const [q, setQ] = useState(params.get('q') || '')
  const [cat, setCat] = useState(params.get('c') || 'all')
  const results = useMemo(() => {
    const n = norm(q)
    return VOCABULARY.filter((v) => (cat === 'all' || v.category === cat) && (!n || norm(v.word).includes(n) || norm(v.definition_id).includes(n) || v.explanation_th.includes(q.trim())))
  }, [q, cat])
  const chip = (k, l) => <button key={k} onClick={() => setCat(k)} className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${cat === k ? 'bg-primary text-white' : 'bg-white border border-primary/10 hover:border-secondary'}`}>{l}</button>
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">Cari Kosakata</h1>
      <div className="mt-5 max-w-2xl"><SearchBox big defaultValue={q} onChange={setQ} /></div>
      <div className="mt-4 flex flex-wrap gap-2">{chip('all', 'Semua')}{Object.entries(CATEGORIES).map(([k, l]) => chip(k, l))}</div>
      <p className="mt-6 text-sm text-primary/70">{results.length} kosakata ditemukan</p>
      {results.length === 0 ? (
        <div className="mt-4 rounded-2xl bg-white p-8 text-center"><p className="font-bold">Tidak ada hasil untuk “{q}”</p><p className="mt-1 text-primary/70">Coba kata kunci yang lebih pendek atau pilih kategori “Semua”.</p></div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{results.map((w) => <WordCard key={w.id} w={w} saved={saved.includes(w.id)} toggle={toggle} />)}</div>
      )}
    </div>
  )
}

export function Detail({ id, saved, toggle, setRecent }) {
  const w = VOCABULARY.find((v) => v.id === id)
  useEffect(() => { if (w) setRecent((r) => [id, ...r.filter((x) => x !== id)].slice(0, 8)) }, [id])
  if (!w) return <NotFound />
  const Block = ({ title, children }) => <section className="rounded-2xl border border-primary/10 bg-white p-6"><h2 className="text-sm font-semibold text-secondary">{title}</h2><div className="mt-2 leading-relaxed">{children}</div></section>
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-10">
      <a href="#/cari" className="inline-flex items-center gap-2 text-sm font-semibold text-secondary"><ArrowLeft size={16} /> Kembali ke pencarian</a>
      <div className="flex items-start justify-between gap-4 rounded-2xl bg-primary p-6 text-white">
        <div><h1 className="text-3xl font-extrabold">{w.word}</h1><div className="mt-2"><Badge cat={w.category} /></div></div>
        <SaveButton big saved={saved.includes(id)} onClick={() => toggle(id)} />
      </div>
      <Block title="Definisi Bahasa Indonesia">{w.definition_id}</Block>
      <Block title="Penjelasan Bahasa Thailand">{w.explanation_th}</Block>
      <Block title="Contoh dalam konteks akademik"><p>{w.example_id}</p><p className="mt-2 text-primary/70">{w.example_th}</p></Block>
      <Block title="Kosakata terkait">
        <div className="flex flex-wrap gap-2">{w.related_words.map((r) => { const rw = byWord(r); return rw && <a key={r} href={`#/kata/${rw.id}`} className="rounded-full bg-canvas px-4 py-2 text-sm font-medium hover:bg-secondary/10">{r}</a> })}</div>
      </Block>
    </div>
  )
}

export function Saved({ saved, toggle }) {
  const [q, setQ] = useState('')
  const list = VOCABULARY.filter((v) => saved.includes(v.id) && (!q || norm(v.word).includes(norm(q)) || v.explanation_th.includes(q.trim())))
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">Kosakata Saya</h1>
      {saved.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-white p-10 text-center"><BookOpen className="mx-auto text-secondary" /><p className="mt-3 font-bold">Belum ada kosakata tersimpan</p><p className="text-primary/70">Buka detail kosakata lalu tekan “Simpan Kosakata”.</p><a href="#/cari" className="mt-4 inline-block rounded-xl bg-primary px-5 py-2.5 font-semibold text-white">Cari kosakata</a></div>
      ) : (
        <>
          <div className="mt-5 max-w-xl"><SearchBox onChange={setQ} /></div>
          {list.length === 0 && <p className="mt-6 text-primary/70">Tidak ada kosakata tersimpan yang cocok.</p>}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((w) => (
              <div key={w.id} className="relative">
                <WordCard w={w} saved toggle={toggle} />
                <button onClick={() => toggle(w.id)} className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-red-600"><Trash2 size={14} /> Hapus</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export function About() {
  const items = [
    ['Masalah', 'Mahasiswa Thailand yang kuliah di Indonesia sering memahami kata sehari-hari, tetapi kesulitan dengan istilah akademik seperti hipotesis, validitas, atau kajian pustaka. Kamus terjemahan biasa tidak menjelaskan konteks pemakaiannya.'],
    ['Mengapa dibuat', 'AKADEMIK BRIDGE dibuat agar istilah akademik dapat dipahami lewat definisi, penjelasan Thai, dan contoh kalimat nyata, bukan hanya padanan kata.'],
    ['Tujuan produk', 'Mempercepat pemahaman bahan kuliah dan penulisan ilmiah, serta mengurangi hambatan bahasa bagi mahasiswa internasional.'],
    ['Pengguna sasaran', 'Mahasiswa Thailand di perguruan tinggi Indonesia, mahasiswa pertukaran, dan dosen pendamping.'],
    ['Fitur utama', 'Pencarian Indonesia dan Thai, filter kategori, detail kosakata bilingual, kosakata terkait, daftar kosakata pribadi, dan riwayat terakhir dilihat.'],
  ]
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">Tentang AKADEMIK BRIDGE</h1>
      {items.map(([t, d]) => <section key={t} className="rounded-2xl border border-primary/10 bg-white p-6"><h2 className="font-bold">{t}</h2><p className="mt-1 text-primary/75">{d}</p></section>)}
      <p className="text-sm text-primary/60">Catatan: isi kosakata pada prototipe ini perlu ditinjau oleh ahli bahasa sebelum dipakai secara luas.</p>
    </div>
  )
}

export const NotFound = () => (
  <div className="mx-auto max-w-xl px-4 py-24 text-center"><h1 className="text-2xl font-bold">Halaman tidak ditemukan</h1><a href="#/" className="mt-4 inline-block font-semibold text-secondary">Kembali ke beranda</a></div>
)
