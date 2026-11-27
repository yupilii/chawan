const db = require('./database');

db.serialize(() => {
    db.run(`PRAGMA foreign_keys = ON;`);

    db.run(`CREATE TABLE IF NOT EXISTS teas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sort_order INTEGER,
        name TEXT,
        country TEXT,
        description TEXT,
        image TEXT,
        link TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sort_order INTEGER,
        title TEXT,
        subtitle TEXT,
        description TEXT,
        duration TEXT,
        price TEXT,
        image TEXT,
        link TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        service_id INTEGER,
        date TEXT,
        name TEXT,
        phone TEXT,
        guests INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
    )`);

    db.get("SELECT COUNT(*) as count FROM teas", (err, row) => {
        if (row.count === 0) {
            const insert = `INSERT INTO teas (sort_order, name, country, description, image, link) VALUES (?, ?, ?, ?, ?, ?)`;
            
            db.run(insert, [1, "Матча «Удзи»", "Япония", "Бархатистая японская матча с мягкой сладостью и свежим зеленым вкусом", "/images/products/Image (8) 1.png", "/catalog/tea1.html"]);
            db.run(insert, [2, "Улун «Те Гуань Инь»", "Китай (провинция Фуцзянь)", "Китайский улун с цветочным ароматом и долгим сливочным послевкусием", "/images/products/Image (8) 1 (1).png", "/catalog/tea.html"]);
            db.run(insert, [3, "Зеленый чай «Нокча»", "Корея (остров Чеджу)", "Весенний корейский чай с травянистой свежестью и легкой терпкостью", "/images/products/Image (8) 1 (2).png", "/catalog/tea2.html"]);
            db.run(insert, [4, "Пуэр «Шу»", "Китай (провинция Юньнань)", "Землистый, глубокий вкус с нотами влажного дерева и сухофруктов", "/images/products/Image (8) 1 (3).png", "/catalog/tea3.html"]);
            db.run(insert, [5, "Сенча «Асакура»", "Япония", "Японский чай свежим ароматом и легкой морской ноткой", "/images/products/Image (8) 1 (4).png", "/catalog/tea4.html"]);
            db.run(insert, [6, "Да Хун Пао", "Китай (провинция Фуцзянь)", "Насыщенный, минеральный вкус с нотами печеного хлеба и какао", "/images/products/Image (8) 1 (5).png", "/catalog/tea5.html"]);
            db.run(insert, [7, "Белый чай «Бай Му Дань»", "Китай (провинция Фуцзянь)", "Нежный, цветочный и слегка сладкий. Состоит из почек и молодых листьев", "/images/products/Image (8) 1 (6).png", "/catalog/tea6.html"]);
            db.run(insert, [8, "Ходзича", "Япония", "Обладает теплым, ореховым и карамельным ароматом", "/images/products/Image (8) 1 (7).png", "/catalog/tea7.html"]);
            db.run(insert, [9, "Дун Дин", "Тайвань (Китай)", "Легкий, цветочный и сливочный вкус. Один из самых ароматных улунов в мире", "/images/products/Image (8) 1 (8).png", "/catalog/tea8.html"]);
        }
    });

    db.get("SELECT COUNT(*) as count FROM services", (err, row) => {
        if (row.count === 0) {
            const insert = `INSERT INTO services (sort_order, title, subtitle, description, duration, price, image, link) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            
            db.run(insert, [1, "Японская чайная церемония", "Путь Чая", "Медитативное чаепитие с церемониальной матчей. Мастер расскажет о философии дзен и покажет традиционные жесты", "1.5 часа", "2 500 ₽ / чел.", "/images/products/Rectangle 9.png", "/services/service1.html"]);
            db.run(insert, [2, "Китайская церемония Гунфу-ча", "Искусство заваривания", "Дегустация нескольких сортов улунов и пуэров. Узнаете, как раскрывать вкус чая с каждым проливом", "2 часа", "3 000 ₽ / чел.", "/images/products/Rectangle 9 (1).png", "/services/service.html"]);
            db.run(insert, [3, "Корейская чайная церемония", "Гармония и простота", "Знакомство с традициями Дадо. Весенний зеленый чай, традиционные сладости и атмосфера уюта", "1 час", "2 000 ₽ / чел.", "/images/products/Rectangle 9 (2).png", "/services/service2.html"]);
            db.run(insert, [4, "Дегустация «Чайный тур»", "Для настоящих гурманов", "Путешествие по трем странам за один вечер. Попробуете 6 сортов чая (по 2 из Японии, Китая и Кореи) в сопровождении сомелье", "2.5 часа", "4 500 ₽ / чел.", "/images/products/Rectangle 9 (3).png", "/services/service3.html"]);
        }
    });
});

console.log('База данных инициализирована');