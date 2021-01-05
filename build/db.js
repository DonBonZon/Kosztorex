const _ = require("lodash");
const Datastore = require('nedb-promises');

const positions = Datastore.create({
    filename: `${process.cwd()}/data/positions.db`,
    autoload: true
});

//___  for later use
// const sthElse = Datastore.create({
//     filename: `${process.cwd()}/data/sthElse.db`,
//     autoload: true
// });

const db = {
    positions: positions,
   // somethingElse: sthElse
}

const changePositionName = async (id, name) => {
    const positions = await db.positions.update({ _id: id }, { $set: { name: name } }, function (err) { });
    return positions;
}

const changePositionUnit = async (id, unit) => {
    const positions = await db.positions.update({ _id: id }, { $set: { unit: unit } }, function (err) { });
    return positions;
}

const changePositionPrice = async (id, price) => {
    const positions = await db.positions.update({ _id: id }, { $set: { price: price } }, function (err) { });
    return positions;
}

const changePositionDepartment = async (id, department) => {
    const positions = await db.positions.update({ _id: id }, { $set: { department: department } }, function (err) { });
    return positions;
}

const addPosition = async (department, name, unit, price) => {
    const position = await db.positions.insert({ department, name, unit, price });
    return position;
}

const getSortedPositions = async () => {
    const positions = await db.positions.find({});
    let grouped = _.mapValues(_.groupBy(positions, 'department'),
        list => list.map(position => _.omit(position, 'department')));
    return grouped;
}

const getPositions = async () => {
    const positions = await db.positions.find({});
    return positions;
}

const getDepartments = async () => {
    const positions = await db.positions.find({});
    return positions.map((item) => item.department).filter((v, i, a) => a.indexOf(v) === i);
}

const deletePosition = async (id) => {
    const positions = await db.positions.remove({ _id: id });
    return positions;
}

const editWholePosition = async (id, department, name, unit, price) => {
    const positions = await db.positions.update({ _id: id }, { $set: { department: department, unit: unit, name: name, price: price } }, function (err) { });
    return positions;
}

