# Skupper Hello World

<!-- [![Build Status](https://travis-ci.org/skupperproject/skupper-example-xxx.svg?branch=master)](https://travis-ci.org/skupperproject/skupper-example-xxx) -->

A minimal HTTP application using [Skupper](https://skupper.io/)

* [Overview](#overview)
* [Prerequisites](#prerequisites)
* [Step 1: Set up your namespaces](#step-1-set-up-your-namespaces)
* [Step 2: Deploy the backend and frontend services](#step-2-deploy-the-backend-and-frontend-services)
* [Step 3: Connect your namespaces](#step-3-connect-your-namespaces)
* [Step 4: Expose the backend service on the Skupper network](#step-4-expose-the-backend-service-on-the-skupper-network)
* [Step 5: Test the application](#step-5-test-the-application)
* [What just happened?](#what-just-happened)
* [Cleaning up](#cleaning-up)
* [Next steps](#next-steps)

## Overview

This example is a very simple multi-service HTTP application that can
be deployed across multiple Kubernetes clusters using Skupper.

It contains two services:

* A backend service that exposes an `/api/hello` endpoint.  It returns
  greetings of the form `Hello <count>`.

* A frontend service that accepts HTTP requests, calls the backend to
  fetch new greetings, and serves them to the user.

With Skupper, we can place the backend in one cluster and the frontend
in another and maintain connectivity between the two services without
exposing the backend to the public internet.

## Prerequisites

* The `kubectl` command-line tool, version 1.15 or later ([installation guide](https://kubernetes.io/docs/tasks/tools/install-kubectl/))
* The `skupper` command-line tool, the latest version ([installation guide](https://skupper.io/start/index.html#step-1-install-the-skupper-command-line-tool-in-your-environment))
* Two Kubernetes namespaces, from any providers you choose, on any clusters you choose

## Step 1: Set up your namespaces

Since we are dealing with two namespaces, we need to set up isolated
`kubectl` configurations, one for each namespace.  In this example, we
will use distinct kubeconfigs on separate consoles.

Console for namespace 1:

    export KUBECONFIG=$HOME/.kube/config-ns1
    <login-command-for-your-provider>
    kubectl create namespace ns1
    kubectl config set-context --current --namespace ns1
    skupper init

Console for namespace 2:

    export KUBECONFIG=$HOME/.kube/config-ns2
    <login-command-for-your-provider>
    kubectl create namespace ns2
    kubectl config set-context --current --namespace ns2
    skupper init

See [Getting started with Skupper](https://skupper.io/start/) for more
information about setting up namespaces.

Use `skupper status` in each console to check that Skupper is
installed.

    $ skupper status
    Namespace '<ns>' is ready.  It is connected to 0 other namespaces.

As you move through the steps that follow, you can continue to use `skupper
status` at any time to check your progress.

## Step 2: Deploy the backend and frontend services

Use `kubectl create deployment` and `kubectl expose` to deploy the
services:

Namespace 1:

    kubectl create deployment hello-world-backend --image quay.io/skupper/hello-world-backend
    kubectl expose deployment/hello-world-backend --port 8080

Namespace 2:

    kubectl create deployment hello-world-frontend --image quay.io/skupper/hello-world-frontend
    kubectl expose deployment/hello-world-frontend --port 8080 --type LoadBalancer

At this point, the frontend is exposed externally (from the `kubectl
expose` with `--type LoadBalancer`), but if you send a request to it,
you will see that the frontend has no connectivity to the backend:

Namespace 2:

    $ curl $(kubectl get service/hello-world-frontend -o jsonpath='http://{.status.loadBalancer.ingress[0].ip}:{.spec.ports[0].port}/')
    Trouble! HTTPConnectionPool(host='hello-world-backend', port=8080):
      Max retries exceeded with url: /api/hello
        (Caused by NewConnectionError('<urllib3.connection.HTTPConnection object at 0x7fe411ea7990>:
          Failed to establish a new connection: [Errno -2] Name or service not known'))

The backend service is currently available only inside namespace 1, so
when the frontend service in namespace 2 attempts to contact it, it
fails.

In the next steps, we will establish connectivity between the two
namespaces and make the backend available to the frontend in namespace
2.

## Step 3: Connect your namespaces

To connect namespaces, Skupper requires a token representing
permission to form a connection.  This token contains a secret (only
share it with those you trust) and the logistical details of making a
connection.

Use `skupper connection-token` in namespace 1 to generate the token.

Namespace 1:

    skupper connection-token $HOME/secret.yaml

Use `skupper connect` in namespace 2 to use the generated token to
form a connection.

Namespace 2:

    skupper connect $HOME/secret.yaml

If your console sessions are on different machines, you may need to
use `scp` or a similar tool to transfer the token.

## Step 4: Expose the backend service on the Skupper network

We now have connected namespaces, but there is one more step.  To
select a service from one namespace for exposure on all the connected
namespaces, Skupper uses an annotation on Kubernetes services.

Use `kubectl annotate` with the annotation `skupper.io/proxy=http` to
expose the backend service:

Namespace 1:

    kubectl annotate service/hello-world-backend skupper.io/proxy=http

Once the service is annotated, Skupper creates matching services on
all the connected namespaces.  Use `kubectl get services` on namespace
2 to look for the `hello-world-backend` service to appear.

Namespace 2:

    $ kubectl get services
    NAME                   TYPE           CLUSTER-IP       EXTERNAL-IP      PORT(S)          AGE
    [...]
    hello-world-backend    ClusterIP      10.106.92.175    <none>           8080/TCP         11h
    hello-world-frontend   LoadBalancer   10.111.133.137   10.111.133.137   8080:31313/TCP   6m31s
    [...]

## Step 5: Test the application

Now we can send a request to the frontend again to see if it has full
connectivity to the backend.

Namespace 2:

    curl $(kubectl get service/hello-world-frontend -o jsonpath='http://{.status.loadBalancer.ingress[0].ip}:{.spec.ports[0].port}/')

Sample output:

    I am the frontend.  The backend says 'Hello 1'.

## What just happened?

In the form of a sequence diagram:

<img style="width: 40em;" src="images/sequence.svg" alt="Sequence diagram"/>

## Cleaning up

Namespace 1:

    skupper delete
    kubectl delete service/hello-world-backend
    kubectl delete deployment/hello-world-backend

Namespace 2:

    skupper delete
    kubectl delete service/hello-world-frontend
    kubectl delete deployment/hello-world-frontend

## Next steps

 - [Try our minimal example for TCP-based communication](https://github.com/skupperproject/skupper-example-tcp-echo)
 - [Find more examples](https://skupper.io/examples/)