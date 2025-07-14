FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy only necessary files for dependency caching
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Pre-download dependencies (makes rebuilds faster)
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# Now copy the rest of the project
COPY src src

# Package the app (skip tests if needed)
RUN ./mvnw package -DskipTests

# Run the app
CMD ["java", "-jar", "target/employee-api-0.0.1-SNAPSHOT.jar"]