.PHONY: help dev dev-no-build up down restart logs build rebuild-frontend rebuild-backend deploy deploy-all deploy-backend deploy-frontend clean

# Configuration
PROJECT_ID := personalwebsite-460704
REGION := us-west1
REPO := personalwebsite-repo
BACKEND_IMAGE := us-west1-docker.pkg.dev/$(PROJECT_ID)/$(REPO)/personal-backend:latest
FRONTEND_IMAGE := us-west1-docker.pkg.dev/$(PROJECT_ID)/$(REPO)/personal-frontend:latest
BACKEND_SERVICE := personal-backend-service
FRONTEND_SERVICE := personal-frontend-service

# Default target
help:
	@echo "Personal Website Development Commands:"
	@echo ""
	@echo "Local Development:"
	@echo "  make dev              - Rebuild and start development environment"
	@echo "  make dev-no-build     - Start without rebuilding (faster, use if no code changes)"
	@echo "  make up               - Start services in background (with rebuild)"
	@echo "  make down             - Stop all services"
	@echo "  make restart          - Restart all services (with rebuild)"
	@echo "  make logs             - View logs from all services"
	@echo "  make logs-backend     - View backend logs"
	@echo "  make logs-frontend    - View frontend logs"
	@echo "  make build            - Rebuild all containers"
	@echo "  make rebuild-frontend - Rebuild only frontend (faster)"
	@echo "  make rebuild-backend  - Rebuild only backend (faster)"
	@echo "  make clean            - Stop services and remove volumes"
	@echo ""
	@echo "Deployment:"
	@echo "  make deploy                - Deploy both backend and frontend (recommended)"
	@echo "  make deploy-all            - Same as 'make deploy'"
	@echo "  make deploy-backend        - Build and deploy backend only"
	@echo "  make deploy-frontend       - Build and deploy frontend only"
	@echo "  make deploy-backend-manual - Build backend locally, then push and deploy"
	@echo "  make deploy-frontend-manual - Build frontend locally, then push and deploy"
	@echo "  make cloud-build           - Trigger Cloud Build for both services"
	@echo ""
	@echo "Cloud Logs:"
	@echo "  make cloud-logs-backend   - View backend logs from Cloud Run"
	@echo "  make cloud-logs-frontend  - View frontend logs from Cloud Run"
	@echo ""
	@echo "Environment Setup:"
	@echo "  make setup-secrets        - Create required secrets in Google Secret Manager"
	@echo "  make verify-env           - Verify environment configuration"

# ==========================================
# LOCAL DEVELOPMENT
# ==========================================

dev:
	@echo "Rebuilding and starting local development environment..."
	docker compose up --build

dev-no-build:
	@echo "Starting local development environment (no rebuild)..."
	docker compose up

up:
	@echo "Starting services in background (with rebuild)..."
	docker compose up --build -d
	@echo "Services started! Access:"
	@echo "  Frontend: http://localhost:3000"
	@echo "  Backend:  http://localhost:8080"

down:
	@echo "Stopping all services..."
	docker compose down

restart:
	@echo "Restarting services (with rebuild)..."
	docker compose down
	docker compose up --build -d
	@echo "Services restarted! View logs with: make logs"

logs:
	docker compose logs -f

logs-backend:
	docker compose logs -f backend

logs-frontend:
	docker compose logs -f frontend

build:
	@echo "Rebuilding containers..."
	docker compose build

rebuild-frontend:
	@echo "Rebuilding frontend only..."
	docker compose up --build -d frontend
	@echo "Frontend rebuilt! View logs with: make logs-frontend"

rebuild-backend:
	@echo "Rebuilding backend only..."
	docker compose up --build -d backend
	@echo "Backend rebuilt! View logs with: make logs-backend"

clean:
	@echo "Stopping services and removing volumes..."
	docker compose down -v

# ==========================================
# DEPLOYMENT - BACKEND
# ==========================================

# Deploy backend using Cloud Build (recommended - faster, no local Docker needed)
deploy-backend:
	@echo "Building and deploying backend using Cloud Build..."
	gcloud builds submit --tag $(BACKEND_IMAGE) backend/
	@echo "Deploying to Cloud Run..."
	gcloud run deploy $(BACKEND_SERVICE) \
		--image $(BACKEND_IMAGE) \
		--platform managed \
		--region $(REGION) \
		--allow-unauthenticated \
		--set-secrets SMTP_PASS=backend-smtp-pass:latest \
		--set-env-vars "SMTP_USER=adlerm731@gmail.com"
	@echo "Backend deployment complete!"
	@gcloud run services describe $(BACKEND_SERVICE) --region $(REGION) --format 'value(status.url)'

