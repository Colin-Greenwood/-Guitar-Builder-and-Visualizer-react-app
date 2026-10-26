/* ================================= */
/* Custom Guitar Builder */
/* ================================= */

console.log("SCRIPT.JS LOADED");


/* ================================= */
/* Select Guitar Builder Elements */
/* ================================= */

const guitarName = document.querySelector("#guitarName");
const bodyType = document.querySelector("#bodyType");
const pickupType = document.querySelector("#pickupType");
const neckType = document.querySelector("#neckType");
const hardwareType = document.querySelector("#hardwareType");
const finishType = document.querySelector("#finishType");

const buildButton = document.querySelector("#buildButton");

const buildResult = document.querySelector("#buildResult");
const guitarDescription = document.querySelector("#guitarDescription");
const guitarPrice = document.querySelector("#guitarPrice");
const buildMessage = document.querySelector("#buildMessage");

const guitarImage = document.querySelector("#guitarImage");
const partsList = document.querySelector("#partsList");


/* ================================= */
/* Build Guitar */
/* ================================= */

function buildGuitar() {

    console.log("BUILD BUTTON CLICKED");

    // Get guitar name
    let name = guitarName.value.trim();

    if (name === "") {
        name = "My Custom Guitar";
    }

    // Get selected guitar parts
    const body = bodyType.value;
    const pickups = pickupType.value;
    const neck = neckType.value;
    const hardware = hardwareType.value;
    const finish = finishType.value;

    // Calculate individual prices
    const bodyPrice = Number(
        bodyType.options[bodyType.selectedIndex].dataset.price
    );

    const pickupPrice = Number(
        pickupType.options[pickupType.selectedIndex].dataset.price
    );

    const neckPrice = Number(
        neckType.options[neckType.selectedIndex].dataset.price
    );

    const hardwarePrice = Number(
        hardwareType.options[hardwareType.selectedIndex].dataset.price
    );

    const finishPrice = Number(
        finishType.options[finishType.selectedIndex].dataset.price
    );

    const basePrice = 500;

    const totalPrice =
        basePrice +
        bodyPrice +
        pickupPrice +
        neckPrice +
        hardwarePrice +
        finishPrice;

    // Update guitar description and price
    guitarDescription.textContent = name + " has been built!";

    guitarPrice.textContent =
        "Estimated Price: $" + totalPrice;

    buildMessage.textContent =
        body + " body with " +
        pickups + ", a " +
        neck + ", " +
        hardware + ", and a " +
        finish + ".";

    // Add CSS classes
    buildResult.classList.add("built");
    guitarImage.classList.add("guitar-selected");

    // Create the selected-parts list
    partsList.innerHTML = "";

    const parts = [
        "Body: " + body,
        "Pickups: " + pickups,
        "Neck: " + neck,
        "Hardware: " + hardware,
        "Finish: " + finish
    ];

    parts.forEach(function (part) {
        const item = document.createElement("li");
        item.textContent = part;
        partsList.appendChild(item);
    });

    // Update image attributes
    guitarImage.setAttribute(
        "alt",
        name + " custom electric guitar"
    );

    guitarImage.dataset.guitar = name;

    console.log("GUITAR BUILT SUCCESSFULLY");
}


/* ================================= */
/* Guitar Builder Events */
/* ================================= */

// Click event
buildButton.addEventListener("click", buildGuitar);

// Input event
guitarName.addEventListener("input", function () {

    if (guitarName.value.trim() === "") {

        buildMessage.textContent =
            "Enter a name for your custom guitar.";

    } else {

        buildMessage.textContent =
            'Your guitar will be named "' +
            guitarName.value.trim() +
            '".';

    }

});

