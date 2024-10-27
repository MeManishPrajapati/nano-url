export PORT=80

# load mongo secrets in AWS from Secret manager
SECRET_NAME="MongoDB"

# Retrieve the secret from Secrets Manager and store it in a variable
SECRET_JSON=$(aws secretsmanager get-secret-value --secret-id "$SECRET_NAME" --query SecretString --output text)

# Parse the JSON to extract specific keys
MONGO_DB_USERNAME=$(echo $SECRET_JSON | jq -r '.MONGO_DB_USERNAME')
MONGO_DB_PASSWORD=$(echo $SECRET_JSON | jq -r '.MONGO_DB_PASSWORD')

# Check if values were successfully retrieved
if [[ -n "$MONGO_DB_USERNAME" && -n "$MONGO_DB_PASSWORD" ]]; then
    export MONGO_DB_URI="mongodb+srv://$MONGO_DB_USERNAME:$MONGO_DB_PASSWORD@nano-link-mongo.sp5oa.mongodb.net/?retryWrites=true&w=majority&appName=nano-link-mongo"
    echo "Secrets successfully retrieved and stored in environment variables."
else
    echo "Error retrieving secrets from AWS Secrets Manager."
    exit 1
fi

node index.js