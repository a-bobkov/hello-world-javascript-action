import * as core from '@actions/core'
import * as github from '@actions/github'
import * as fs from 'node:fs/promises'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run() {
  try {
    // The `who-to-greet` input is defined in action metadata file
    const whoToGreet = core.getInput('who-to-greet', { required: true })
    core.info(`Hello, ${whoToGreet}!`)

    core.info(`Hello, 1`)

    // Get the current time and set as an output
    const time = new Date().toTimeString()
    core.info(`Hello, 2`)

    core.setOutput('time', time)

    core.info(`Hello, 3`)

    await fs.mkdir('pages', { recursive: true })
    await fs.writeFile('pages/test.txt', 'Hello World!', { encoding: 'utf8' })

    const content = await fs.readFile('pages/test.txt', { encoding: 'utf8' })

    core.info(`Content: ${content}`)

    // Output the payload for debugging
    core.info(
      `The event payload: ${JSON.stringify(github.context.payload, null, 2)}`
    )
  } catch (error) {
    // Fail the workflow step if an error occurs
    core.setFailed(error.message)
  }
}
