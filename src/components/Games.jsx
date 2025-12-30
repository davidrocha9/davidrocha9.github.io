import './LetterboxdFeed.css';

const Games = () => {
    const games = [
        {
            title: 'The Witcher 3: Wild Hunt',
            year: '2015',
            link: 'https://thewitcher.com/en/witcher3',
            image: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg'
        },
        {
            title: 'Stardew Valley',
            year: '2016',
            link: 'https://www.stardewvalley.net/',
            image: 'https://upload.wikimedia.org/wikipedia/en/f/fd/Logo_of_Stardew_Valley.png'
        },

        {
            title: 'Red Dead Redemption 2',
            year: '2018',
            link: 'https://www.rockstargames.com/reddeadredemption2',
            image: 'https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg'
        },
        {
            title: 'Cyberpunk 2077',
            year: '2020',
            link: 'https://www.cyberpunk.net/',
            image: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg'
        },
        {
            title: 'The Last of Us Part I',
            year: '2013',
            link: 'https://www.playstation.com/en-us/games/the-last-of-us-part-i/',
            image: 'https://upload.wikimedia.org/wikipedia/en/8/86/The_Last_of_Us_Part_I_cover.jpg'
        },
        {
            title: 'The Last of Us Part II',
            year: '2020',
            link: 'https://www.playstation.com/en-us/games/the-last-of-us-part-ii/',
            image: 'https://upload.wikimedia.org/wikipedia/en/4/4f/TLOU_P2_Box_Art_2.png'
        },

        {
            title: 'FIFA 14',
            year: '2013',
            link: 'https://www.ea.com/games/fifa/fifa-14',
            image: 'https://upload.wikimedia.org/wikipedia/en/e/e3/FIFA_14.jpeg'
        },
        {
            title: 'FIFA 15',
            year: '2014',
            link: 'https://www.ea.com/games/fifa/fifa-15',
            image: 'https://upload.wikimedia.org/wikipedia/en/2/23/FIFA_15_Cover_Art.jpg'
        },
        {
            title: 'FIFA 20',
            year: '2019',
            link: 'https://www.ea.com/games/fifa/fifa-20',
            image: 'https://www.gamespot.com/a/uploads/original/1556/15568848/3565253-hazard.jpeg'
        },

        {
            title: 'Counter-Strike: Global Offensive',
            year: '2012',
            link: 'https://www.counter-strike.net/',
            image: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/CSGOcoverMarch2020.jpg/250px-CSGOcoverMarch2020.jpg'
        },
        {
            title: 'League of Legends',
            year: '2009',
            link: 'https://www.leagueoflegends.com/',
            image: 'https://i.pinimg.com/736x/20/54/b6/2054b617ac11f24e23d62e05f85303d4.jpg'
        },
        {
            title: 'Dead by Daylight',
            year: '2016',
            link: 'https://deadbydaylight.com/',
            image: 'https://store-images.s-microsoft.com/image/apps.16719.64366672042187759.733004ed-c696-44cf-98cc-30eddf2375a8.3dd6c96e-e0c3-4a0b-aeb0-810f815a6d37'
        },

        {
            title: 'Grand Theft Auto V',
            year: '2013',
            link: 'https://www.rockstargames.com/gta-v',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnhz1_T2eH2uaoadDVjiKNpIKUaBNu9MoVkw&s'
        },
        {
            title: 'Grand Theft Auto IV',
            year: '2008',
            link: 'https://www.rockstargames.com/gtaiv',
            image: 'https://upload.wikimedia.org/wikipedia/pt/9/91/Grand_Theft_Auto_IV_capa.png'
        },
        {
            title: 'Grand Theft Auto: San Andreas',
            year: '2004',
            link: 'https://www.rockstargames.com/sanandreas',
            image: 'https://upload.wikimedia.org/wikipedia/en/c/c4/GTASABOX.jpg'
        },

        {
            title: 'Fallout 4',
            year: '2015',
            link: 'https://fallout.bethesda.net/en/games/fallout-4',
            image: 'https://upload.wikimedia.org/wikipedia/pt/7/70/Fallout_4_cover_art.jpg'
        },
        {
            title: 'Portal 2',
            year: '2011',
            link: 'https://www.thinkwithportals.com/',
            image: 'https://upload.wikimedia.org/wikipedia/en/f/f9/Portal2cover.jpg'
        },
        {
            title: 'Portal',
            year: '2007',
            link: 'https://www.thinkwithportals.com/',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpAgLqGraJgUK7g5vkqjEvC8Xx-wX66qDo_A&s'
        },
        {
            title: 'Undertale',
            year: '2015',
            link: 'https://undertale.com/',
            image: 'https://i.kickstarter.com/assets/011/533/904/f58978f175eba8065d1b5afe4545876d_original.png?anim=false&fit=cover&gravity=auto&height=873&origin=ugc&q=92&v=1463684109&width=1552&sig=kzX%2B5jjdyHCsUy0u9j7uM%2FXJHOkl4YpVOcP%2BAD%2BJZ0U%3D'
        },
        {
            title: 'Far Cry 3',
            year: '2012',
            link: 'https://www.ubisoft.com/game/far-cry/far-cry-3',
            image: 'https://cdn.europosters.eu/image/750/13147.jpg'
        },
        {
            title: 'Dark Souls III',
            year: '2016',
            link: 'https://www.darksouls3.com/',
            image: 'https://upload.wikimedia.org/wikipedia/en/b/bb/Dark_souls_3_cover_art.jpg'
        },

        {
            title: 'The Walking Dead: Telltale Series',
            year: '2012',
            link: 'https://telltale.com/the-walking-dead/',
            image: 'https://upload.wikimedia.org/wikipedia/en/3/31/The_Walking_Dead%2C_Season_One_cover.jpeg'
        },
        {
            title: 'Life is Strange',
            year: '2015',
            link: 'https://lifeisstrange.square-enix-games.com/',
            image: 'https://upload.wikimedia.org/wikipedia/en/0/0d/Life_Is_Strange_cover_art.png'
        },

        {
            title: 'Wii Sports',
            year: '2006',
            link: 'https://www.nintendo.com/',
            image: 'https://upload.wikimedia.org/wikipedia/en/e/e0/Wii_Sports_Europe.jpg'
        },
        {
            title: 'Wii Sports Resort',
            year: '2009',
            link: 'https://www.nintendo.com/',
            image: 'https://upload.wikimedia.org/wikipedia/pt/2/20/Wii_Sports_Resort_cover.png?20101109183640'
        },
        {
            title: 'Wii Party',
            year: '2010',
            link: 'https://www.nintendo.com/',
            image: 'https://upload.wikimedia.org/wikipedia/pt/a/af/Wii_Party_cover.png'
        },

        {
            title: 'Mario & Sonic at the London 2012 Olympic Games',
            year: '2011',
            link: 'https://www.nintendo.com/',
            image: 'https://upload.wikimedia.org/wikipedia/en/0/05/Mario_and_Sonic_at_the_Olympic_Games_box_art.png'
        },
        {
            title: 'Mario Kart Wii',
            year: '2008',
            link: 'https://www.nintendo.com/',
            image: 'https://upload.wikimedia.org/wikipedia/en/d/d6/Mario_Kart_Wii.png'
        },
    ];


    const openGame = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="letterboxd-feed">
            <div className="letterboxd-header">
                <h2>🎮 Favorite Games</h2>
            </div>

            <div className="films-grid">
                {games.map((game, idx) => (
                    <div key={idx} className="film-card" onClick={() => openGame(game.link)} title={`${game.title} (${game.year})`}>
                        <div className="film-poster">
                            <img src={game.image} alt={game.title} loading="lazy" />
                        </div>
                        <div className="film-info">
                            <div className="film-title">{game.title}</div>
                            <div className="film-meta">
                                <span className="film-year">{game.year}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="letterboxd-footer">
                <button onClick={() => openGame('https://store.steampowered.com/')}>Browse on Steam ↗</button>
            </div>
        </div>
    );
};

export default Games;
