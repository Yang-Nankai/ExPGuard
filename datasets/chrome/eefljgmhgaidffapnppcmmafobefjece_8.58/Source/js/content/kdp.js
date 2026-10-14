const treadMarkID = "66f11ec860a7f1a8e8afc363";
const guidelineID = "66f11ec860a7f1a8e8afc364";
// get title, description, author
// send to server
// mark the content if any violation found

const exampleResponse = [
  '{\n\t"isViolated": false,\n\t"violations": null\n}',
  '{\n\t"isViolated": false,\n\t"violations": null\n}',
  '{\n\t"isViolated": true,\n\t"violations": [\n\t\t{\n\t\t\t"fieldname": "Book Description",\n\t\t\t"violation": "Contains offensive content",\n\t\t\t"type": "Offensive Content",\n\t\t\t"violatedPart": "40 beautiful designs with your favorite cuss words",\n\t\t\t"severity": "red"\n\t\t}\n\t]\n}',
  '{\n\t"isViolated": true,\n\t"violations": [\n\t\t{\n\t\t\t"fieldname": "Book Title",\n\t\t\t"violation": "Repeating generic keywords",\n\t\t\t"type": "Repeated Words",\n\t\t\t"violatedPart": "Bold and Easy, Simple and Big, Bold \u0026 Easy Coloring",\n\t\t\t"severity": "yellow"\n\t\t}\n\t]\n}',
  '{\n\t"isViolated": true,\n\t"violations": [\n\t\t{\n\t\t\t"fieldname": "Book Description",\n\t\t\t"violation": "includes inappropriate content",\n\t\t\t"type": "content",\n\t\t\t"violatedPart": "40 beautiful designs with your favorite cuss words",\n\t\t\t"severity": "red"\n\t\t}\n\t]\n}',
];
//
// const addViolationMark = (violations) => {
//     const titleID = "title";
//     const descriptionID = "bookDescription_feature_div";
//     const authorID = "bylineInfo";
//     let title = document.getElementById(titleID);
//     let description = document.getElementById(descriptionID);
//     let author = document.getElementById(authorID);
//
//     if (violations) {
//         violations.forEach(violation => {
//             violation = JSON.parse(violation)
//             if (violation.isViolated === false) {
//                 return;
//             }
//
//             violation.violations.forEach(violation => {
//                 if (violation.fieldname === "Book Title" && title) {
//                     title.style.backgroundColor = violation.severity;
//                 } else if (violation.fieldname === "Book Description" && description) {
//                     description.style.backgroundColor = violation.severity;
//                 } else if (violation.fieldname === "Author" && author) {
//                     author.style.backgroundColor = violation.severity;
//                 }
//
//             })
//
//
//         });
//     }
// }

const createViolationMarkCircle = (severity, innerText) => {
  const circleWrapper = document.createElement("span"); // Use span for inline behavior inside h1
  circleWrapper.style.position = "relative";
  circleWrapper.style.display = "inline-flex"; // Inline-flex for proper alignment inside h1
  circleWrapper.style.alignItems = "center"; // Center the circle vertically
  circleWrapper.style.justifyContent = "center"; // Center the circle horizontally
  circleWrapper.style.marginLeft = "10px"; // Space between text and circle
  circleWrapper.style.verticalAlign = "middle"; // Ensure the circle aligns with the text vertically

  const circle = document.createElement("div");

  // Circle styling
  circle.id = "violation-circle";
  circle.style.zIndex = "1000"; // Ensure the circle is on top of other elements
  circle.style.width = "30px"; // Increased size for better visibility
  circle.style.height = "30px";
  circle.style.borderRadius = "50%";
  circle.style.backgroundColor = severity;
  circle.style.display = "flex";
  circle.style.alignItems = "center";
  circle.style.justifyContent = "center";
  circle.style.cursor = "pointer";
  circle.style.position = "relative";
  circle.style.transition = "box-shadow 0.3s ease, transform 0.3s ease"; // Smooth transition for hover effect

  // Accessibility: Add aria-label for screen readers
  circle.setAttribute("aria-label", `Severity: ${severity}`);

  // Add hover effect for circle elevation
  circle.addEventListener("mouseover", () => {
    circle.style.boxShadow =
      "0 6px 12px rgba(0, 0, 0, 0.2), 0 8px 24px rgba(0, 0, 0, 0.2)";
    circle.style.transform = "translateY(-3px) scale(1.1)"; // Slight lift and scale on hover
  });
  circle.addEventListener("mouseout", () => {
    circle.style.boxShadow =
      "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)";
    circle.style.transform = "translateY(0) scale(1)"; // Reset lift and scale
  });

  // Add text inside the circle
  if (innerText) {
    const text = document.createElement("span");
    text.innerText = innerText;
    text.style.color = severity === "red" ? "#fff" : "#000"; // Dynamic text color based on severity
    text.style.fontSize = "14px"; // Increased text size for readability
    text.style.fontWeight = "600"; // Slightly bolder text
    text.style.position = "absolute";
    text.style.top = "50%";
    text.style.left = "50%";
    text.style.transform = "translate(-50%, -50%)"; // Center the text
    text.style.pointerEvents = "none"; // Prevent text from interfering with hover
    circle.appendChild(text);
  }

  circleWrapper.appendChild(circle);

  return circleWrapper;
};

