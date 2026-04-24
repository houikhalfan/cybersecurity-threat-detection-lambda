// ─────────────────────────────────────────────────────────────
//  MOCK DATA
//  TODO: Replace each export with a fetch() to your Spring Boot API
//  e.g.  export const fetchTopIPs = () => fetch('/api/threats/top-ips').then(r => r.json())
// ─────────────────────────────────────────────────────────────

export const METRICS = {
  totalEvents:  14832,
  malicious:    347,
  suspicious:   1204,
  blocked:      89,
  avgLatencyMs: 2300,
}

export const TOP_IPS = [
  { ip: '185.220.101.47', country: 'RU', score: 98, type: 'malicious',  attacks: 142 },
  { ip: '45.142.212.33',  country: 'CN', score: 91, type: 'malicious',  attacks: 87  },
  { ip: '103.21.244.0',   country: 'US', score: 84, type: 'malicious',  attacks: 63  },
  { ip: '194.165.16.5',   country: 'DE', score: 76, type: 'suspicious', attacks: 41  },
  { ip: '91.108.4.0',     country: 'NL', score: 68, type: 'suspicious', attacks: 29  },
  { ip: '203.0.113.44',   country: 'JP', score: 62, type: 'suspicious', attacks: 22  },
]

export const GEO_THREATS = [
  { lon:  37.6, lat:  55.7, label: 'Moscow, RU',      ip: '185.220.101.47', type: 'mal', attacks: 142 },
  { lon: 116.4, lat:  39.9, label: 'Beijing, CN',      ip: '45.142.212.33',  type: 'mal', attacks: 87  },
  { lon: -74.0, lat:  40.7, label: 'New York, US',     ip: '103.21.244.0',   type: 'mal', attacks: 63  },
  { lon:  13.4, lat:  52.5, label: 'Berlin, DE',       ip: '194.165.16.5',   type: 'sus', attacks: 41  },
  { lon:   4.9, lat:  52.4, label: 'Amsterdam, NL',    ip: '91.108.4.0',     type: 'sus', attacks: 29  },
  { lon: 139.7, lat:  35.7, label: 'Tokyo, JP',        ip: '203.0.113.44',   type: 'mal', attacks: 51  },
  { lon: -46.6, lat: -23.5, label: 'São Paulo, BR',    ip: '177.54.144.0',   type: 'sus', attacks: 18  },
  { lon:  72.8, lat:  19.0, label: 'Mumbai, IN',       ip: '103.88.120.0',   type: 'sus', attacks: 22  },
  { lon:  31.2, lat:  30.0, label: 'Cairo, EG',        ip: '41.67.112.0',    type: 'sus', attacks: 14  },
  { lon:  -3.7, lat:  40.4, label: 'Madrid, ES',       ip: '213.97.0.0',     type: 'sus', attacks: 11  },
]

export const PROTOCOL_DATA = [
  { name: 'HTTP',  value: 412, color: '#f05252' },
  { name: 'SSH',   value: 287, color: '#f59e0b' },
  { name: 'TCP',   value: 198, color: '#3b82f6' },
  { name: 'FTP',   value: 76,  color: '#10b981' },
  { name: 'DNS',   value: 44,  color: '#8b5cf6' },
]

export const INITIAL_ALERTS = [
  { id: 1, type: 'mal', ip: '185.220.101.47', location: 'Moscow, RU',      desc: 'SQL injection detected — /admin/login.php',          time: 'just now' },
  { id: 2, type: 'mal', ip: '45.142.212.33',  location: 'Beijing, CN',     desc: 'Brute-force: 12 failed SSH logins in 60s',            time: '1m ago'   },
  { id: 3, type: 'sus', ip: '103.21.244.0',   location: 'New York, US',    desc: 'Port scan: 34 TCP ports probed in 3 min',             time: '3m ago'   },
  { id: 4, type: 'ok',  ip: '91.108.4.0',     location: 'Amsterdam, NL',   desc: 'Auto-blocked — threat score exceeded threshold',      time: '5m ago'   },
  { id: 5, type: 'mal', ip: '203.0.113.44',   location: 'Tokyo, JP',       desc: 'XSS payload detected in request_path',               time: '7m ago'   },
  { id: 6, type: 'sus', ip: '177.54.144.0',   location: 'São Paulo, BR',   desc: 'Anomalous transfer: 14 MB in 8s',                    time: '11m ago'  },
  { id: 7, type: 'mal', ip: '41.67.112.0',    location: 'Cairo, EG',       desc: 'nikto scanner signature in user-agent',              time: '14m ago'  },
  { id: 8, type: 'sus', ip: '103.88.120.0',   location: 'Mumbai, IN',      desc: 'Repeated 403 errors — directory enumeration',        time: '18m ago'  },
  { id: 9, type: 'ok',  ip: '194.165.16.5',   location: 'Berlin, DE',      desc: 'Auto-blocked after 3 failed auth attempts',          time: '22m ago'  },
]

// Simulated new alerts that come in over time
// TODO: Replace with WebSocket → ws://localhost:8080/ws/alerts
export const SIMULATED_STREAM = [
  { type: 'mal', ip: '91.239.201.0',  location: 'Kiev, UA',       desc: "sqlmap detected in user-agent" },
  { type: 'sus', ip: '146.70.124.0',  location: 'London, GB',     desc: "Unusual 2.3 GB outbound transfer" },
  { type: 'mal', ip: '5.188.86.0',    location: 'Minsk, BY',      desc: "Brute-force: 8 failed logins in 45s" },
  { type: 'sus', ip: '185.130.5.0',   location: 'Bucharest, RO',  desc: "Port scan via UDP detected" },
  { type: 'mal', ip: '45.95.147.0',   location: 'Frankfurt, DE',  desc: "' OR 1=1-- in request path" },
]

export function buildTimelineData() {
  const labels = Array.from({ length: 13 }, (_, i) => {
    const h = (new Date().getHours() - 12 + i + 24) % 24
    return `${String(h).padStart(2, '0')}:00`
  })
  return {
    labels,
    malicious:  [12, 8, 21, 34, 18, 9, 45, 67, 38, 52, 41, 29, 35],
    suspicious: [45, 38, 60, 88, 72, 55, 90, 120, 95, 110, 88, 75, 92],
  }
}