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
2. Bower installed: `$ npm install -g bower`
3. Check if MongoDB was added to PATH
    * Run from prompt: `$ path`
4. Setup the Mongo database: `mongod.exe --dbpath "c:\data\db"`

## Installation

1. Clone this repo: `git clone https://github.com/eduardoreche/osborn.git`
3. Enter 'osborn' cloned folder
4. Run: `npm install`
5. Run: `bower install`

## Run the application

1. Enter the osborn cloned folder
2. Run: `mongod`
3. Open a new Terminal Window
4. Run: `npm start`
5. Navigate to `http://localhost:3000`