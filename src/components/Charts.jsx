import 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  LineChart, Line,
} from 'recharts'
import { PROTOCOL_DATA, buildTimelineData } from '../mockData.js'

const TICK_STYLE = { fontFamily: 'var(--mono)', fontSize: 10, fill: '#6b7280' }

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--bg2)', border: '1px solid var(--border2)',
      borderRadius: 6, padding: '8px 12px', fontSize: 12,
    }}>
      <div style={{ color: 'var(--muted2)', marginBottom: 4, fontFamily: 'var(--mono)', fontSize: 10 }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: <strong style={{ color: 'var(--text)' }}>{p.value}</strong>
        </div>
      ))}
    </div>
  )
}

export function ProtocolChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={PROTOCOL_DATA} barSize={28} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <XAxis dataKey="name" tick={TICK_STYLE} axisLine={false} tickLine={false} />
        <YAxis tick={TICK_STYLE} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
        <Bar dataKey="value" name="Attacks" radius={[4, 4, 0, 0]}>
          {PROTOCOL_DATA.map((entry, i) => (
            <Cell key={i} fill={entry.color} fillOpacity={0.85} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function TimelineChart() {
  const { labels, malicious, suspicious } = buildTimelineData()
  const data = labels.map((label, i) => ({
    label,
    Malicious: malicious[i],
    Suspicious: suspicious[i],
  }))

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <XAxis dataKey="label" tick={TICK_STYLE} axisLine={false} tickLine={false} interval={2} />
        <YAxis tick={TICK_STYLE} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone" dataKey="Malicious"
          stroke="#f05252" strokeWidth={1.5} dot={false}
          activeDot={{ r: 3, fill: '#f05252' }}
        />
        <Line
          type="monotone" dataKey="Suspicious"
          stroke="#f59e0b" strokeWidth={1.5} dot={false}
          activeDot={{ r: 3, fill: '#f59e0b' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}