// Change event
finishType.addEventListener("change", function () {

    guitarImage.classList.toggle("guitar-selected");

});


    /* ================================= */
    /* Homework 7: Form Elements */
    /* ================================= */

    const guitarRequestForm =
        document.querySelector("#guitarRequestForm");

    const customerName =
        document.querySelector("#customerName");

    const customerEmail =
        document.querySelector("#customerEmail");

    const guitarStyle =
        document.querySelector("#guitarStyle");

    const guitarBudget =
        document.querySelector("#guitarBudget");

    const guitarDetails =
        document.querySelector("#guitarDetails");

    const contactPermission =
        document.querySelector("#contactPermission");

    const formErrors =
        document.querySelector("#formErrors");

    const formSuccess =
        document.querySelector("#formSuccess");

    let formSubmitted = false;


    /* ================================= */
    /* Get Selected Request Type */
    /* ================================= */

    function getRequestType() {

        const selectedRequest = document.querySelector(
            'input[name="requestType"]:checked'
        );

        if (selectedRequest === null) {
            return "";
        }

        return selectedRequest.value;
    }


    /* ================================= */
    /* Validate Form Values */
    /* ================================= */

    function validateGuitarRequest() {

        const name = customerName.value.trim();
        const email = customerEmail.value.trim();
        const style = guitarStyle.value;
        const budgetText = guitarBudget.value.trim();
        const budget = Number(budgetText);
        const requestType = getRequestType();
        const details = guitarDetails.value.trim();

        const errors = [];

        if (name === "") {
            errors.push("Please enter your name.");
        }

        if (email === "") {
            errors.push("Please enter your email address.");
        }

        if (style === "") {
            errors.push("Please choose a guitar style.");
        }

        if (requestType === "") {
            errors.push("Please select what you need.");
        }

        if (details === "") {
            errors.push("Please describe your guitar request.");
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email !== "" && !emailPattern.test(email)) {
            errors.push("Please enter a valid email address.");
        }

        if (budgetText === "") {
            errors.push("Please enter your budget.");
        } else if (
            !Number.isFinite(budget) ||
            budget < 100 ||
            budget > 10000
        ) {
            errors.push("Your budget must be between $100 and $10,000.");
        } else if (!Number.isInteger(budget)) {
            errors.push("Please enter a whole-dollar budget.");
        }

        if (details !== "" && details.length < 10) {
            errors.push("Please provide at least 10 characters of detail.");
        }

        if (requestType === "Modification" && details.length < 20) {
            errors.push(
                "For a guitar modification, describe the changes in at least 20 characters."
            );
        }

        return errors;
    }


    /* ================================= */
    /* Display Validation Feedback */
    /* ================================= */

    function updateFormFeedback() {

        const errors = validateGuitarRequest();

        formErrors.replaceChildren();

        if (errors.length > 0) {
            const heading = document.createElement("p");
            heading.textContent = "Please correct these errors:";
            formErrors.appendChild(heading);

            const errorList = document.createElement("ul");

            errors.forEach(function (error) {
                const item = document.createElement("li");
                item.textContent = error;
                errorList.appendChild(item);
            });

            formErrors.appendChild(errorList);
            formSuccess.textContent = "";
        } else {
            formSuccess.textContent = "";
        }

        return errors;
    }


    /* ================================= */
    /* Form Input and Change Events */
    /* ================================= */

    guitarRequestForm.addEventListener("input", function () {
        if (formSubmitted) {
            updateFormFeedback();
        }
    });

    guitarRequestForm.addEventListener("change", function () {
        if (formSubmitted) {
            updateFormFeedback();
        }
    });


    /* ================================= */
    /* Homework 8: GET API Request */
    /* ================================= */

    const apiStatus = document.querySelector("#apiStatus");
    const postsContainer = document.querySelector("#postsContainer");
    const loadPostsButton = document.querySelector("#loadPostsButton");

    async function loadCommunityPosts() {
        apiStatus.textContent = "Loading posts...";
        postsContainer.replaceChildren();
        loadPostsButton.disabled = true;

        try {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/posts?_limit=5"
            );

            if (!response.ok) {
                throw new Error("Failed to load posts.");
            }

            const posts = await response.json();

            const postElements = posts.map(function (post) {
                const article = document.createElement("article");
                const heading = document.createElement("h3");
                const paragraph = document.createElement("p");

                heading.textContent = post.title;
                paragraph.textContent = post.body;

                article.append(heading, paragraph);
                return article;
            });

            postsContainer.replaceChildren(...postElements);
            apiStatus.textContent = `Successfully loaded ${posts.length} posts.`;

        } catch (error) {
            console.error("GET request error:", error);
            apiStatus.textContent = "Unable to load posts. Please try again.";
        } finally {
            loadPostsButton.disabled = false;
        }
    }

    loadPostsButton.addEventListener("click", loadCommunityPosts);
    loadCommunityPosts();


    /* ================================= */
    /* Homework 8: POST Guitar Request */
    /* ================================= */

    async function submitGuitarRequest(event) {
        event.preventDefault();

        formSubmitted = true;

        const errors = updateFormFeedback();

        if (errors.length > 0) {
            formErrors.focus();
            return;
        }

        const name = customerName.value.trim();
        const style = guitarStyle.value;
        const budget = Number(guitarBudget.value.trim());
        const requestType = getRequestType();
        const details = guitarDetails.value.trim();

        const guitarRequest = {
            title: `${name}'s ${style} guitar request`,
            body: JSON.stringify({
                guitarStyle: style,
                budget: budget,
                requestType: requestType,
                details: details
            }),
            userId: 1
        };

        const submitButton =
            guitarRequestForm.querySelector('button[type="submit"]');

        submitButton.disabled = true;
        formErrors.textContent = "";
        formSuccess.textContent = "Submitting your guitar request...";

        try {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/posts",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(guitarRequest)
                }
            );

            if (!response.ok) {
                throw new Error("The server could not accept your request.");
            }

            const savedRequest = await response.json();

            const result = document.createElement("div");
            const heading = document.createElement("h3");
            const description = document.createElement("p");
            const id = document.createElement("p");

            heading.textContent = savedRequest.title;
            description.textContent = savedRequest.body;
            id.textContent = `API Record ID: ${savedRequest.id}`;

            result.append(heading, description, id);

            formSuccess.replaceChildren();
            formSuccess.textContent =
                "Your guitar request was submitted successfully!";

            formSuccess.insertAdjacentElement("afterend", result);

            console.log("POST response:", savedRequest);

            guitarRequestForm.reset();
            formSubmitted = false;

        } catch (error) {
            console.error("POST request error:", error);
            formSuccess.textContent =
                "Your request could not be submitted. Please try again.";

        } finally {
            submitButton.disabled = false;
        }
    }

    guitarRequestForm.addEventListener("submit", submitGuitarRequest);
