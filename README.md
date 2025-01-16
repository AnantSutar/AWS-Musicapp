Full-Stack Web Application with AWS

Project Overview

This project is a scalable full-stack web application built using various AWS services. It features user authentication, registration, and subscription management functionalities with a user-friendly web interface. The application ensures secure data handling and efficient storage of media content.

Features

User Authentication: Secure login and registration system.

Subscription Management: Manage user subscriptions seamlessly.

Scalable Storage: AWS S3 integration for storing and managing 10,000 images.

RESTful API: CRUD operations for user and subscription data via AWS API Gateway and Lambda.

Robust Deployment: Hosted on an Ubuntu Server 20.04 LTS instance using AWS EC2 with Apache2 server configuration.

Tech Stack

Frontend: HTML, CSS, JavaScript

Backend: AWS Lambda (Node.js/Python), API Gateway

Database: AWS DynamoDB

Storage: AWS S3

Deployment: AWS EC2 (Ubuntu Server 20.04 LTS), Apache2

Architecture

Frontend: Web interface hosted on EC2 with Apache2, allowing users to interact with the app.

Backend: API Gateway routes requests to Lambda functions for processing.

Database: DynamoDB manages user data and subscriptions.

Storage: S3 buckets store and serve image content.

Setup and Deployment

Prerequisites

AWS CLI configured with appropriate credentials

Node.js/Python installed for Lambda function development

Apache2 installed on Ubuntu Server

Steps

Clone the Repository:

git clone https://github.com/your-username/aws-fullstack-app.git
cd aws-fullstack-app

Set Up DynamoDB Tables:

Create tables for user authentication and subscription data.

Deploy Lambda Functions:

zip function.zip index.js
aws lambda create-function --function-name YourFunctionName \
--runtime nodejs14.x --role arn:aws:iam::account-id:role/execution_role \
--handler index.handler --zip-file fileb://function.zip

Configure API Gateway:

Set up RESTful endpoints connected to Lambda functions.

Upload Images to S3:

aws s3 cp ./images s3://your-s3-bucket-name/ --recursive

Deploy Frontend on EC2:

sudo apt update
sudo apt install apache2
sudo cp -r ./frontend/* /var/www/html/
sudo systemctl restart apache2

Usage

Access the Web Interface: Navigate to the EC2 public IP/domain.

User Actions: Register, log in, and manage subscriptions.

Image Access: View images stored in S3 through the app.

License

This project is licensed under the MIT License.

Acknowledgments

AWS Documentation

Open-source tools and libraries
