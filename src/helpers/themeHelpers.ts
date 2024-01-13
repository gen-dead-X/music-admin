export default function checkUserPreferredTheme() {
  const userPreferredTheme = localStorage.getItem("dark");

  //Check if User Already Has a Preference
  if (userPreferredTheme) {
    userPreferredTheme === "true"
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");

    return;
  }

  //If Not Check for User Preferences
  const prefersDarkTheme = window.matchMedia(
    "('prefers-color-scheme: dark'))"
  ).matches;

  localStorage.setItem("dark", prefersDarkTheme ? "true" : "false");

  prefersDarkTheme
    ? document.body.classList.add("dark")
    : document.body.classList.remove("dark");
}
