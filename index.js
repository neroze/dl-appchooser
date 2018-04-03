var inquirer = require('inquirer');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
var shell = require('shelljs')

const webappDirs = [
	`guake -e 'cd ${'/home/dragonlaw/dragonApps/dragonlawWebApp'}' guake -r ${'Server-Main'}`,
	`guake -n guake -e 'cd ${'/home/dragonlaw/dragonApps/dragonlawWebApp'} && c && v' guake -r ${'Main'}`,
	`guake -n guake -e 'cd ${'/home/dragonlaw/dragonApps/dragonlawWebApp/src/scripts/modules/document'} && c && v' guake -r ${'Document'}`,
	`guake -n guake -e 'cd ${'/home/dragonlaw/dragonApps/dragonlawWebApp/src/scripts/modules/doctype'} && c && v' guake -r ${'Doctype'}`,
	`guake -n guake -e 'cd ${'/home/dragonlaw/dragonApps/dragonlawWebApp/src/scripts/baseApp'} && c && v' guake -r ${'BaseApp'}`,
	`guake -n guake -e 'cd ${'/home/dragonlaw/dragonApps/dragonlawWebApp/src/scripts/submodules/entities'} && c && v' guake -r ${'Entities'}`,
	`guake -n guake -e 'cd ${'/home/dragonlaw/dragonApps/dragonlawWebApp/src/scripts/submodules/components'} && c && v' guake -r ${'Components'}`,
	`guake -n guake -e 'cd ${'/home/dragonlaw/dragonApps/dragonlawWebApp/src/scripts/modules/integrations'} && c && v' guake -r ${'Integrations'}`,
	`guake -n guake -e 'exit 1'`
]

const webappDirsStaging = [
	`guake -e 'cd ${'/home/dragonlaw/dragonApps/staging/dragonlawWebApp'}' guake -r ${'Server-Main-staging'}`,
	`guake -n guake -e 'cd ${'/home/dragonlaw/dragonApps/staging/dragonlawWebApp'} && c && v' guake -r ${'staging-Main'}`,
	`guake -n guake -e 'cd ${'/home/dragonlaw/dragonApps/staging/dragonlawWebApp/src/scripts/modules/document'} && c && v' guake -r ${'staging-Document'}`,
	`guake -n guake -e 'cd ${'/home/dragonlaw/dragonApps/staging/dragonlawWebApp/src/scripts/modules/doctype'} && c && v' guake -r ${'staging-Doctype'}`,
	`guake -n guake -e 'cd ${'/home/dragonlaw/dragonApps/staging/dragonlawWebApp/src/scripts/baseApp'} && c && v' guake -r ${'staging-BaseApp'}`,
	`guake -n guake -e 'cd ${'/home/dragonlaw/dragonApps/staging/dragonlawWebApp/src/scripts/submodules/entities'} && c && v' guake -r ${'staging-Entities'}`,
	`guake -n guake -e 'cd ${'/home/dragonlaw/dragonApps/staging/dragonlawWebApp/src/scripts/submodules/components'} && c && v' guake -r ${'staging-Components'}`,
	`guake -n guake -e 'cd ${'/home/dragonlaw/dragonApps/staging/dragonlawWebApp/src/scripts/modules/integrations'} && c && v' guake -r ${'staging-Integrations'}`,
	`guake -n guake -e 'exit 1'`
]

