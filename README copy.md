# MERN - simple setup
old MERN skeleton, try vite instead

## config/config.js
This file contains server-side config-related variables that will be used in code but not hard-coded as a best practice and for security purposes

## Notes
1. SHA1 is incredibly insecure for password hashing, take a look at crypto.pbkdf2
2. Even though emails are supposed to be unique, this constraint is not respected? (Just drop the collection... Fixes it, could also be dropDups: true)
