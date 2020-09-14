# Breadbike
The general idea is that we need to parse in Farmigo csvs (./Distribution-05_28_2020.csv) and parse it to a format that the RoadWarrior api can understand (https://teamapi.roadwarrior.app/Help/Api/POST-api-Route-Add)

That requires getting a lat/long from google maps for the address' coming in. 

And making a request to roadwarrior/route/add with the properly formatted json 

To do this I've started setting up an azure serverless folder 


## Getting up and running: 
Download vscode
Install the "Azure Functions" extension 

Sam controls the google maps api keys + billing 



The azure function code lives in /azureServerless/HttpTrigger1 

The secret keys live in azure portal under tnrich-breadbike/Settings/Configuration 
You can login to the azure portal here: 
portal.azure.com


## Running azure locally:
To run the azure serverless function locally, you can hit f5 to start debugging within vscode. 
It requires that you have the local application settings keys downloaded from azure functions (ask thomas for those keys if you need them)

## Run the application front-end locally:
```
yarn;
yarn start;
```


## Publishing app to github: 
Increment the version number in the App.js file so you can make sure your changes have landed 
Search for: "Weclome to the breadbike route planner -- version"

Then run:
```
yarn;
yarn deploy;
```

This will redeploy the app to: https://tnrich.github.io/breadbike/

## Publishing code to azure: 
Click the azure functions side bar icon. Hit the blue "Deploy" arrow at the top and select "tnrich-breadbike"

## Remember to commit your changes! 

git commit -am "my informative message here" && git push


## Sam todo: 
 - move the breadbike repo to your account or to it's own organization 
 - move the azure function to your account 
 