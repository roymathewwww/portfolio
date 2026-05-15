# AWS Cloud Infrastructure & DevOps Internship Projects

## Submitted By
ROY MATHEW

---

# Project Overview

This repository contains the implementation details, deployment workflows, architecture documentation, configurations, and infrastructure setup completed during an advanced AWS Cloud Infrastructure and DevOps Internship program.

The internship focused on designing, deploying, securing, automating, monitoring, and optimizing production-oriented cloud architectures using Amazon Web Services (AWS).

All six assigned internship tasks were successfully completed, including:

- Advanced S3 Storage Architecture
- CloudFront CDN with Lambda@Edge
- Immutable ECS/ECR Deployment
- Auto Scaling with Chaos Testing
- Secure RDS Deployment
- Route 53 + ACM + AWS WAF Integration

The projects involved real-world AWS infrastructure deployment and cloud-native DevOps workflows using secure, scalable, and automated cloud services.

---

# Internship Tasks Completed

| Task No | Project Title | Status |
|---|---|---|
| 1 | Advanced S3 Storage for Product Images | Completed |
| 2 | CloudFront Distribution with Lambda@Edge Enhancements | Completed |
| 3 | Immutable E-commerce Deployment with ECS & ECR | Completed |
| 4 | Auto Scaling with Mixed Instances and Chaos Testing | Completed |
| 5 | Secure RDS Deployment with IAM & Rotation | Completed |
| 6 | Route 53 Domain Setup with ACM and WAF | Completed |

---

# AWS Services Used

The following AWS services were implemented and configured during the internship:

- Amazon EC2
- Amazon S3
- Amazon CloudFront
- AWS Lambda
- AWS Lambda@Edge
- Amazon ECS
- Amazon ECR
- Amazon RDS
- AWS IAM
- AWS WAF
- AWS ACM
- Amazon Route 53
- AWS CodePipeline
- AWS CodeBuild
- AWS Systems Manager
- CloudWatch
- Auto Scaling Groups
- Application Load Balancer (ALB)
- Secrets Manager
- S3 Lifecycle Policies
- S3 Inventory

---

# Overall Cloud Architecture

The implemented infrastructure followed a production-style cloud-native architecture:

```text
Users
   ↓
Route 53
   ↓
CloudFront CDN + AWS WAF
   ↓
Application Load Balancer (ALB)
   ↓
Amazon ECS / EC2
   ↓
Amazon RDS MySQL
   ↓
Amazon S3 Storage
```

The infrastructure included:

- CDN acceleration
- Secure HTTPS communication
- Web Application Firewall protection
- Containerized workloads
- Automated CI/CD deployment
- Auto Scaling infrastructure
- Database security
- Lifecycle automation
- Secure storage architecture
- Monitoring and analytics

---

# Task 1 — Advanced S3 Storage for Product Images

## Objective

Design and implement a secure and scalable cloud storage solution for product image management using Amazon S3 and AWS cloud services.

## Implementations Completed

### S3 Bucket Configuration

Created a private Amazon S3 bucket with:

- Block Public Access enabled
- Bucket-owner enforced access
- Server-side encryption enabled
- Secure IAM access policies
- HTTPS-only communication

### Pre-Signed URL Implementation

Implemented AWS Lambda functions for:

- Secure upload URL generation
- Secure download URL generation
- Temporary object access
- Expiring authenticated requests

### CloudFront Integration

Configured CloudFront CDN with:

- Origin Access Control (OAC)
- Private S3 origin access
- HTTPS delivery
- Optimized caching behavior

### Lifecycle Policies

Implemented lifecycle automation for:

- Intelligent-Tiering transitions
- Glacier archival transitions
- Automatic expiration handling
- Storage cost optimization

### S3 Inventory

Configured S3 Inventory reporting for:

- Object auditing
- Storage analysis
- Inventory tracking
- Compliance reporting

### Security Features

Implemented:

- IAM least privilege permissions
- Secure object access
- Encrypted storage
- Temporary signed access
- Secure CDN delivery

## Outcome

Successfully implemented a secure and scalable cloud storage architecture capable of handling production-oriented image management workflows.

---

