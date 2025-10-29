.PHONY: db-up db-down db-migrate db-reset dev build start

# 빌드
build:
	npm run build

# 배포
deploy:
	git pull origin main
	make build
	git push origin main

migrate:
	npx prisma migrate dev --name init