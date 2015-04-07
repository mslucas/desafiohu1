#!/bin/sh
echo "############################"
echo "### DESAFIO HOTEL URBANO ###"
echo "############################\n"

# start the API service 
echo ">>>Starting API services...<<<\n"
sh backend/api-server.js

# just a simple web server to show frontend working
echo ">>>Starting frontend web server...<<<\n"
node frontend/node_modules/.bin/http-server www/ -p 12345 -o --cors -s

