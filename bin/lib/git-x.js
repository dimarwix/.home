#!/usr/bin/env node

'use strict'

function promiseExec(command) {
  return new Promise((resolve, reject) => {
    require('child_process').exec(command, (error, stdout, stderr) => {
      ;(error || stderr) ? reject(error || stderr) : resolve(stdout)
    })
  })
}

const start = Date.now()

function parseCommand(i) {
  function dateSecondsAgo(s) { return new Date(start - 1000 * s) }
  return `GIT_COMMITTER_DATE="${dateSecondsAgo(i % 16)}" git commit --amend --date="${dateSecondsAgo(i / 16)}" --no-edit`
}

(function commit(i) {
  return promiseExec(parseCommand(i))
    .then(res => /^\[[^\s]+\sda[0-9a-f]+\]/.test(res) || commit(i + 1))
}(0))
