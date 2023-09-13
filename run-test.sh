# run in west ns

for (( ; ; ))
do
    kubectl exec $(kubectl get pod -l application=iperf3-client -o=jsonpath='{.items[0].metadata.name}') -- iperf3 -c iperf3-server
    echo "infinite loop[ hit CTRL+C to stop]"

done

