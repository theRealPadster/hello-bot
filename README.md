# Super simple Discord bot written in TypeScript
_I don't do much yet but I'm learning_

## .env setup
```
CLIENT_TOKEN="yourtoken"
COMPLIMENT_USERS=["user1","user2"]
```

## Commands
### `/hello`
Greet the user
### `/compliment`
Compliment or insult the user, depending if they are in the COMPLIMENT_USERS array or not. You can mention a user to pass them instead of yourself. The compliments/insults are specified in `/src/data/compliments.json` and `/src/data/insults.json`. `$1` in the strings is where the user is mentioned
### `/args-info`
Output any arguments specified in the message (e.g. `/args-info foo bar` -> "foo", "bar")


## Development
Run TypeScript watch task and use nodemon to apply changes in real time.
1. `yarn watch`
2. `yarn dev`
