# GCP Configuration Snapshot

This directory contains tooling to export and preserve the GCP infrastructure
configuration for the wade-ai website before decommissioning.

## GCP Resources

| Resource | Type | Name |
|---|---|---|
| Project | GCP Project | `wade-ai` |
| Static Assets | Cloud Storage Bucket | `wade-ai-website` |
| Load Balancer | Global External HTTP(S) LB | `wade-ai` |

## Load Balancer Component Chain

```
Forwarding Rules
  HTTP  34.49.99.109:80   ──► Target HTTP Proxy  ──► URL Map (wade-ai)
  HTTPS 35.244.254.146:443 ─► Target HTTPS Proxy ──► URL Map (wade-ai)
                                    │
                      SSL Cert: wade-ai-cert (GCP default SSL policy)

URL Map routing rules:
  All unmatched (default)          ──► Backend Bucket: wade-ai-website
  wade-ai.com  /app/*, /api/*      ──► Backend Service: wade-ai-dashboard
  wade-ai.com  all unmatched       ──► Backend Bucket: wade-ai-website

Backend Bucket: wade-ai-website
  └── GCS Bucket: wade-ai-website  (Cloud CDN: disabled)

Backend Service: wade-ai-dashboard
  ├── Endpoint protocol: HTTPS
  ├── Cloud CDN: enabled
  ├── Cloud Armor: default-security-policy-for-backend-service-wade-ai-dashboard
  └── Serverless NEG: wade-ai-dashboard (us-west1)
```

## Exporting Configurations

Run the export script while authenticated to the `wade-ai` GCP project:

```bash
cd deploy/gcp-config
chmod +x export.sh
./export.sh
```

This saves JSON snapshots of all resources to `deploy/gcp-config/snapshots/`.

## Snapshot Files

| File | Contents |
|---|---|
| `bucket-metadata.json` | Bucket settings: location, storage class, website config, CORS, versioning |
| `bucket-iam-policy.json` | Bucket IAM bindings (e.g. `allUsers` objectViewer for public access) |
| `lb-forwarding-rules.json` | Frontend IPs, ports, and protocol for HTTP and HTTPS rules |
| `lb-target-https-proxies.json` | HTTPS proxy config including attached SSL certificate references |
| `lb-target-http-proxies.json` | HTTP proxy config (typically used for HTTP→HTTPS redirect) |
| `lb-url-maps.json` | All URL maps in the project |
| `lb-url-map-detail.json` | Full detail of the `wade-ai` URL map with host/path routing rules |
| `lb-backend-buckets.json` | Backend bucket config linking the LB to the GCS bucket |
| `lb-backend-services.json` | Backend service config for `wade-ai-dashboard` (protocol, CDN, security policy) |
| `lb-network-endpoint-groups.json` | Serverless NEG for `wade-ai-dashboard` (region: us-west1) |
| `lb-ssl-certificate.json` | Full detail of the `wade-ai-cert` SSL certificate |
| `lb-ssl-certificates-all.json` | All SSL certificates in the project |
| `lb-ssl-policies.json` | TLS version and cipher suite policies (GCP default is used) |
| `lb-security-policies.json` | Cloud Armor security policies (list) |
| `security-policy-rules/<name>.json` | Full rules for each Cloud Armor policy |

## Notes

- The `snapshots/` directory is gitignored to avoid accidentally committing
  potentially sensitive config data. Store snapshots securely if needed.
- To recreate these resources on another provider (e.g. Cloudflare + R2),
  use the snapshot files as a reference for domain names, routing rules,
  certificate domains, and bucket settings.
