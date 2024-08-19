{
  "manifest_version": 3,
  "name": "Advanced Text Analyzer",
  "version": "1.1",
  "description": "Analysiert den Text auf der aktuellen Webseite und zeigt umfassende Statistiken, Visualisierungen und Einstellungen an.",
  "permissions": ["activeTab", "storage"],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icon16.png",
      "48": "icon48.png",
      "128": "icon128.png"
    }
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ],
  "background": {
    "service_worker": "background.js"
  },
  "web_accessible_resources": [
    {
      "resources": ["chart.js"],
      "matches": ["<all_urls>"]
    }
  ]
}
