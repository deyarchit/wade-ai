# Project variables

deploy:
	@echo "🚀 Deploying to GCP..."
	@if [ "$(shell git rev-parse --abbrev-ref HEAD)" != "main" ]; then \
		echo "Can only deploy from main branch"; \
	else \
		SHA=$$(git rev-parse --short HEAD); \
		echo "Deploying website to bucket under folder $$SHA..."; \
		gcloud storage cp --recursive website/* gs://wade-ai-website/$$SHA/; \
		echo "Deploying website to bucket under root..."; \
		gcloud storage cp --recursive website/* gs://wade-ai-website/; \
	fi


# Default target (run development server)
.PHONY: *