#!/bin/bash
echo "Deploying React + Vite app to EC2..."

cd /home/ec2-user/react-app

echo "Cleaning up old files..."
rm -rf *

echo "Copying new build files..."
cp -r /tmp/deployment-artifact/* .

echo "Starting server with serve..."
nohup npx serve -s . -l 3000 &
