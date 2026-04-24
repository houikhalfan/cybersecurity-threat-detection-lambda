import  { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import { GEO_THREATS } from '../mockData.js'

export default function WorldMap() {
  const svgRef = useRef(null)
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, data: null })

  useEffect(() => {
    const el = svgRef.current
    if (!el) return
    const W = el.parentElement.clientWidth - 40 || 600
    const H = 280

    const svg = d3.select(el).attr('viewBox', `0 0 ${W} ${H}`)
    svg.selectAll('*').remove()

    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then(world => {
      const proj = d3.geoNaturalEarth1().scale(W / 6.5).translate([W / 2, H / 2])
      const path = d3.geoPath(proj)

      svg.append('g')
        .selectAll('path')
        .data(topojson.feature(world, world.objects.countries).features)
        .join('path')
        .attr('d', path)
        .attr('fill', '#1a1f2a')
        .attr('stroke', '#2a3040')
        .attr('stroke-width', 0.5)

      GEO_THREATS.forEach(d => {
        const [px, py] = proj([d.lon, d.lat])
        if (!px || !py) return

        const color = d.type === 'mal' ? '#f05252' : '#f59e0b'
        const r = d.type === 'mal' ? 6 : 4

        const g = svg.append('g')
          .attr('transform', `translate(${px},${py})`)
          .style('cursor', 'pointer')

        // Pulse ring
        g.append('circle').attr('r', r + 6).attr('fill', color).attr('opacity', 0.1)
        // Dot
        g.append('circle').attr('r', r).attr('fill', color).attr('opacity', 0.85)

        g.on('mouseover', (event) => {
          setTooltip({ visible: true, x: event.clientX, y: event.clientY, data: d })
        })
        .on('mousemove', (event) => {
          setTooltip(prev => ({ ...prev, x: event.clientX, y: event.clientY }))
        })
        .on('mouseout', () => {
          setTooltip(prev => ({ ...prev, visible: false }))
        })
      })
    })
  }, [])

  return (
    <>
      <svg
        ref={svgRef}
        style={{ width: '100%', height: 280, borderRadius: 8, background: 'var(--bg3)', display: 'block' }}
      />
      {tooltip.visible && tooltip.data && (
        <div style={{
          position: 'fixed',
          left: tooltip.x + 14,
          top: tooltip.y - 40,
          background: 'var(--bg2)',
          border: '1px solid var(--border2)',
          borderRadius: 8,
          padding: '10px 14px',
          fontSize: 12,
          pointerEvents: 'none',
          zIndex: 200,
          minWidth: 160,
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text)' }}>
            {tooltip.data.ip}
          </div>
          <div style={{ color: 'var(--muted)', fontSize: 11, marginTop: 2 }}>
            {tooltip.data.label}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: 'var(--muted)' }}>
            <span>Attacks</span>
            <span style={{ color: 'var(--text)' }}>{tooltip.data.attacks}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted)' }}>
            <span>Type</span>
            <span style={{ color: tooltip.data.type === 'mal' ? 'var(--red)' : 'var(--orange)' }}>
              {tooltip.data.type === 'mal' ? 'malicious' : 'suspicious'}
            </span>
          </div>
        </div>
      )}
    </>
  )
}