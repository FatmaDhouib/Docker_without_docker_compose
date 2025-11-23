# Contacts App - Docker Network Setup

A simple contacts management application using Docker containers with a custom network.

## Architecture
- **Frontend**: Node.js + Express serving a static HTML/JS interface
- **Database**: MySQL 8 with initialized contacts table
- **Network**: Custom Docker bridge network for container communication

## Build and Run

### 1. Create Docker Network
```bash
docker network create contacts-network
```

### 2. Build and Run Database Container
```bash
docker build -t contacts-db ./database
docker run -d --name db-container --network contacts-network contacts-db
```

### 3. Build and Run Frontend Container
```bash
docker build -t contacts-frontend ./frontend
docker run -d --name frontend-container --network contacts-network -p 3000:3000 contacts-frontend
```

## Access the Application
Open your browser and navigate to: http://localhost:3000

## Stop and Clean Up
```bash
# Stop containers
docker stop frontend-container db-container

# Remove containers
docker rm frontend-container db-container

# Remove network
docker network rm contacts-network

# Remove images (optional)
docker rmi contacts-frontend contacts-db
```

## Troubleshooting

### Check if containers are running
```bash
docker ps
```

### View container logs
```bash
docker logs frontend-container
docker logs db-container
```

### Verify network connectivity
```bash
docker network inspect contacts-network
```
