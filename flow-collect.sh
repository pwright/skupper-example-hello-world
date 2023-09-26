#!/bin/bash

# Check for correct number of arguments
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <namespace>"
  exit 1
fi

# Assign namespace from argument
NAMESPACE=$1

# Fetch all pod names in the namespace and filter those that start with 'skupper-service-controller'
POD_NAMES=$(kubectl get pods -n "$NAMESPACE" --no-headers -o custom-columns=":metadata.name" | grep '^skupper-service-controller')

# Check if any pods were found
if [ -z "$POD_NAMES" ]; then
  echo "No pods found starting with 'skupper-service-controller' in namespace $NAMESPACE."
  exit 1
fi

# Output the pod names
echo "$POD_NAMES"

# kubectl logs -f $POD_NAMES -c flow-collector 

python ./flowlog.py --pod $POD_NAMES