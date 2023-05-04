import { Component } from '@angular/core';

interface Question {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent {
  data: Question[] = [
    {
      question: 'Van kaució?',
      answer: 'Igen van.  A kaució mértéke minden autonál eltérő.',
    },
    {
      question: 'Mennyi a kaució mértéke?',
      answer: 'Egységesen 50 000 Ft',
    },
    {
      question: 'Lehet külföldre menni az autóval?',
      answer: 'Szigorúan nem ',
    },
    {
      question: 'Milyen biztosítás van az autókon?',
      answer: 'Bérautókra köthető kötelező flotta-felelősségbiztosítás',
    },
    {
      question: 'Van CASCO- biztosítás az autókon?',
      answer: 'Egységesen 50 000 Ft',
    },
    {
      question: 'Van autópálya matrica az autókon?',
      answer:
        'Igen, Pest megyei autópálya matrica van egész évre. Az autó átvételénél érdemes érdeklődni, hátha az előző bérlő megvette egész országra a 10 napos matricát is.',
    },
    {
      question: 'Mikor vagyunk nyitva?',
      answer:
        'Alapvetően  rugalmas nyitva tartásunk van lehetőség , de az esetek többségében 9:00 – 18:00 – ig vagyunk nyitva. A BÉRLÉS MINDEN ESETBEN ELŐZETES TELEFONOS EGYEZTETÉSSEL TÖRTÉNIK. Ez azt jelenti, hogy nem érdemes telefonálás nélkül megjelenni a címünkön, mert előfordulhat, hogy nincsen kiadható autó és így nincsen bent egy kolléga sem az irodában.',
    },
    {
      question: 'Hol lehet átvenni az autókat?',
      answer: '1234 Budapest Autokölcsönző utca 44',
    },
    {
      question: 'Tudnak adni gyerekülést?',
      answer: 'Igen, tudunk, a készlet erejéig.',
    },
    {
      question: 'Tudnak adni valamilyen navigációs rendszert az útra?',
      answer: 'Igen',
    },
    {
      question: 'Milyen iratok kellenek a kölcsönzéshez?',
      answer:
        'A sofőr személyazonosító igazolványa, jogosítványa, lakcímkártyája.',
    },
    {
      question: 'Mik a bérlés feltételei?',
      answer:
        'A fent említett iratok megléte, kaució és bérleti díj megfizetése, szerződés és adatkezelés elfogadása, legalább 2 éves jogosítvány.',
    },
    {
      question: 'Lehet bankkártyával fizetni?',
      answer: 'Igen. Visa és Mastercard kártyákat fogadunk el.',
    },
    {
      question: 'A kauciót és a bérleti díjat mikor kell fizetni?',
      answer:
        'A kauciót és a bérleti díjat is az autó átvételekor kell kifizetni.',
    },
    {
      question:
        'Ha előbb hozzuk vissza az autót, visszajár fennmaradó napok bérleti díja?',
      answer: 'Nem jár vissza',
    },
    {
      question: 'Van KM korlát?',
      answer: 'Nincsen',
    },
    {
      question: 'Csak forinttal lehet fizetni?',
      answer: 'Mind a kauciót, mind a bérleti díjat lehet euróban is fizetni.',
    },
    {
      question: 'Mikor kapjuk vissza a kauciót?',
      answer: 'A jármű vissza adásakor azonnal, nem kell rá napokat várni.',
    },
    {
      question: 'Mi a módja annak ha hosszabbítanánk?',
      answer:
        'A szerződés lejárta előtt 1 nappal jelezni kell a hosszabbítási szándékot. Ha nem lesz kiadva az adott autó a szerződés lejárta után, akkor minden probléma nélkül maradhat hosszabbításra. Ehhez személyesen hosszabbítani kell a szerződést, és ki kell fizetni a további napokat. Hosszú távú bérlés esetén ez utalással és online szerződés hosszabbítással is történhet.',
    },
    {
      question: 'Mi történik, ha kevesebb üzemanyaggal hozzuk vissza az autót?',
      answer:
        'A telephelyünk melletti benzinkúton fel tudják tankolni, vagy levonjuk a hiányt a kaucióból. Az utóbbi esetben a hiányzó üzemanyag mennyisége nem alku tárgya. Ha a bérlő nem ért egyet kollégánk döntésével, akkor van lehetősége saját magának megtankolni. ',
    },
    {
      question: 'A járművet csak a szerződésen szereplő illető vezetheti?',
      answer: 'Igen.',
    },
    {
      question: 'Ha lerobban az autó mi a teendő?',
      answer:
        'Minden esetben először a honlapon szereplő telefonszámunkat ( 06-20/654-2122 ) kell felhívni és körülírni a helyzetet. Motorikus probléma esetén: Az autó állapotától és a távolságtól függően egyik kollégánk trailert hív/bérel és elmegy a járműért. Ha vontatható a jármű, akkor úgy szállítjuk el. Lehetőségeinkhez mérten biztosítunk másik járművet. Ha erre nincsen lehetőségünk, akkor visszaadjuk a bérleti díjat és segítséget nyújtunk a hazajutásban. Defekt esetén: Minden autóban van megfelelő szerszám: defektjavító, pótkerék, emelő és kerékkulcs. Ezek segítségével a bérlőnek képesnek kell lennie egyedül kereket cserélni. (Ha a jogosítványát megszerezte.) Természetesen kis távolság esetén rendelkezésre állunk ilyen helyzetben is, viszont alapvetően ilyen jellegű meghibásodásnál nem vagyunk kötelesek a helyszínre menni. ',
    },
    {
      question: 'Ha baleset történik mi a teendő?',
      answer:
        'Minden esetben először ha személyi serülés történt a mentöket kell hívni illetve a megfelelőszerveket, ezután a honlapon szereplő telefonszámunkat ( 06-20/654-2122 ) kell felhívni és körülírni a helyzetet. Más járművel történő ütközés: Meg kell állapítani a baleset okozóját. Ha senki nem ismeri el, rendőrt kell hívni (ebben az esetben az egyik fél esetlegesen büntetést is fizethet elsőbbségadási kötelezettsége be nem tartása miatt). A bérlő maga nem jogosult betétlapkitöltésére addig amig  nem értesíti a bérbeadó céget telefonon. A vétkes sofőrt a betétlapon fel kell tüntetni, a papírt körültekintően ki kell tölteni, és az az „ártatlan” sofőrnél marad. Akár betétlap nélkül is rendezhető a kár, ez szintén megbeszélés és egyeztetés kérdése. Idegen jármű nélküli baleset: Ilyen esetben  a bérlő a vétkes és vállalnia kell a felelősséget a kár után.',
    },
  ];
}
