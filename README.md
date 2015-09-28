#TAB HQ React
##Getting started
###Prerequisites
You will need the following:

* NPM
* MongoDB
* ElasticSearch

###Getting set up
Run the following commands:

    x> git clone git@github.com:lukemarsh/tab-hq-react.git
    x> cd tab-hq-react
    x> git checkout develop
    x> npm install
    x> sudo mkdir -p /data/db
    x> chmod 0755 /data/db
    x> sudo chown $USER /data/db
    x> mongod & # runs in background, kill later with pkill mongod
    x> mongo tabhqreact /data/seed.js
    x> gulp dev

To re-seed your database run:

    x> mongo tabhqreact server/data/seed.js
    x> node server/data/reindex_search.js
    