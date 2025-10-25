#!/bin/bash

# Deployment Verification Script
# This script checks if your environment is ready for deployment

set -e

echo "=========================================="
echo "Personal Website Deployment Verification"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
PASSED=0
FAILED=0
WARNINGS=0

# Helper functions
pass() {
  echo -e "${GREEN}✓${NC} $1"
  ((PASSED++))
}

fail() {
  echo -e "${RED}✗${NC} $1"
  ((FAILED++))
}

warn() {
  echo -e "${YELLOW}⚠${NC} $1"
  ((WARNINGS++))
}

info() {
  echo -e "  $1"
}

echo "1. Checking Prerequisites..."
echo "----------------------------"

# Check Docker
if command -v docker &> /dev/null; then
  pass "Docker is installed"
  DOCKER_VERSION=$(docker --version)
  info "$DOCKER_VERSION"
else
  fail "Docker is not installed"
fi

# Check gcloud
if command -v gcloud &> /dev/null; then
  pass "Google Cloud SDK is installed"
  GCLOUD_VERSION=$(gcloud --version | head -n 1)
  info "$GCLOUD_VERSION"
else
  fail "Google Cloud SDK is not installed"
fi

# Check make
if command -v make &> /dev/null; then
  pass "Make is installed"
else
  warn "Make is not installed (optional, but recommended)"
fi

echo ""
echo "2. Checking Google Cloud Configuration..."
echo "-------------------------------------------"

# Check gcloud auth
if gcloud auth list --filter=status:ACTIVE --format="value(account)" &> /dev/null; then
  ACTIVE_ACCOUNT=$(gcloud auth list --filter=status:ACTIVE --format="value(account)")
  pass "Authenticated to Google Cloud as: $ACTIVE_ACCOUNT"
else
  fail "Not authenticated to Google Cloud (run: gcloud auth login)"
fi

# Check project
CURRENT_PROJECT=$(gcloud config get-value project 2>/dev/null)
EXPECTED_PROJECT="personalwebsite-460704"
if [ "$CURRENT_PROJECT" == "$EXPECTED_PROJECT" ]; then
  pass "Project is set to: $CURRENT_PROJECT"
else
  fail "Project mismatch. Current: $CURRENT_PROJECT, Expected: $EXPECTED_PROJECT"
  info "Run: gcloud config set project $EXPECTED_PROJECT"
fi

# Check Docker auth for Artifact Registry
if docker-credential-gcloud list &> /dev/null; then
  pass "Docker is configured for Artifact Registry"
else
  warn "Docker may not be configured for Artifact Registry"
  info "Run: gcloud auth configure-docker us-west1-docker.pkg.dev"
fi

echo ""
echo "3. Checking Environment Files..."
echo "----------------------------------"

# Check backend .env exists
if [ -f "backend/.env" ]; then
  pass "backend/.env exists"

  # Check required variables
  if grep -q "SMTP_USER=" backend/.env && grep -q "SMTP_PASS=" backend/.env; then
    pass "SMTP credentials are set in backend/.env"
  else
    fail "SMTP credentials missing in backend/.env"
  fi
else
  fail "backend/.env not found"
  info "Copy backend/.env.example to backend/.env and fill in your credentials"
fi

# Check .env files are gitignored
if git check-ignore backend/.env &> /dev/null; then
  pass "backend/.env is properly gitignored"
else
  fail "backend/.env is NOT gitignored (security risk!)"
fi

# Check no .env files are tracked
if git ls-files | grep -E "\.env$" &> /dev/null; then
  fail "Some .env files are tracked in git (security risk!)"
  git ls-files | grep "\.env$" | while read file; do
    info "Tracked: $file"
  done
else
  pass "No .env files are tracked in git"
fi

echo ""
echo "4. Checking Google Secret Manager..."
echo "--------------------------------------"

# Check if secret exists
if gcloud secrets describe backend-smtp-pass &> /dev/null; then
  pass "backend-smtp-pass secret exists in Secret Manager"

  # Check secret version
  LATEST_VERSION=$(gcloud secrets versions list backend-smtp-pass --limit=1 --format="value(name)")
  info "Latest version: $LATEST_VERSION"
else
  fail "backend-smtp-pass secret not found in Secret Manager"
  info "Run: make setup-secrets"
fi

