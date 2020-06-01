const CITIES_URL =
    'https://ru.wikinews.org/w/index.php?title=%D0%9A%D0%B0%D1%82%D0%B5%D0%B3%D0%BE%D1%80%D0%B8%D1%8F:%D0%93%D0%BE%D1%80%D0%BE%D0%B4%D0%B0_%D0%BF%D0%BE_%D0%B0%D0%BB%D1%84%D0%B0%D0%B2%D0%B8%D1%82%D1%83'

describe('Crawler', () => {
    it('crawls cities', () => {
        const firstLetterCode = 'А'.charCodeAt(0)
        const lastLetterCode = 'Я'.charCodeAt(0)

        for (let i = firstLetterCode; i <= lastLetterCode; i++) {
            cy.visit(CITIES_URL, {
                qs: {
                    subcatfrom: String.fromCharCode(i),
                },
            })
                .get('.mw-category-group')
                .first()
                .within(() => {
                    cy.get('ul')
                        .find('a')
                        .then((cities) => {
                            cy.task('saveCitiesToMongo', {
                                id: String.fromCharCode(i),
                                cities: [...cities].map((city) => {
                                    return city.innerHTML
                                }),
                            })
                        })
                })
        }
    })
})
