Real-Time Cybersecurity Threat Detection System (Lambda Architecture)
This project implements a complete threat detection system for network logs using the Lambda Architecture (batch + speed + serving layers). Built as part of the Big Data mini-project (SITCN2), it analyzes historical and real-time network traffic to detect malicious patterns, port scans, SQLi/XSS attempts, brute-force attacks, and anomalous data transfers.

Tech Stack:
HDFS • Spark (Batch + Streaming) • Kafka • HBase • Cassandra • Grafana / HTML/JS Dashboard

Key Features:

Batch layer: Historical analysis of threat patterns, IP reputation scoring, attack timeline

Speed layer: Real-time threat detection (brute-force, attack signatures, anomalous volume) with <5s latency

Serving layer: REST API merging batch & speed results for unified threat intelligence

Detection Capabilities:

Top malicious IPs & port scans (20+ ports in <5 min)

SQLi/XSS pattern extraction from request paths

Brute-force detection (5+ failed attempts/min)

Real-time threat scoring per IP

Anomalous data transfer monitoring (>10MB/10s)

Live Demos: Dashboard for active threats + historical visualization
