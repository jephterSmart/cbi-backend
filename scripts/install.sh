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
                echo "$key=$value" >>  /home/ec2-user/ngcc-backend/.env
    done
}

params_to_mysqlenv () {
     params=$1

     SELECTOR="Name"

    for key in $(echo $params | /usr/bin/jq -r ".[][].${SELECTOR}"); do
                value=$(echo $params | /usr/bin/jq -r ".[][] | select(.${SELECTOR}==\"$key\") | .Value")
                key=$(echo "${key##*/}" | /usr/bin/tr ':' '_' | /usr/bin/tr '-' '_' | /usr/bin/tr '[:lower:]' '[:upper:]')
                echo "$key=$value"
                echo "$key=$value" >>  /home/ec2-user/ngcc-backend/mysql.env
    done
}

APP_TAGS=$(get_parameter_store_tags "/ngcc-backend/test" "us-east-1")
MYSQL_TAGS=$(get_parameter_store_tags "/ngcc-backend/mysql" "us-east-1")
echo "APP Tags fetched via ssm from /ngcc-backend/test us-east-1"

echo "creating new .env variables..."
sudo chown  www-data:www-data -R /home/ec2-user/ngcc-backend/*
sudo chmod -R 777 /home/ec2-user/ngcc-backend/storage/
echo '' >  /home/ec2-user/ngcc-backend/.env
params_to_env "$APP_TAGS"
echo '' >  /home/ec2-user/ngcc-backend/mysql.env
params_to_mysqlenv "$MYSQL_TAGS"
cd  /home/ec2-user/ngcc-backend
docker-compose -f docker-compose.yml down
docker-compose -f docker-compose.yml rm -sf composerutil
docker-compose -f docker-compose.yml rm -sf artisanutil
docker image prune -f
docker-compose -f docker-compose.yml run --rm composerutil install
docker-compose -f docker-compose.yml up -d --build ngccserver
docker-compose -f docker-compose.yml run --rm artisanutil config:clear
docker-compose -f docker-compose.yml run --rm artisanutil storage:link
sleep 35s
docker-compose -f docker-compose.yml run --rm artisanutil migrate --force