### About

This is an implementation of the game 'Rock Paper Scissors'. The user plays against the computer and can save their score.

Technologies:
- FastAPI
- SQLite
- Angular 14

### Installation

1. Clone the repo
   ```sh
   git@github.com:ErinOC/rock-paper-scissors.git
   ```
2. Open a terminal tab for the frontend and, from the angular_app directory, run the following commands:
   ```sh
   npm install
   npm start
   ```
2. Open a terminal tab for the backend and, from the root directory, run the following commands:
   ```sh
   pip install -r sql_app/requirements.txt
   uvicorn sql_app.main:app --reload
   ```

### Thought Process
- I chose to have the user play against the computer due to time constraints. 
- I chose FastAPI because: a) I wanted some exposure to it; b) the docs allowed for quick copy-and-paste setup that I could then adjust; c) Django would be overkill.
- I chose Angular and Angular Material for expedience.
- Initially I had a separate table for games, which would contain the score and a foreign key to the user(s). I was running out of time, so I put the scores on the User object. Since each user can only have one game at this point (against the computer), that shortcut wasn't problematic.
- Email address is required in addition to name, since name is not a unique identifier. If the user hasn't played before, the UI will request their name after their email address. Ideally there would be a password rather than just email entry. I had considered leaving email address out and simply requiring names to be unique (users would then select from a list of existing users). If I had it to do over again, I would take that approach to save time.
- Things that fell by the wayside due to time constraints: UI/UX niceties (responsiveness, design, accessibility), form validation/error handling, schema validation, well-structured CSS, linting, unit tests. I also missed the requirement to include a form field for both players' names (just the human).
