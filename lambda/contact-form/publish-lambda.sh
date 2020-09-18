###################################
# To run this script, you need to create an IAM user
# `contact-form-lambda` with `AWSLambdaFullAccess` permission
#
# In your ~/.aws/credentials, add this entry
# [contact-form-lambda]
# aws_access_key_id = [ YOUR IAM USER ACCESS KEY ]
# aws_secret_access_key = [ YOUR IAM SECRET ACCESS KEY ]
##################################

# Configs
readonly PROFILE=contact-form-lambda
readonly LAMBDA_NAME=contactForm
readonly ZIP_NAME="$LAMBDA_NAME.zip"

# Zip it up
zip -r $LAMBDA_NAME . -x "*.git*" $ZIP_NAME

# Update Lambda function and publish
aws lambda update-function-code \
  --region us-east-1 \
  --function-name $LAMBDA_NAME \
  --zip-file fileb://$ZIP_NAME \
  --publish \
  --profile $PROFILE

# Clean up
rm -rf $ZIP_NAME
