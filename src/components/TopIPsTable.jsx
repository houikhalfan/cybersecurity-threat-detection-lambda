import 'react'
import { TOP_IPS } from '../mockData.js'

function Badge({ type }) {
  const styles = {
    mal: { background: 'var(--red-dim)',    color: 'var(--red)'    },
    sus: { background: 'var(--orange-dim)', color: 'var(--orange)' },
  }
  const s = type === 'malicious' ? styles.mal : styles.sus
  return (
    <span style={{
      ...s,
      fontSize: 9,
      fontFamily: 'var(--mono)',
      textTransform: 'uppercase',
      letterSpacing: '.06em',
      padding: '2px 7px',
      borderRadius: 4,
    }}>
      {type}
    </span>
  )
}

export default function TopIPsTable() {
  return (
    <div>
      {TOP_IPS.map(r => (
        <div key={r.ip} style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto auto',
          alignItems: 'center',
          gap: 10,
          padding: '8px 0',
          borderBottom: '1px solid var(--border)',
        }}>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text)' }}>{r.ip}</div>
            <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>{r.country} · {r.attacks} hits</div>
          </div>
          <div style={{ width: 60, height: 3, background: 'var(--bg3)', borderRadius: 2 }}>
            <div style={{
              width: `${r.score}%`,
              height: 3,
              borderRadius: 2,
              background: r.type === 'malicious' ? 'var(--red)' : 'var(--orange)',
            }} />
          </div>
          <Badge type={r.type} />
        </div>
      ))}
    </div>
  )
}