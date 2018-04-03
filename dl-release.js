const shell = require('shelljs')
const inquirer = require('inquirer');
const clui = require('clui');
const Progress = clui.Progress;

const DL = {
	ask() {
		return inquirer.prompt(
		[
			{
				type: 'input',
				name: 'releaseInput',
				message: `Release to `,
				filter: function(val) {
					return val
				}
			}
		])
	},
	confirm(_version = 'Not Defined') {
		return inquirer.prompt(
		[
			{
				type: 'confirm',
				name: 'confirmRelease',
				message: `Confirm Relese with ${_version}`,
				filter: function(val) {
					return val
				}
			}
		])
	}
}
const thisProgressBar = new Progress(20);
const Spinner = clui.Spinner;

DL.ask()
.then(ans => {
	console.log(`Releasing to Version : ${ans.releaseInput}`)
	DL.confirm(ans.releaseInput)
	.then(function(_ans){
		if (_ans.confirmRelease) {
			const countdown = new Spinner(`Processing release tag ${ans.releaseInput} to Server`, ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']);
			countdown.start();
			shell.exec(`git checkout release && git pull origin release`, function() {
				shell.exec(`git tag -d  ${ans.releaseInput}`);
				shell.exec(`git push origin :refs/tags/${ans.releaseInput}`);
				shell.exec(`git tag -a  ${ans.releaseInput} -m "release" `);
				shell.exec(`git push --tags`, function() {
					console.log(`Done releasing ${ans.releaseInput}`);
					countdown.stop();
					shell.exit(1);
				})
			});
		} else {
			shell.exit(1);
		}
	})
})
.catch(function(e){
	console.log('Error -->', e);
	shell.exit(1);
})