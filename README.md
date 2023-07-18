# Autókölcsönző weboldal

Weboldalt azért hoztam létre, hogy az autókölcsönzés egyszerű és kényelmes legyen a leendő ügyfelek számára. A felhasználó kedvére szörfölhet az adatbázisban: szűrhet, kereshet évjárat, márka, ár, motorteljesítmény stb. alapján. Regisztráció után pedig az általa kiválasztott autót lefoglalhatja.

## Követelmények:

- Az alkalmazás Angular-alapú, model-service-component architektúra jellemzi
- Az oldal megjelenéshez Angular Material komponenseket használ
- Teljesen reszponzív, mobile-first szemléletű.
- Adatbázist MongoDB bizosítja
- NodeJS API: saját API szolgálja ki a frontendet
- Minden API útvonalhoz egy unit teszt kapcsolódik
- Az API-hoz Swagger alapú dokumentáció tartozik
- A felület bizonyos oldalai csak belépés után elérhetőek (JWT autentikáció)
- A jelszavak 'Hashelve" történnek letárolásra
- User sztorik a leírás része
- Az alkalmazás dockerizálva van, konténerből futtatható

## Alkalmazás telepítése / futtatása

1. Forkolni kell az adott GitHub repository tartalmát:

https://github.com/Strukturavaltas-FullstackAPI-2023/fsapi-remek-assignment-bankiszabolcs.git

2.  A célgépre le kell klónozni az adott GitHub repository tartalmát.
    Terminálba:
    `git clone https://github.com/Strukturavaltas-FullstackAPI-2023/fsapi-remek-assignment-bankiszabolcs.git`

3.  Docker Desktop indítása

4.  Terminálban lépj be a projekt gyökerében található `/backend` mappába.

5.  Add ki az `npm run docker:compose` parancsot.

5.  Az alkalmazás ezután a http://localhost:3000 -en érhető el

> Amennyiben Docker nélkül nyitnád meg, a projekt gyökerében található

    `/angular` mappában add ki az `npm run start` parancsot,

	`/backend` mappában add ki az `npm run start:nodemon` parancsot
Ezután az alkalmazást a http://localhost:4200 -en éred el

---

## Entitások

#### Car

A weboldal legfontosabb entitása. Tartalmazza mindazon tulajdonságokat, amire a felhasználó kíváncsi lehet, úgy mint: az autó gyártója, típusa, ára, üzemanyaga, évjárata, váltó fajtája stb.

#### User

Felhasználónak az autentikációhoz és az autó bérléséhez szükséges adatait tartalmazza: Felhasználónév, jelszó, név, születési idő, telefonszám email, lakcím, jogosítvány, vezetői engedély száma. Ezen kívűl rendelkezik egyedi azonosítóval, melyet a rendszer magától legenerál, valamint a jogosultság megnevezésével (user), rendelések és kedvencek tömbbel, melyek a regisztrálás pillanatában üresek, de később a felhasználó által feltölthetők.

#### Order

Weboldalon leadott rendelés. Rendelkezik egyedi azonosítóval (adatbázis által generálva), a rendelést leadott user és a foglalt autó egyedi azonosítójával, rendelés idejével, kezdő és befejező időpontjával, a foglalás ezáltal legenerált időtartamával és összegével.

#### Token

Hozzáférést szabályzó stringek, melyek kódolt informácókat tartalmaznak a tulajdonosáról, ezáltal azonosítva őt és így hozzáférést engedélyezve vagy megtiltva a különböző végpontok meghívásakor.

---

## "User stories"

### Látogató, Felhasználó, Admin

#### Regisztráció

Felhasználói profil létrehozása űrlap kitöltésével
API végpont: POST /users

#### Bejelentkezés

Felhasználónév és jelszó megadásával a felhasználó bejelentkezhet
API végpont: POST /login

#### Autók megjelenítése

A felhasználó a 'Autóink' menüpontra kattintva eléri az összes rendelkezésre álló autót
API végpont: GET /cars

#### Listázott autók nézetének beállítása

'Táblázat' és 'Kártya' ikonok segítségével a felhasználó megválaszthatja a kilistázott autók részletes tulajdonságait.

#### Autók részletes tulajdonságainak megjelenítése

'Táblázat' nézet esetében a táblázat sorok utolsó oszlopában található nyíl segítségével további információkat hozhatunk elő az autókról. 'Kártya' nézet esetében erre nincs szükség, mert valamennyi információ rajta van a kártyán

#### Autók szűrése

