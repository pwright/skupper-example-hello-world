/*
  Simplified version of Apache-licensed script to target http://localhost:9999/api/hello
  with ramping concurrency and 5-second pause after max concurrency is reached
*/

const http = require('http');
const env = process.env;

let concurrent_requests = Number(env['SKUPPER_EXAMPLE_CONCURRENCY'] || '1');
let outstanding = 0;
const rates = {};
let failure = false;
let paused = false;

const url = 'http://localhost:9999/api/hello';

console.log("Initial concurrency: %d", concurrent_requests);
console.log("Query URL: %s", url);

function record_pod(pod) {
    if (!rates[pod]) {
        rates[pod] = 0;
    }
    rates[pod] += 1;
}

function run_requests() {
    while (outstanding < concurrent_requests) {
        outstanding += 1;
        http.get(url, (resp) => {
            let text = '';

            resp.on('data', (chunk) => {
                text += chunk;
            });

            resp.on('end', () => {
                try {
                    const data = JSON.parse(text);
                    record_pod(data.pod || 'unknown');
                } catch (e) {
                    console.error("Failed to parse response:", text);
                }
                outstanding -= 1;
                run_requests();
            });

        }).on("error", (err) => {
            console.error("Error: " + err.message);
            outstanding -= 1;
            failure = true;
        });
    }
}

run_requests();

function update_concurrency() {
    if (paused) return;

    console.log('\n======== Rates per server-pod ========');

    for (const pod in rates) {
        console.log('%s: %d', pod, rates[pod] / 5);
        delete rates[pod];
    }

    if (concurrent_requests >= 100) {
        console.log("Reached max concurrency. Pausing for 9 seconds...");
        paused = true;
        setTimeout(() => {
            concurrent_requests = 5;
            console.log("Resuming with concurrency: %d", concurrent_requests);
            paused = false;
        }, 9000);
    } else {
        concurrent_requests += 5;
        console.log("Updated concurrency: %d", concurrent_requests);
    }

    if (failure) {
        failure = false;
        run_requests();
    }
}

setInterval(update_concurrency, 9000);
