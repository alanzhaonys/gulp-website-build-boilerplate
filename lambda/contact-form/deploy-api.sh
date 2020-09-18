###################################
# To run this script, you need to create an IAM user
# `contact-form-apigateway` with `AmazonAPIGatewayAdministrator` permission
#
# In your ~/.aws/credentials, add this entry
# [contact-form-apigateway]
# aws_access_key_id = [ YOUR IAM USER ACCESS KEY ]
# aws_secret_access_key = [ YOUR IAM SECRET ACCESS KEY ]
##################################

# Configs
readonly PROFILE=contact-form-apigateway
readonly API_ID=XXX

# Deply the API to v1 stage
aws apigateway create-deployment \
  --rest-api-id $API_ID \
  --stage-name v1 \
  --stage-description "This is the latest" \
  --description "The latest changes" \
  --region us-east-1 \
  --profile $PROFILE
