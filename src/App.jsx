// src/App.jsx
import  { useState, useEffect } from 'react'
import MetricCard from './components/MetricCard'
import WorldMap from './components/WorldMap'
import TopIPsTable from './components/TopIPsTable'
import AlertFeed from './components/AlertFeed'
import { ProtocolChart, TimelineChart } from './components/Charts'
import { METRICS } from './mockData'

function App() {
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    // Update timestamp every minute
    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh',
      background: 'var(--bg)',
      overflow: 'hidden'
    }}>
      {/* Sidebar */}
      <div style={{
        width: 'var(--sidebar-w)',
        background: 'var(--bg2)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px 0',
        gap: 24,
      }}>
        <div style={{ 
          width: 32, height: 32, 
          background: 'var(--red-dim)', 
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
        }}>🛡️</div>
        <div style={{ writingMode: 'vertical-rl', color: 'var(--muted)', fontSize: 11, letterSpacing: 2 }}>
          THREAT MONITOR
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top Bar */}
        <div style={{
          height: 'var(--topbar-h)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          background: 'var(--bg2)',
        }}>
          <div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--red)' }}>●</span>
            <span style={{ marginLeft: 8, fontSize: 13, color: 'var(--muted2)' }}>
              REAL-TIME CYBERSECURITY DASHBOARD
            </span>
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)' }}>
            last update: {lastUpdate.toLocaleTimeString()}
          </div>
        </div>

        {/* Scrollable Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
          {/* Metrics Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 16,
            marginBottom: 24,
          }}>
            <MetricCard 
              label="Total Events" 
              value={METRICS.totalEvents.toLocaleString()} 
              sub="last 24h" 
              accentColor="#3b82f6"
              delay={0}
            />
            <MetricCard 
              label="Malicious" 
              value={METRICS.malicious} 
              sub={`+${Math.round(METRICS.malicious / METRICS.totalEvents * 100)}% of traffic`}
              accentColor="#f05252"
              valueColor="#f05252"
              delay={0.1}
            />
            <MetricCard 
              label="Suspicious" 
              value={METRICS.suspicious} 
              sub="needs investigation"
              accentColor="#f59e0b"
              valueColor="#f59e0b"
              delay={0.2}
            />
            <MetricCard 
              label="Blocked" 
              value={METRICS.blocked} 
              sub="automatic actions"
              accentColor="#10b981"
              valueColor="#10b981"
              delay={0.3}
            />
            <MetricCard 
              label="Latency" 
              value={`${METRICS.avgLatencyMs}ms`} 
              sub="real-time detection"
              accentColor="#8b5cf6"
              delay={0.4}
            />
          </div>

          {/* World Map & Top IPs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20, marginBottom: 24 }}>
            <div style={{ background: 'var(--bg2)', borderRadius: 12, padding: 18, border: '1px solid var(--border)' }}>
              <div style={{ marginBottom: 12, fontSize: 12, fontWeight: 500, letterSpacing: 0.5 }}>
                🌍 GEOGRAPHIC THREAT ORIGIN
              </div>
              <WorldMap />
            </div>
            <div style={{ background: 'var(--bg2)', borderRadius: 12, padding: 18, border: '1px solid var(--border)' }}>
              <div style={{ marginBottom: 12, fontSize: 12, fontWeight: 500, letterSpacing: 0.5 }}>
                🔥 TOP ATTACKING IPS
              </div>
              <TopIPsTable />
            </div>
          </div>

          {/* Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div style={{ background: 'var(--bg2)', borderRadius: 12, padding: 18, border: '1px solid var(--border)' }}>
              <div style={{ marginBottom: 12, fontSize: 12, fontWeight: 500, letterSpacing: 0.5 }}>
                📡 ATTACKS BY PROTOCOL
              </div>
              <ProtocolChart />
            </div>
            <div style={{ background: 'var(--bg2)', borderRadius: 12, padding: 18, border: '1px solid var(--border)' }}>
              <div style={{ marginBottom: 12, fontSize: 12, fontWeight: 500, letterSpacing: 0.5 }}>
                ⏱️ THREAT TIMELINE (12h)
              </div>
              <TimelineChart />
            </div>
          </div>

          {/* Alert Feed */}
          <div style={{ background: 'var(--bg2)', borderRadius: 12, padding: 18, border: '1px solid var(--border)' }}>
            <div style={{ marginBottom: 16, fontSize: 12, fontWeight: 500, letterSpacing: 0.5, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>🚨 LIVE ALERT FEED</span>
              <span style={{ 
                width: 8, height: 8, 
                background: 'var(--red)', 
                borderRadius: '50%',
                animation: 'blink 1.5s infinite',
                display: 'inline-block'
              }} />
            </div>
            <AlertFeed />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App