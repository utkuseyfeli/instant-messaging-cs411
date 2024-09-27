!!Important Note: Firebase related API keys are all deactivated. In order to run it again with firestore features new keys are required.
Required environments:

    Node.js v18.12.1
    Angular v15
    
You can follow the instructions from their websites to set them up.

https://nodejs.org/en/

https://angular.io/guide/setup-local (or just type "npm install -g @angular/cli" command to install it).


In order to run Message Server;

    1. Go into message-server folder.
    2. (For the first run) Run "npm install" command from the terminal.
    3. Run node.index.js. (Optionally you can install "nodemon" package globally and run server using it).

In order to run Website;

    1. Go into website/website folder.
    2. (For the first run) Run "npm install" command from the terminal.
    3. (For the first run) Change the interfaces.d.ts file in the following directory:
        "node_modules/@angular/fire/compat/firestore"
        to the file given in main root of the project with the same name.
    4. run "ng serve" command in the website/website directory.
    5. Open your browser and type "http://localhost:4200".

Source files of the website reside in website/website/src directory.

!Important Note: If you see socket.io errors on console try clearing the cache of the browser and run everything
related to project again.

!Important Note 2: The information shared in website/website/src/environments/environment.ts file are private and 
shouldn't be shared with anyone else. It belongs to Uğur Utku Seyfeli.
