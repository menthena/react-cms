#TAB HQ React

## Contributing

Please DO NOT COMMIT DIRECTLY TO THE MASTER BRANCH. We follow a git-flow branching strategy. Please read through this carefully:

http://nvie.com/posts/a-successful-git-branching-model/

Branch names & purpose

* master - should reflect what's currently in production
* develop - should hold the latest changes that are TESTED and ready for release
* feature/xxxx - used for features under development and still being tested
* release/xxxx - created at point of code freeze for a release, contains a release candidate not yet in production
* hotfix/xxxx - a branch created from the master branch, which contains changes part of an emergency release

After releasing to production, the release branch should be merged into master and develop, and the HEAD revision should be tagged with the release version number.


We have a trello board tracking upcoming priorities to work on:

https://trello.com/b/mPa3n0kc/reactcms


##Getting started
###Prerequisites

#### If using Vagrant (recommended)

You will need the following:

* [virtualbox](https://www.virtualbox.org/wiki/Downloads)
* [virtualbox guest additions (except Mac OS where not needed)](https://www.virtualbox.org/wiki/Downloads)
* [vagrant](https://www.vagrantup.com/docs/installation/index.html)


#### If not using Vagrant

You will need the following manually:

* Node (> V4.0)
* MongoDB
* ElasticSearch
* Gulp (`npm install gulp -g`)
* Mocha (`npm install mocha -g`)

### Using your local environmnet


#### Initial setup (when using vagrant)

In the first tab/window, from the root of this repository run:

    x> cp Vagrantfile_example Vagrantfile
    x> vagrant up
    x> vagrant ssh
    x> cd /vagrant

#### Initial setup (without vagrant)

Run the following commands from the root of this repository:

    x> git clone git@github.com:lukemarsh/tab-hq-react.git
    x> cd tab-hq-react
    x> npm install
    x> sudo mkdir -p /data/db
    x> chmod 0755 /data/db
    x> sudo chown $USER /data/db
    x> mongod & # runs in background, kill later with pkill mongod
    x> mongo tabhqreact server/data/seed.js
    x> rename secrets.js.example to secrets.js
    x> gulp dev

### Reseeding your database

Run from the root of the repo:

    x> mongo tabhqreact server/data/seed.js
    x> node server/data/reindex_search.js

### Running the application

Run from the root of the repo:

    x> gulp dev        
