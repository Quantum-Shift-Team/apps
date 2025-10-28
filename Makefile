.PHONY: db-up db-down db-migrate db-reset dev build start

# 개발 서버
dev:
	npm run dev

# 빌드
build:
	npm run build

# 배포
deploy:
	git pull origin main
	make build
	git push origin main
