deploy:
	git checkout main
	npm run build
	git push origin main

.PHONY: deploy
