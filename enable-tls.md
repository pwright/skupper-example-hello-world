## Commands


kubectl config set-context --current --namespace east

kubectl apply -f ngnixhttp2tls_nocerts.yaml

skupper expose deployment nghttp2tls --port 443 --protocol http2 --enable-tls

kubectl  apply -f ngnixhttp2tls_withcerts.yaml


## General commands

1. Deploy an HTTPS enabled service in the k8s cluster.

2. After configuring the VAN, execute the following command:
```           
skupper expose deployment backend --port 5432 --protocol http2 --enable-tls
```

3. Next, we will need to modify the deployment of the service by appending the secret skupper-tls-<SERVICE-ADDRESS> (e.g. skupper-tls-backend) to a volume that will be configured to the deployment as well. The selected path should be the one in which the service expects to find the certification files.


4. If the client is deployed in a different cluster, it will need to use the CA stored in the secret skupper-service-client, by appending the secret into a volume, following the example of the previous step.


## Specific commands


1. Create two clusters: private and public. Install Skupper and create a link from the private cluster to the public one.
2. Deploy nginx service in the private cluster with: kubectl -f apply ngnixhttp2tls_nocerts.yaml
3. Expose the service with the flag --enable-tls: skupper expose deployment nghttp2tls --port 443 --protocol http2 --enable-tls
4. Check the existence of the secret skupper-tls-nghttp2tls in the private cluster: kubectl get secrets
5. Modify the ngnix deployment adding the certification files with: kubectl -f apply ngnixhttp2tls_withcerts.yaml
6. In the public cluster, send a request using curl inside the router or config-sync containers:
- kubectl exec --stdin --tty deploy/skupper-router -c router -- /bin/bash
- curl -v https://nghttp2tls:443/ --cacert /etc/skupper-router-certs/skupper-service-client/ca.crt --cert-type PEM  --http2-prior-knowledge

And this should be enough; the step 6 tries to simulate a request inside the public cluster within a container that has the secret skupper-service-client appended in a volume. 

Alternatively to the step 6, you can deploy in the public cluster a container with a client that sends requests to https://nghttp2tls:443 with the secret skupper-service-client appended to a volume (mapped into /tmp/certs/ path in the gist example); which is what I have done with the job TestHttp2TlsJob in PR#755

You can see an example on how to append cluster secrets into a volume for a deployment in the file ngnixhttp2tls_withcerts.yaml. 

