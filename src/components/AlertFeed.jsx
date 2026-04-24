import  { useState, useEffect, useRef } from 'react'
import { INITIAL_ALERTS, SIMULATED_STREAM } from '../mockData.js'

// TODO: Replace simulation with WebSocket:
// const ws = new WebSocket('ws://localhost:8080/ws/alerts')
// ws.onmessage = (e) => addAlert(JSON.parse(e.data))

const TYPE_COLOR = {
  mal: 'var(--red)',
  sus: 'var(--orange)',
  ok:  'var(--green)',
}

const TYPE_LABEL = {
  mal: 'malicious',
  sus: 'suspicious',
  ok:  'blocked',
}

function AlertItem({ alert }) {
  return (
    <div style={{
      background: 'var(--bg3)',
      border: `1px solid var(--border)`,
      borderLeft: `2px solid ${TYPE_COLOR[alert.type]}`,
      borderRadius: 8,
      padding: '12px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      animation: 'fadeUp .3s ease both',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text)' }}>{alert.ip}</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)' }}>{alert.time}</span>
      </div>
      <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{alert.location}</div>
      <div style={{ fontSize: 12, color: 'var(--muted2)', lineHeight: 1.4 }}>{alert.desc}</div>
      <span style={{
        alignSelf: 'flex-start',
        fontSize: 9,
        fontFamily: 'var(--mono)',
        textTransform: 'uppercase',
        letterSpacing: '.06em',
        padding: '2px 7px',
        borderRadius: 4,
        background: `${TYPE_COLOR[alert.type]}20`,
        color: TYPE_COLOR[alert.type],
      }}>
        {TYPE_LABEL[alert.type]}
      </span>
    </div>
  )
}

export default function AlertFeed() {
  const [alerts, setAlerts] = useState(INITIAL_ALERTS)
  const streamIndex = useRef(0)
  const idCounter = useRef(100)

  useEffect(() => {
    const interval = setInterval(() => {
      const template = SIMULATED_STREAM[streamIndex.current % SIMULATED_STREAM.length]
      streamIndex.current++
      const newAlert = {
        ...template,
        id: idCounter.current++,
        time: 'just now',
      }
      setAlerts(prev => [newAlert, ...prev].slice(0, 12))
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 10,
      maxHeight: 220,
      overflowY: 'auto',
    }}>
      {alerts.map(a => <AlertItem key={a.id} alert={a} />)}
    </div>
  )
}