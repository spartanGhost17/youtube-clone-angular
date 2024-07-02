# Use an official Maven image to build the application
#FROM maven:3.8.4-openjdk-18 AS build
#FROM maven:3.9.0 AS build
FROM maven:3.8.6-openjdk-18 AS build
# Set the working directory inside the container
WORKDIR /app

# Set the working directory inside the container
ARG CONTAINER_PORT

# Copy the parent pom.xml
COPY pom.xml /app

# Copy the backend module's pom.xml
COPY backend/pom.xml /app/backend/

# Resolve dependencies for the backend module
RUN mvn -f /app/backend/pom.xml dependency:resolve

# Copy the entire backend source code
COPY backend /app/backend

# Build the backend project
RUN mvn -f /app/backend/pom.xml clean package -DskipTests -X

# Use a slim version of the OpenJDK runtime for the final image
#FROM openjdk:18-jdk-slim
#FROM openjdk:20
FROM openjdk:18-ea-slim-buster

# Set the working directory inside the container
WORKDIR /app

# Install ffmpeg and ffprobe
RUN apt-get update && apt-get install -y \
    ffmpeg \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy the built JAR file from the build image
COPY --from=build /app/backend/target/*.jar app.jar

# Expose port 8080
EXPOSE ${CONTAINER_PORT}

# Run the Spring Boot application
ENTRYPOINT ["java","-jar","app.jar"]
