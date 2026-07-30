# AWS Deployment

Suggested architecture for running this app on AWS:

- **ECR** — stores the Docker image built from the root `Dockerfile`.
- **ECS Fargate** — runs the container (see `ecs-task-definition.json`).
- **RDS (PostgreSQL)** — managed database; set `DATABASE_URL` on the ECS task
  to the RDS connection string.
- **Application Load Balancer** — routes traffic to the ECS service on port
  `8080`.

## One-time setup (manual, not scripted here)

1. Create an ECR repository, e.g. `testflow-demo`.
2. Create an RDS PostgreSQL instance and note its connection string.
3. Create an ECS cluster, task execution role, and Fargate service pointing
   at the ECR image and the ALB target group.
4. Store the following as GitHub Actions repo secrets so
   `.github/workflows/deploy-aws.yml` can deploy:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`
   - `ECR_REPOSITORY`
   - `ECS_CLUSTER`
   - `ECS_SERVICE`

## Files

- `ecs-task-definition.json` — template task definition; replace the
  `<ACCOUNT_ID>` and image placeholders before registering it.
- `deploy-aws.yml.example` — GitHub Actions workflow that builds/pushes the
  Docker image to ECR and redeploys the ECS service. Copy it to
  `.github/workflows/deploy-aws.yml` to enable it. It ships here as a
  `.example` file because the repo's current GitHub token does not have the
  `workflow` scope needed to push files under `.github/workflows/` directly —
  add it via the GitHub UI or a token with that scope.
