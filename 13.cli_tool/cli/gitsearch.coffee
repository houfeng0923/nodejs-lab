#! /usr/bin/env coffee
commander = require 'commander'
request = require 'request'
chalk = require 'chalk'

commander
	.version '0.0.1'
	.usage '[options] <keyword>'
  .option '-o, --owner [name]','Filter by the repositories owner'
  .option '-l, --language [language]', 'Filter by the repositories language'
	.parse process.argv


if !commander.args.length
	commander.help()
	return

keyword = commander.args
user = commander.owner
language = commander.language

url = "https://api.github.com/search/repositories?sort=stars&order=desc"
url += "&q=#{keyword}"
url += "+user:#{user}" if user
url += "+language:#{language}" if language


request 
  method:'get'
  url:url
  headers:
    'User-Agent' : 'houfeng0923'
, (err,response,body)->
  if err
    console.log 'Error:',err
    process.exit 1

  if response.statusCode == 200
    data = JSON.parse body
    func_printEmpty data.errors.message if data.errors?.message
    func_printResultList data.items if data.items

  process.exit 0


func_printResultList = (items) ->
  console.log chalk.white.bold "Count: #{items.length}"
  items.forEach (item) ->
    console.log ""
    console.log chalk.cyan.bold.underline "Name: #{item.name}"
    console.log chalk.magenta.bold "Owner: #{item.owner.login}"
    console.log chalk.grey "Desc: #{item.description}"
    console.log chalk.grey "Clone url: #{item.clone_url}"

func_printEmpty = (msg) ->
  console.log chalk.red.bold msg