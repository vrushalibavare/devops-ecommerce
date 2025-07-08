# Use Python 3.9 as base image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# Copy app code
COPY . /app/

# Expose port
EXPOSE 5003

# Run the application
CMD ["python", "app.py"]
