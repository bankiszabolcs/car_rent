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
