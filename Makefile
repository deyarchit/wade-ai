# Project variables

deploy:
	@echo "🚀 Deploying to GCP..."
	@if [ "$(shell git rev-parse --abbrev-ref HEAD)" != "main" ]; then \
		echo "Can only deploy from main branch" ; \
	else \
        echo "Deploying website to bucket ..." ; \
		gcloud storage cp --recursive website/* gs://wade-ai-website/  ; \
    fi

# Default target (run development server)
.PHONY: *