const createViolationCard = (violation, headerText, usage) => {
  const card = document.createElement("div");
  card.id = "violation-card";

  // Card styling
  card.style.width = "250px";
  card.style.height = "auto"; // Automatically adjust height based on content
  card.style.backgroundColor = "#fff";
  card.style.borderRadius = "10px"; // Rounded corners
  card.style.boxShadow =
    "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)"; // Soft shadow for elevation
  card.style.border = "none"; // Remove the border to use shadow instead
  card.style.position = "absolute";
  card.style.top = "0";
  card.style.left = "0";
  card.style.zIndex = "1000";
  card.style.padding = "15px"; // Add some padding
  card.style.cursor = "move"; // Change cursor to indicate draggable area
  card.style.display = "none";
  card.style.transition = "box-shadow 0.3s ease, transform 0.3s ease"; // Smooth transition for hover effect

  // Add hover effect for card elevation
  card.addEventListener("mouseover", () => {
    card.style.boxShadow =
      "0 6px 12px rgba(0, 0, 0, 0.2), 0 8px 24px rgba(0, 0, 0, 0.2)";
    card.style.transform = "translateY(-3px)"; // Slight lift on hover
  });
  card.addEventListener("mouseout", () => {
    card.style.boxShadow =
      "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)";
    card.style.transform = "translateY(0)"; // Reset lift
  });

  // header div
  const header = document.createElement("div");
  header.style.display = "flex";
  header.style.justifyContent = "space-between";
  header.style.alignItems = "center";

  card.appendChild(header);

  // Title styling
  const title = document.createElement("h3");
  title.innerText = headerText;

  title.style.color = "#333";
  title.style.fontSize = "18px";
  title.style.fontWeight = "bold";
  header.appendChild(title);

  // small usage text ex: "Usage: 1/5"
  const usageDiv = document.createElement("p");
  usageDiv.id = "kdp-checker-usage";
  usageDiv.innerText = `${usage?.remainingUsage}/${usage?.totalUsage}`;
  usageDiv.style.color = "#333";
  usageDiv.style.fontSize = "12px";
  usageDiv.style.fontWeight = "500";
  header.appendChild(usageDiv);

  if (violation.violatedPart) {
    // Violated Part styling
    const violatedPart = document.createElement("p");
    violatedPart.innerText = violation.violatedPart;
    violatedPart.style.color = "#555";
    violatedPart.style.fontSize = "14px";
    violatedPart.style.margin = 0;
    violatedPart.style.fontWeight = "500";
    card.appendChild(violatedPart);
  }

  if (violation?.type || violation?.violation) {
    // Violation description styling
    const description = document.createElement("p");
    description.innerText =
      violation?.violation ||
      violation?.type ||
      "No violation description found";
    description.style.margin = "0";
    description.style.color = "#777";
    description.style.fontSize = "12px";
    card.appendChild(description);
  }

  return card;
};

const addViolationCard = (violation, parent, headerText, usage) => {
  const card = createViolationCard(violation, headerText, usage);
  parent.appendChild(card);

  // Make sure the parent is relatively positioned to allow absolute positioning of the card
  if (getComputedStyle(parent).position === "static") {
    parent.style.position = "relative"; // Ensure parent has position to make card absolute relative to it
  }

  // Position the card below and to the right of the parent
  card.style.top = `${parent.offsetHeight + 5}px`; // 5px offset to make it appear just below
  card.style.left = `0px`; // Align with the left edge of the parent

  // Show card on hover
  parent.addEventListener("mouseover", () => {
    card.style.display = "block";
  });

  // Hide card when not hovering
  parent.addEventListener("mouseout", (e) => {
    if (!parent.contains(e.relatedTarget)) {
      // Ensure the mouseout is not triggered by children
      card.style.display = "none";
    }
  });

  return card;
};

