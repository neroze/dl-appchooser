var inquirer = require('inquirer');
const util = require('util');
var shell = require('shelljs')

const path = require('path');

const DLModules = (name) => {
  shell.mkdir('-p', [`${path.resolve(name)}`])
  shell.cd(`${path.resolve(name)}`)
  shell.touch('app.js')
  shell.mkdir('-p', [`${path.resolve(name)}/components`])
  // shell.cd(`${path.resolve(name)}/components`)
  shell.cp(`${path.resolve('../template')}/list.js`, `${path.resolve(name)}/components/list.js`)
  shell.touch('edit.js')
  shell.sed('-i', '{name}', name, 'edit.js');
}


inquirer.prompt([
	{
    type: 'input',
    name: 'app',
    message: 'Module Name',
    filter: function(val) {
      return val.toLowerCase();
    }
  }
]).then(name => {
		console.log('Module name', name.app);
    console.log(`${path.resolve(name.app)}`);

    DLModules(name.app)
		// goToApp(selectAppPath(answer.app))
});