Du ska i den här övningen bygga en sida för en onlinebokhandel. Nedan följer några features du kan implementera i valfri ordning. Du behöver inte implementera något betalsystem.

- Användare kan se olika böcker på startsidan som finns i bokhandeln. Börja med denna.
- När man klickar på en bok kommer man till lite information om denna. Du kan börja med bara några böcker och hårdkodade värden. Om du vill kan du lägga dessa i en databas. Vänta med att lägga in värdena i en databas. Börja med hårdkodade värden.
- En användare får på startsidan upp “Recently Viewed” med en lista på böcker den nyss kollat på. Använd express-session och lägg recently viewed i en array.
- En användare kan lägga till böcker i varukorgen. Vilka böcker som finns i varukorgen sparas i sessionen. Använd även här express-session
- En användare har ett inlogg där sessionsdata sparas mer permanent. Användaren kan nu stänga ner webbläsaren, komma tillbaka och fortfarande ha kvar varorna i korgen. Först här behöver du redis.
- Efter en viss tid av inaktivitet förstörs sessionen och användaren loggas ut. Du måste lägga till en expires på kakan på din session, och kontinuerligt lägga på tid varje gång du skickar en request till servern.

Tips

Börja med att göra en index.html med hårdkodade böcker. Se sedan till att skicka den från en expresserver.
Skapa en endpoint som returnerar böckerna
Hämta böckerna via index.html (du kan importera ett skript här)
Skriv ut böckerna via en .map()
Lägg till knappar under varje bok i din .map() som leder till en POST /books

Refaktorera gärna koden allt eftersom du lär dig bättre metoder att lösa problemen under kursens gång. Exempelvis:
Lagra data med Redis.
Använda helmet.