# Task 2 — CloudFront Distribution with Lambda@Edge Enhancements

## Objective

Implement a secure and optimized CDN architecture using CloudFront, Lambda@Edge, and Amazon S3.

## Implementations Completed

### Private S3 + CloudFront Integration

Configured:

- Private S3 bucket
- CloudFront distribution
- Origin Access Control (OAC)
- Secure asset delivery

### Lambda@Edge Functions

Created and deployed Lambda@Edge functions for:

#### Security Filtering

- Query string validation
- Request filtering
- Malicious request blocking

#### Cache Header Injection

- Cache-Control headers
- Security header insertion
- Browser caching optimization

### Security Headers Configured

Implemented:

- Strict-Transport-Security
- Content-Security-Policy
- X-Frame-Options
- X-Content-Type-Options
- Cache-Control

### Signed URL Infrastructure

Configured:

- RSA key pairs
- Trusted key groups
- Signed URL validation
- Time-limited secure access

### Optimized Image Delivery

Integrated optimized image formats:

- WebP
- AVIF

### Monitoring and Analytics

Validated:

- Cache hit ratios
- Traffic statistics
- CDN performance metrics
- Geographic delivery analysis

## Outcome

Successfully implemented edge computing, CDN optimization, signed URL security, and high-performance content delivery architecture.

---

# Task 3 — Immutable E-commerce Deployment with ECS & ECR

## Objective

Deploy a containerized e-commerce application using ECS, ECR, ALB, and CI/CD automation.

## Implementations Completed

### Docker Containerization

Containerized the Evershop application using Docker.

Implemented:

- Docker image builds
- Container runtime setup
- Port mapping
- Dependency management

### Amazon ECR

Configured:

- Private ECR repository
- Image versioning
- Immutable image storage
- Secure Docker authentication

### ECS Deployment

Implemented:

- ECS Cluster
- ECS Task Definitions
- ECS Services
- EC2 launch type
- Task recovery mechanisms

### Application Load Balancer

Configured:

- Listener rules
- Target groups
- Health checks
- Dynamic routing

### Systems Manager Parameter Store

Configured centralized runtime configuration management for:

- Environment variables
- Application secrets
- Deployment configuration

### CI/CD Automation

Implemented CodePipeline and CodeBuild workflows for:

- Automated builds
- Docker image generation
- ECR push automation
- ECS deployment automation

### Blue/Green Deployment

Configured:

- Zero downtime deployment
- Traffic shifting
- Deployment rollback
- Immutable release workflow

## Outcome

Successfully implemented a modern immutable cloud-native deployment architecture with automated CI/CD workflows.

---

# Task 4 — Auto Scaling with Mixed Instances and Chaos Testing

## Objective

Design and deploy scalable and highly available AWS infrastructure using Auto Scaling Groups.

## Implementations Completed

### Launch Template

Configured:

- EC2 instance configuration
- Networking setup
- Security groups
- Scaling parameters

### Auto Scaling Group

Implemented:

- Multi-AZ deployment
- Capacity management
- Health checks
- Automated scaling behavior

### Mixed Instance Policy

Configured:

- On-Demand instances
- Spot instances
- Instance type overrides
- Cost optimization strategies

### Lifecycle Hooks

Implemented lifecycle hooks for:

- Instance warm-up
- Initialization tasks
- Controlled registration

### Dynamic Scaling Policies

Configured scaling based on:

- CPU utilization
- CloudWatch metrics
- Automatic capacity adjustments

### Chaos Testing

Performed:

- Manual instance termination
- Failure simulation
- Recovery validation
- Infrastructure resiliency testing

## Outcome

Successfully demonstrated scalable, resilient, and fault-tolerant AWS infrastructure behavior.

---

# Task 5 — Secure RDS Deployment with IAM & Rotation

## Objective

Deploy a secure Amazon RDS MySQL architecture integrated with EC2 infrastructure.

## Implementations Completed

### Amazon RDS Deployment

Configured:

- MySQL RDS instance
- Automated backups
- Snapshot support
- Secure networking

### EC2 Integration

Implemented secure EC2-to-RDS connectivity using:

- Security groups
- MySQL client access
- Controlled networking

### SQL Operations

