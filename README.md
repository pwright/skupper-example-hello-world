# Skupper Hello World

[![main](https://github.com/skupperproject/skupper-example-hello-world/actions/workflows/main.yaml/badge.svg)](https://github.com/skupperproject/skupper-example-hello-world/actions/workflows/main.yaml)

#### A minimal HTTP application deployed across Kubernetes clusters using Skupper

This example is part of a [suite of examples][examples] showing the
different ways you can use [Skupper][website] to connect services
across cloud providers, data centers, and edge sites.

[website]: https://skupper.io/
[examples]: https://skupper.io/examples/index.html

* [Overview](#overview)
* [Prerequisites](#prerequisites)
* [Summary](#summary)
* [About this example](#about-this-example)

## Overview

This example is a very simple multi-service HTTP application
deployed across Kubernetes clusters using Skupper.

It contains two services:

* A backend service that exposes an `/api/hello` endpoint.  It
  returns greetings of the form `Hi, <your-name>.  I am <my-name>
  (<pod-name>)`.

* A frontend service that sends greetings to the backend and
  fetches new greetings in response.

With Skupper, you can place the backend in one cluster and the
frontend in another and maintain connectivity between the two
services without exposing the backend to the public internet.

<img src="images/entities.svg" width="640"/>

## Prerequisites

* The `kubectl` command-line tool, version 1.15 or later
  ([installation guide][install-kubectl])

* Access to at least one Kubernetes cluster, from [any provider you
  choose][kube-providers]

[install-kubectl]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[kube-providers]: https://skupper.io/start/kubernetes.html

## Step 1: Install the Skupper command-line tool

The `skupper` command-line tool is the entrypoint for installing
and configuring Skupper.  You need to install the `skupper`
command only once for each development environment.

On Linux or Mac, you can use the install script (inspect it
[here][install-script]) to download and extract the command:

~~~ shell
curl https://skupper.io/install.sh | sh
~~~

The script installs the command under your home directory.  It
prompts you to add the command to your path if necessary.

For Windows and other installation options, see [Installing
Skupper][install-docs].

[install-script]: https://github.com/skupperproject/skupper-website/blob/main/docs/install.sh
[install-docs]: https://skupper.io/install/index.html

## Step 2: Configure separate console sessions

Skupper is designed for use with multiple namespaces, usually on
different clusters.  The `skupper` command uses your
[kubeconfig][kubeconfig] and current context to select the
namespace where it operates.

[kubeconfig]: https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/

Your kubeconfig is stored in a file in your home directory.  The
`skupper` and `kubectl` commands use the `KUBECONFIG` environment
variable to locate it.

A single kubeconfig supports only one active context per user.
Since you will be using multiple contexts at once in this
exercise, you need to create distinct kubeconfigs.

Start a console session for each of your namespaces.  Set the
`KUBECONFIG` environment variable to a different path in each
session.

=== "west"

    ~~~ shell
    export KUBECONFIG=~/.kube/config-west
    ~~~

=== "east"

    ~~~ shell
    export KUBECONFIG=~/.kube/config-east
    ~~~

## Step 3: Access your clusters

The procedure for accessing a Kubernetes cluster varies by
provider. [Find the instructions for your chosen
provider][kube-providers] and use them to authenticate and
configure access for each console session.

[kube-providers]: https://skupper.io/start/kubernetes.html

## Step 4: Set up your namespaces

Use `kubectl create namespace` to create the namespaces you wish
to use (or use existing namespaces).  Use `kubectl config
set-context` to set the current namespace for each session.

=== "west"

    ~~~ shell
    kubectl create namespace west
    kubectl config set-context --current --namespace west
    ~~~

=== "east"

    ~~~ shell
    kubectl create namespace east
    kubectl config set-context --current --namespace east
    ~~~

## Step 5: Set up environment for new console

Set up unique images for console

=== "west"

    ~~~ shell
    export SKUPPER_SERVICE_CONTROLLER_IMAGE=quay.io/ajssmith/service-controller:latest
    export SKUPPER_VFLOW_COLLECTOR_IMAGE=quay.io/skupper/vflow-collector:latest
    ~~~

=== "east"

    ~~~ shell
    export SKUPPER_SERVICE_CONTROLLER_IMAGE=quay.io/ajssmith/service-controller:latest
    export SKUPPER_VFLOW_COLLECTOR_IMAGE=quay.io/skupper/vflow-collector:latest
    ~~~

## Step 6: Install Skupper in your namespaces

The `skupper init` command installs the Skupper router and service
controller in the current namespace.  Run the `skupper init` command
in each namespace.

**Note:** If you are using Minikube, [you need to start `minikube
tunnel`][minikube-tunnel] before you install Skupper.

[minikube-tunnel]: https://skupper.io/start/minikube.html#running-minikube-tunnel

=== "west"

    ~~~ shell
    skupper init
    ~~~

=== "east"

    ~~~ shell
    skupper init
    ~~~

_Sample output:_

~~~ console
$ skupper init
Waiting for LoadBalancer IP or hostname...
Skupper is now installed in namespace '<namespace>'.  Use 'skupper status' to get more information.
~~~

## Step 7: Check the status of your namespaces

Use `skupper status` in each console to check that Skupper is
installed.

=== "west"

    ~~~ shell
    skupper status
    ~~~

=== "east"

    ~~~ shell
    skupper status
    ~~~

_Sample output:_

~~~ console
Skupper is enabled for namespace "<namespace>" in interior mode. It is connected to 1 other site. It has 1 exposed service.
The site console url is: <console-url>
The credentials for internal console-auth mode are held in secret: 'skupper-console-users'
~~~

As you move through the steps below, you can use `skupper status` at
any time to check your progress.

## Step 8: Link your namespaces

Creating a link requires use of two `skupper` commands in
conjunction, `skupper token create` and `skupper link create`.

The `skupper token create` command generates a secret token that
signifies permission to create a link.  The token also carries the
link details.  Then, in a remote namespace, The `skupper link
create` command uses the token to create a link to the namespace
that generated it.

**Note:** The link token is truly a *secret*.  Anyone who has the
token can link to your namespace.  Make sure that only those you
trust have access to it.

First, use `skupper token create` in one namespace to generate the
token.  Then, use `skupper link create` in the other to create a
link.

=== "west"

    ~~~ shell
    skupper token create ~/secret.token
    ~~~

=== "east"

    ~~~ shell
    skupper link create ~/secret.token
    ~~~

If your console sessions are on different machines, you may need
to use `sftp` or a similar tool to transfer the token securely.
By default, tokens expire after a single use or 15 minutes after
creation.

## Step 9: Deploy the frontend and backend services

Use `kubectl create deployment` to deploy the frontend service
in `west` and the backend service in `east`.

=== "west"

    ~~~ shell
    kubectl create deployment frontend --image quay.io/skupper/hello-world-frontend
    ~~~

=== "east"

    ~~~ shell
    kubectl create deployment backend --image quay.io/skupper/hello-world-backend --replicas 3
    ~~~

## Step 10: Expose the backend service

We now have two namespaces linked to form a Skupper network, but
no services are exposed on it.  Skupper uses the `skupper
expose` command to select a service from one namespace for
exposure on all the linked namespaces.

**Note:** You can expose services that are not in the same
namespace where you installed Skupper as described in the
[Exposing services from a different namespace][different-ns]
documentation.

[different-ns]: https://skupper.io/docs/cli/index.html#exposing-services-from-different-ns

Use `skupper expose` to expose the backend service to the
frontend service.

=== "east"

    ~~~ shell
    skupper expose deployment/backend --port 8080
    ~~~

## Step 11: Expose the frontend service

We have established connectivity between the two namespaces and
made the backend in `east` available to the frontend in `west`.
Before we can test the application, we need external access to
the frontend.

Use `kubectl expose` with `--type LoadBalancer` to open network
access to the frontend service.

=== "west"

    ~~~ shell
    kubectl expose deployment/frontend --port 8080 --type LoadBalancer
    ~~~

## Step 12: Test the application

Now we're ready to try it out.  Use `kubectl get service/frontend`
to look up the external IP of the frontend service.  Then use
`curl` or a similar tool to request the `/api/health` endpoint at
that address.

**Note:** The `<external-ip>` field in the following commands is a
placeholder.  The actual value is an IP address.

=== "west"

    ~~~ shell
    kubectl get service/frontend
    curl http://<external-ip>:8080/api/health
    ~~~

If everything is in order, you can now access the web interface by
navigating to `http://<external-ip>:8080/` in your browser.

## Accessing the web console

Skupper includes a web console you can use to view the application
network.  To access it, use `skupper status` to look up the URL of
the web console.  Then use `kubectl get
secret/skupper-console-users` to look up the console admin
password.

**Note:** The `<console-url>` and `<password>` fields in the
following output are placeholders.  The actual values are specific
to your environment.

=== "west"

    ~~~ shell
    skupper status
    kubectl get secret/skupper-console-users -o jsonpath={.data.admin} | base64 -d
    ~~~

Navigate to `<console-url>` in your browser.  When prompted, log
in as user `admin` and enter the password.

## Cleaning up

To remove Skupper and the other resources from this exercise, use
the following commands.

=== "west"

    ~~~ shell
    skupper delete
    kubectl delete service/frontend
    kubectl delete deployment/frontend
    ~~~

=== "east"

    ~~~ shell
    skupper delete
    kubectl delete deployment/backend
    ~~~

## Summary

This example locates the frontend and backend services in different
namespaces, on different clusters.  Ordinarily, this means that they
have no way to communicate unless they are exposed to the public
internet.

Introducing Skupper into each namespace allows us to create a virtual
application network that can connect services in different clusters.
Any service exposed on the application network is represented as a
local service in all of the linked namespaces.

The backend service is located in `east`, but the frontend service
in `west` can "see" it as if it were local.  When the frontend
sends a request to the backend, Skupper forwards the request to the
namespace where the backend is running and routes the response back to
the frontend.

<img src="images/sequence.svg" width="640"/>

## Next steps

Check out the other [examples][examples] on the Skupper website.

## About this example

This example was produced using [Skewer][skewer], a library for
documenting and testing Skupper examples.

[skewer]: https://github.com/skupperproject/skewer

Skewer provides utility functions for generating the README and
running the example steps.  Use the `./plano` command in the project
root to see what is available.

To quickly stand up the example using Minikube, try the `./plano demo`
command.
