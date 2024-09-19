# Stage 1: Run the application
# Use an OpenJDK runtime for the final container
FROM openjdk:17-jdk-slim

# Set the working directory for the app
WORKDIR /app

# Copy the JAR file from the build stage to the final stage
COPY target/demo-0.0.1-SNAPSHOT.jar /app/demo-0.0.1-SNAPSHOT.jar

# Expose the port your app will run on
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "/app/demo-0.0.1-SNAPSHOT.jar"]
