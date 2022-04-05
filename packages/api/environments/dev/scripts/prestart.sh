token=$(ts-node  -r dotenv/config ./environments/dev/scripts/dev-prestart.ts);
echo $token
if [ "$token" ];
then
  export HOMELIESTER_API_AUTH_TOKEN=$token
  nodemon -r dotenv/config  ./src/index.ts
fi;
