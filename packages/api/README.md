
#Set up development environment
- Create `.env` file in the root folder
- Add required ENV variables
### Required ENV variables
```
TWILIO_ACCOUNT_ID=
TWILIO_AUTH_TOKEN=  
TWILIO_WORKSPACE_SID=  
TWILIO_WORKFLOW_SID=  
TWILIO_ACTIVITIES_IDLE=  
TWILIO_ACTIVITIES_OFFLINE=  
TWILIO_PHONE=  
TWILIO_REAL=  
HOMELISTER_API_BASE_URL=
# Used to generate proper callback URLs
# In the dev environment should be set to ngrock url
URL=  
```
### Available ENV variables
```
# Prefix for all endpoints
# default: twilios
SERVICE_ROUT_PREFIX= 
```
### Development ENV variables
```
# email to request admin token
HOMELISTER_API_EMAIL=
# password to request admin token
HOMELISTER_API_PASSWORD= 
```
