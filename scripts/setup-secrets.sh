#!/bin/bash
# Setup Google Secret Manager secrets for production deployment
# This script should be run ONCE to set up secrets in Google Cloud

set -e

PROJECT_ID="personalwebsite-460704"
REGION="us-west1"

echo "🔐 Setting up Google Cloud secrets for project: $PROJECT_ID"
echo ""

# Check if user is logged in to gcloud
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q "@"; then
  echo "❌ You are not logged in to gcloud. Please run:"
  echo "   gcloud auth login"
  exit 1
fi

# Set the project
echo "📌 Setting project to: $PROJECT_ID"
gcloud config set project $PROJECT_ID

# Enable Secret Manager API if not already enabled
echo "🔧 Enabling Secret Manager API..."
gcloud services enable secretmanager.googleapis.com

echo ""
echo "Please enter your SMTP password (Gmail App Password):"
echo "📧 To create a Gmail App Password:"
echo "   1. Go to https://myaccount.google.com/apppasswords"
echo "   2. Generate a new app password for 'Mail'"
echo "   3. Copy the 16-character password (no spaces)"
echo ""
read -sp "SMTP Password: " SMTP_PASS
echo ""

if [ -z "$SMTP_PASS" ]; then
  echo "❌ SMTP password cannot be empty"
  exit 1
fi

# Create or update the secret
echo "🔐 Creating/updating secret: backend-smtp-pass"
echo -n "$SMTP_PASS" | gcloud secrets create backend-smtp-pass \
  --data-file=- \
  --replication-policy="automatic" \
  2>/dev/null || \
echo -n "$SMTP_PASS" | gcloud secrets versions add backend-smtp-pass \
  --data-file=-

# Grant Cloud Run service account access to the secret
echo "🔑 Granting Cloud Run access to secret..."
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format="value(projectNumber)")
SERVICE_ACCOUNT="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"

gcloud secrets add-iam-policy-binding backend-smtp-pass \
  --member="serviceAccount:${SERVICE_ACCOUNT}" \
  --role="roles/secretmanager.secretAccessor"

echo ""
echo "✅ Secret setup complete!"
echo ""
echo "📋 Summary:"
echo "   Secret name: backend-smtp-pass"
echo "   Project: $PROJECT_ID"
echo "   Region: $REGION"
echo ""
echo "🚀 You can now deploy using:"
echo "   make deploy"
echo "   OR"
echo "   gcloud builds submit --config=cloudbuild.yml"