A látogató a 'Szűrés' beviteli mezőben név és tulajdonságok alapjár kereshet az elérhető autók között.

#### Autók rendezése táblázat nézetben

'Táblázat' nézetben a megjelenített autók oszlopait rendezheti növekvő ill. csökenő sorrendben, valamit a táblázatok oszlopait tetszés szerint rendezheti (Drag & drop)

### Felhasználó, Admin

#### Kijelentkezés

A felhasználó kijelentkezik az oldalról
API végpont: POST /logout

#### Autó kedvencekhez adása vagy törlése

Regisztrált felhasználónak van lehetősége a 'Teszik' gombbal egy autót a kedvencekhez adnia, vagy eltávolítania amennyiben már a 'Kedvencek' között van.
API végpont: PUT /users/:id

#### Autó foglalása

Regisztrált felhasználó 'Foglalás' gomb segítségével előhozhatja a foglalás űrlapot. Az űrlap egy felugró ablakban jelenik meg, ahol a kezdő és befejező dátumot kell megadnia, majd a 'Foglal' gombra kattintania.
API végpont: POST /orders

#### Személyes adatok módosítása

A felhasználó a 'Személyes oldal - Adatok' oldalon az 'Adatok módosítása' gomb segítségével megnyithatja az adatait tartalmazó űrlapot szerkesztehető formátumban.
API végpont: PUT /users/:id

#### Személyes adatok módosításainak elküldése/visszavonása

A felhasználó 'Mentés' gomb segítségével elmentheti, 'Mégse' gomb segítségével visszavonhatja a módosításait
API végpont: PUT /users/:id

#### Rendelések listázása

A felhasználó a 'Foglalásaim' oldalon ('Profilom' > 'Személyes' > 'Foglalásaim' vagy 'Profilom' > 'Foglalásaim') táblázatos formában láthatja a lefoglalt autóit.
API végpont: GET /orders/user/:userId

#### Rendelések szűrése

A felhasználó a leadott rendelései között kereshet név és tulajdonság alapján

#### Rendelések módosítása

A felhasználó módosíthatja a foglalásait. (Csak a kezdő és végső időpontot)
API végpont: PUT /orders/:id

#### Rendelések törlése

A felhasználó törölheti azokat a rendeléseket, amire már nincs szüksége.
API végpont: DELETE /orders/:id

### Admin

#### Új autó felvitele

Űrlap kitöltésével az admin új autót adhat hozzá a listához
API végpont: POST /cars

#### Autó szerkesztése

Adminisztrátor szerkesztheti a meglévő autók tulajdonságait.
API végpont: PUT /cars/:id

#### Autó törlése

Adminisztrátor törölheti a kiválasztott autót.
API végpont: DELETE /cars/:id

#### Felhasználók listázása

Adminisztrátor listázhatja az oldalra regisztrált felhasználókat
API végpont: GET /users

#### Felhasználó authorizációjának módosítása

Adminisztrátor módosíthatja az egyes felhasználó jogait. 'Felhasználóból' 'Admin' jogot adhat és vica versa.

#### Felhasználó törlése

Adminisztrátor törölheti a kiválasztott felhasználót
API végpont: DELETE /users/:id

#### Rendelések listázása

Adminisztrátor az összes rendelést listázhatja.
API végpont: GET /orders

---

## Képernyők

### Home / Főoldal

Főoldalon három kártya (card) komponens segítségével navigálhatunk el a kiemelt, ajánlott oldalakra. A kártyák középra igazítva, egymás mellett vonalban vannak elhelyezve. A kártyákon az oldalak címe és egy rövid ajánlás van, hogy miért érdemes a látogatónak az adott oldalra lapozni.

### Login / Bejelentkezés

Középre igazított bemeneteli mezők (input) segítségével megadhatjuk a felhasználónevünket és jelszavunkat. Adatok sikeres megadása után az oldal átirányítódik a "Személyes" oldalra. Helytelen adatok, valamint túl gyakori próbálkozás esetén (5 mp-n belül 1-nél több kísérlet) hibaüzenet jelenik meg (DDoS támadás elleni védelem)

### Regisztráció

A látogatónak lehetősége van az oldalra regisztrálni, melyet egy 4 lépcsős (stepper) form kitöltésével tud megtenni. Valamennyi bemeneteli mezőnél helyőrzőként (placeholder) egy minta beviteli érték szerepel. A mezők validációval van ellátva, így ha hibásan adjuk meg, hibaüzenetet kapunk és az adatok elküldése nem lehetséges.

