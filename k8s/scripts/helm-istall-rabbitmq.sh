helm upgrade --install rabbitmq \
  --version 10.2.1 \
  --set auth.username=admin \
  --set auth.password=admin \
  --set auth.erlangCookie=secretcookie \
  --set metrics.enabled=true \
  bitnami/rabbitmq

