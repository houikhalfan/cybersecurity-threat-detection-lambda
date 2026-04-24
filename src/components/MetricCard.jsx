import 'react'

const styles = {
  card: {
    background: 'var(--bg2)',
    border: '1px solid var(--border)',
    borderRadius: 10,
    padding: '16px 18px',
    position: 'relative',
    overflow: 'hidden',
    animation: 'fadeUp .4s ease both',
  },
  accent: {
    position: 'absolute',
    top: 0, left: 0,
    width: 3,
    height: '100%',
    borderRadius: '10px 0 0 10px',
  },
  label: {
    fontFamily: 'var(--mono)',
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: '.1em',
    color: 'var(--muted)',
    marginBottom: 8,
  },
  value: {
    fontSize: 26,
    fontWeight: 300,
    lineHeight: 1,
    marginBottom: 4,
  },
  sub: {
    fontSize: 11,
    color: 'var(--muted)',
  },
}

export default function MetricCard({ label, value, sub, accentColor, valueColor, delay = 0 }) {
  return (
    <div style={{ ...styles.card, animationDelay: `${delay}s` }}>
      <div style={{ ...styles.accent, background: accentColor }} />
      <div style={styles.label}>{label}</div>
      <div style={{ ...styles.value, color: valueColor || 'var(--text)' }}>{value}</div>
      <div style={styles.sub}>{sub}</div>
    </div>
  )
}