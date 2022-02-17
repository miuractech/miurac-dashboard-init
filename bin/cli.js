#!/usr/bin/env node
const { execSync } = require('child_process')

const runCommand = command => {
    try{
        execSync(`${command}`,{stdio:"inherit"});
    }catch(e){
        console.error(`Failed to execute ${command}, check the below error for more details.`)
        console.error(e)
        return false;
    }
    return true;
}

const userRepo = process.argv[2];
const cloneGitCommand = `git clone --depth 1 https://github.com/miuractech/miurac-dashboard-init ${userRepo}`;
const installDependancyCommand = `cd ${userRepo} && npm install`;

console.log(`initializing Miurac...`);
console.log(`Downloading files...`);
const clone = runCommand(cloneGitCommand)
if(!clone) process.exit(-1);

console.log(`Installing necessary dependencies...`);
const install = runCommand(installDependancyCommand)
if(!install) process.exit(-1);

console.log(`Miurac repo successfully initiated...`);
console.log(`Run the following command to get started`);
console.log(`cd ${userRepo} && npm start`);


