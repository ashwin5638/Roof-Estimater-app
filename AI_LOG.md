# AI Tool Usage Log

## Tools Used

- **OpenCode (Claude big-pickle model)**: Primary development assistant used throughout the entire build process
- **Cursor**: IDE integration for code navigation and inline edits

## Development Process

All code was generated through AI assistance with human review and direction. The workflow was:
1. Human describes requirements and constraints
2. AI generates code following the specification
3. Human reviews output and provides corrections
4. AI iterates on the implementation

## AI Errors Corrected

### 1. dotenv Loading Order (Server)
**Error**: `dotenv.config()` was called after importing routes/controllers, which meant `process.env` variables were undefined when module-level code ran.

**Fix**: Moved `dotenv.config()` to the top of `server/src/index.js` before any imports that depend on environment variables.

### 2. Orphan Branch Index Staging
**Error**: During git history rebuild, `git add .gitignore` on an orphan branch would also stage all working directory files, preventing incremental commits.

**Fix**: Used `git rm -rf --cached .` to clear the index before each `git add` command.

## Code Authored Directly

- All configuration values (pricing rates, question labels, option values)
- The specific roof-related question flow and step ordering
- Contact field definitions and validation rules
- Admin credentials and JWT secret values
- MongoDB Atlas connection string
