# Osborn

## What is it?

This is a Project Allocation Management tool.

## Purpose

Enable Team Management (Allocation) among Enterprise Projects.

## Main functionalities

* Project CRUD and Dashboard
* Resource CRUD and Dashboard
* more to be defined

## Architecture

* MongoDB
* Mongoose
* Angular 1.6
* Node
* Express

## Project Requirements

1. MongoDB installed (please refer to: `https://www.mongodb.com/download-center#community`)
2. Nodemon installed: `$ npm install -g nodemon`
3. Check if MongoDB was added to PATH
    * Run from prompt: `$ path`
4. Setup the Mongo database: `mongod.exe --dbpath "c:\data\db"`

## Installation

1. Clone this repo: `git clone https://github.com/eduardoreche/osborn.git`
2. Enter `osborn/server` cloned folder
3. Run: `npm install`
4. Enter `osborn/client`
5. Run: `npm install`

## Run the application

1. Start Mongo database `mongod`
2. Open terminal and enter `osborn/server` folder
3. Run `nodemon index.js` to start server
4. Open other terminal and enter `osborn/client` folder
5. Run `npm run serve`
6. Navigate to `http://localhost:3000`