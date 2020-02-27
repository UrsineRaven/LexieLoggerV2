# LexieLogger

This is a Progressive Web App* that functions as a general logger. It focuses on logging throughout a day, but has a history view to support going through the logging history. You can add/edit events on the Event Type Management page and they will show up on the home page as buttons you can press to log the event. The site name is used to navigate back to the home page from anywhere.  

The site can be configured by the .env file prior to building. I just run it off a Raspberry Pi, but you can run it from anywhere*. This is a Progressive Web App*, so you can install it to the home screen of your iOS (they don't fully support all of the features of PWA's, yet), Android, Windows, etc. device as an "app" (Chrome has the most support for this, except on iOS where you have to use Safari). The public/manifest.json can be used to configure the PWA aspects.  

** Its ability to function as a Progressive Web App requires it to be hosted as HTTPS (which you can fairly easily achieve with LetsEncrypt); The HTTPS certificate provider, and the ability to run it from anywhere, depend on you using a dynamic DNS (if your router doesn't have a static IP from your ISP). Obviously, you can just use it as a web app, and run it from your local area network, and you don't have to worry about getting a certificate or using a dynamic DNS.  

It's named LexieLogger, because I developed this for my parents to keep track of their dog's activities (It's an older dog, and they need to log it's daily meal, medicine, and restroom habits.).  

You can see it in action here: <https://ursineraven.github.io/LexieLoggerV2/>

## Installation

Steps to install this project:

1. install node, npm, & git
1. clone this repo
1. ~~if you want to run using https, create a "ssl" folder in src and link to your fullchain cert as "cert.pem" and your key as "key.pem", otherwise edit src/site-config.json and change "Use_Https" to false~~ ***Currently not supported. You can host this behind my [NodeJS-Reverse-Proxy](https://github.com/UrsineRaven/NodeJS-Reverse-Proxy) to make it HTTPS in the meantime***
1. Run `npm install --production` command
1. Change **REACT_APP_BASE_PATH** in .env (unless you host in the subfolder already specified there)
1. Run `npm run build` command

**Note:** If you plan on developing, leave off the `--production` flag.

## Running

Run either Start.sh or Start.bat (depending on what OS you're on).

## Usage

### Home Page

View today's logged events, and allow logging new events.

### Event History

Navigate all events that have been logged. You can group or filter the events, and can add events that occurred on previous days here.

### Event Type Management

Create new types of events to be logged, or edit exiting event types. There is a wizard that helps you choose any special formatting you may want for the event.

### Settings

Manage the settings for the site. These are saved and applied per device (so it doesn't affect anyone else).

###### This React portion of this project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