const populatePositionsIfEmpty = async () => {
    positionsArray = await getPositions();
    if (positionsArray.length === 0) {
        console.log("Database is empty");

        addPosition("Gładzie gipsowe", "Wyrównanie ścian / sufitów tynkiem przy nierównych płaszczyznach", "m²", 15);
        addPosition("Gładzie gipsowe", "Montaż narożników aluminiowych", "mb.", 12);
        addPosition("Gładzie gipsowe", "Wykonanie gładzi gipsowej", "m²", 14);
        addPosition("Gładzie gipsowe", "Montaż płyt gipsowych na klej (suche tynki)", "m²", 25);
        addPosition("Gładzie gipsowe", "Montaż płyt gipsowych na stelażu (suche tynki)", "m²", 45);
        addPosition("Gładzie gipsowe", "Montaż ścianek działowych z płyt GK 1 warstwa z wypełnieniem wełną mineralną", "m²", 60);
        addPosition("Gładzie gipsowe", "Naprawa pęknięć taśmą zbrojącą, wykończenie szpachlą", "mb.", 7.5);
        addPosition("Gładzie gipsowe", "Szpachlowanie samych łącz płyt GK", "mb.", 7);
        addPosition("Gładzie gipsowe", "Wykonanie otworu na drzwi w ścianie z płyt gipsowych", "szt.", 50);

        addPosition("Instalacje elektryczne", "Wykonanie punktu elektrycznego", "szt.", 50);
        addPosition("Instalacje elektryczne", "Montaż lamp sufitowych i kinkietów", "szt.", 30);
        addPosition("Instalacje elektryczne", "Montaż gniazd i wyłączników", "szt.", 15);
        addPosition("Instalacje elektryczne", "Wykonanie kanału w ścianie na przewody do telewizora", "szt.", 120);
        addPosition("Instalacje elektryczne", "Wykucie bruzdy pod kable w cegle", "mb.", 14);
        addPosition("Instalacje elektryczne", "Wykucie bruzdy pod kable w betonie", "mb.", 20);
        addPosition("Instalacje elektryczne", "Wykucie otworu pod puszkę w betonie", "szt.", 15);
        addPosition("Instalacje elektryczne", "Wykonanie bruzd pod kable w tynku i ich zatarcie", "mb.", 16);
        addPosition("Instalacje elektryczne", "Montaż oczek ledowych (wpuszczanych)", "szt.", 25);
        addPosition("Instalacje elektryczne", "Montaż oczek ledowych (tuby nawierzchniowe)", "szt.", 35);
        addPosition("Instalacje elektryczne", "Montaż listew ledowych (nawierzchniowych)", "mb.", 20);
        addPosition("Instalacje elektryczne", "Montaż tablicy bezpiecznikowej z licznikiem", "szt.", 200);

        addPosition("Malowanie i tapetowanie", "Zabezpieczenie folią podłóg i mebli przed malowaniem", "m²", 5);
        addPosition("Malowanie i tapetowanie", "Skrobanie farby (klejowej)", "m²", 5.5);
        addPosition("Malowanie i tapetowanie", "Zmywanie powierzchni", "m²", 2.7);
        addPosition("Malowanie i tapetowanie", "Zrywanie starych tapet", "m²", 5);
        addPosition("Malowanie i tapetowanie", "Gruntowanie", "m²", 2.5);
        addPosition("Malowanie i tapetowanie", "Niewielkie naprawy powierzchni", "m²", 4);
        addPosition("Malowanie i tapetowanie", "Malowanie jednokrotne farbą podkładową (gruntującą)", "m²", 3);
        addPosition("Malowanie i tapetowanie", "Malowanie dwukrotne farbą emulsyjną lub lateksową", "m²", 7);
        addPosition("Malowanie i tapetowanie", "Malowanie jednokrotne (lakierowanie) farbą olejną", "m²", 18);
        addPosition("Malowanie i tapetowanie", "Malowanie grzejników żeberkowych (za żeberko)", "szt.", 11);
        addPosition("Malowanie i tapetowanie", "Malowanie rur wodnych lub C.O.", "mb.", 15);
        addPosition("Malowanie i tapetowanie", "Malowanie ościeżnic drzwiowych", "szt.", 50);
        addPosition("Malowanie i tapetowanie", "Malowanie drzwi", "m²", 35);
        addPosition("Malowanie i tapetowanie", "Malowanie okien", "m²", 45);
        addPosition("Malowanie i tapetowanie", "Impregnacja drewna", "m²", 10);
        addPosition("Malowanie i tapetowanie", "Tapetowanie ścian", "m²", 15);
        addPosition("Malowanie i tapetowanie", "Tapetowanie sufitów", "m²", 16);
        addPosition("Malowanie i tapetowanie", "Malowanie elewacji do wysokości 3m dwukrotne", "m²", 12);
        addPosition("Malowanie i tapetowanie", "Akrylowanie", "mb.", 1.5);

        addPosition("Prace murarskie", "Montaż drzwi wewnętrznych z ościeżnicą regulowaną", "szt.", 140);
        addPosition("Prace murarskie", "Montaż drzwi wewnętrznych z ościeżnicą zwykłą z obustronnym wykończeniem", "szt.", 240);
        addPosition("Prace murarskie", "Montaż drzwi zewnętrznych", "szt.", 340);
        addPosition("Prace murarskie", "Podcinanie drzwi", "szt.", 25);
        addPosition("Prace murarskie", "Poszerzenie otworu do 10 cm - ściana z cegły", "szt.", 120);
        addPosition("Prace murarskie", "Poszerzenie otworu do 10 cm - ściana z betonu", "szt.", 160);
        addPosition("Prace murarskie", "Montaż parapetów wewnętrznych", "mb.", 50);
        addPosition("Prace murarskie", "Obróbka otworów okiennych", "mb.", 30);
        addPosition("Prace murarskie", "Montaż luksferów", "m²", 100);
        addPosition("Prace murarskie", "Budowa ścianki działowej z bloczków gazobetonowych (Ytong)", "m²", 60);
        addPosition("Prace murarskie", "Wykonanie wylewki betonowej", "m²", 35);
        addPosition("Prace murarskie", "Montaż kratek wentylacyjnych", "szt.", 20);
        addPosition("Prace murarskie", "Montaż karniszy", "szt.", 30);
        addPosition("Prace murarskie", "Montaż listew wykończeniowych ościeżnic", "szt.", 70);

        addPosition("Prace przygotowawcze", "Wyburzanie ścian z cegły do grubości 20cm (z wyniesieniem gruzu)", "m²", 80);
        addPosition("Prace przygotowawcze", "Wycinanie otworów w ścianach cegła / bloczki", "m²", 120);
        addPosition("Prace przygotowawcze", "Wycinanie otworów w ścianach betonowych", "m²", 450);
        addPosition("Prace przygotowawcze", "Skuwanie starego tynku", "m²", 25);
        addPosition("Prace przygotowawcze", "Skuwanie wylewki do 5cm", "m²", 40);
        addPosition("Prace przygotowawcze", "Demontaż drzwi wewnętrznych z ościeżnicą stalową", "szt.", 80);
        addPosition("Prace przygotowawcze", "Demontaż drzwi wewnętrznych z ościeżnicą drewnianą", "szt.", 60);
        addPosition("Prace przygotowawcze", "Demontaż ościeżnicy drzwi zewnętrznych", "szt.", 90);
        addPosition("Prace przygotowawcze", "Demontaż wanny z zabudową z płytek", "szt.", 70);
        addPosition("Prace przygotowawcze", "Rozbiórka ścian z płyt gipsowych na stelażu", "m²", 10);
        addPosition("Prace przygotowawcze", "Wykucie bruzdy pod rury kanalizacyjne ø32 - ø50 w betonie z późniejszym zatarciem", "mb.", 70);
        addPosition("Prace przygotowawcze", "Zrywanie wykładzin, płytek PCV", "m²", 6);
        addPosition("Prace przygotowawcze", "Zrywanie parkietu, płytek PCV", "m²", 15);

        addPosition("Sufity podwieszane", "Montaż sufitów podwieszanych jednopoziomowych pełnych", "m²", 55);
        addPosition("Sufity podwieszane", "Montaż sufitów podwieszanych dwupoziomowych", "m²", 85);
        addPosition("Sufity podwieszane", "Montaż sufitów podwieszanych jednopoziomowych z odcięciem na taśmę led", "mb.", 70);
        addPosition("Sufity podwieszane", "Wykończenie sufitu po łuku", "mb.", 80);
        addPosition("Sufity podwieszane", "Wykończenie sufitu po łuku z podcięciem na taśmę led", "mb.", 160);
        addPosition("Sufity podwieszane", "Zabudowa narożna (gzyms) prosta", "mb.", 80);
        addPosition("Sufity podwieszane", "Zabudowa narożna (gzyms) prosta z odcięciem na taśmę led", "mb.", 120);
        addPosition("Sufity podwieszane", "Zabudowa narożna po łuku", "mb.", 150);
        addPosition("Sufity podwieszane", "Zabudowa narożna po łuku z odcięciem na taśmę led", "mb.", 180);
        addPosition("Sufity podwieszane", "Wnęka na schowanie karnisza", "mb.", 90);
        addPosition("Sufity podwieszane", "Wpust na taśmę LED", "mb.", 110);
        addPosition("Sufity podwieszane", "Zabudowa pionu kanalizacyjnego / rur centralnego ogrzewania", "mb.", 45);
        addPosition("Sufity podwieszane", "Docieplenie poddasza wełną mineralną wraz z montażem folii paroizolacyjnej", "m²", 10);
        addPosition("Sufity podwieszane", "Zabudowa poddasza - montaż jednej warstwy płyt gipsowych na stelażu", "m²", 60);
        addPosition("Sufity podwieszane", "Zabudowa poddasza - obudowa okna dachowego", "szt.", 200);
        addPosition("Sufity podwieszane", "Montaż podsufitowych listew sztukateryjnych z akrylowaniem i malowaniem", "mb.", 15);

        addPosition("Układanie płytek", "Skucie starych płytek", "m²", 16);
        addPosition("Układanie płytek", "Wyrównanie ścian zaprawą tynkarską do 2cm", "m²", 17);
        addPosition("Układanie płytek", "Układanie glazury, terakoty", "m²", 40);
        addPosition("Układanie płytek", "Układanie gresu", "m²", 55);
        addPosition("Układanie płytek", "Układanie płytek 10x10cm, 15x15cm", "m²", 79);
        addPosition("Układanie płytek", "Układanie płytek od 90x90cm", "m²", 79);
        addPosition("Układanie płytek", "Układanie mozaiki", "m²", 75);
        addPosition("Układanie płytek", "Układanie płytek w karo (format standardowy 40 x 40 cm)", "m²", 79);
        addPosition("Układanie płytek", "Montaż cokołów ciętych", "mb.", 25);
        addPosition("Układanie płytek", "Montaż cokołów gotowych", "mb.", 15);
        addPosition("Układanie płytek", "Obłożenie schodów płytkami", "mb.", 100);
        addPosition("Układanie płytek", "Montaż listew dekoracyjnych", "mb.", 25);
        addPosition("Układanie płytek", "Układanie kamienia dekoracyjnego / płytek imitujących cegły (bez fugowania)", "m²", 70);
        addPosition("Układanie płytek", "Układanie gresu", "m²", 55);
        addPosition("Układanie płytek", "Fugowanie kamienia dekoracyjnego / płytek imitujących cegły", "m²", 30);
        addPosition("Układanie płytek", "Ułożenie dekorów", "mb.", 17);
        addPosition("Układanie płytek", "Wykonanie obudowy wanny (prostej) z obłożeniem płytkami", "szt.", 350);
        addPosition("Układanie płytek", "Wykonanie obudowy wanny (prostej) z obłożeniem płytkami z wnęką na stopy", "szt.", 450);
        addPosition("Układanie płytek", "Wykonanie obudowy wanny (po łuku) z obłożeniem mozaiką", "szt.", 450);
        addPosition("Układanie płytek", "Podmurowanie brodzika z obudową płytkami", "szt.", 229);
        addPosition("Układanie płytek", "Wykonanie półki z obłożeniem płytkami", "mb.", 120);
        addPosition("Układanie płytek", "Wykonanie brodzika z płytek ze spadem i montażem odpływu liniowego", "szt.", 600);
        addPosition("Układanie płytek", "Wykonanie obudowy płytkami stelaża muszli wiszącej lub bidetu (wraz z zabudową GK)", "szt.", 260);
        addPosition("Układanie płytek", "Szlifowanie naroży do kąta 45°", "mb.", 39);
        addPosition("Układanie płytek", "Wycinanie otworów w płytkach z glazury / terakoty", "szt.", 15);
        addPosition("Układanie płytek", "Wycinanie otworów w płytkach gresowych", "szt.", 25);
        addPosition("Układanie płytek", "Montaż listew narożnych i brzegowych", "mb.", 13);
        addPosition("Układanie płytek", "Silikonowanie", "mb.", 5);

        addPosition("Układanie podłóg", "Przygotowanie (wyrównanie) podłoża ręczne", "m²", 12);
        addPosition("Układanie podłóg", "Wykonanie wylewki samopoziomującej do 1 cm", "m²", 18);
        addPosition("Układanie podłóg", "Wykonanie wylewki samopoziomującej od 1 - 3 cm", "m²", 25);
        addPosition("Układanie podłóg", "Montaż deski barlineckiej", "m²", 27);
        addPosition("Układanie podłóg", "Montaż laminowanych paneli podłogowych", "m²", 18);
        addPosition("Układanie podłóg", "Ułożenie legarów", "mb.", 7);
        addPosition("Układanie podłóg", "Układanie desek na legarach", "szt.", 32);
        addPosition("Układanie podłóg", "Montaż listew przypodłogowych", "mb.", 13);
        addPosition("Układanie podłóg", "Montaż listew progowych", "szt.", 20);

        addPosition("Usługi hydrauliczne", "Wykucie bruzdy pod rury wodne w cegle z późniejszym zatarciem", "mb.", 30);
        addPosition("Usługi hydrauliczne", "Wykucie bruzdy pod rury wodne w betonie z późniejszym zatarciem", "mb.", 50);
        addPosition("Usługi hydrauliczne", "Wykucie bruzdy pod rury kanalizacyjne ø32 - ø50 w cegle z późniejszym zatarciem", "mb.", 50);
        addPosition("Usługi hydrauliczne", "Montaż mieszacza i deszczownicy podtynkowej", "szt.", 240);
        addPosition("Usługi hydrauliczne", "Wykonanie / przesunięcie przyłącza do grzejnika", "szt.", 150);
        addPosition("Usługi hydrauliczne", "Montaż grzejnika", "szt.", 90);
        addPosition("Usługi hydrauliczne", "Wykonanie przyłącza wodnego i kanalizacyjnego do umywalki, wanny, brodzika, bidetu, pralki, WC", "szt.", 230);
        addPosition("Usługi hydrauliczne", "Przesunięcie przyłącza wodnego i kanalizacyjnego do umywalki, wanny, brodzika, bidetu, pralki, WC", "szt.", 150);
        addPosition("Usługi hydrauliczne", "Montaż odpływu liniowego w brodziku", "szt.", 180);
        addPosition("Usługi hydrauliczne", "Montaż baterii wannowej i słuchawki", "szt.", 75);
        addPosition("Usługi hydrauliczne", "Montaż baterii prysznicowej, słuchawki i deszczownicy natynkowej", "szt.", 120);
        addPosition("Usługi hydrauliczne", "Montaż baterii umywalkowej sztorcowej", "szt.", 40);
        addPosition("Usługi hydrauliczne", "Montaż baterii umywalkowej ściennej", "szt.", 50);
        addPosition("Usługi hydrauliczne", "Montaż zaworków do baterii umywalkowej lub pralki", "szt.", 20);
        addPosition("Usługi hydrauliczne", "Demontaż punktów hydraulicznych", "szt.", 35);
        addPosition("Usługi hydrauliczne", "Montaż instalacji ogrzewania podłogowego bez zalania rur wylewką", "m²", 180);

        addPosition("Wykończenie łazienki", "Montaż wanny bez zabudowy i płytek", "szt.", 140);
        addPosition("Wykończenie łazienki", "Montaż kabiny (drzwi uchylne)", "szt.", 150);
        addPosition("Wykończenie łazienki", "Montaż kabiny (drzwi przesówne)", "szt.", 185);
        addPosition("Wykończenie łazienki", "Montaż brodzika z kabiną", "szt.", 290);
        addPosition("Wykończenie łazienki", "Montaż brodzika bez kabiny", "szt.", 130);
        addPosition("Wykończenie łazienki", "Montaż umywalki", "szt.", 50);
        addPosition("Wykończenie łazienki", "Montaż stelaża podtynkowego typu Geberit bez zabudowy GK i płytek", "szt.", 120);
        addPosition("Wykończenie łazienki", "Montaż muszli wiszącej lub bidetu wiszącego", "szt.", 60);
        addPosition("Wykończenie łazienki", "Montaż kompaktu WC (muszli stojącej)", "szt.", 60);
        addPosition("Wykończenie łazienki", "Wklejenie lustra", "szt.", 33);
        addPosition("Wykończenie łazienki", "Montaż wieszaków, uchwytów, suszarki do ręczników", "szt.", 25);
        addPosition("Wykończenie łazienki", "Montaż szafek, lustra wiszącego", "szt.", 45);
        addPosition("Wykończenie łazienki", "Montaż drzwiczek rewizyjnych obudowanych płytką", "szt.", 55);
        addPosition("Wykończenie łazienki", "Montaż drzwiczek rewizyjnych bez płytki", "szt.", 25);
        addPosition("Wykończenie łazienki", "Montaż kratki wentylacyjnej", "szt.", 20);
        addPosition("Wykończenie łazienki", "Nałożenie hydroizolacji wałkiem na ścianach, podłodze", "m²", 20);
        addPosition("Wykończenie łazienki", "Wklejenie taśmy hydroizolacyjnej w narożnikach", "mb.", 10);
    } else console.log("Database is populated");
}

module.exports = {
    db: db,
    addPosition: addPosition,
    getPositions: getPositions,
    getSortedPositions: getSortedPositions,
    populatePositionsIfEmpty: populatePositionsIfEmpty,
    deletePosition: deletePosition,
    getDepartments: getDepartments,
    changePositionName: changePositionName,
    changePositionUnit: changePositionUnit,
    changePositionPrice: changePositionPrice,
    changePositionDepartment: changePositionDepartment,
    editWholePosition: editWholePosition
};

