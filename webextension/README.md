# README for a11y.css WebExtension

This is a port to WebExtension of the [a11y.css bookmarklet](../).

## How to test it (Firefox)

Eventually this will be a proper extension, but for the moment it's not packaged.

1. Open `about:debugging` in a new tab
2. Click on “Load a temporary module”
3. Fetch the `manifest.json` file from the folder where you have copied the **a11y.css** project.
   ![The “About: debugging panel”](readme_images/about_debugging.png)
4. And *voilà*, the extension is running.
   ![The icon in Firefox's toolbar, among other friends](readme_images/webext_icon_running.png)

Then you can run the Browser console `Ctrl+Shift+J` to see what's happening. You may see some errors that won't happen once the application will be properly packaged and distributed. Bear with us.