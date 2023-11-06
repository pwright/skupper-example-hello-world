---
counterFlow:
  counterFlow: 8ghmm:24
  endTime: 1695726457107960
  identity: 4c82k:27
  latency: 1245
  octets: 245
  octetsUnacked: 245
  parent: 4c82k:2
  place: 2
  process: 81770ca0-1b49-49bd-aeb0-b5e0f777ad84
  processName: backend-7c84887f9f-gs9bq
  protocol: tcp
  recType: FLOW
  sourceHost: 10.85.0.6
  sourcePort: '50546'
  startTime: 1695726457097924
  trace: 0/west-skupper-router-77c6c5b977-8ghmm
  windowSize: 1459620
destinationSiteId: 31642137-150b-4f5a-ba2f-32e3f39f3828
destinationSiteName: east
endTime: 1695726457108359
flowTrace: west-skupper-router-77c6c5b977-8ghmm@west|east-skupper-router-846db47fc4-4c82k@east
forwardFlow:
  counterFlow: 4c82k:27
  endTime: 1695726457108359
  identity: 8ghmm:24
  latency: 2712
  octets: 279
  octetsUnacked: 77
  parent: 8ghmm:2
  place: 1
  process: e69f9174-397c-47e1-983b-f3fb810524e1
  processName: site-clients-c3c4e40e
  protocol: tcp
  recType: FLOW
  sourceHost: 10.85.0.1
  sourcePort: '59144'
  startTime: 1695726457097061
  windowSize: 1459620
identity: fp-8ghmm:24
processAggregateId: e69f9174-397c-47e1-983b-f3fb810524e1-to-81770ca0-1b49-49bd-aeb0-b5e0f777ad84
processGroupAggregateId: e6cb5e3d-45d6-49f6-98f3-187f75ef784d-to-dc45aaba-36fd-4c53-9b78-6052d8a737ea
protocol: tcp
recType: FLOWPAIR
siteAggregateId: c3c4e40e-f5e1-4436-b247-d944eb25da23-to-31642137-150b-4f5a-ba2f-32e3f39f3828
sourceSiteId: c3c4e40e-f5e1-4436-b247-d944eb25da23
sourceSiteName: west
startTime: 1695726457097061
---
**recType**: [[FLOWPAIR]]
**identity**: [[fp-8ghmm:24]]
**startTime**: 1695726457097061
**endTime**: 1695726457108359
**protocol**: [[tcp]]
**sourceSiteId**: c3c4e40e-f5e1-4436-b247-d944eb25da23
**sourceSiteName**: west
**destinationSiteId**: 31642137-150b-4f5a-ba2f-32e3f39f3828
**destinationSiteName**: east
**flowTrace**: west-skupper-router-77c6c5b977-8ghmm@west|east-skupper-router-846db47fc4-4c82k@east
**forwardFlow**: {'recType': 'FLOW', 'identity': '8ghmm:24', 'parent': '8ghmm:2', 'startTime': 1695726457097061, 'endTime': 1695726457108359, 'sourceHost': '10.85.0.1', 'sourcePort': '59144', 'counterFlow': '4c82k:27', 'latency': 2712, 'octets': 279, 'octetsUnacked': 77, 'windowSize': 1459620, 'process': 'e69f9174-397c-47e1-983b-f3fb810524e1', 'processName': 'site-clients-c3c4e40e', 'protocol': 'tcp', 'place': 1}
**counterFlow**: {'recType': 'FLOW', 'identity': '4c82k:27', 'parent': '4c82k:2', 'startTime': 1695726457097924, 'endTime': 1695726457107960, 'sourceHost': '10.85.0.6', 'sourcePort': '50546', 'counterFlow': '8ghmm:24', 'trace': '0/west-skupper-router-77c6c5b977-8ghmm', 'latency': 1245, 'octets': 245, 'octetsUnacked': 245, 'windowSize': 1459620, 'process': '81770ca0-1b49-49bd-aeb0-b5e0f777ad84', 'processName': 'backend-7c84887f9f-gs9bq', 'protocol': 'tcp', 'place': 2}
**siteAggregateId**: c3c4e40e-f5e1-4436-b247-d944eb25da23-to-31642137-150b-4f5a-ba2f-32e3f39f3828
**processGroupAggregateId**: e6cb5e3d-45d6-49f6-98f3-187f75ef784d-to-dc45aaba-36fd-4c53-9b78-6052d8a737ea
**processAggregateId**: e69f9174-397c-47e1-983b-f3fb810524e1-to-81770ca0-1b49-49bd-aeb0-b5e0f777ad84