Performed:

```sql
CREATE DATABASE roy_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100)
);

INSERT INTO users (name, email)
VALUES ('Roy', 'roy@example.com');

SELECT * FROM users;
```

### Backup and Recovery

Validated:

- Manual snapshots
- Backup workflows
- Recovery procedures

### Security Enhancements

Explored and implemented:

- IAM authentication concepts
- TLS-only database connectivity
- Secure credential handling
- Point-in-time recovery workflows

## Outcome

Successfully implemented secure cloud database deployment and management architecture using AWS RDS services.

---

# Task 6 — Route 53 Domain Setup with ACM and WAF

## Objective

Configure secure domain hosting architecture using Route 53, ACM, CloudFront, and AWS WAF.

## Implementations Completed

### Route 53 Configuration

Configured:

- Hosted zone
- DNS routing
- CloudFront integration

### ACM SSL Certificates

Implemented:

- us-east-1 ACM certificate for CloudFront
- Regional ACM certificate for ALB
- HTTPS-enabled infrastructure

### CloudFront + ALB Architecture

Implemented architecture:

```text
User → CloudFront → ALB → Application
```

### HTTPS Enforcement

Configured:

- HTTP to HTTPS redirection
- HSTS headers
- Secure communication policies

### AWS WAF

Attached WAF to:

- CloudFront distribution
- Application Load Balancer

### Security Rules Enabled

Implemented protection against:

- SQL Injection
- Cross-site scripting (XSS)
- OWASP Top 10 vulnerabilities
- Bot traffic
- Rate limiting attacks
- IP reputation threats

## Outcome

Successfully implemented enterprise-grade secure domain hosting and web application firewall protection architecture.

---

# CI/CD Workflow Implemented

The deployment pipeline followed the workflow below:

```text
GitHub Push
    ↓
CodePipeline Trigger
    ↓
CodeBuild Build Process
    ↓
Docker Image Build
    ↓
Push to Amazon ECR
    ↓
Amazon ECS Deployment
    ↓
ALB Traffic Routing
```

The pipeline supported:

- Automated deployment
- Immutable infrastructure
- Zero downtime releases
- Containerized application delivery

---

# Security Implementations

The infrastructure included multiple security layers:

- HTTPS enforcement
- HSTS configuration
- IAM least privilege policies
- Encrypted S3 storage
- WAF protection
- Signed URLs
- TLS database connections
- Secure CDN access
- Controlled security group rules
- Parameter Store configuration management

---

# Monitoring and Validation

The following validations were completed:

- ECS deployment testing
- CloudFront cache validation
- ALB routing verification
- Auto Scaling validation
- Database connectivity testing
- Snapshot validation
- HTTPS enforcement checks
- CDN analytics monitoring
- CI/CD pipeline testing

---

# Skills Gained During Internship

This internship provided practical experience with:

- AWS Cloud Infrastructure
- DevOps Automation
- Docker Containerization
- ECS Orchestration
- Cloud Security
- CDN Optimization
- Infrastructure Monitoring
- CI/CD Pipelines
- Database Deployment
- IAM Security
- Auto Scaling
- WAF Protection
- HTTPS & SSL Management
- Cloud Architecture Design

---

# Repository Contents

This repository contains:

- Project source code
- Docker configurations
- Deployment files
- Infrastructure documentation
- AWS architecture references
- Internship implementation details
- CI/CD configuration files
- Application deployment assets

---

# Final Internship Outcome

All assigned internship tasks were completed successfully.

The final infrastructure demonstrated:

- Secure cloud-native architecture
- Production-style deployment workflows
- Scalable infrastructure design
- Automated CI/CD pipelines
- CDN optimization
- Secure database architecture
- High availability deployment
- AWS security best practices

The internship significantly improved practical knowledge in AWS cloud engineering and DevOps workflows.

---

# References

- AWS Documentation
- Amazon ECS Documentation
- Amazon CloudFront Documentation
- AWS Lambda Documentation
- AWS RDS Documentation
- AWS IAM Documentation
- AWS WAF Documentation
- Docker Documentation

---

# Author

ROY MATHEW

AWS Cloud Infrastructure & DevOps Internship Project