# Deploy backend manually (build locally, push to Artifact Registry, deploy)
deploy-backend-manual:
	@echo "Step 1: Building backend Docker image locally..."
	cd backend && docker build -t $(BACKEND_IMAGE) . --no-cache
	@echo "Step 2: Pushing to Artifact Registry..."
	docker push $(BACKEND_IMAGE)
	@echo "Step 3: Deploying to Cloud Run..."
	gcloud run deploy $(BACKEND_SERVICE) \
		--image $(BACKEND_IMAGE) \
		--platform managed \
		--region $(REGION) \
		--allow-unauthenticated \
		--set-secrets SMTP_PASS=backend-smtp-pass:latest \
		--set-env-vars "SMTP_USER=adlerm731@gmail.com"
	@echo "Backend deployment complete!"
	@gcloud run services describe $(BACKEND_SERVICE) --region $(REGION) --format 'value(status.url)'

# ==========================================
# DEPLOYMENT - FRONTEND
# ==========================================

deploy-frontend:
	@echo "Building and deploying frontend using Cloud Build..."
	gcloud builds submit --tag $(FRONTEND_IMAGE) frontend/
	@echo "Deploying to Cloud Run..."
	gcloud run deploy $(FRONTEND_SERVICE) \
		--image $(FRONTEND_IMAGE) \
		--platform managed \
		--region $(REGION) \
		--allow-unauthenticated \
		--port 8080
	@echo "Frontend deployment complete!"
	@gcloud run services describe $(FRONTEND_SERVICE) --region $(REGION) --format 'value(status.url)'

deploy-frontend-manual:
	@echo "Step 1: Building frontend Docker image locally..."
	cd frontend && docker build -t $(FRONTEND_IMAGE) . --no-cache
	@echo "Step 2: Pushing to Artifact Registry..."
	docker push $(FRONTEND_IMAGE)
	@echo "Step 3: Deploying to Cloud Run..."
	gcloud run deploy $(FRONTEND_SERVICE) \
		--image $(FRONTEND_IMAGE) \
		--platform managed \
		--region $(REGION) \
		--allow-unauthenticated \
		--port 8080
	@echo "Frontend deployment complete!"
	@gcloud run services describe $(FRONTEND_SERVICE) --region $(REGION) --format 'value(status.url)'

# ==========================================
# DEPLOYMENT - BOTH
# ==========================================

deploy-all: deploy-backend deploy-frontend
	@echo "=========================================="
	@echo "Full deployment complete!"
	@echo "Backend URL:"
	@gcloud run services describe $(BACKEND_SERVICE) --region $(REGION) --format 'value(status.url)'
	@echo "Frontend URL:"
	@gcloud run services describe $(FRONTEND_SERVICE) --region $(REGION) --format 'value(status.url)'
	@echo "=========================================="

# Shorthand alias for deploy-all
deploy: deploy-all

# Use Cloud Build YAML for CI/CD
cloud-build:
	@echo "Triggering Cloud Build..."
	gcloud builds submit --config cloudbuild.yml .

# ==========================================
# CLOUD LOGS
# ==========================================

cloud-logs-backend:
	gcloud run services logs read $(BACKEND_SERVICE) \
		--region $(REGION) \
		--limit 50

cloud-logs-frontend:
	gcloud run services logs read $(FRONTEND_SERVICE) \
		--region $(REGION) \
		--limit 50

# ==========================================
# ENVIRONMENT SETUP
# ==========================================

setup-secrets:
	@echo "Creating SMTP password secret in Google Secret Manager..."
	@echo "Enter your SMTP password (it will be hidden):"
	@read -s SMTP_PASS; \
	echo $$SMTP_PASS | gcloud secrets create backend-smtp-pass \
		--data-file=- \
		--replication-policy="automatic" || \
	echo $$SMTP_PASS | gcloud secrets versions add backend-smtp-pass \
		--data-file=-
	@echo "Secret created/updated successfully!"

verify-env:
	@echo "Verifying environment configuration..."
	@echo ""
	@echo "Checking .gitignore..."
	@grep -q "\.env" .gitignore && echo "✓ .env is in .gitignore" || echo "✗ WARNING: .env not in .gitignore"
	@echo ""
	@echo "Checking backend/.env..."
	@test -f backend/.env && echo "✓ backend/.env exists" || echo "✗ WARNING: backend/.env not found"
	@test -f backend/.env && grep -q "SMTP_PASS" backend/.env && echo "✓ SMTP_PASS set in backend/.env" || echo "✗ WARNING: SMTP_PASS not set"
	@echo ""
	@echo "Checking Google Secret Manager..."
	@gcloud secrets describe backend-smtp-pass >/dev/null 2>&1 && echo "✓ backend-smtp-pass secret exists" || echo "✗ WARNING: backend-smtp-pass secret not found in Secret Manager"
	@echo ""
	@echo "Current GCP project: $(shell gcloud config get-value project)"
	@echo "Expected project: $(PROJECT_ID)"