const noViolationFound = () => {
  const noViolation = document.createElement("div");
  noViolation.id = "no-violation";
  noViolation.innerText = "No violation found";

  // Styling the text
  noViolation.style.color = "#4CAF50"; // Green text
  noViolation.style.fontSize = "12px"; // Smaller font size
  noViolation.style.fontWeight = "600"; // Semi-bold for a stronger visual impact

  // Adding subtle background and padding
  noViolation.style.padding = "8px 12px"; // Adjusted padding for a balanced look
  noViolation.style.borderRadius = "8px"; // Smoother border radius for a modern look
  noViolation.style.backgroundColor = "#e8f5e9"; // Light green background to match the success theme
  noViolation.style.border = "1px solid #4CAF50"; // Green border to emphasize the message

  // Additional spacing and positioning
  noViolation.style.display = "inline-block";
  noViolation.style.marginLeft = "10px"; // Space between other elements
  noViolation.style.marginTop = "5px"; // Slight margin on top for better spacing
  noViolation.style.position = "relative";

  // Subtle shadow to lift the element slightly
  noViolation.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.1)"; // Light shadow for subtle elevation

  return noViolation;
};

const hoverViolationInfoCard = (violationList, innerText, usage) => {
  const titleID = "title";
  const descriptionID = "bookDescription_feature_div";
  const authorID = "bylineInfo";
  let title = document.getElementById(titleID);
  let description = document.getElementById(descriptionID);
  let author = document.getElementById(authorID);

  let headerText = "";
  if(innerText === "TM") {
    headerText = "Trademarks";
    } else {
    headerText = "Guideline Violation";
    }

  if (violationList) {
    const isViolated = violationList.some((violation) => {
      violation = JSON.parse(violation);
      return violation.isViolated === true;
    });
    const noViolationDiv = document.getElementById("no-violation");
    const violationDiv = document.getElementById("violation-circle");
    if (!isViolated && !noViolationDiv && !violationDiv) {
      console.info("no violation found");
      // const noViolation = noViolationFound();
      // if (title) {
      //     title.appendChild(noViolation);
      // }
      return;
    }
    violationList.forEach((violation) => {
      violation = JSON.parse(violation);
      if (violation.isViolated === false) {
        console.info("no violation found");
        return;
      }

      violation.violations.forEach((violation) => {
        const circle = createViolationMarkCircle(violation.severity, innerText);
        if (violation.fieldname === "Book Title" && title) {
          title.appendChild(circle);
          addViolationCard(violation, circle, headerText, usage);
        } else if (violation.fieldname === "Book Description" && description) {
          description.appendChild(circle);
          addViolationCard(violation, circle, headerText, usage);
        } else if (violation.fieldname === "Author" && author) {
          author.appendChild(circle);
          addViolationCard(violation, circle, headerText, usage);
        }
      });
    });
  }
};

const addViolationInfo = (violations) => {
  const titleID = "title";
  const descriptionID = "bookDescription_feature_div";
  const authorID = "bylineInfo";
  let title = document.getElementById(titleID);
  let description = document.getElementById(descriptionID);
  let author = document.getElementById(authorID);

  if (violations) {
    violations.forEach((violation) => {
      if (violation.fieldname === "Book Title") {
        title.setAttribute("title", violation.violation);
      } else if (violation.fieldname === "Book Description") {
        description.setAttribute("title", violation.violation);
      } else if (violation.fieldname === "Author") {
        author.setAttribute("title", violation.violation);
      }
    });
  }
};

function getTitle() {
  const titleIDs = ["productTitle", "title"];
  let title = "";
  for (const id of titleIDs) {
    title = document.getElementById(id);
    if (title) {
      return title.innerText;
    }
  }

  return title;
}

const getBookType = () => {
  const bookType = document.getElementById("title");
  if (bookType) {
    if (bookType.innerText.includes("Paperback")) {
      return "Paperback";
    }
  }
  return "Ebook";
};

function getDescription() {
  const descriptionID = "bookDescription_feature_div";
  let description = document.getElementById(descriptionID);
  if (description) {
    return description.innerText;
  }
  return "";
}