const adminDirs = [
	`guake -e 'cd ${'/home/dragonlaw/dragonApps/adminApp'}' guake -r ${'Server-Admin Main'}`,
	`guake -n guake -e 'cd ${'/home/dragonlaw/dragonApps/adminApp'} && c && v' guake -r ${'Admin Main'}`,
	`guake -n guake -e 'cd ${'/home/dragonlaw/dragonApps/adminApp/src/submodules/document'} && c && v' guake -r ${'Document'}`,
	`guake -n guake -e 'cd ${'/home/dragonlaw/dragonApps/adminApp/src/submodules/doctype'} && c && v' guake -r ${'Doctype'}`,
	`guake -n guake -e 'cd ${'/home/dragonlaw/dragonApps/adminApp/src/submodules/baseApp'} && c && v' guake -r ${'BaseApp'}`,
	`guake -n 
	 -e 'cd ${'/home/dragonlaw/dragonApps/adminApp/src/submodules/entities'} && c && v' guake -r ${'Entities'}`,
	`guake -n guake -e 'cd ${'/home/dragonlaw/dragonApps/adminApp/src/submodules/components'} && c && v' guake -r ${'Components'}`,
	`guake -n guake -e 'exit 1'`
]
const adminDirsStaging = [
	`guake -e 'cd ${'/home/dragonlaw/dragonApps/staging/adminApp'}' guake -r ${'Server-Admin-staging Main'}`,
	`guake -n guake -e 'cd ${'/home/dragonlaw/dragonApps/staging/adminApp'} && c && v' guake -r ${'staging Admin Main'}`,
	`guake -n guake -e 'cd ${'/home/dragonlaw/dragonApps/staging/adminApp/src/submodules/document'} && c && v' guake -r ${'staging-Document'}`,
	`guake -n guake -e 'cd ${'/home/dragonlaw/dragonApps/staging/adminApp/src/submodules/doctype'} && c && v' guake -r ${'staging-Doctype'}`,
	`guake -n guake -e 'cd ${'/home/dragonlaw/dragonApps/staging/adminApp/src/submodules/baseApp'} && c && v' guake -r ${'staging-BaseApp'}`,
	`guake -n guake -e 'cd ${'/home/dragonlaw/dragonApps/staging/adminApp/src/submodules/entities'} && c && v' guake -r ${'staging-Entities'}`,
	`guake -n guake -e 'cd ${'/home/dragonlaw/dragonApps/staging/adminApp/src/submodules/components'} && c && v' guake -r ${'staging-Components'}`,
	`guake -n guake -e 'exit 1'`
]

const regDirs = [
	`guake -n guake -e 'cd ${'/home/dragonlaw/dragonApps/staging/regApp'} && c && v' guake -r ${'Reg Main'}`,
]
const regDirsStaging = [
	`guake -n guake -e 'cd ${'/home/dragonlaw/dragonApps/staging/regApp'} && c && v' guake -r ${'Reg Main'}`,
]

const apps = {
	adminapp: adminDirs,
	adminappstaging: adminDirsStaging,
	webapp: webappDirs,
	webappstaging: webappDirsStaging,
	regapp: regDirs,
	regappstaging: regDirsStaging,
}

function goToApp(app = '~') {
	apps[app].forEach((val, index) => {
		console.log('Exec: ', val);
		shell.exec(val);
	})
}

async function openmoreApp(cmd) {
	  const { stdout2, stderr2 } = await exec(`${app.cmd}`);
}


function selectAppPath(app) {
	let action;
	switch (app) {
		case 'webapp':
			goToApp('webapp')
			break;
		case 'webappstaging':
			goToApp('webappstaging')
			break;
		case 'adminapp':
			goToApp('adminapp')
			break;
		case 'adminappstaging':
			goToApp('adminappstaging')
			break;
		case 'regapp':
			goToApp('regapp')
			break;
		case 'regappstaging':
			goToApp('regappstaging')
			break;
		default :
			goToApp('webapp')
	}
	return action
}


inquirer.prompt([
	{
    type: 'list',
    name: 'app',
    message: 'Which App are you going to work?',
    choices: ['WebApp', 'webAppStaging', 'AdminApp', 'AdminAppStaging', 'RegApp', 'RegAppStaging', 'DTE'],
    filter: function(val) {
      return val.toLowerCase();
    }
  }
]).then(answer => {
		console.log('answers', answer);
		goToApp(selectAppPath(answer.app))
});