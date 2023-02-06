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

- install SDK google cloud: cloud.google.com/sdk/docs/quickstarts
- gcloud auth login
- gcloud init   -> CONFIG
- gcloud container clusters get-credentials ticketing-dev -> Context -> add new Context into Docker Desktop

- Cloud Build API 
- kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.5.1/deploy/static/provider/cloud/deploy.yaml  -> Check the context Mandatory

## Load Balancer -> Ingress controller -> Pods
 ### check the load balancer in google cloud - network sevices/ load balancing  -> GET IP:Port  Just number:numberNotNecesary
 - UPDATE 
 - windows: C:Windows/System32/Drivers/etc/hosts
 - IP:Port  ticketing.dev

- kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.5.1/deploy/static/provider/aws/deploy.yaml -> Optional AWS
- kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.5.1/deploy/static/provider/cloud/deploy.yaml -> Mandatory Google config
- skaffold dev -> Check deploy and connected Load balancer -> Code build for to logs

### Helpers
- kubectl get pods
- kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
- kubectl get secrets
- kubectl describe pod <idPod>

### common package with NPMJS
- export * from '../files'
- create organization into npm
- into the package.json "name": "<idNameNPM>/packageName",
- npm login
- npm publish --access public|||
- check the package pushed into npmjs.com
- npm version patch