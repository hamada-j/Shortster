# Shortster

At MovingWorlds we're looking forward to launching an URL shortening service, so that users may have custom URLs to their profiles.

Title: Shortster
For: MovingWorlds
Developer: Hamada
Parts:
-----> Backend (RestFull Api NodeJS-Express).
-----> DataBase (NoSQL dev MongoDB-Atlas // prod Docker).
-----> Frontend (Angular 10 and Angular Material).

Description:
A user can submit a URL and receive a unique shortcode in response.
A user can submit a URL and shortcode and will receive the chosen shortcode if it is available.
A user can access a /<shortcode> endpoint and be redirected to the URL associated with that shortcode, if it exists.
All shortcodes can contain digits, upper case letters, and lowercase letters. It is case sensitive.
Automatically generated shortcodes are exactly 6 characters long.
User submitted shortcodes must be at least 4 characters long.
A user can access a /<shortcode>/stats endpoint in order to see when the shortcode was registered, when it was last accessed, and how many times it was accessed.

Backend and Fronend.
