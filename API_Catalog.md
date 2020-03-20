# API Catalog for z/OSMF v2.4
## Application Linking Manager interface services
- TBD

## Application server routing services
- TBD

## Cloud provisioning services
- TBD

## Data persistence services
- TBD

## Multisystem routing services
- TBD

## MVS subsystem services
- TBD

## Notification services
- TBD

## Software management services
- TBD

## Topology services
- TBD

## TSO/E address space services
- TBD

## WLM resource pooling services
- TBD

## RMF metering services
- TBD

## z/OS console services
### Issue a command
### Get a command response
### Get the detect result for unsolicited messages

## z/OS data set and file REST interface
- TBD

## z/OS jobs REST interface
### Obtain the status of a job
### List the jobs for an owner, prefix or job ID
### List the spool files for a job
- HTTP method and URI path  
`GET /zosmf/restjobs/jobs/<jobname>/<jobid>/files`  
`GET /zosmf/restjobs/jobs/<correlator/files`  
- Return status code `200 OK`  
- [x] implemented
### Retrieve the contents of a job spool file
### Submit a job
### Hold a job
### Release a job
### Change the job class
### Cancel a job
### Cancel a job and purge its output

## z/OSMF information retrieval service
### Retrieve z/OSMF information  
- HTTP method and URI path  
`GET /zosmf/info`
- Return status code `200 OK`  
- [x] implemented
## z/OSMF workflow services
- TBD
