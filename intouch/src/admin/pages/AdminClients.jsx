import React, { useEffect, useState, useRef } from 'react'
import { supabase } from '../supabase/client'
import AdminLayout from '../components/AdminLayout'

const BLANK = { name: '', website: '', industry: '' }

export default function AdminClients() {
  const [clients,  setClients]  = useState([])
  const [loading,  setLoading]  = useState(true)
  const [saving,   setSaving]   = useState(false)
  const [progress, setProgress] = useState(0)
  const [modal,    setModal]    = useState(false)
  const [confirm,  setConfirm]  = useState(null)
  const [form,     setForm]     = useState(BLANK)
  const [logoFile, setLogoFile] = useState(null)
  const [preview,  setPreview]  = useState(null)
  const fileRef = useRef()

  const fetchClients = async () => {
    setLoading(true)
    const { data } = await supabase.from('clients').select('*').order('created_at', { ascending: false })
    setClients(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchClients() }, [])

  const openAdd = () => {
    setForm(BLANK)
    setLogoFile(null)
    setPreview(null)
    setProgress(0)
    setModal(true)
  }

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setLogoFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const uploadLogo = async (file) => {
    const ext  = file.name.split('.').pop()
    const path = `${Date.now()}.${ext}`

    setProgress(10)
    const { error } = await supabase.storage.from('client-logos').upload(path, file, { upsert: false })
    if (error) throw error
    setProgress(100)

    const { data: { publicUrl } } = supabase.storage.from('client-logos').getPublicUrl(path)
    return { url: publicUrl, path }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    setSaving(true)
    try {
      let logo_url = null, logo_path = null
      if (logoFile) {
        const result = await uploadLogo(logoFile)
        logo_url  = result.url
        logo_path = result.path
      }
      await supabase.from('clients').insert({ ...form, logo_url, logo_path })
      setModal(false)
      fetchClients()
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
      setProgress(0)
    }
  }

  const handleDelete = async () => {
    if (!confirm) return
    try {
      const client = clients.find(c => c.id === confirm)
      if (client?.logo_path) {
        await supabase.storage.from('client-logos').remove([client.logo_path])
      }
      await supabase.from('clients').delete().eq('id', confirm)
      setConfirm(null)
      fetchClients()
    } catch (err) {
      console.error(err)
    }
  }

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <AdminLayout page="clients">

      <div className="a-section-header">
        <h3 className="a-section-title">All Clients ({clients.length})</h3>
        <button className="a-btn a-btn-primary" onClick={openAdd}>+ Add Client</button>
      </div>

      {loading ? (
        <div className="a-spinner" />
      ) : clients.length === 0 ? (
        <div className="a-empty">
          <div className="a-empty-icon">🏢</div>
          <h3>No clients yet</h3>
          <p>Add your first client to showcase them on the website.</p>
        </div>
      ) : (
        <div className="a-clients-grid">
          {clients.map(client => (
            <div key={client.id} className="a-client-card">
              {client.logo_url ? (
                <img src={client.logo_url} alt={client.name} className="a-client-logo" />
              ) : (
                <div className="a-client-logo-placeholder">
                  {client.name.slice(0, 1).toUpperCase()}
                </div>
              )}
              <div className="a-client-name">{client.name}</div>
              {client.industry && <span className="a-badge a-badge-indigo">{client.industry}</span>}
              {client.website && (
                <a href={client.website} target="_blank" rel="noreferrer" className="a-client-website">
                  🔗 Visit Site
                </a>
              )}
              <button
                className="a-btn a-btn-danger a-btn-sm"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => setConfirm(client.id)}
              >
                🗑 Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="a-modal-overlay" onClick={e => e.target === e.currentTarget && setModal(false)}>
          <div className="a-modal">
            <div className="a-modal-header">
              <span className="a-modal-title">+ Add New Client</span>
              <button className="a-modal-close" onClick={() => setModal(false)}>×</button>
            </div>

            <form onSubmit={handleSave}>
              <div className="a-modal-body">
                <div className="a-form-group">
                  <label>Client Name *</label>
                  <input className="a-input" placeholder="e.g. Acme Corp" value={form.name}
                    onChange={e => set('name', e.target.value)} required />
                </div>

                <div className="a-form-group">
                  <label>Industry</label>
                  <input className="a-input" placeholder="e.g. E-commerce, Healthcare" value={form.industry}
                    onChange={e => set('industry', e.target.value)} />
                </div>

                <div className="a-form-group">
                  <label>Website URL</label>
                  <input className="a-input" type="url" placeholder="https://example.com" value={form.website}
                    onChange={e => set('website', e.target.value)} />
                </div>

                <div className="a-form-group">
                  <label>Client Logo</label>
                  <label className="a-file-label" onClick={() => fileRef.current?.click()}>
                    <span>🖼</span>
                    <span>{logoFile ? logoFile.name : 'Click to upload logo (PNG, JPG, SVG)'}</span>
                  </label>
                  <input type="file" ref={fileRef} style={{ display: 'none' }}
                    accept="image/*" onChange={handleFile} />
                </div>

                {preview && (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={preview} alt="preview" style={{
                      width: 80, height: 80, objectFit: 'contain', borderRadius: 12,
                      background: 'rgba(255,255,255,0.06)', padding: 8,
                    }} />
                  </div>
                )}

                {saving && progress > 0 && (
                  <div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--a-text2)', marginBottom: 4 }}>
                      Uploading logo… {progress}%
                    </div>
                    <div style={{ height: 4, borderRadius: 4, background: 'var(--a-border)', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', width: `${progress}%`,
                        background: 'var(--a-teal)', transition: 'width 0.2s ease',
                      }} />
                    </div>
                  </div>
                )}
              </div>

              <div className="a-modal-footer">
                <button type="button" className="a-btn a-btn-ghost" onClick={() => setModal(false)}>Cancel</button>
                <button type="submit" className="a-btn a-btn-primary" disabled={saving}>
                  {saving ? '⏳ Saving...' : '+ Add Client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {confirm && (
        <div className="a-modal-overlay" onClick={e => e.target === e.currentTarget && setConfirm(null)}>
          <div className="a-modal a-confirm">
            <div className="a-modal-header">
              <span className="a-modal-title">Remove Client</span>
              <button className="a-modal-close" onClick={() => setConfirm(null)}>×</button>
            </div>
            <div className="a-confirm-body">
              <div className="a-confirm-icon">🏢</div>
              <h3>Remove this client?</h3>
              <p>The client and their logo will be permanently deleted.</p>
            </div>
            <div className="a-modal-footer">
              <button className="a-btn a-btn-ghost" onClick={() => setConfirm(null)}>Cancel</button>
              <button className="a-btn a-btn-danger" onClick={handleDelete}>Remove</button>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  )
}
