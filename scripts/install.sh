#!/bin/bash
# Functions
AWS=`which aws`

get_parameter_store_tags() {
    echo $($AWS ssm get-parameters-by-path --with-decryption --path $1  --region $2)
}

params_to_env () {
    params=$1
    
    # If .Tags does not exist we assume ssm Parameteres object.
    SELECTOR="Name"

    for key in $(echo $params | /usr/bin/jq -r ".[][].${SELECTOR}"); do
                value=$(echo $params | /usr/bin/jq -r ".[][] | select(.${SELECTOR}==\"$key\") | .Value")
                key=$(echo "${key##*/}" | /usr/bin/tr ':' '_' | /usr/bin/tr '-' '_' | /usr/bin/tr '[:lower:]' '[:upper:]')
                echo "$key=$value"
                echo "$key=$value" >>  /home/ec2-user/cbi_backend/src/env/production.env
    done
}

params_to_mysqlenv () {
     params=$1

     SELECTOR="Name"

    for key in $(echo $params | /usr/bin/jq -r ".[][].${SELECTOR}"); do
                value=$(echo $params | /usr/bin/jq -r ".[][] | select(.${SELECTOR}==\"$key\") | .Value")
                key=$(echo "${key##*/}" | /usr/bin/tr ':' '_' | /usr/bin/tr '-' '_' | /usr/bin/tr '[:lower:]' '[:upper:]')
                echo "$key=$value"
                echo "$key=$value" >>  /home/ec2-user/cbi_backend/mysql.env
    done
}

APP_TAGS=$(get_parameter_store_tags "/cbi-backend/test" "us-east-1")
MYSQL_TAGS=$(get_parameter_store_tags "/cbi-backend/mysql" "us-east-1")
echo "APP Tags fetched via ssm from /ngcc-backend/test us-east-1"

echo "creating new .env variables..."
# sudo chown  www-data:www-data -R /home/ec2-user/ngcc-backend/*
# sudo chmod -R 777 /home/ec2-user/ngcc-backend/storage/
echo '' >  /home/ec2-user/cbi_backend/src/env/production.env
params_to_env "$APP_TAGS"
echo '' > /home/ec2-user/cbi_backend/mysql.env
params_to_mysqlenv "$MYSQL_TAGS"
cd  /home/ec2-user/cbi_backend/
docker-compose -f docker-compose.yml down

docker image prune -f

docker-compose up -d --build

sleep 35s
docker exec -it -w /usr/app cbiapi npm run typeorm:prod:run-migrations