#### Validátorok

- Email: email formátum, egyedi (nem lehet foglalt)
- Felhasználónév: minimum 3, maximum 10 karakter, egyedi
- Jelszó: minimum 8 karakter, kis- és nagybetű, szám, speciális karakter
- Keresztnév: minimum 2 maximum 30 karakter
- Vezetéknév: minimum 2 maximum 30 karakter
- Születési idő: minimum 18. betöltött év
- Telefonszám: Formátum: 06204306400 vagy +36204305400
- Személyigazolvány: minimum 5 maximum 10 karakter
- Jogosítvány: minimum 5 maximum 10 karakter
- Város: minimum 5 maximum 20 karakter
- Utca: minimum 5 maximum 40 karakter
- Házszám: szám, kötelező
- Emelet: szám, nem kötelező
- Ajtó: szám, nem kötelező
- Irányítószám: szám, kötelező

### GYIK

Tartalmazza látogatóktól leggyakrabban érkező kérdésekre adott választ.

### Elérhetőség / Contacts

Az autókölcsönző címét, telefonos és email-es elérhetőségét tartalmazza.

### Autók / Cars

Az autót megjelenítését a táblázat felett elhelyezett ikonok segítségével tudom változtatni táblázatos vagy kártyás formába.

1. Tábla nézet.
   Az autók táblázatos formában jelennek meg alap adatokkal. Bővebb információkért, és akciógombok eléréséhez a sorra kell kattintani. A lenyíló menüben aztán lehetőségünk van a kiválasztott autó kedvencek közé adásához illetve a lefoglalásához.
   Táblázatban lehetőség van az elemek között keresni, szűrni, rendezni lapozni, egyszerre megjelenített elemek számát módosítani (alapértelmezett: 50) és az oszlopok sorrendjét megváltoztatni.

2. Kártyás nézet
   Az autók kártyás nézetben jelennek meg. Először csak 10 darab, és az oldal aljára való görgetéskor újabb és újabb 10 darab, amíg az összes megjelenítésre nem kerül.

### Személyes oldal

#### Adatok

Személyes adatok vannak kilistázva. 'Adatok szerkesztése' gombra kattintva szerkeszthető űrlapra irányít az oldal (lásd: 'Személyes adatok szerkesztése')

#### Kedvenc autók

Felhasználó által kedvelt autókat tartalmazza "Kártyánként"

#### Foglalásaim

Felhasználó foglalásait tartalmazza táblázatos formában. Kereshetünk közöttük illetve egyes sorokra rákattintva szerkeszthetjük az adott foglalást illetve kijelölhetjük azokat és akár csoportosan törölhetjük.

### Személyes adatok szerkesztése

Űrlap, ahol módosíthatjuk a már meglévő felhasználó adatait. Amennyiben a jelszót is meg akarjuk módosítani, egy checkbox segítségével kell jelezni. Új jelszót megadni csak a régi jelszó megadása után van lehetőség.

### Foglalás módosítása

Módosíthatjuk az adott foglalást. Csak a kezdési és a végső időpontot tudjuk módosítani. A többit vagy nem lehet (ID, Autó, Dátum) vagy magától kalkulálja ki az alkalmazás (időtartam, ár)

### Felhasználók

Táblázatban tartalmazza a regisztrált felhasználókat. Törölhetjük azokat illetve módosíthatjuk az adataikat (lásd: 'Személyes adatok szerkesztése')

---

## Végpontok dokumentációja

##### Swagger

- Az alkalmazás elindítása után alábbi URL-t kell beírni a böngészőbe: http://localhost:3000/api/api-docs

---

## Tesztek futtatása

Tesztek lefuttatása előtt szükséges a függőségek telepítése. Ezt a terminálban kiadott `npm i` paranccsal tudod megtenni. Fontos, hogy a /backend mappában add ki a parancsot.

_Megjegyzés:_
A parancs kiadása Dockerben történő futtatás esetén is szükséges.

### Összes teszt futtatása

- `npm run test`

### Unit tesztek futtatása

- `npm run test order.controller.test.js`
- `npm run test car.controller.test.js`
- `npm run test user.controller.test.js`
- `npm run test authHandler.test.js`

### Integrációs tesztek futtatása

- `npm run test server.test`

---

_Megjegyzés_:  
A belépéshez egy érvényes e-mail-cím és jelszó páros (példa):

