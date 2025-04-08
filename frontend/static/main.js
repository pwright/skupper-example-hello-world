import * as gesso from "./gesso/main.js";

const html = `
<body>
  <header>
    <div>
      <div>
        <span class="material-icons-outlined">emoji_people</span>
        Skupper Hello World
      </div>
    </div>
  </header>
  <section>
    <div>
      <div>Your name is <span id="name" class="name"></span>.</div>

      <form id="request-form" style="margin-bottom: 2em;">
        <div class="form-field">
          <label for="requests-per-batch">Requests per Batch:</label>
          <input type="number" id="requests-per-batch" name="requests-per-batch" value="3" min="1" max="100" style="width: 5em; margin-right: 1em;">

          <label for="request-interval">Interval (s):</label>
          <input type="number" id="request-interval" name="request-interval" value="4" min="1" max="60" style="width: 5em; margin-right: 1em;">

          <label for="number-of-batches">Number of Batches:</label>
          <input type="number" id="number-of-batches" name="number-of-batches" value="7" min="1" max="100" style="width: 4em; margin-right: 1em;">

          <button type="button" id="start-button">Start</button>
          <button type="button" id="stop-button" disabled>Stop</button>
        </div>
      </form>

      <div id="hello-table"></div>
    </div>
  </section>
  <footer>
  </footer>
</body>
`;

function renderRequest(value, record, context) {
    const elem = gesso.createElement(null, "div");

    elem.innerHTML = record.request.text.replace(record.request.name, `<span class="name">${record.request.name}</span>`);

    return elem;
}

function renderResponse(value, record, context) {
    const elem = gesso.createElement(null, "div");

    if (record.error) {
        elem.innerHTML = `<span class="error">Error: ${record.error}</span>`;
    } else {
        elem.innerHTML = record.response.text.replace(record.response.name, `<span class="name">${record.response.name}</span>`);
    }

    return elem;
}

const helloTable = new gesso.Table("hello-table", [
    ["Frontend", "request", renderRequest],
    ["Backend", "response", renderResponse],
]);

class MainPage extends gesso.Page {
    constructor(router) {
        super(router, "/", html);

        this.batchIntervalId = null;
        this.requestsPerBatch = 0;
        this.numberOfBatches = 0;
        this.batchesRemaining = 0;
        this.currentBatchNumber = 0;
        this.totalRequestsToSend = 0;

        const requestsPerBatchInput = this.body.$("#requests-per-batch");
        const requestIntervalInput = this.body.$("#request-interval");
        const numberOfBatchesInput = this.body.$("#number-of-batches");
        const startButton = this.body.$("#start-button");
        const stopButton = this.body.$("#stop-button");

        startButton.addEventListener("click", () => {
            const reqPerBatch = parseInt(requestsPerBatchInput.value, 10);
            const intervalSeconds = parseInt(requestIntervalInput.value, 10);
            const numBatches = parseInt(numberOfBatchesInput.value, 10);

            // Validate all inputs
            if (isNaN(reqPerBatch) || reqPerBatch <= 0 || isNaN(intervalSeconds) || intervalSeconds < 1 || isNaN(numBatches) || numBatches <= 0) {
                alert("Please enter valid values for requests per batch (>0), interval (>= 1s), and number of batches (>0).");
                return;
            }

            if (this.batchIntervalId) {
                // Already running
                return;
            }

            this.requestsPerBatch = reqPerBatch;
            this.numberOfBatches = numBatches;
            this.batchesRemaining = numBatches;
            this.currentBatchNumber = 0;
            this.totalRequestsToSend = reqPerBatch * numBatches;

            startButton.disabled = true;
            stopButton.disabled = false;
            requestsPerBatchInput.disabled = true;
            requestIntervalInput.disabled = true;
            numberOfBatchesInput.disabled = true;

            this.sendBatch(); // Send the first batch immediately

            const intervalMilliseconds = intervalSeconds * 1000;

            // Set interval for subsequent batches if more than one batch
            if (this.batchesRemaining > 0) {
                 this.batchIntervalId = setInterval(() => {
                    this.sendBatch();
                }, intervalMilliseconds);
            }
        });

        stopButton.addEventListener("click", () => {
            this.stopRequests();
        });
    }

    stopRequests() {
        if (this.batchIntervalId) {
            clearInterval(this.batchIntervalId);
            this.batchIntervalId = null;
        }
        this.batchesRemaining = 0;
        this.currentBatchNumber = 0;
        this.body.$("#start-button").disabled = false;
        this.body.$("#stop-button").disabled = true;
        this.body.$("#requests-per-batch").disabled = false;
        this.body.$("#request-interval").disabled = false;
        this.body.$("#number-of-batches").disabled = false;
    }

    // Sends one batch of requests concurrently
    sendBatch() {
        // Loop back to 1 after reaching the last batch
        if (this.currentBatchNumber >= this.numberOfBatches) {
            this.currentBatchNumber = 0;
        }
    
        this.currentBatchNumber++;
        const batchNum = this.currentBatchNumber;
        const requestsThisBatch = this.getRequestsForCurrentBatch(batchNum);
    
        console.log(`Sending Batch ${batchNum} of ${this.numberOfBatches} (${requestsThisBatch} requests)`);
    
        for (let i = 0; i < requestsThisBatch; i++) {
            const requestNumInBatch = i + 1;
    
            gesso.postJSON("/api/hello", {
                text: `Hello! I am ${this.name}. (Batch ${batchNum}/${this.numberOfBatches}, Req ${requestNumInBatch}/${requestsThisBatch})`,
                name: this.name,
            });
        }
    }
    getRequestsForCurrentBatch(batchNum) {
        // batchNum is 1-based, multiply by base value to get increasing requests
        return this.requestsPerBatch * batchNum;
    }
    process() {
        if (!this.id) {
            gesso.postJSON("/api/generate-id", null, data => {
                this.id = data.id;
                this.name = data.name;

                super.process();
            });

            return;
        }

        super.process();
    }

    updateContent() {
        $("#name").textContent = this.name;

        gesso.fetchJSON("/api/data", responseData => {
            const responses = Object.values(responseData).reverse();

            helloTable.update(responses, responseData);
        });
    }
}

const router = new gesso.Router();

new MainPage(router);

new EventSource("/api/notifications").onmessage = event => {
    router.page.updateContent();
};
