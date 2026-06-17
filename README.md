# 🔁 CI/CD Pipeline on AWS ECS Fargate

![CI/CD Pipeline](https://github.com/EniyavanM/my-cicd-app/actions/workflows/deploy.yml/badge.svg)

## 📌 Overview
Automated CI/CD pipeline that deploys a Node.js REST API from GitHub to
AWS ECS Fargate. Every commit to `main` triggers automated tests, builds
a Docker image, pushes to ECR, and deploys with zero downtime.

**Live URL:** http://my-cicd-alb-367147798.ap-south-1.elb.amazonaws.com/health

## 🏗 Architecture
<img width="836" height="490" alt="image" src="https://github.com/user-attachments/assets/38adc316-bfbe-4ca3-9976-2f2222c469e5" />


`Developer → GitHub Actions (test → build → push → deploy) → AWS ECS Fargate`

## ⚡ Pipeline Features
- ✅ Automated tests must pass before any deployment
- 🐳 Multi-stage Docker build (image size ~145MB vs 1GB+)
- 🔐 Secrets stored in GitHub Secrets — zero credentials in code
- 🔄 Zero-downtime rolling update deployment
- 📲 Slack notifications on success/failure
- 🔁 Auto-rollback if post-deploy health checks fail
- 🛡 Branch protection — no one can merge without tests passing

## 🛠 Tech Stack
| Tool | Purpose |
|------|---------|
| GitHub Actions | CI/CD orchestration |
| Docker | Containerisation |
| AWS ECR | Container registry |
| AWS ECS Fargate | Serverless container hosting |
| AWS ALB | Load balancing + health checks |
| Node.js + Express | Application |
| Jest + Supertest | Testing |
| Slack API | Deployment notifications |


## 📊 Pipeline Run Time
| Stage | Time |
|-------|------|
| Tests | ~45 seconds |
| Docker build + ECR push | ~2 minutes |
| ECS deployment | ~3 minutes |
| **Total** | **~6 minutes** |

## 💰 AWS Cost
This setup costs approximately **$5–10/month** on AWS:
- ECS Fargate (2 × 0.25 vCPU): ~$5/month
- ECR storage: ~$0.10/month  
- ALB: ~$16/month (shared across projects)

## 📚 What I Learned
- How GitHub Actions jobs, steps, and dependencies work
- Docker multi-stage builds and layer caching
- AWS IAM least-privilege principles
- ECS Fargate task definitions and rolling deployments
- How to write meaningful health checks
- Why branch protection rules matter in teams
