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
Compliment or insult the user, based on if their username is in the COMPLIMENT_USERS array or not. You can mention a user to pass them instead of yourself. The compliments and insults are specified in `src/data/compliments.json` and `src/data/insults.json`. The user will be mentioned whenever `$1` is used in the strings.
### `/eject`
Eject the user and send an Among Us eject gif. You can mention a user to pass them instead of yourself. 
### `/args-info`
Output any arguments specified in the message (e.g. `/args-info foo bar` -> "foo", "bar")

## Development
Run TypeScript watch task and use nodemon to apply changes in real time.
1. `yarn watch`
2. `yarn dev`
