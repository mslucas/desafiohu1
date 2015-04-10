#!/bin/sh
echo "############################"
echo "### DESAFIO HOTEL URBANO ###"
echo "############################\n"

# start the API service 
#echo ">>>Starting API services...<<<"
#node backend/api-server.js

# just a simple web server to show frontend working
echo "\n>>>Starting frontend application...<<<"
node frontend/node_modules/.bin/http-server ./frontend/www/ -p 12345 --cors -s #-o

