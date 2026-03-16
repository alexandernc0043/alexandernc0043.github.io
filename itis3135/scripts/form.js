(() => {
  const introDefaults = {
    firstName: "Alexander",
    middleName: "",
    lastName: "Prechtel",
    preferredName: "Alex",
    photoSrc: "../introductionPhoto.jpeg",
    photoCaption: "Petting one of my cats Loki outside.",
    headline:
      "I'm a senior at UNC Charlotte studying Computer Science with a focus in Cybersecurity. I'm excited to collaborate and build secure, user-friendly systems this semester.",
    personalBackground:
      "I'm currently 21 years old and love cats and computers, and love making things both physically and on the computer.",
    academicBackground:
      "I'm currently a Junior at UNC Charlotte studying computer science with a focus in Cybersecurity. Before that I attended Highschool in Mooresville, North Carolina.",
    subjectBackground: "I have previously taken and TA'd for a web development course.",
    primaryWorkComputer:
      "The laptop I use for university is a Macbook Pro M2 14 inch. I also use a custom built Windows 11 computer.",
    backupPlan: "I will go to the Atkins Library and get a loaner laptop. Apartment and McEniry 116.",
    courses: [
      {
        department: "ITIS",
        number: "3310",
        name: "Software Architecture & Design",
        reason: "Interesting class. class."
      },
      {
        department: "ITIS",
        number: "4166",
        name: "Backend App Development",
        reason: "Required and interesting"
      },
      {
        department: "ITIS",
        number: "4221",
        name: "Secure Programming and Penetration Testing",
        reason: "Required class and interesting."
      },
      {
        department: "ITIS",
        number: "4246",
        name: "Competitive Cyber Defense",
        reason: "Capstone course."
      },
      {
        department: "STAT",
        number: "2122",
        name: "Intro to Probability & Statistics",
        reason: "Required course."
      }
    ],
    links: [
      {
        title: "GitHub",
        url: "https://github.com/alexandernc0043"
      },
      {
        title: "Portfolio",
        url: "https://alexandernc0043.github.io"
      },
      {
        title: "University",
        url: "https://webpages.charlotte.edu/aprechte"
      }
    ],
    mascotAdjective: "Brave",
    mascotAnimal: "Wolf",
    funFact: "I'm a twin.",
    share: "I was born in Florida.",
    quote: "“Do what is right, not what is easy nor what is popular.”",
    quoteAuthor: "Roy T. Bennett"
  };

  const photoInput = document.getElementById("photo");
  const photoPreview = document.getElementById("photo-preview");
  const validationMessage = document.getElementById("form-validation");
  const introForm = document.getElementById("intro-builder-form");
  const generatePageButton = document.getElementById("generate-page-btn");
  const generateHtmlButton = document.getElementById("generate-html-btn");
  const generateJsonButton = document.getElementById("generate-json-btn");
  const outputSection = document.getElementById("output-section");
  const pageOutputSection = document.getElementById("page-output-section");
  const generatedPageFrame = document.getElementById("generated-page-frame");
  const backToFormButton = document.getElementById("back-to-form-btn");
  const htmlCodeOutput = document.getElementById("generated-html-code");
  const jsonCodeOutput = document.getElementById("generated-json-code");
  const pageOutputMinHeight = 780;
  const courseListContainer = document.getElementById("course-list");
  const addCourseButton = document.getElementById("add-course-btn");
  const linkListContainer = document.getElementById("link-list");
  const addLinkButton = document.getElementById("add-link-btn");

  const pageBase = document.location.href.substring(
    0,
    document.location.href.lastIndexOf("/") + 1
  );

  const state = {
    photo: {
      src: introDefaults.photoSrc,
      fileName: "introductionPhoto.jpeg",
      fileType: "image/jpeg",
      fileSize: 0,
      fromUpload: false
    }
  };

  const setTextValue = (id, value) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.value = value || "";
  };

  const showMessage = (message) => {
    if (!validationMessage) return;
    validationMessage.textContent = message || "";
  };

  const escapeHtml = (value = "") =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const readPhotoFile = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Unable to read image file"));
      reader.readAsDataURL(file);
    });

  const getCourseInputValue = (row, selector) => {
    const input = row.querySelector(selector);
    return input ? input.value : "";
  };

  const getLinkInputValue = (row, selector) => {
    const input = row.querySelector(selector);
    return input ? input.value : "";
  };

  const createCourseInput = (labelText, cssClass, value) => {
    const wrapper = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");

    label.textContent = labelText;
    label.appendChild(input);
    input.type = "text";
    input.className = cssClass;
    input.value = value || "";
    wrapper.className = "course-field";
    wrapper.appendChild(label);
    return { wrapper, input };
  };

  const createLinkInput = (labelText, cssClass, value) => {
    const wrapper = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");

    label.textContent = labelText;
    label.appendChild(input);
    input.type = "text";
    input.className = cssClass;
    input.value = value || "";
    wrapper.className = "link-field";
    wrapper.appendChild(label);
    return { wrapper, input };
  };

  const updateCourseRowRemoveButtons = () => {
    if (!courseListContainer) return;
    const rows = courseListContainer.querySelectorAll(".course-item");
    rows.forEach((row) => {
      const removeButton = row.querySelector(".remove-course-btn");
      if (removeButton) {
        removeButton.style.display = rows.length > 1 ? "inline-block" : "none";
      }
    });
  };

  const addCourseRow = (course = {}) => {
    if (!courseListContainer) return;

    const row = document.createElement("div");
    row.className = "course-item";

    const courseLayout = document.createElement("div");
    courseLayout.className = "course-layout";

    const departmentInput = createCourseInput(
      "Department",
      "course-department",
      course.department
    );
    const numberInput = createCourseInput(
      "Course Number",
      "course-number",
      course.number
    );
    const nameInput = createCourseInput("Course Name", "course-name", course.name);

    courseLayout.appendChild(departmentInput.wrapper);
    courseLayout.appendChild(numberInput.wrapper);
    courseLayout.appendChild(nameInput.wrapper);
    row.appendChild(courseLayout);

    const reasonField = document.createElement("div");
    const reasonLabel = document.createElement("label");
    const reasonInput = document.createElement("input");
    reasonField.className = "course-reason";
    reasonLabel.textContent = "Reason";
    reasonLabel.appendChild(reasonInput);
    reasonInput.type = "text";
    reasonInput.className = "course-reason-input";
    reasonInput.value = course.reason || "";
    reasonField.appendChild(reasonLabel);
    row.appendChild(reasonField);

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-course-btn";
    removeButton.textContent = "Remove Course";
    removeButton.addEventListener("click", () => {
      row.remove();
      if (!courseListContainer.querySelector(".course-item")) {
        addCourseRow();
      }
      updateCourseRowRemoveButtons();
    });
    row.appendChild(removeButton);

    courseListContainer.appendChild(row);
    updateCourseRowRemoveButtons();
  };

  const getCoursesFromForm = () => {
    if (!courseListContainer) return [];

    const rows = Array.from(courseListContainer.querySelectorAll(".course-item"));
    return rows
      .map((row) => ({
        department: getCourseInputValue(row, ".course-department").trim(),
        number: getCourseInputValue(row, ".course-number").trim(),
        name: getCourseInputValue(row, ".course-name").trim(),
        reason: getCourseInputValue(row, ".course-reason-input").trim()
      }))
      .filter((course) =>
        course.department || course.number || course.name || course.reason
      );
  };

  const updateLinkRowRemoveButtons = () => {
    if (!linkListContainer) return;
    const rows = linkListContainer.querySelectorAll(".link-item");
    rows.forEach((row) => {
      const removeButton = row.querySelector(".remove-link-btn");
      if (removeButton) {
        removeButton.style.display = rows.length > 1 ? "inline-block" : "none";
      }
    });
  };

  const addLinkRow = (link = {}) => {
    if (!linkListContainer) return;

    const row = document.createElement("div");
    row.className = "link-item";

    const linkLayout = document.createElement("div");
    linkLayout.className = "link-layout";

    const labelInput = createLinkInput("Label", "link-label", link.title);
    const urlInput = createLinkInput("URL", "link-url", link.url);

    linkLayout.appendChild(labelInput.wrapper);
    linkLayout.appendChild(urlInput.wrapper);
    row.appendChild(linkLayout);

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-link-btn";
    removeButton.textContent = "Remove Link";
    removeButton.addEventListener("click", () => {
      row.remove();
      if (!linkListContainer.querySelector(".link-item")) {
        addLinkRow();
      }
      updateLinkRowRemoveButtons();
    });
    row.appendChild(removeButton);

    linkListContainer.appendChild(row);
    updateLinkRowRemoveButtons();
  };

  const getLinksFromForm = () => {
    if (!linkListContainer) return [];
    const rows = Array.from(linkListContainer.querySelectorAll(".link-item"));

    return rows
      .map((row) => ({
        title: getLinkInputValue(row, ".link-label").trim(),
        url: getLinkInputValue(row, ".link-url").trim()
      }))
      .filter((link) => link.title || link.url);
  };

  const sanitizeUrl = (url) => {
    const trimmed = String(url || "").trim();
    if (!trimmed) return "";
    if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) {
      return trimmed;
    }
    return `https://${trimmed}`;
  };

  const normalizeLinks = (links = []) =>
    links
      .map((link) => {
        const title = String(link.title || "").trim();
        const rawUrl = String(link.url || "").trim();
        if (!title || !rawUrl) {
          return null;
        }

        return {
          title,
          url: sanitizeUrl(rawUrl),
          displayUrl: rawUrl
        };
      })
      .filter((item) => item && item.title && item.url);

  const buildDisplayName = ({ firstName, middleName, lastName, preferredName }) => {
    if ((preferredName || "").trim()) {
      return preferredName.trim();
    }

    return [firstName, middleName, lastName]
      .map((name) => String(name || "").trim())
      .filter(Boolean)
      .join(" ");
  };

  const buildMascot = (adjective, animal) => {
    const normalizedAdjective = String(adjective || "").trim();
    const normalizedAnimal = String(animal || "").trim();
    return `${normalizedAdjective} ${normalizedAnimal}`.trim();
  };

  const validateMascot = (adjective, animal) => {
    const trimmedAdjective = String(adjective || "").trim();
    const trimmedAnimal = String(animal || "").trim();
    const validWord = /^[A-Za-z][A-Za-z'-]*$/;

    if (!trimmedAdjective) {
      return "Mascot adjective is required.";
    }

    if (!trimmedAnimal) {
      return "Mascot animal is required.";
    }

    if (!validWord.test(trimmedAdjective)) {
      return "Mascot adjective should contain letters only.";
    }

    if (!validWord.test(trimmedAnimal)) {
      return "Mascot animal should contain letters only.";
    }

    return "";
  };

  const validateForm = () => {
    const errors = [];

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const mascotAdjective = document.getElementById("mascot-adjective").value;
    const mascotAnimal = document.getElementById("mascot-animal").value;
    const courses = getCoursesFromForm();
    const links = getLinksFromForm();

    courses.forEach((course, index) => {
      const courseLabel = `Course ${index + 1}`;
      if (!course.department) {
        errors.push(`${courseLabel}: Department is required.`);
      }
      if (!course.number) {
        errors.push(`${courseLabel}: Course number is required.`);
      }
      if (!course.name) {
        errors.push(`${courseLabel}: Course name is required.`);
      }
    });

    links.forEach((link, index) => {
      const linkLabel = `Link ${index + 1}`;
      if (!link.title) {
        errors.push(`${linkLabel}: Label is required.`);
      }
      if (!link.url) {
        errors.push(`${linkLabel}: URL is required.`);
      }
    });

    if (!String(firstName).trim()) {
      errors.push("First name is required.");
    }

    if (!String(lastName).trim()) {
      errors.push("Last name is required.");
    }

    const mascotError = validateMascot(mascotAdjective, mascotAnimal);
    if (mascotError) {
      errors.push(mascotError);
    }

    if (errors.length) {
      showMessage(errors.join(" | "));
      return false;
    }

    showMessage("");
    return true;
  };

  const buildLinksHtml = (links) =>
    links
      .map(
        (link) =>
          `<li><a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(
            link.title
          )}</a> <span>${escapeHtml(link.displayUrl)}</span></li>`
      )
      .join("");

  const buildIntroCoursesHtml = (courses) =>
    courses
      .map((course) => {
        const courseCode = `${String(course.department || "")
          .trim()} ${String(course.number || "").trim()}`.trim();
        const title = escapeHtml(
          courseCode
            ? `${courseCode} - ${String(course.name || "").trim()}`
            : String(course.name || "").trim()
        );
        const reason = escapeHtml(String(course.reason || "").trim());
        return reason ? `<li><strong>${title}</strong> ${reason}</li>` : `<li><strong>${title}</strong></li>`;
      })
      .join("");

  const buildIntroductionHtml = (stateData) => {
    const list = buildIntroCoursesHtml(stateData.courses);
    const links = buildLinksHtml(stateData.links);

    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Introduction</title>
    <base href="${escapeHtml(pageBase)}">
    <link rel="stylesheet" href="../styles/default.css" />
    <link rel="stylesheet" href="../styles/introduction.css" />
  </head>
  <body>
    <main>
      <h2>Introduction</h2>
      <h3>${escapeHtml(stateData.displayName)}</h3>
      <figure>
        <img src="${stateData.photo.src}" alt="${escapeHtml(stateData.photoCaption)}" />
        <figcaption>${escapeHtml(stateData.photoCaption)}</figcaption>
      </figure>
      <p>${escapeHtml(stateData.headline)}</p>
      <ul>
        <li><strong>Personal Background:</strong> ${escapeHtml(stateData.personalBackground)}</li>
        <li><strong>Academic Background:</strong> ${escapeHtml(stateData.academicBackground)}</li>
        <li><strong>Background in this Subject:</strong> ${escapeHtml(stateData.subjectBackground)}</li>
        <li><strong>Primary Work Computer:</strong> ${escapeHtml(stateData.primaryWorkComputer)}</li>
        <li><strong>Backup Work Computer &amp; Location Plan:</strong> ${escapeHtml(stateData.backupPlan)}</li>
        <li><strong>Mascot:</strong> ${escapeHtml(stateData.mascot)}</li>
        <li><strong>Courses I'm Taking, &amp; Why:</strong>
          <ol>
            ${list}
          </ol>
        </li>
        <li><strong>Funny/Interesting item to remember me by:</strong> ${escapeHtml(stateData.funFact)}</li>
        <li><strong>I'd also like to share:</strong> ${escapeHtml(stateData.share)}</li>
      </ul>
      ${links ? `<p><strong>My Links:</strong></p><ul>${links}</ul>` : ""}
      <blockquote>
        ${escapeHtml(stateData.quote)}
        <br />
        <em>- ${escapeHtml(stateData.quoteAuthor)}</em>
      </blockquote>
    </main>
  </body>
</html>`;
  };

  const renderHighlightedCode = (codeElement, content, languageClass) => {
    if (!codeElement) return;
    codeElement.textContent = content;
    codeElement.className = languageClass;

    if (window.hljs && window.hljs.highlightElement) {
      hljs.highlightElement(codeElement);
    }
  };

  const showOutputSection = () => {
    if (outputSection) outputSection.style.display = "block";
  };

  const hideOutputSections = () => {
    if (outputSection) outputSection.style.display = "none";
    if (pageOutputSection) pageOutputSection.style.display = "none";
  };

  const clearGeneratedPage = () => {
    if (!generatedPageFrame) return;
    try {
      const frameDocument = generatedPageFrame.contentWindow
        ? generatedPageFrame.contentWindow.document
        : null;
      if (frameDocument) {
        frameDocument.open();
        frameDocument.write("");
        frameDocument.close();
      }
      generatedPageFrame.srcdoc = "";
      generatedPageFrame.style.height = `${pageOutputMinHeight}px`;
    } catch (error) {
      generatedPageFrame.srcdoc = "";
    }
  };

  const resizeGeneratedFrame = (remainingAttempts) => {
    if (!generatedPageFrame) return;
    if (remainingAttempts <= 0) {
      return;
    }

    try {
      const frameDoc = generatedPageFrame.contentWindow
        ? generatedPageFrame.contentWindow.document
        : null;
      if (!frameDoc || !frameDoc.body || !frameDoc.documentElement) {
        requestAnimationFrame(() => {
          resizeGeneratedFrame(remainingAttempts - 1);
        });
        return;
      }

      const docHeight = Math.max(
        frameDoc.documentElement.scrollHeight || 0,
        frameDoc.documentElement.offsetHeight || 0,
        frameDoc.body.scrollHeight || 0,
        frameDoc.body.offsetHeight || 0
      );
      const minHeight = Math.max(pageOutputMinHeight, docHeight);
      generatedPageFrame.style.height = `${minHeight}px`;

      if (minHeight <= pageOutputMinHeight) {
        requestAnimationFrame(() => {
          resizeGeneratedFrame(remainingAttempts - 1);
        });
      }
    } catch (error) {
      generatedPageFrame.style.height = `${pageOutputMinHeight}px`;
    }
  };

  const showIntroductionPageOutput = (htmlString) => {
    if (!generatedPageFrame) return;
    if (introForm) introForm.style.display = "none";
    if (outputSection) outputSection.style.display = "none";
    if (pageOutputSection) pageOutputSection.style.display = "block";
    generatedPageFrame.onload = () => {
      resizeGeneratedFrame(24);
      window.setTimeout(() => {
        resizeGeneratedFrame(8);
      }, 150);
    };
    generatedPageFrame.srcdoc = htmlString;
    setTimeout(() => {
      resizeGeneratedFrame(8);
    }, 0);
  };

  const showFormOnly = () => {
    if (introForm) introForm.style.display = "block";
    clearGeneratedPage();
    hideOutputSections();
  };

  const buildIntroPayload = () => {
    const firstName = document.getElementById("firstName").value;
    const middleName = document.getElementById("middleName").value;
    const lastName = document.getElementById("lastName").value;
    const preferredName = document.getElementById("preferredName").value;
    const mascotAdjective = document.getElementById("mascot-adjective").value;
    const mascotAnimal = document.getElementById("mascot-animal").value;

    return {
      firstName,
      middleName,
      lastName,
      preferredName,
      displayName: buildDisplayName({
        firstName,
        middleName,
        lastName,
        preferredName
      }),
      photoCaption: document.getElementById("photoCaption").value,
      headline: document.getElementById("headline").value,
      personalBackground: document.getElementById("personalBackground").value,
      academicBackground: document.getElementById("academicBackground").value,
      subjectBackground: document.getElementById("subjectBackground").value,
      primaryWorkComputer: document.getElementById("primaryWorkComputer").value,
      backupPlan: document.getElementById("backupPlan").value,
      courses: getCoursesFromForm(),
      links: normalizeLinks(getLinksFromForm()),
      mascot: buildMascot(mascotAdjective, mascotAnimal),
      mascotAdjective,
      mascotAnimal,
      funFact: document.getElementById("funFact").value,
      share: document.getElementById("share").value,
      quote: document.getElementById("quote").value,
      quoteAuthor: document.getElementById("quoteAuthor").value,
      photo: {
        src: state.photo.src,
        fileName: state.photo.fileName,
        fileType: state.photo.fileType,
        fileSize: state.photo.fileSize,
        fromUpload: state.photo.fromUpload
      }
    };
  };

  const handlePhotoUpload = async () => {
    const file = photoInput && photoInput.files ? photoInput.files[0] : null;
    if (!file) return;

    try {
      const base64Image = await readPhotoFile(file);
      state.photo = {
        src: base64Image,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        fromUpload: true
      };
      if (photoPreview) photoPreview.src = state.photo.src;
    } catch (error) {
      showMessage("Unable to read photo file.");
    }
  };

  const renderOutputs = (action) => {
    if (!validateForm()) {
      showFormOnly();
      return;
    }

    const payload = buildIntroPayload();
    const htmlString = buildIntroductionHtml(payload);
    const jsonString = JSON.stringify(payload, null, 2);

    if (action === "page" || action === "all") {
      showIntroductionPageOutput(htmlString);
      return;
    }

    if (action === "html" || action === "all") {
      if (pageOutputSection) pageOutputSection.style.display = "none";
      if (introForm) introForm.style.display = "block";
      renderHighlightedCode(htmlCodeOutput, htmlString, "language-html");
      showOutputSection();
    }

    if (action === "json" || action === "all") {
      if (pageOutputSection) pageOutputSection.style.display = "none";
      if (introForm) introForm.style.display = "block";
      renderHighlightedCode(jsonCodeOutput, jsonString, "language-json");
      showOutputSection();
    }
  };

  const setDefaults = () => {
    setTextValue("firstName", introDefaults.firstName);
    setTextValue("middleName", introDefaults.middleName);
    setTextValue("lastName", introDefaults.lastName);
    setTextValue("preferredName", introDefaults.preferredName);
    setTextValue("photoCaption", introDefaults.photoCaption);
    setTextValue("headline", introDefaults.headline);
    setTextValue("personalBackground", introDefaults.personalBackground);
    setTextValue("academicBackground", introDefaults.academicBackground);
    setTextValue("subjectBackground", introDefaults.subjectBackground);
    setTextValue("primaryWorkComputer", introDefaults.primaryWorkComputer);
    setTextValue("backupPlan", introDefaults.backupPlan);
    if (courseListContainer) {
      courseListContainer.innerHTML = "";
      introDefaults.courses.forEach((course) => {
        addCourseRow(course);
      });
      updateCourseRowRemoveButtons();
    } else {
      addCourseRow();
    }
    if (linkListContainer) {
      linkListContainer.innerHTML = "";
      introDefaults.links.forEach((link) => {
        addLinkRow({
          title: link.title,
          url: link.url
        });
      });
      updateLinkRowRemoveButtons();
    } else {
      addLinkRow();
    }
    setTextValue("mascot-adjective", introDefaults.mascotAdjective);
    setTextValue("mascot-animal", introDefaults.mascotAnimal);
    setTextValue("funFact", introDefaults.funFact);
    setTextValue("share", introDefaults.share);
    setTextValue("quote", introDefaults.quote);
    setTextValue("quoteAuthor", introDefaults.quoteAuthor);

    if (photoPreview) photoPreview.src = introDefaults.photoSrc;
  };

  if (photoInput) {
    photoInput.addEventListener("change", handlePhotoUpload);
  }

  if (generatePageButton) {
    generatePageButton.addEventListener("click", (event) => {
      event.preventDefault();
      renderOutputs("page");
    });
  }

  if (generateHtmlButton) {
    generateHtmlButton.addEventListener("click", (event) => {
      event.preventDefault();
      renderOutputs("html");
    });
  }

  if (generateJsonButton) {
    generateJsonButton.addEventListener("click", (event) => {
      event.preventDefault();
      renderOutputs("json");
    });
  }

  if (addCourseButton) {
    addCourseButton.addEventListener("click", (event) => {
      event.preventDefault();
      addCourseRow();
    });
  }

  if (addLinkButton) {
    addLinkButton.addEventListener("click", (event) => {
      event.preventDefault();
      addLinkRow();
    });
  }

  if (backToFormButton) {
    backToFormButton.addEventListener("click", (event) => {
      event.preventDefault();
      showFormOnly();
    });
  }

  setDefaults();
  hideOutputSections();
})();
