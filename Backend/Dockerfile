# FROM openjdk:17-alpine
# ADD target/aifarming-0.0.1-SNAPSHOT.jar app.jar
# ENTRYPOINT ["java", "-jar", "app.jar"]



# # ___________________________hemel____________________________#
# FROM openjdk:17-alpine
# # Set the current working directory inside the image
# WORKDIR /app

# # Copy maven executable to the image
# COPY mvnw .
# COPY .mvn .mvn

# # Copy the pom.xml file
# COPY pom.xml .

# # Build all the dependencies in preparation to go offline. 
# # This is a separate step so the dependencies will be cached unless 
# # the pom.xml file has changed.
# RUN ./mvnw dependency:go-offline -B

# # Copy the project source
# COPY src src

# # Package the application
# RUN ./mvnw package -DskipTests
# RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../app.jar)

# #### Stage 2: A minimal docker image with command to run the app 
# FROM openjdk:17-jre-alpine

# ARG DEPENDENCY=/app/target/dependency

# # Copy project dependencies from the build stage
# COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
# COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
# COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app

# ENTRYPOINT ["java","-cp","app:app/lib/*","app.jar"]


# # ____________________________hemel____________________________#










# ___________________________hemel____________________________#
# Use a Maven image to build the project
FROM maven:3.8.4-openjdk-17 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the project files into the container
COPY . .

# Build the project using Maven
RUN mvn clean package -DskipTests

# Use a lightweight base image for Java to run the application
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the compiled JAR file from the build stage to the current stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port that your Spring Boot application runs on
EXPOSE 8080

# Run the Spring Boot application when the container starts
ENTRYPOINT ["java", "-jar", "app.jar"]


# ____________________________hemel____________________________#