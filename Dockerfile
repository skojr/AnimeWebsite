# Stage 1: Build the app
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app

# Copy the pom.xml and the source code into the container
COPY pom.xml .
COPY src ./src

# Install dependencies and build the app (generating the JAR file)
RUN mvn clean install -DskipTests

# Stage 2: Run the app
FROM openjdk:17-alpine
WORKDIR /app

# Copy the built JAR file from the first stage
COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar /app/demo-0.0.1-SNAPSHOT.jar

# Expose the port that your Spring Boot app runs on (default 8080)
EXPOSE 8080

# Run the application when the container starts
CMD ["java", "-jar", "demo-0.0.1-SNAPSHOT.jar"]
