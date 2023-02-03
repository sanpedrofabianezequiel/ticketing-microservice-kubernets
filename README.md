### Run Skaffold before created the image with the package.json
```
skaffold dev
```

### Nginx
- https://kubernetes.github.io/ingress-nginx/deploy/
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.5.1/deploy/static/provider/cloud/deploy.yaml
kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission
```

- mac : /etc/hosts
- windows: C:Windows/System32/Drivers/etc/hosts
- 127.0.0.1 ticketing.dev
- write "thisisunsafe" in chrome screen