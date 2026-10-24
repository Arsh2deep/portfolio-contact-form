document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const mailingList = document.getElementById("mailingList");
    const emailFormatSection = document.getElementById("emailFormatSection");
    const linkedin = document.getElementById("linkedin");
    const howWeMet = document.getElementById("howWeMet");
    const otherMetGroup = document.getElementById("otherMetGroup");
    const otherMet = document.getElementById("otherMet");
  
    // Regular expression to check if email contains '@' and a dot (.) domain
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const linkedinPrefix = "https://linkedin.com/in/";
  
    //---Dynamic Field Toggles
  
    // Show/hide email format options when mailing list checkbox changes
    mailingList.addEventListener("change", () => {
      if (mailingList.checked) {
        emailFormatSection.classList.add("visible");
      } else {
        emailFormatSection.classList.remove("visible");
      }
    });
  
    // Show/hide "Other" text box when dropdown selection changes
    howWeMet.addEventListener("change", () => {
      if (howWeMet.value === "other") {
        otherMetGroup.classList.add("visible");
      } else {
        otherMetGroup.classList.remove("visible");
        otherMet.value = "";
      }
    });
  
    // Helper Functions for inline errors
  
    function showError(groupId, message) {
      const group = document.getElementById(groupId);
      group.classList.add("has-error");
      const errorSpan = group.querySelector(".error-msg");
      if (errorSpan && message) {
        errorSpan.textContent = message;
      }
    }
  
    function clearError(groupId) {
      const group = typeof groupId === "string" ? document.getElementById(groupId) : groupId;
      group.classList.remove("has-error");
    }
  
    // Clear errors dynamically as the user types or selects options
    [firstName, lastName, email, linkedin, howWeMet, otherMet].forEach((input) => {
      input.addEventListener("input", () => clearError(input.closest(".form-group")));
      input.addEventListener("change", () => clearError(input.closest(".form-group")));
    });
  
    // Main Form Submission Validation
  
    form.addEventListener("submit", (e) => {
      let isValid = true;
  
      // First Name required
      if (firstName.value.trim() === "") {
        showError("firstNameGroup", "First name is required.");
        isValid = false;
      } else {
        clearError("firstNameGroup");
      }
  
      // Last Name required
      if (lastName.value.trim() === "") {
        showError("lastNameGroup", "Last name is required.");
        isValid = false;
      } else {
        clearError("lastNameGroup");
      }
  
      // Email & Mailing list rules
      const emailVal = email.value.trim();
      if (mailingList.checked && emailVal === "") {
        showError("emailGroup", "Email address is required if you subscribe to the mailing list.");
        isValid = false;
      } else if (emailVal !== "" && !emailRegex.test(emailVal)) {
        showError("emailGroup", "Email must contain an '@' symbol and a dot (.) domain.");
        isValid = false;
      } else {
        clearError("emailGroup");
      }
  
      // LinkedIn optional, but must start with correct prefix if provided
      const linkedinVal = linkedin.value.trim();
      if (linkedinVal !== "" && !linkedinVal.startsWith(linkedinPrefix)) {
        showError("linkedinGroup", `LinkedIn URL must start with "${linkedinPrefix}"`);
        isValid = false;
      } else {
        clearError("linkedinGroup");
      }
  
      // "How we met" dropdown required
      if (howWeMet.value === "") {
        showError("howWeMetGroup", "Please select how we met.");
        isValid = false;
      } else {
        clearError("howWeMetGroup");
      }
  
      // "Other" specification required if "other" is chosen
      if (howWeMet.value === "other" && otherMet.value.trim() === "") {
        showError("otherMetGroup", "Please specify how we met.");
        isValid = false;
      } else {
        clearError("otherMetGroup");
      }
  
      // Stop form submission if any validation fails
      if (!isValid) {
        e.preventDefault();
      }
    });
  });