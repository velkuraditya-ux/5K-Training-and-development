const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll("[data-topic]").forEach((link) => {
  link.addEventListener("click", () => {
    const select = document.querySelector("#topic");
    if (select) select.value = link.dataset.topic;
  });
});

const params = new URLSearchParams(window.location.search);
const topic = params.get("topic");
const topicField = document.querySelector("#topic");
if (topic && topicField) {
  const match = [...topicField.options].some((option) => option.value === topic);
  if (match) topicField.value = topic;
}

const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const interest = String(data.get("topic") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !interest || !message) {
      if (status) status.textContent = "Add your name, email, topic, and message.";
      return;
    }

    const subject = encodeURIComponent(`5K Training & Development — ${interest}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company || "Not provided"}\nTopic: ${interest}\n\n${message}`
    );
    window.location.href = `mailto:education@hayselectrical.com?subject=${subject}&body=${body}`;
    if (status) {
      status.textContent =
        "Your email app should open with this message addressed to education@hayselectrical.com.";
    }
  });
}
