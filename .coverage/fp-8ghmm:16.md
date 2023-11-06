---
counterFlow:
  counterFlow: 8ghmm:16
  endTime: 1695726450146646
  identity: 4c82k:19
  latency: 294
  octets: 239
  octetsUnacked: 113
  parent: 4c82k:3
  place: 2
  process: c9a210c7-0265-4786-af05-14b40a2ad3f8
  processName: backend-7c84887f9f-bl2sq
  protocol: tcp
  recType: FLOW
  sourceHost: 10.85.0.6
  sourcePort: '34644'
  startTime: 1695726450139328
  trace: 0/west-skupper-router-77c6c5b977-8ghmm
  windowSize: 1459620
destinationSiteId: 31642137-150b-4f5a-ba2f-32e3f39f3828
destinationSiteName: east
endTime: 1695726450147323
flowTrace: west-skupper-router-77c6c5b977-8ghmm@west|east-skupper-router-846db47fc4-4c82k@east
forwardFlow:
  counterFlow: 4c82k:19
  endTime: 1695726450147323
  identity: 8ghmm:16
  latency: 765
  octets: 279
  octetsUnacked: 77
  parent: 8ghmm:2
  place: 1
  process: e69f9174-397c-47e1-983b-f3fb810524e1
  processName: site-clients-c3c4e40e
  protocol: tcp
  recType: FLOW
  sourceHost: 10.85.0.1
  sourcePort: '24507'
  startTime: 1695726450138804
  windowSize: 1459620
identity: fp-8ghmm:16
processAggregateId: e69f9174-397c-47e1-983b-f3fb810524e1-to-c9a210c7-0265-4786-af05-14b40a2ad3f8
processGroupAggregateId: e6cb5e3d-45d6-49f6-98f3-187f75ef784d-to-dc45aaba-36fd-4c53-9b78-6052d8a737ea
protocol: tcp
recType: FLOWPAIR
siteAggregateId: c3c4e40e-f5e1-4436-b247-d944eb25da23-to-31642137-150b-4f5a-ba2f-32e3f39f3828
sourceSiteId: c3c4e40e-f5e1-4436-b247-d944eb25da23
sourceSiteName: west
startTime: 1695726450138804
---
**recType**: [[FLOWPAIR]]
**identity**: [[fp-8ghmm:16]]
**startTime**: 1695726450138804
**endTime**: 1695726450147323
**protocol**: [[tcp]]
**sourceSiteId**: c3c4e40e-f5e1-4436-b247-d944eb25da23
**sourceSiteName**: west
**destinationSiteId**: 31642137-150b-4f5a-ba2f-32e3f39f3828
**destinationSiteName**: east
**flowTrace**: west-skupper-router-77c6c5b977-8ghmm@west|east-skupper-router-846db47fc4-4c82k@east
**forwardFlow**: {'recType': 'FLOW', 'identity': '8ghmm:16', 'parent': '8ghmm:2', 'startTime': 1695726450138804, 'endTime': 1695726450147323, 'sourceHost': '10.85.0.1', 'sourcePort': '24507', 'counterFlow': '4c82k:19', 'latency': 765, 'octets': 279, 'octetsUnacked': 77, 'windowSize': 1459620, 'process': 'e69f9174-397c-47e1-983b-f3fb810524e1', 'processName': 'site-clients-c3c4e40e', 'protocol': 'tcp', 'place': 1}
**counterFlow**: {'recType': 'FLOW', 'identity': '4c82k:19', 'parent': '4c82k:3', 'startTime': 1695726450139328, 'endTime': 1695726450146646, 'sourceHost': '10.85.0.6', 'sourcePort': '34644', 'counterFlow': '8ghmm:16', 'trace': '0/west-skupper-router-77c6c5b977-8ghmm', 'latency': 294, 'octets': 239, 'octetsUnacked': 113, 'windowSize': 1459620, 'process': 'c9a210c7-0265-4786-af05-14b40a2ad3f8', 'processName': 'backend-7c84887f9f-bl2sq', 'protocol': 'tcp', 'place': 2}
**siteAggregateId**: c3c4e40e-f5e1-4436-b247-d944eb25da23-to-31642137-150b-4f5a-ba2f-32e3f39f3828
**processGroupAggregateId**: e6cb5e3d-45d6-49f6-98f3-187f75ef784d-to-dc45aaba-36fd-4c53-9b78-6052d8a737ea
**processAggregateId**: e69f9174-397c-47e1-983b-f3fb810524e1-to-c9a210c7-0265-4786-af05-14b40a2ad3f8