# Project variables

dev:
	@echo "Running website in dev mode..."
	npm run dev

clean:
	@echo "Cleaning up..."
	rm -rf dist

build:
	@echo "Building website..."
	npm run build

deploy: build
	@echo "🚀 Deploying to GCP..."
	@if [ "$(shell git rev-parse --abbrev-ref HEAD)" != "main" ]; then \
		echo "Can only deploy from main branch"; \
	else \
		SHA=$$(git rev-parse --short HEAD); \
		echo "Deploying website to bucket under folder $$SHA..."; \
		gcloud storage cp --recursive dist/* gs://wade-ai-website/$$SHA/; \
		echo "Deploying website to bucket under root..."; \
		gcloud storage cp --recursive dist/* gs://wade-ai-website/current/; \
	fi


# Default target (run development server)
.PHONY: *