function getAuthor() {
  const authorID = "bylineInfo";
  let author = document.getElementById(authorID);
  // <div id="bylineInfo" className="a-section a-spacing-micro bylineHidden feature"
  //      data-cel-widget="bylineInfo"> by <span className="author notFaded" data-width="">
  // 	   <a className="a-link-normal" href="/Coco-Wyo/e/B08DTRPS62/ref=dp_byline_cont_book_1">Coco Wyo</a>     <span
  //     className="contribution" spacing="none">
  //    			<span className="a-color-secondary">(Author)</span> </span>
  //    	 </span></div>
  if (author) {
    author = author.getElementsByTagName("span")[0];
    if (author) {
      return author.innerText;
    }
  }
  return "";
}

function getBookInfo() {
  const title = getTitle();
  const description = getDescription();
  const author = getAuthor();
  return {
    title: title,
    description: description,
    author: author,
    bookType: getBookType(),
  };
}

async function checkKDPTrademark(token, bookInfo) {
  if (!bookInfo.title) {
    return;
  }
  const kdpTreadMark = {
    data: {
      title: bookInfo.title,
      description: bookInfo.description,
      author: bookInfo.author,
      keywords: [],
      apluscontent: "",
      bookType: bookInfo.bookType,
      contributors: "",
    },
    token,
    url: "https://go.selfpublishingtitans.com/api/v1/kdp/trademark",
    method: "POST",
  };
  const response = await sendRequestUsingBackgroundScript(
    "apiRequest",
    kdpTreadMark
  );
  return response;
}

async function checkUsageByID(token, id) {
  // router.GET("/usage/:id", a.KdpController.GetUsage)
  const usageReq = {
    token,
    url: `https://go.selfpublishingtitans.com/api/v1/kdp/usage/${id}`,
    method: "GET",
  };
  // ex: {
  //     "productID": "66f11ec860a7f1a8e8afc363",
  //         "userID": "65154434da9316001ba15829",
  //         "remainingUsage": 99,
  //         "totalUsage": 100
  // }

  const response = await sendRequestUsingBackgroundScript(
    "apiRequest",
    usageReq
  );
  return response;
}

// check kdp guideline
async function checkKDPGuideline(token, bookInfo) {
  if (!bookInfo.title) {
    return;
  }

  // Title        string   `json:"title"`
  // Description  string   `json:"description"`
  // Author       string   `json:"author"`
  // Keywords     []string `json:"keywords"`
  // Apluscontent string   `json:"apluscontent"`
  // BookType     string   `json:"bookType"`
  // Contributors string   `json:"contributors"`

  const kdpGuideline = {
    data: {
      title: bookInfo.title,
      description: bookInfo.description,
      author: bookInfo.author,
      keywords: [],
      apluscontent: "",
      bookType: bookInfo.bookType,
      contributors: "",
    },
    token,
    url: "https://go.selfpublishingtitans.com/api/v1/kdp/guidelines",
    method: "POST",
  };
  const response = await sendRequestUsingBackgroundScript(
    "apiRequest",
    kdpGuideline
  );
  return response;
}

const handleKDPTrademark = async (token, bookInfo) => {
  // check usage and set the usage
  const response = await checkKDPTrademark(token, bookInfo);
  if (response?.data) {
    const usageResponse = await checkUsageByID(token, treadMarkID);

    hoverViolationInfoCard(response?.data, "TM", usageResponse.data);
  }
};

const handleKDPGuideline = async (token, bookInfo) => {
  const response = await checkKDPGuideline(token, bookInfo);
  if (response?.data) {
    const usageResponse = await checkUsageByID(token, treadMarkID);
    hoverViolationInfoCard(response.data, "X", usageResponse.data);
  }
};

chrome.storage.local.get(
  [
    uniqueId + "_isEnable",
    "token",
    uniqueId + "_treadMark",
    uniqueId + "_guidelineStatus",
  ],
  async function (data) {
    if (
      data[uniqueId + "_isEnable"] === "false" ||
      data[uniqueId + "_isEnable"] === false ||
      data["token"] == null ||
      data["token"] === undefined
    ) {
      console.info("titans deep view summary is disabled");
      return;
    }

    const bookInfo = getBookInfo();
    const token = data["token"];
    if (!bookInfo.title) {
      return;
    }

    if (data[uniqueId + "_treadMark"]) {
      handleKDPTrademark(token, bookInfo);
    }
    if (data[uniqueId + "_guidelineStatus"]) {
      handleKDPGuideline(token, bookInfo);
    }
  }
);
