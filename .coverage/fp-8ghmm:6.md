---
counterFlow:
  counterFlow: 8ghmm:6
  endTime: 1695726356137239
  identity: 4c82k:9
  latency: 495
  octets: 245
  octetsUnacked: 245
  parent: 4c82k:2
  place: 2
  process: 81770ca0-1b49-49bd-aeb0-b5e0f777ad84
  processName: backend-7c84887f9f-gs9bq
  protocol: tcp
  recType: FLOW
  sourceHost: 10.85.0.6
  sourcePort: '43260'
  startTime: 1695726356134833
  trace: 0/west-skupper-router-77c6c5b977-8ghmm
  windowSize: 1459620
destinationSiteId: 31642137-150b-4f5a-ba2f-32e3f39f3828
destinationSiteName: east
endTime: 1695726356137365
flowTrace: west-skupper-router-77c6c5b977-8ghmm@west|east-skupper-router-846db47fc4-4c82k@east
forwardFlow:
  counterFlow: 4c82k:9
  endTime: 1695726356137365
  identity: 8ghmm:6
  latency: 855
  octets: 279
  octetsUnacked: 279
  parent: 8ghmm:2
  place: 1
  process: e69f9174-397c-47e1-983b-f3fb810524e1
  processName: site-clients-c3c4e40e
  protocol: tcp
  recType: FLOW
  sourceHost: 10.85.0.1
  sourcePort: '42167'
  startTime: 1695726356134558
  windowSize: 1459620
identity: fp-8ghmm:6
processAggregateId: e69f9174-397c-47e1-983b-f3fb810524e1-to-81770ca0-1b49-49bd-aeb0-b5e0f777ad84
processGroupAggregateId: e6cb5e3d-45d6-49f6-98f3-187f75ef784d-to-dc45aaba-36fd-4c53-9b78-6052d8a737ea
protocol: tcp
recType: FLOWPAIR
siteAggregateId: c3c4e40e-f5e1-4436-b247-d944eb25da23-to-31642137-150b-4f5a-ba2f-32e3f39f3828
sourceSiteId: c3c4e40e-f5e1-4436-b247-d944eb25da23
sourceSiteName: west
startTime: 1695726356134558
---
**recType**: [[FLOWPAIR]]
**identity**: [[fp-8ghmm:6]]
**startTime**: 1695726356134558
**endTime**: 1695726356137365
**protocol**: [[tcp]]
**sourceSiteId**: c3c4e40e-f5e1-4436-b247-d944eb25da23
**sourceSiteName**: west
**destinationSiteId**: 31642137-150b-4f5a-ba2f-32e3f39f3828
**destinationSiteName**: east
**flowTrace**: west-skupper-router-77c6c5b977-8ghmm@west|east-skupper-router-846db47fc4-4c82k@east
**forwardFlow**: {'recType': 'FLOW', 'identity': '8ghmm:6', 'parent': '8ghmm:2', 'startTime': 1695726356134558, 'endTime': 1695726356137365, 'sourceHost': '10.85.0.1', 'sourcePort': '42167', 'counterFlow': '4c82k:9', 'latency': 855, 'octets': 279, 'octetsUnacked': 279, 'windowSize': 1459620, 'process': 'e69f9174-397c-47e1-983b-f3fb810524e1', 'processName': 'site-clients-c3c4e40e', 'protocol': 'tcp', 'place': 1}
**counterFlow**: {'recType': 'FLOW', 'identity': '4c82k:9', 'parent': '4c82k:2', 'startTime': 1695726356134833, 'endTime': 1695726356137239, 'sourceHost': '10.85.0.6', 'sourcePort': '43260', 'counterFlow': '8ghmm:6', 'trace': '0/west-skupper-router-77c6c5b977-8ghmm', 'latency': 495, 'octets': 245, 'octetsUnacked': 245, 'windowSize': 1459620, 'process': '81770ca0-1b49-49bd-aeb0-b5e0f777ad84', 'processName': 'backend-7c84887f9f-gs9bq', 'protocol': 'tcp', 'place': 2}
**siteAggregateId**: c3c4e40e-f5e1-4436-b247-d944eb25da23-to-31642137-150b-4f5a-ba2f-32e3f39f3828
**processGroupAggregateId**: e6cb5e3d-45d6-49f6-98f3-187f75ef784d-to-dc45aaba-36fd-4c53-9b78-6052d8a737ea
**processAggregateId**: e69f9174-397c-47e1-983b-f3fb810524e1-to-81770ca0-1b49-49bd-aeb0-b5e0f777ad84