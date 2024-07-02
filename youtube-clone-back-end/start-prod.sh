#!/bin/bash
echo "starting PROD server..."
ENV_FILE=./.env.prod docker-compose up -d --build