| Felhasználónév | Jelszó     | Szerepkör |
| -------------- | ---------- | --------- |
| bankimoon      | Aladar12.  | admin     |
| attila01       | Aladar12.  | user      |

***

# Car rental website

I created a website to make car rental easy and convenient for prospective customers. The user can surf the database: filter, search for year, brand, price, engine power, etc. Based on. And after registration, you can reserve the car of your choice.

## Requirements:

- The application is characterized by an Angular-based, model-service-component architecture
- The page uses Angular Material components for its appearance
- Fully responsive, mobile-first approach.
- Database provided by MongoDB
- NodeJS API: own API serves the front end
- Each API route has a unit test
- The API comes with Swagger-based documentation
- Certain pages of the interface are only accessible after logging in (JWT authentication)
- Passwords are "Hashed" for storage
- User stories are part of the description
- The application is dockerized and can be run from a container

## Install / run application

1. The content of the given GitHub repository must be forked:

https://github.com/Strukturavaltas-FullstackAPI-2023/fsapi-remek-assignment-bankiszabolcs.git

2. The contents of the given GitHub repository must be cloned to the target machine.
    To terminal:
    `git clone https://github.com/Strukturavaltas-FullstackAPI-2023/fsapi-remek-assignment-bankiszabolcs.git`

3. Start Docker Desktop

4. In a terminal, enter the `/backend` folder in the root of the project.

5. Run the `npm run docker:compose` command.

5. The application is then available at http://localhost:3000

> If you run it without Docker, it is located in the root of the project
	`in the `/angular` folder run the `npm run start` command,
	`In the `/backend` folder, run the `npm run start:nodemon` command
You can then access the application at http://localhost:4200

---

## Entities

#### Car

The most important entity of the website. It contains all the features that the user may be interested in, such as: car manufacturer, type, price, fuel, year, transmission type, etc.

#### User

It contains the user's data necessary for authentication and renting the car: Username, password, name, date of birth, phone number, email address, driver's license, driver's license number. In addition, it has a unique identifier, which is generated by the system itself, as well as the name of the authorization (user), orders and favorites array, which are empty at the time of registration, but can be filled in later by the user.

#### Order

Order placed on website. It has a unique identifier (generated by the database), the unique identifier of the user who placed the order and the reserved car, the time of the order, the start and end times, the generated duration and amount of the reservation.

#### Token

Access control strings that contain coded information about the owner, thereby identifying him and thus allowing or denying access when calling different endpoints.

---

## "User stories"

### Visitor, User, Admin

#### Registration

Create a user profile by filling out a form
API endpoint: POST /users

#### Login

By entering a username and password, the user can log in
API endpoint: POST /login

#### Show cars

The user can access all available cars by clicking on the 'Our cars' menu item
API endpoint: GET /cars

#### Setting the view of listed cars

With the help of 'Table' and 'Card' icons, the user can choose the detailed properties of the listed cars.

#### Show detailed properties of cars

In the case of the 'Table' view, additional information about the cars can be retrieved using the arrow in the last column of the table rows. In the case of the 'Card' view, this is not necessary, because all the information is on the card

#### Filter cars

In the 'Filter' input field, the visitor can search by name and basic price among the available cars.

#### Sort cars in table view

In the 'Table' view, you can sort the columns of the displayed cars in ascending or descending order. in descending order, you can sort the columns of the tables as you like (Drag & drop)

### User, Admin

#### Check-Out

The user logs out of the page
API endpoint: POST /logout

#### Add or delete a car to favorites

Registered users can add a car to their favorites using the 'Add' button, or remove it if it is already in their 'Favourites'.
API endpoint: PUT /users/:id

#### Car reservation

A registered user can use the 'Reservation' button to bring up the reservation form. The form will appear in a pop-up window where you have to enter the start and end dates and then click 'Book'.
API endpoint: POST /orders

#### Modification of personal data

The user can open the form containing their data in an editable format using the 'Change data' button on the 'Personal page - Data' page.
API endpoint: PUT /users/:id

#### Submit/Revoke Personal Data Changes

The user can use the 'Save' button to save, and the 'Cancel' button to undo his changes
API endpoint: PUT /users/:id

#### Listing orders

The user can see his reserved cars in tabular form on the 'My Reservations' page ('My Profile' > 'Personal' > 'My Reservations' or 'My Profile' > 'My Reservations').
API endpoint: GET /orders/user/:userId

#### Filter orders

The user can search among his placed orders based on name and attribute

#### Modification of orders

The user can modify his reservations. (Only the start and end time)
API endpoint: PUT /orders/:id

