module "ecs_router_iam" {
  source = "git::https://github.com/wellcometrust/terraform.git//terraform/ecs_iam?ref=v1.0.0"
  name   = "router"
}