echo ""
echo "5. Checking Docker Configuration..."
echo "------------------------------------"

# Check Dockerfiles
if [ -f "backend/Dockerfile" ]; then
  pass "backend/Dockerfile exists"
else
  fail "backend/Dockerfile not found"
fi

if [ -f "frontend/Dockerfile" ]; then
  pass "frontend/Dockerfile exists"
else
  fail "frontend/Dockerfile not found"
fi

# Check .dockerignore files
if [ -f "backend/.dockerignore" ]; then
  pass "backend/.dockerignore exists"
else
  warn "backend/.dockerignore not found"
fi

if [ -f "frontend/.dockerignore" ]; then
  pass "frontend/.dockerignore exists"
else
  warn "frontend/.dockerignore not found"
fi

# Check docker-compose
if [ -f "docker-compose.yml" ]; then
  pass "docker-compose.yml exists"
else
  warn "docker-compose.yml not found"
fi

echo ""
echo "6. Checking Cloud Build Configuration..."
echo "------------------------------------------"

# Check cloudbuild.yml
if [ -f "cloudbuild.yml" ]; then
  pass "cloudbuild.yml exists"
else
  fail "cloudbuild.yml not found"
fi

# Check Makefile
if [ -f "Makefile" ]; then
  pass "Makefile exists"
else
  warn "Makefile not found"
fi

echo ""
echo "7. Checking Required Files..."
echo "-------------------------------"

# Check gitignore files
if [ -f ".gitignore" ]; then
  pass ".gitignore exists"
else
  warn ".gitignore not found"
fi

if [ -f "backend/.gitignore" ]; then
  pass "backend/.gitignore exists"
else
  warn "backend/.gitignore not found"
fi

if [ -f "frontend/.gitignore" ]; then
  pass "frontend/.gitignore exists"
else
  warn "frontend/.gitignore not found"
fi

# Check env_vars.yaml files
if [ -f "backend/env_vars.yaml" ]; then
  pass "backend/env_vars.yaml exists"
else
  warn "backend/env_vars.yaml not found (will use default env vars)"
fi

echo ""
echo "8. Testing Google Cloud Services..."
echo "-------------------------------------"

# Check Cloud Run services
if gcloud run services describe personal-backend-service --region us-west1 &> /dev/null; then
  pass "Backend service exists in Cloud Run"
  BACKEND_URL=$(gcloud run services describe personal-backend-service --region us-west1 --format='value(status.url)')
  info "URL: $BACKEND_URL"
else
  warn "Backend service not deployed yet (this is OK for first deployment)"
fi

if gcloud run services describe personal-frontend-service --region us-west1 &> /dev/null; then
  pass "Frontend service exists in Cloud Run"
  FRONTEND_URL=$(gcloud run services describe personal-frontend-service --region us-west1 --format='value(status.url)')
  info "URL: $FRONTEND_URL"
else
  warn "Frontend service not deployed yet (this is OK for first deployment)"
fi

# Check Artifact Registry repository
if gcloud artifacts repositories describe personalwebsite-repo --location=us-west1 &> /dev/null; then
  pass "Artifact Registry repository exists"
else
  warn "Artifact Registry repository not found"
  info "Run: gcloud artifacts repositories create personalwebsite-repo --repository-format=docker --location=us-west1"
fi

echo ""
echo "=========================================="
echo "Verification Summary"
echo "=========================================="
echo -e "${GREEN}Passed:${NC}   $PASSED"
echo -e "${YELLOW}Warnings:${NC} $WARNINGS"
echo -e "${RED}Failed:${NC}   $FAILED"
echo ""

if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}✓ Your environment is ready for deployment!${NC}"
  echo ""
  echo "Next steps:"
  echo "  1. Local testing:    make dev"
  echo "  2. Deploy to Cloud:  make deploy"
  echo "  3. View logs:        make cloud-logs-backend"
  exit 0
else
  echo -e "${RED}✗ Please fix the failed items before deploying${NC}"
  echo ""
  echo "Common fixes:"
  echo "  - Install missing tools"
  echo "  - Run: gcloud auth login"
  echo "  - Run: gcloud config set project personalwebsite-460704"
  echo "  - Create backend/.env from backend/.env.example"
  echo "  - Run: make setup-secrets"
  exit 1
fi
