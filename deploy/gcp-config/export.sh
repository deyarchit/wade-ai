#!/usr/bin/env bash
# Exports GCP resource configurations for wade-ai project to JSON files.
# Run this script before deleting GCP resources to preserve their settings.
#
# Usage: ./export.sh
# Prerequisites: gcloud CLI authenticated with access to project wade-ai

set -euo pipefail

PROJECT="wade-ai"
BUCKET="wade-ai-website"
LB_NAME="wade-ai"
SSL_CERT_NAME="wade-ai-cert"
OUT_DIR="$(cd "$(dirname "$0")" && pwd)/snapshots"

mkdir -p "$OUT_DIR"

echo "Exporting GCP config for project: $PROJECT"
echo "Output directory: $OUT_DIR"
echo ""

# ---------------------------------------------------------------------------
# GCS Bucket
# ---------------------------------------------------------------------------
echo "[1/3] Exporting GCS bucket config: $BUCKET"

gcloud storage buckets describe "gs://$BUCKET" \
  --project="$PROJECT" \
  --format=json \
  > "$OUT_DIR/bucket-metadata.json"
echo "  -> bucket-metadata.json"

gcloud storage buckets get-iam-policy "gs://$BUCKET" \
  --project="$PROJECT" \
  --format=json \
  > "$OUT_DIR/bucket-iam-policy.json"
echo "  -> bucket-iam-policy.json"

# ---------------------------------------------------------------------------
# Load Balancer — frontend & routing
# Global external Application LB (wade-ai)
# ---------------------------------------------------------------------------
echo ""
echo "[2/3] Exporting load balancer frontend & routing: $LB_NAME"

# Forwarding rules — one for HTTP :80, one for HTTPS :443
echo "  Forwarding rules..."
gcloud compute forwarding-rules list \
  --project="$PROJECT" \
  --global \
  --format=json \
  > "$OUT_DIR/lb-forwarding-rules.json"
echo "  -> lb-forwarding-rules.json"

# Target HTTPS proxy (carries the SSL cert reference)
echo "  Target HTTPS proxies..."
gcloud compute target-https-proxies list \
  --project="$PROJECT" \
  --global \
  --format=json \
  > "$OUT_DIR/lb-target-https-proxies.json"
echo "  -> lb-target-https-proxies.json"

# Target HTTP proxy (HTTP → HTTPS redirect rule)
echo "  Target HTTP proxies..."
gcloud compute target-http-proxies list \
  --project="$PROJECT" \
  --global \
  --format=json \
  > "$OUT_DIR/lb-target-http-proxies.json"
echo "  -> lb-target-http-proxies.json"

# URL map — full detail captures all host/path routing rules:
#   - All unmatched  → wade-ai-website (backend bucket)
#   - wade-ai.com /app/* /api/* → wade-ai-dashboard (backend service)
#   - wade-ai.com default       → wade-ai-website (backend bucket)
echo "  URL map (full detail)..."
gcloud compute url-maps describe "$LB_NAME" \
  --project="$PROJECT" \
  --global \
  --format=json \
  > "$OUT_DIR/lb-url-map-detail.json" 2>/dev/null \
  && echo "  -> lb-url-map-detail.json" \
  || echo "  (skipped lb-url-map-detail.json — URL map not found with name $LB_NAME)"

# SSL certificate (wade-ai-cert, attached to HTTPS frontend)
echo "  SSL certificate ($SSL_CERT_NAME)..."
gcloud compute ssl-certificates describe "$SSL_CERT_NAME" \
  --project="$PROJECT" \
  --global \
  --format=json \
  > "$OUT_DIR/lb-ssl-certificate.json" 2>/dev/null \
  && echo "  -> lb-ssl-certificate.json" \
  || echo "  (skipped lb-ssl-certificate.json — cert not found with name $SSL_CERT_NAME)"

# All SSL certificates in the project (fallback list)
gcloud compute ssl-certificates list \
  --project="$PROJECT" \
  --global \
  --format=json \
  > "$OUT_DIR/lb-ssl-certificates-all.json"
echo "  -> lb-ssl-certificates-all.json"

# SSL policies — GCP default is used on HTTPS frontend
echo "  SSL policies..."
gcloud compute ssl-policies list \
  --project="$PROJECT" \
  --format=json \
  > "$OUT_DIR/lb-ssl-policies.json" 2>/dev/null \
  && echo "  -> lb-ssl-policies.json" \
  || echo "  (skipped lb-ssl-policies.json — none configured)"

# ---------------------------------------------------------------------------
# Load Balancer — backends
# ---------------------------------------------------------------------------
echo ""
echo "[3/3] Exporting load balancer backends"

# Backend buckets (wade-ai-website → GCS bucket, Cloud CDN disabled)
echo "  Backend buckets..."
gcloud compute backend-buckets list \
  --project="$PROJECT" \
  --format=json \
  > "$OUT_DIR/lb-backend-buckets.json"
echo "  -> lb-backend-buckets.json"

# Backend services (wade-ai-dashboard → Serverless NEG, Cloud CDN enabled, HTTPS)
echo "  Backend services..."
gcloud compute backend-services list \
  --project="$PROJECT" \
  --global \
  --format=json \
  > "$OUT_DIR/lb-backend-services.json"
echo "  -> lb-backend-services.json"

# Serverless NEGs (wade-ai-dashboard NEG in us-west1 backing the dashboard service)
# Serverless NEGs are regional, so list without --global
echo "  Network endpoint groups (serverless NEGs)..."
gcloud compute network-endpoint-groups list \
  --project="$PROJECT" \
  --format=json \
  > "$OUT_DIR/lb-network-endpoint-groups.json"
echo "  -> lb-network-endpoint-groups.json"

# Cloud Armor security policies (attached to wade-ai-dashboard backend service)
echo "  Cloud Armor security policies..."
gcloud compute security-policies list \
  --project="$PROJECT" \
  --format=json \
  > "$OUT_DIR/lb-security-policies.json" 2>/dev/null \
  && echo "  -> lb-security-policies.json" \
  || echo "  (skipped lb-security-policies.json — none found)"

# Describe each security policy in full (rules are not shown in list output)
if [ -s "$OUT_DIR/lb-security-policies.json" ]; then
  echo "  Cloud Armor policy rules..."
  mkdir -p "$OUT_DIR/security-policy-rules"
  gcloud compute security-policies list \
    --project="$PROJECT" \
    --format="value(name)" | while read -r POLICY_NAME; do
      gcloud compute security-policies describe "$POLICY_NAME" \
        --project="$PROJECT" \
        --format=json \
        > "$OUT_DIR/security-policy-rules/${POLICY_NAME}.json"
      echo "  -> security-policy-rules/${POLICY_NAME}.json"
  done
fi

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------
echo ""
echo "Done. Files saved to: $OUT_DIR"
ls -lh "$OUT_DIR"
