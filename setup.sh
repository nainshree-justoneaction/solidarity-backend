#!/bin/bash

# Setup script for PostgreSQL with Prisma

echo "🚀 PostgreSQL + Prisma Setup Script"
echo "===================================="
echo ""

# Switch to Node v22
echo "📦 Switching to Node v22..."
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm use v22.21.1

echo ""
echo "📝 Checking .env file..."
if [ ! -f .env ]; then
    echo "⚠️  .env file not found!"
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo ""
    echo "⚠️  IMPORTANT: Update .env with your PostgreSQL credentials!"
    echo "Edit DATABASE_URL in .env file"
    exit 1
fi

echo "✅ .env file found"
echo ""

echo "🔄 Generating Prisma Client..."
npx prisma generate

echo ""
echo "🗄️  Syncing database schema..."
npx prisma db push

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "🚀 Starting development server..."
    npm run start:dev
else
    echo ""
    echo "❌ Database sync failed!"
    echo "Please check your DATABASE_URL in .env file"
    echo ""
    echo "To retry:"
    echo "  1. Update DATABASE_URL in .env"
    echo "  2. Run: ./setup.sh"
fi
