# SkiBuddy

SkiBuddy use a React frontend and a Rails [backend](https://github.com/imanj12/skibuddy-backend). 

SkiBuddy helps you quickly check weather conditions and browse an interactive trail map at most, if not all, ski resorts in the United States.

## New User Quick Start Guide

1. Visit [SkiBuddy](https://skibuddy-frontend.herokuapp.com)
2. Create a username
3. Enter a password at least 6 characters in length
4. After selecting "Sign-Up", user will be taken to the primary app interface

### Main Interface

The main interface consists of a list of your regions and ski resorts/mountains. Regions are simply a convenient way to group mountains.

### Create a Mountain

To create a new ski resort/mountain, click the "New Mountain" button in the navigation bar. Weather and trail map information is queried from external APIs, and the fidelity of the result is highly dependent on the accuracy of the name, city and state of the ski resort. If you're uncertain, I recommend confirming these details with Google Maps first.

### Create a Region

This is optional, and provided for convenience. For example, if you live in the Washington, DC area, and want to group local resorts like Liberty, Whitetail, and Roundtop into one, you can. Any mountains not assigned to regions can be freely added to a region upon creation.


