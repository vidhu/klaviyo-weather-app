#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const axios = require('axios');

const init = () => {
  console.log(chalk.green(figlet.textSync('Weather App Cli', 'Slant')));
};

const askQuestion = () => {
  const questions = [
    {
      name: 'ACTION',
      type: 'list',
      message: 'Who would you like to send weather updates to?',
      choices: [{ name: 'All Subscribed users', value: 'ALL' }, { name: 'Nevermind!', value: 'NONE' }]
    }
  ];
  return inquirer.prompt(questions);
};

const sendEmailupdates = async () => {
  const res = await axios.post('http://192.168.99.100:8080/api/send');
  const data = res.data;
  console.log(
    chalk.blue('Email send job successfuly scheduled for ') + chalk.green(data.count) + chalk.blue(' subscribers')
  );
};

const run = async () => {
  init();
  const { ACTION } = await askQuestion();

  switch (ACTION) {
    case 'ALL':
      await sendEmailupdates();
      break;
    default:
      process.exit(0);
  }
};

run();
