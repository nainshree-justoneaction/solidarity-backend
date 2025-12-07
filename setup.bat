echo Installing dependencies...
pnpm install

echo Creating .env file if not exist...
if not exist .env (
    copy .env.example .env
)

echo Starting Docker containers...
docker compose up -d

echo Generating Prisma client...
npx prisma generate

echo Running Prisma migrations...
npx prisma migrate dev --name init

echo Setup Complete!
pause