#### Cancel orders

The user can delete the orders that he no longer needs.
API endpoint: DELETE /orders/:id

### Admin

#### Adding a new car

By filling out a form, the admin can add a new car to the list
API endpoint: POST /cars

#### Edit car

An administrator can edit the properties of existing cars.
API endpoint: PUT /cars/:id

#### Delete car

Administrator can delete the selected car.
API endpoint: DELETE /cars/:id

#### List users

An administrator can list the users registered on the site
API endpoint: GET /users

#### Modification of user authorization

An administrator can change the rights of each user. You can give 'Admin' rights from 'User' and vice versa.

#### Delete user

An administrator can delete the selected user
API endpoint: DELETE /users/:id

#### Listing orders

Administrator can list all orders.
API endpoint: GET /orders

---

## Screens

### Home / Main page

On the main page, you can use three card components to navigate to the featured, recommended pages. The cards are aligned in the center and placed next to each other in a line. The cards have the address of the pages and a short recommendation why the visitor should turn to the given page.

### Login

You can enter your username and password using input fields aligned to the center. After successfully entering data, the page will be redirected to the "Personal" page. In case of incorrect data and too frequent attempts (more than 1 attempt within 5 seconds), an error message is displayed (protection against DDoS attacks)

### Registration

The visitor has the opportunity to register on the site, which he can do by filling out a 4-step (stepper) form. All input fields have a sample input value as a placeholder. The fields are validated, so if you enter them incorrectly, you will receive an error message and the data cannot be sent.

#### Validators

- Email: email format, unique (must not be busy)
- Username: minimum 3, maximum 10 characters, unique
- Password: minimum 8 characters, upper and lower case letters, numbers, special characters
- First name: minimum 2 maximum 30 characters
- Surname: minimum 2 maximum 30 characters
- Date of birth: at least 18 years of age
- Phone number: Format: 06204306400 or +36204305400
- Identity card: minimum 5 maximum 10 characters
- License: minimum 5 maximum 10 characters
- City: minimum 5 maximum 20 characters
- Street: minimum 5 maximum 40 characters
- House number: number, mandatory
- Floor: number, optional
- Door: number, optional
- Postal code: number, mandatory

### F.A.Q

It contains answers to the most frequently asked questions from visitors.

### Availability / Contacts

It contains the address, telephone and email contact details of the car rental company.

### Cars

Using the icons above the table, I can change the display of the car to table or card form.

1. Table view.
   The cars are presented in tabular form with basic data. For more information and to access action buttons, click on the line. In the drop-down menu, you can add the selected car to your favorites or reserve it.
   In a table, it is possible to search, filter, sort and page through the elements, change the number of elements displayed at once (default: 50) and change the order of the columns.

2. Card view
   Cars are displayed in card view. Only 10 at first, and 10 more and more as you scroll to the bottom of the page until all are displayed.

### Personal Page

#### Data

Personal data is listed. By clicking the 'Edit data' button, the page redirects to an editable form (see: 'Edit personal data')

#### Favorite cars

Contains user-favored cars "By Card"

#### My reservations

It contains the user's reservations in tabular form. You can search among them or click on individual lines to edit the given reservation or select them and even delete them as a group.

### Edit personal data

Form where we can change the data of an existing user. If you also want to change the password, you must indicate it using a checkbox. It is possible to enter a new password only after entering the old password.

### Modification of reservation

We can change the given reservation. We can only change the start and end times. The rest is either not possible (ID, Car, Date) or is calculated by the application itself (duration, price)

### Users

Contains registered users in a table. We can delete them or modify their data (see: 'Editing personal data')

---

## Documentation of endpoints

##### Swagger

- After starting the application, enter the following URL in the browser: http://localhost:3000/api/api-docs

---

## Run tests

Dependencies must be installed before running tests. You can do this with the `npm i` command issued in the terminal. It is important to issue the command in the /backend folder.

_Comment:_
Issuing the command is also necessary when running in Docker.

### Run all tests

- `npm run test`

### Run unit tests

- `npm run test order.controller.test.js`
- `npm run test car.controller.test.js`
- `npm run test user.controller.test.js`
- `npm run test authHandler.test.js`

### Run integration tests

- `npm run test server.test`

---

_Comment_:
A valid e-mail address and password pair is required for entry (example):
| Username       | Password   | Role      |
| -------------- | ---------- | --------- |
| bankimoon      | Aladar12.  | admin     |
| attila01       | Aladar12.  | user      |
