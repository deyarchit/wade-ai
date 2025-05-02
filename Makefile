# Project variables

deploy:
	@echo "🚀 Deploying to GCP..."
	gcloud storage cp --recursive website/* gs://wade-ai-website/ 

# Default target (run development server)
.PHONY: *