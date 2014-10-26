var spawn = require('child_process').spawn;

var proc = spawn(process.platform === "win32" ? "tnpm.cmd" : "tnpm", ['install'], {
    cwd: process.cwd(),
    stdio: [0, 1, 2]
});

proc.on("close", function(code, signal) {
    if (signal) {
        process.kill(process.pid, signal);
    } else if (code) {
        var er = new Error("Exit status " + code)
        console.log(er);
    }
})
