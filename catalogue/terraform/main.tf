module "catalogue-prod" {
  source = "./stack"

  container_image = "wellcome/catalogue_webapp:${var.container_tag}"
  nginx_image     = local.nginx_image
  env_suffix      = "prod"

  cluster_arn  = local.prod_cluster_arn
  namespace_id = local.prod_namespace_id

  alb_listener_http_arn  = local.prod_alb_listener_http_arn
  alb_listener_https_arn = local.prod_alb_listener_https_arn

  interservice_security_group_id   = local.prod_interservice_security_group_id
  service_egress_security_group_id = local.prod_service_egress_security_group_id

  subdomain = "works.www"
}

// Uncomment to create a staging environment
// You can replace var.container_tag & local.nginx_image
// to test differing images.
//
// The service should be available at:
// "works.www-stage.wellcomecollection.org/works"

module "catalogue-stage" {
  source = "./stack_16092020"

  container_image = "wellcome/catalogue_webapp:${var.container_tag}"
  nginx_image     = local.nginx_image
  env_suffix      = "stage"

  cluster_arn  = local.stage_cluster_arn
  namespace_id = local.stage_namespace_id

  alb_listener_http_arn  = local.stage_alb_listener_http_arn
  alb_listener_https_arn = local.stage_alb_listener_https_arn

  interservice_security_group_id   = local.stage_interservice_security_group_id
  service_egress_security_group_id = local.stage_service_egress_security_group_id

  deployment_service_name = "catalogue_webapp"
  deployment_service_env  = "stage"

  subdomain = "works.www-stage"
}
