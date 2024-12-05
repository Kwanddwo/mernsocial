const { exec } = require('child_process');

// Usage: yarn commitall <Comment>

let args = process.argv;
args.splice(0, 2);
let comment = args.join(' ');

exec('git add .', (err, stdin, stdout) => {
    if (err) {
        console.error(err);
        return;
    }

    exec(`git commit -m "${comment}"`, (err, stdin, stdout) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Commit done!');
    })
});
