// Description: This file contains all the constants used in the extension.

// total domains supported by the extension (including amazon.com) - 21
const validDomains = {
  "www.amazon.com": "english", //  1
  "www.amazon.co.uk": "english", //  2
  "www.amazon.com.au": "english", //  3
  "www.amazon.ca": "canadian", //  4
  "www.amazon.es": "estonia", //  5
  "www.amazon.de": "germani", //  6
  "www.amazon.fr": "french", //  7
  "www.amazon.com.mx": "spanish", //  8
  "www.amazon.com.br": "portuguese", //  9
  "www.amazon.com.tr": "turkish", //  10
  "www.amazon.nl": "dutch", //  11
  "www.amazon.it": "italian", //  12
  "www.amazon.in": "english", //  13
  "www.amazon.sa": "arabic", //  14
  "www.amazon.ae": "english", //  15
  "www.amazon.co.jp": "english", //  16
  "www.amazon.au": "english", //  17
  "www.amazon.sg": "english", //  18
  "www.amazon.pl": "polish", //  19
  "www.amazon.se": "swedish", //  20
};

const currencyDelimiter = {
  "www.amazon.com": ".", //  1
  "www.amazon.co.uk": ".", //  2
  "www.amazon.com.au": ".", //  3
  "www.amazon.ca": ".", //  4
  "www.amazon.es": ",", //  5
  "www.amazon.de": ",", //  6
  "www.amazon.fr": ",", //  7
  "www.amazon.com.mx": ".", //  8
  "www.amazon.com.br": ",", //  9
  "www.amazon.com.tr": ",", //  10
  "www.amazon.nl": ".", //  11
  "www.amazon.it": ",", //  12
  "www.amazon.in": ".", //  13
  "www.amazon.sa": ".", //  14
  "www.amazon.ae": ".", //  15
  "www.amazon.co.jp": ".", //  16
  "www.amazon.au": ".", //  17
  "www.amazon.sg": ".", //  18
  "www.amazon.pl": ",", //  19
  "www.amazon.se": ",", //  20
};

const MID_BY_HOST = {
  "amazon.com": "ATVPDKIKX0DER",
  "amazon.com.au": "A39IBJ37TRP1C6",
  "amazon.com.mx": "A1AM78C64UM0Y8",
  "amazon.com.br": "A2Q3Y263D00KWC",
  "amazon.com.tr": "A33AVAJ2PDY3EV",
  "amazon.co.uk": "A1F83G8C2ARO7P",
  "amazon.de": "A1PA6795UKMFR9",
  "amazon.fr": "A13V1IB3VIYZZH",
  "amazon.it": "APJ6JRA9NG5V4",
  "amazon.es": "A1RKKUPIHCS9HS",
  "amazon.co.jp": "A1VC38T7YXB528",
  "amazon.ca": "A2EUQ1WTGCTBG2",
  "amazon.cn": "AAHKV2X7AFYLW",
  "amazon.in": "A21TJRUUN4KGV",
  "amazon.nl": "A1805IZSGTT6HS",
  "amazon.ae": "A2VIGQ35RCS4UG",
  "amazon.sg": "A19VAU5U5O7RUS",
  "amazon.sa": "A17E79C6D8DWNP",
  "amazon.se": "A2NODRKZP88ZB9",
  "amazon.pl": "A1C3SOZRARQ6R3",
};

const selectors = {
  title: {
    english: "#productTitle",
    canadian: "#productTitle",
    estonia: "#productTitle",
    italian: "#productTitle",
    germani: "#productTitle",
    french: "#productTitle",
    spanish: "#productTitle",
    portuguese: "#productTitle",
    turkish: "#productTitle",
    dutch: "#productTitle",
    arabic: "#productTitle",
    polish: "#productTitle",
    swedish: "#productTitle",
  },
  itemWeight: {
    english: {
      list: "#detailBulletsWrapper_feature_div span:contains('Item Weight')",
      table: "#productDetails_feature_div th:contains('Item Weight')",
    },
    canadian: {
      list: "#detailBulletsWrapper_feature_div span:contains('Item Weight')",
      table: "#productDetails_feature_div th:contains('Item Weight')",
    },
    estonia: {
      list: "#detailBulletsWrapper_feature_div span:contains('Peso del producto')",
      table: "#productDetails_feature_div th:contains('Peso del producto')",
    },
    italian: {
      list: "#detailBulletsWrapper_feature_div span:contains('Peso articolo')",
      table: "#productDetails_feature_div th:contains('Peso articolo')",
    },
    germani: {
      list: "#detailBulletsWrapper_feature_div span:contains('Artikelgewicht')",
      table: "#productDetails_feature_div th:contains('Artikelgewicht')",
    },
    french: {
      list: "#detailBulletsWrapper_feature_div span:contains('Poids de l'article')",
      table: "#productDetails_feature_div th:contains('Poids de l'article')",
    },
    spanish: {
      list: "#detailBulletsWrapper_feature_div span:contains('Peso del artículo')",
      table: "#productDetails_feature_div th:contains('Peso del artículo')",
    },
    portuguese: {
      list: "#detailBulletsWrapper_feature_div span:contains('Peso do Item')",
      table: "#productDetails_feature_div th:contains('Peso do Item')",
    },
    turkish: {
      list: "#detailBulletsWrapper_feature_div span:contains('Ürün Ağırlığı')",
      table: "#productDetails_feature_div th:contains('Ürün Ağırlığı')",
    },
    dutch: {
      list: "#detailBulletsWrapper_feature_div span:contains('product gewicht')",
      table: "#productDetails_feature_div th:contains('product gewicht')",
    },
    arabic: {
      list: "#detailBulletsWrapper_feature_div span:contains('وزن السلعة')",
      table: "#productDetails_feature_div th:contains('وزن السلعة')",
    },
    polish: {
      list: "#detailBulletsWrapper_feature_div span:contains('waga przedmiotu')",
      table: "#productDetails_feature_div th:contains('waga przedmiotu')",
    },
    swedish: {
      list: "#detailBulletsWrapper_feature_div span:contains('Artikelvikt')",
      table: "#productDetails_feature_div th:contains('Artikelvikt')",
    },
  },
  bsr: {
    english: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Best-sellers rank')",
        "#detailBulletsWrapper_feature_div span:contains('Amazon Bestseller')",
        "#detailBulletsWrapper_feature_div span:contains('Best Sellers Rank')",
        "#productDetails_detailBullets_sections1 span:contains('Best Sellers Rank')",
        "#SalesRank",
      ],
      table: [
        "#productDetails_feature_div th:contains('Best-sellers rank')",
        "#productDetails_feature_div th:contains('Best Sellers Rank')",
        "#prodDetails th:contains('Best Sellers Rank')",
        "#productDetails_detailBullets_sections1 th:contains('Best Sellers Rank')",
        "#audibleProductDetails th:contains('Best Sellers Rank')",
      ],
    },
    canadian: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Bestsellers rank')",
        "#detailBulletsWrapper_feature_div span:contains('Best Sellers Rank')",
        "#productDetails_detailBullets_sections1 span:contains('Best Sellers Rank')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Bestsellers rank')",
        "#productDetails_feature_div th:contains('Best Sellers Rank')",
        "#prodDetails th:contains('Best Sellers Rank')",
        "#audibleProductDetails th:contains('Best Sellers Rank')",
        "#productDetails_detailBullets_sections1 th:contains('Best Sellers Rank')",
      ],
    },
    estonia: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('éxitos de ventas')",
        "#productDetails_detailBullets_sections1 span:contains('éxitos de ventas')",
        "#detailBulletsWrapper_feature_div span:contains('Clasificación en los más vendidos')",
        "#productDetails_detailBullets_sections1 span:contains('Clasificación en los más vendidos')",
      ],
      table: [
        "#productDetails_feature_div th:contains('éxitos de ventas')",
        "#productDetails_detailBullets_sections1 th:contains('éxitos de ventas')",
        "#productDetails_feature_div th:contains('Clasificación en los más vendidos')",
        "#productDetails_detailBullets_sections1 th:contains('Clasificación en los más vendidos')",
        "#prodDetails th:contains('Clasificación en los más vendidos')",
        "#audibleProductDetails th:contains('Clasificación en los más vendidos')",
      ],
    },
    italian: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Posizione nella classifica Bestseller di Amazon')",
        "#detailBulletsWrapper_feature_div span:contains('best-seller')",
        "#productDetails_detailBullets_sections1 span:contains('best-seller')",
        "#detailBulletsWrapper_feature_div span:contains('classifica Bestseller')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Posizione nella classifica Bestseller di Amazon')",
        "#productDetails_feature_div th:contains('classifica Bestseller')",
        "#productDetails_detailBullets_sections1 th:contains('classifica Bestseller')",
        "#prodDetails th:contains('classifica Bestseller')",
        "#audibleProductDetails th:contains('classifica Bestseller')",
      ],
    },
    germani: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Best Sellers Rank')",
        "#productDetails_detailBullets_sections1 span:contains('Best Sellers Rank')",
        "#detailBulletsWrapper_feature_div span:contains('Bestseller-Rang')",
        "#productDetails_detailBullets_sections1 span:contains('Bestseller-Rang')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Best Sellers Rank')",
        "#productDetails_detailBullets_sections1 th:contains('Best Sellers Rank')",
        "#prodDetails th:contains('Best Sellers Rank')",
        "#productDetails_feature_div th:contains('Bestseller-Rang')",
        "#prodDetails th:contains('Bestseller-Rang')",
        "#audibleProductDetails th:contains('Bestseller-Rang')",
      ],
    },
    french: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Classement des meilleures')",
        "#productDetails_detailBullets_sections1 span:contains('Classement des meilleures')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Classement des meilleures')",
        "#productDetails_detailBullets_sections1 th:contains('Classement des meilleures')",
        "#prodDetails th:contains('Classement des meilleures')",
        "#audibleProductDetails th:contains('Classement des meilleures')",
      ],
    },
    spanish: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Clasificación en los más vendidos de Amazon')",
        "#productDetails_detailBullets_sections1 span:contains('Clasificación en los más vendidos de Amazon')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Clasificación en los más vendidos de Amazon')",
        "#prodDetails th:contains('Clasificación en los más vendidos de Amazon')",
        "#audibleProductDetails th:contains('Clasificación en los más vendidos de Amazon')",
        "#productDetails_detailBullets_sections1 th:contains('Clasificación en los más vendidos de Amazon')",
      ],
    },
    portuguese: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Ranking dos mais vendidos')",
        "#productDetails_detailBullets_sections1 span:contains('Ranking dos mais vendidos')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Ranking dos mais vendidos')",
        "#prodDetails th:contains('Ranking dos mais vendidos')",
        "#audibleProductDetails th:contains('Ranking dos mais vendidos')",
        "#productDetails_detailBullets_sections1 th:contains('Ranking dos mais vendidos')",
      ],
    },
    turkish: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('En Çok Satanlar Sıralaması')",
        "#detailBulletsWrapper_feature_div span:contains('En çok satanlar sıralaması')",
        "#productDetails_detailBullets_sections1 span:contains('En Çok Satanlar Sıralaması')",
        "#productDetails_detailBullets_sections1 span:contains('En çok satanlar sıralaması')",
        "#SalesRank",
      ],
      table: [
        "#productDetails_feature_div th:contains('En Çok Satanlar Sıralaması')",
        "#productDetails_feature_div th:contains('En çok satanlar sıralaması')",
        "#prodDetails th:contains('En Çok Satanlar Sıralaması')",
        "#prodDetails th:contains('En çok satanlar sıralaması')",
        "#productDetails_detailBullets_sections1 th:contains('En Çok Satanlar Sıralaması')",
        "#productDetails_detailBullets_sections1 th:contains('En çok satanlar sıralaması')",
        "#audibleProductDetails th:contains('En Çok Satanlar Sıralaması')",
        "#audibleProductDetails th:contains('En çok satanlar sıralaması')",
      ],
    },
    dutch: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Best Sellers Rank')",
        "#detailBulletsWrapper_feature_div span:contains('Plaats in bestsellerlijst')",
        "#productDetails_detailBullets_sections1 span:contains('Plaats in bestsellerlijst')",
        "#SalesRank",
      ],
      table: [
        "#productDetails_feature_div th:contains('Plaats in bestsellerlijst')",
        "#prodDetails th:contains('Plaats in bestsellerlijst')",
        "#audibleProductDetails th:contains('Plaats in bestsellerlijst')",
        "#productDetails_detailBullets_sections1 th:contains('Plaats in bestsellerlijst')",
      ],
    },
    arabic: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains(' تصنيف الأفضل مبيعاً')",
        "#detailBulletsWrapper_feature_div span:contains(' تصنيف الأفضل مبيعاً')",
        "#SalesRank",
        "#productDetails_detailBullets_sections1 span:contains(' تصنيف الأفضل مبيعاً')",
      ],
      table: [
        "#productDetails_feature_div th:contains(' تصنيف الأفضل مبيعاً')",
        "#prodDetails th:contains(' تصنيف الأفضل مبيعاً')",
        "#audibleProductDetails th:contains(' تصنيف الأفضل مبيعاً')",
        "#productDetails_detailBullets_sections1 th:contains(' تصنيف الأفضل مبيعاً')",
      ],
    },
    polish: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Ranking najlepiej sprzedających się produktów')",
        "#productDetails_detailBullets_sections1 span:contains('Ranking najlepiej sprzedających się produktów')",
        "#SalesRank",
      ],
      table: [
        "#productDetails_feature_div th:contains('Ranking najlepiej sprzedających się produktów')",
        "#prodDetails th:contains('Ranking najlepiej sprzedających się produktów')",
        "#productDetails_detailBullets_sections1 th:contains('Ranking najlepiej sprzedających się produktów')",
        "#audibleProductDetails th:contains('Ranking najlepiej sprzedających się produktów')",
      ],
    },
    swedish: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Bästsäljar-rankning')",
        "#detailBulletsWrapper_feature_div span:contains('Rangordning för bästsäljare')",
        "#productDetails_detailBullets_sections1 span:contains('Bästsäljar-rankning')",
        "#SalesRank",
      ],
      table: [
        "#productDetails_feature_div th:contains('Bästsäljar-rankning')",
        "#prodDetails th:contains('Bästsäljar-rankning')",
        "#productDetails_detailBullets_sections1 th:contains('Bästsäljar-rankning')",
        "#audibleProductDetails th:contains('Bästsäljar-rankning')",
      ],
    },
  },
  bsrHTML: {
    english: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Best-sellers rank')",
        "#detailBulletsWrapper_feature_div span:contains('Best-sellers rank') ul",
        "#detailBulletsWrapper_feature_div span:contains('Best Sellers Rank')",
        "#detailBulletsWrapper_feature_div span:contains('Best Sellers Rank') ul",
        "#productDetails_detailBullets_sections1 span:contains('Best Sellers Rank')",
        "#productDetails_detailBullets_sections1 span:contains('Best Sellers Rank') ul",
      ],
      table: [
        "#productDetails_feature_div th:contains('Best-sellers rank') ul",
        "#productDetails_feature_div th:contains('Best Sellers Rank')",
        "#productDetails_detailBullets_sections1 th:contains('Best Sellers Rank')",
        "#audibleProductDetails th:contains('Best Sellers Rank')",
        "#productDetails_detailBullets_sections1 th:contains('Best Sellers Rank')",
      ],
    },
    canadian: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Bestsellers rank')",
        "#detailBulletsWrapper_feature_div span:contains('Bestsellers rank') ul",
        "#detailBulletsWrapper_feature_div span:contains('Best Sellers Rank')",
        "#detailBulletsWrapper_feature_div span:contains('Best Sellers Rank') ul",
        "#productDetails_detailBullets_sections1 span:contains('Best Sellers Rank')",
        "#productDetails_detailBullets_sections1 span:contains('Best Sellers Rank') ul",
      ],
      table: [
        "#productDetails_feature_div th:contains('Bestsellers rank') ul",
        "#productDetails_feature_div th:contains('Best Sellers Rank')",
        "#productDetails_detailBullets_sections1 th:contains('Best Sellers Rank')",
        "#audibleProductDetails th:contains('Best Sellers Rank')",
        "#productDetails_detailBullets_sections1 th:contains('Best Sellers Rank')",
      ],
    },
    estonia: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Clasificación en los más vendidos de Amazon')",
        "#detailBulletsWrapper_feature_div span:contains('Clasificación en los más vendidos de Amazon') ul",
        "#detailBulletsWrapper_feature_div span:contains('éxitos de ventas') ul",
        "#detailBulletsWrapper_feature_div span:contains('éxitos de ventas')",
        "#productDetails_detailBullets_sections1 span:contains('éxitos de ventas')",
        "#audibleProductDetails span:contains('éxitos de ventas')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Clasificación en los más vendidos de Amazon')",
        "#prodDetails th:contains('Clasificación en los más vendidos de Amazon')",
        "#productDetails_feature_div th:contains('éxitos de ventas')",
        "#productDetails_detailBullets_sections1 th:contains('éxitos de ventas')",
        "#audibleProductDetails th:contains('éxitos de ventas')",
      ],
    },
    italian: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('best-seller')",
        "#detailBulletsWrapper_feature_div span:contains('best-seller') ul",
        "#productDetails_detailBullets_sections1 span:contains('best-seller')",
        "#detailBulletsWrapper_feature_div span:contains('classifica Bestseller')",
        "#detailBulletsWrapper_feature_div span:contains('classifica Bestseller') ul",
        "#productDetails_detailBullets_sections1 span:contains('classifica Bestseller')",
      ],
      table: [
        "#productDetails_feature_div th:contains('classifica Bestseller')",
        "#productDetails_detailBullets_sections1 th:contains('classifica Bestseller')",
        "#audibleProductDetails th:contains('classifica Bestseller')",
      ],
    },
    germani: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Bestseller-Rang')",
        "#detailBulletsWrapper_feature_div span:contains('Bestseller-Rang') ul",
        "#productDetails_detailBullets_sections1 span:contains('Bestseller-Rang')",
        "#productDetails_detailBullets_sections1 span:contains('Bestseller-Rang') ul",
        "#detailBulletsWrapper_feature_div span:contains('Best Sellers Rank')",
        "#detailBulletsWrapper_feature_div span:contains('Best Sellers Rank') ul",
        "#productDetails_detailBullets_sections1 span:contains('Best Sellers Rank')",
        "#productDetails_detailBullets_sections1 span:contains('Best Sellers Rank') ul",
      ],
      table: [
        "#productDetails_feature_div th:contains('Bestseller-Rang')",
        "#productDetails_feature_div th:contains('Bestseller-Rang')",
        "#productDetails_detailBullets_sections1 th:contains('Bestseller-Rang')",
        "#audibleProductDetails th:contains('Bestseller-Rang')",
      ],
    },
    french: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Classement des meilleures')",
        "#detailBulletsWrapper_feature_div span:contains('Classement des meilleures') ul",
        "#productDetails_detailBullets_sections1 span:contains('Classement des meilleures')",
        "#productDetails_detailBullets_sections1 span:contains('Classement des meilleures') ul",
      ],
      table: [
        "#productDetails_feature_div th:contains('Classement des meilleures')",
        "#prodDetails th:contains('Classement des meilleures')",
        "#productDetails_detailBullets_sections1 th:contains('Classement des meilleures')",
        "#audibleProductDetails th:contains('Classement des meilleures')",
        "#productDetails_detailBullets_sections1 th:contains('Classement des meilleures')",
        "#productDetails_detailBullets_sections1 th:contains('Classement des meilleures') ul",
      ],
    },
    spanish: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Clasificación en los más vendidos de Amazon')",
        "#detailBulletsWrapper_feature_div span:contains('Clasificación en los más vendidos de Amazon') ul",
        "#productDetails_detailBullets_sections1 span:contains('Clasificación en los más vendidos de Amazon')",
        "#productDetails_detailBullets_sections1 span:contains('Clasificación en los más vendidos de Amazon') ul",
        "#detailBulletsWrapper_feature_div span:contains('Clasificación de los más vendidos')",
        "#detailBulletsWrapper_feature_div span:contains('Clasificación de los más vendidos') ul",
        "#productDetails_detailBullets_sections1 span:contains('Clasificación de los más vendidos')",
        "#audibleProductDetails span:contains('Clasificación de los más vendidos')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Clasificación en los más vendidos de Amazon')",
        "#prodDetails th:contains('Clasificación en los más vendidos de Amazon')",
        "#productDetails_feature_div th:contains('Clasificación de los más vendidos')",
        "#prodDetails th:contains('Clasificación de los más vendidos')",
        "#productDetails_detailBullets_sections1 th:contains('Clasificación de los más vendidos')",
        "#audibleProductDetails th:contains('Clasificación de los más vendidos')",

        "#productDetails_detailBullets_sections1 th:contains('Clasificación en los más vendidos de Amazon')",
      ],
    },
    portuguese: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Ranking dos mais vendidos')",
        "#detailBulletsWrapper_feature_div span:contains('Classificação dos mais vendidos')",
        "#productDetails_detailBullets_sections1 span:contains('Classificação dos mais vendidos')",
        "#detailBulletsWrapper_feature_div span:contains('Classificação dos mais vendidos') ul",
        "#productDetails_detailBullets_sections1 span:contains('Classificação dos mais vendidos') ul",
      ],
      table: [
        // Ranking dos mais vendidos
        "#detailBulletsWrapper_feature_div span:contains('Ranking dos mais vendidos')",
        "#productDetails_feature_div th:contains('Classificação dos mais vendidos')",
        "#productDetails_detailBullets_sections1 th:contains('Classificação dos mais vendidos')",
        "#prodDetails th:contains('Classificação dos mais vendidos')",
        "#productDetails_detailBullets_sections1 th:contains('Classificação dos mais vendidos')",
        "#audibleProductDetails th:contains('Classificação dos mais vendidos')",
      ],
    },
    turkish: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('En Çok Satanlar Sıralaması')",
        "#detailBulletsWrapper_feature_div span:contains('En çok satanlar sıralaması')",
        "#productDetails_detailBullets_sections1 span:contains('En Çok Satanlar Sıralaması')",
        "#productDetails_detailBullets_sections1 span:contains('En çok satanlar sıralaması')",
        "#detailBulletsWrapper_feature_div span:contains('En Çok Satanlar Sıralaması') ul",
        "#detailBulletsWrapper_feature_div span:contains('En çok satanlar sıralaması') ul",
        "#productDetails_detailBullets_sections1 span:contains('En Çok Satanlar Sıralaması') ul",
        "#productDetails_detailBullets_sections1 span:contains('En çok satanlar sıralaması') ul",
      ],
      table: [
        "#productDetails_feature_div th:contains('En Çok Satanlar Sıralaması')",
        "#productDetails_feature_div th:contains('En çok satanlar sıralaması')",
        "#productDetails_feature_div th:contains('En Çok Satanlar Sıralaması') ul",
        "#productDetails_feature_div th:contains('En çok satanlar sıralaması') ul",
        "#productDetails_detailBullets_sections1 th:contains('En Çok Satanlar Sıralaması')",
        "#productDetails_detailBullets_sections1 th:contains('En çok satanlar sıralaması')",
        "#audibleProductDetails th:contains('En Çok Satanlar Sıralaması')",
        "#audibleProductDetails th:contains('En çok satanlar sıralaması')",
      ],
    },
    dutch: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Best Sellers Rank')",
        "#detailBulletsWrapper_feature_div span:contains('Best Sellers Rank') ul",
        "#productDetails_detailBullets_sections1 span:contains('Best Sellers Rank')",
        "#productDetails_detailBullets_sections1 span:contains('Best Sellers Rank') ul",
        "#detailBulletsWrapper_feature_div span:contains('Plaats in bestsellerlijst')",
        "#productDetails_detailBullets_sections1 span:contains('Plaats in bestsellerlijst')",
        "#detailBulletsWrapper_feature_div span:contains('Plaats in bestsellerlijst') ul",
        "#productDetails_detailBullets_sections1 span:contains('Plaats in bestsellerlijst') ul",
        "#detailBulletsWrapper_feature_div span:contains('Bestsellers gerangschikt')",
        "#productDetails_detailBullets_sections1 span:contains('Bestsellers gerangschikt')",
        "#detailBulletsWrapper_feature_div span:contains('Bestsellers gerangschikt') ul",
        "#productDetails_detailBullets_sections1 span:contains('Bestsellers gerangschikt') ul",
      ],
      table: [
        "#productDetails_feature_div th:contains('Plaats in bestsellerlijst') ul",
        "#productDetails_feature_div th:contains('Plaats in bestsellerlijst')",
        "#productDetails_detailBullets_sections1 th:contains('Plaats in bestsellerlijst')",
        "#audibleProductDetails th:contains('Plaats in bestsellerlijst')",
        "#productDetails_feature_div th:contains('Bestsellers gerangschikt') ul",
        "#productDetails_feature_div th:contains('Bestsellers gerangschikt')",
        "#productDetails_detailBullets_sections1 th:contains('Bestsellers gerangschikt')",
        "#audibleProductDetails th:contains('Bestsellers gerangschikt')",
      ],
    },
    arabic: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('المرتبة الأكثر مبيعًا')",
        "#detailBulletsWrapper_feature_div span:contains('المرتبة الأكثر مبيعًا') ul",
      ],
      table: [
        "#productDetails_feature_div th:contains('المرتبة الأكثر مبيعًا') ul",
        "#productDetails_feature_div th:contains('المرتبة الأكثر مبيعًا')",
        "#productDetails_detailBullets_sections1 th:contains('المرتبة الأكثر مبيعًا')",
        "#audibleProductDetails th:contains('المرتبة الأكثر مبيعًا')",
      ],
    },
    polish: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Ranking najlepiej sprzedających się produktów')",
        "#productDetails_detailBullets_sections1 span:contains('Ranking najlepiej sprzedających się produktów')",
        "#detailBulletsWrapper_feature_div span:contains('Ranking najlepiej sprzedających się produktów') ul",
        "#productDetails_detailBullets_sections1 span:contains('Ranking najlepiej sprzedających się produktów') ul",
        "#detailBulletsWrapper_feature_div span:contains('Ranking bestsellerów')",
        "#productDetails_detailBullets_sections1 span:contains('Ranking bestsellerów')",
        "#detailBulletsWrapper_feature_div span:contains('Ranking bestsellerów') ul",
        "#productDetails_detailBullets_sections1 span:contains('Ranking bestsellerów') ul",
      ],
      table: [
        "#productDetails_feature_div th:contains('Ranking najlepiej sprzedających się produktów') ul",
        "#productDetails_detailBullets_sections1 th:contains('Ranking najlepiej sprzedających się produktów')",
        "#productDetails_feature_div th:contains('Ranking najlepiej sprzedających się produktów')",
        "#productDetails_feature_div th:contains('Ranking bestsellerów') ul",
        "#productDetails_feature_div th:contains('Ranking bestsellerów')",
        "#productDetails_detailBullets_sections1 th:contains('Ranking bestsellerów')",
        "#audibleProductDetails th:contains('Ranking bestsellerów')",
      ],
    },
    swedish: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Rangordning för bästsäljare')",
        "#detailBulletsWrapper_feature_div span:contains('Rangordning för bästsäljare') ul",
        "#detailBulletsWrapper_feature_div span:contains('Bästsäljar-rankning')",
        "#detailBulletsWrapper_feature_div span:contains('Bästsäljar-rankning') ul",
        "#productDetails_detailBullets_sections1 span:contains('Bästsäljar-rankning')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Rangordning för bästsäljare') ul",
        "#productDetails_feature_div th:contains('Rangordning för bästsäljare')",
        "#productDetails_feature_div th:contains('Bästsäljar-rankning') ul",
        "#productDetails_feature_div th:contains('Bästsäljar-rankning')",
        "#productDetails_detailBullets_sections1 th:contains('Bästsäljar-rankning')",
        "#audibleProductDetails th:contains('Bästsäljar-rankning')",
        "#productDetails_detailBullets_sections1 th:contains('Bästsäljar-rankning')",
      ],
    },
  },
  paperback: {
    english: {
      list: "#detailBulletsWrapper_feature_div span:contains('Paperback')",
      table: "#productDetails_feature_div th:contains('Paperback')",
    },
    canadian: {
      list: "#detailBulletsWrapper_feature_div span:contains('Paperback')",
      table: "#productDetails_feature_div th:contains('Paperback')",
    },
    estonia: {
      list: "#detailBulletsWrapper_feature_div span:contains('Tapa blanda')",
      table: "#productDetails_feature_div th:contains('Tapa blanda')",
    },
    italian: {
      list: "#detailBulletsWrapper_feature_div span:contains('Copertina flessibile')",
      table: "#productDetails_feature_div th:contains('Copertina flessibile')",
    },
    germani: {
      list: "#detailBulletsWrapper_feature_div span:contains('Paperback')",
      table: "#productDetails_feature_div th:contains('Paperback')",
    },
    french: {
      list: "#detailBulletsWrapper_feature_div span:contains('Broché')",
      table: "#productDetails_feature_div th:contains('Broché')",
    },
    spanish: {
      list: "#detailBulletsWrapper_feature_div span:contains('Pasta dura')",
      table: "#productDetails_feature_div th:contains('Pasta dura')",
    },
    portuguese: {
      list: "#detailBulletsWrapper_feature_div span:contains('Livro cartonado')",
      table: "#productDetails_feature_div th:contains('Livro cartonado')",
    },
    turkish: {
      list: "#detailBulletsWrapper_feature_div span:contains('Karton Kitap')",
      table: "#productDetails_feature_div th:contains('Karton Kitap')",
    },
    dutch: {
      list: "#detailBulletsWrapper_feature_div span:contains('Board book')",
      table: "#productDetails_feature_div th:contains('Board book')",
    },
    arabic: {
      list: "#detailBulletsWrapper_feature_div span:contains('غلاف ورقي')",
      table: "#productDetails_feature_div th:contains('غلاف ورقي')",
    },
    polish: {
      list: "#detailBulletsWrapper_feature_div span:contains('Miękka oprawa')",
      table: "#productDetails_feature_div th:contains('Miękka oprawa')",
    },
    swedish: {
      list: "#detailBulletsWrapper_feature_div span:contains('Pocketbok')",
      table: "#productDetails_feature_div th:contains('Pocketbok')",
    },
  },
  isbn10: {
    english: {
      list: "#detailBulletsWrapper_feature_div span:contains('ISBN-10')",
      table: "#productDetails_feature_div th:contains('ISBN-10')",
    },
    canadian: {
      list: "#detailBulletsWrapper_feature_div span:contains('ISBN-10')",
      table: "#productDetails_feature_div th:contains('ISBN-10')",
    },
    estonia: {
      list: "#detailBulletsWrapper_feature_div span:contains('ISBN-10')",
      table: "#productDetails_feature_div th:contains('ISBN-10')",
    },
    italian: {
      list: "#detailBulletsWrapper_feature_div span:contains('ISBN-10')",
      table: "#productDetails_feature_div th:contains('ISBN-10')",
    },
    germani: {
      list: "#detailBulletsWrapper_feature_div span:contains('ISBN-10')",
      table: "#productDetails_feature_div th:contains('ISBN-10')",
    },
    french: {
      list: "#detailBulletsWrapper_feature_div span:contains('ISBN-10')",
      table: "#productDetails_feature_div th:contains('ISBN-10')",
    },
    spanish: {
      list: "#detailBulletsWrapper_feature_div span:contains('ISBN-10')",
      table: "#productDetails_feature_div th:contains('ISBN-10')",
    },
    portuguese: {
      list: "#detailBulletsWrapper_feature_div span:contains('ISBN-10')",
      table: "#productDetails_feature_div th:contains('ISBN-10')",
    },
    turkish: {
      list: "#detailBulletsWrapper_feature_div span:contains('ISBN-10')",
      table: "#productDetails_feature_div th:contains('ISBN-10')",
    },
    dutch: {
      list: "#detailBulletsWrapper_feature_div span:contains('ISBN-10')",
      table: "#productDetails_feature_div th:contains('ISBN-10')",
    },
    arabic: {
      list: "#detailBulletsWrapper_feature_div span:contains('ISBN-10')",
      table: "#productDetails_feature_div th:contains('ISBN-10')",
    },
    polish: {
      list: "#detailBulletsWrapper_feature_div span:contains('ISBN-10')",
      table: "#productDetails_feature_div th:contains('ISBN-10')",
    },
    swedish: {
      list: "#detailBulletsWrapper_feature_div span:contains('ISBN-10')",
      table: "#productDetails_feature_div th:contains('ISBN-10')",
    },
  },
  asin: {
    english: {
      list: "#detailBulletsWrapper_feature_div span:contains('ASIN')",
      table: [
        "#productDetails_feature_div th:contains('ASIN')",
        "#prodDetails th:contains('ASIN')",
      ],
    },
    canadian: {
      list: "#detailBulletsWrapper_feature_div span:contains('ASIN')",
      table: [
        "#productDetails_feature_div th:contains('ASIN')",
        "#prodDetails th:contains('ASIN')",
      ],
    },
    estonia: {
      list: "#detailBulletsWrapper_feature_div span:contains('ASIN')",
      table: [
        "#productDetails_feature_div th:contains('ASIN')",
        "#prodDetails th:contains('ASIN')",
      ],
    },
    italian: {
      list: "#detailBulletsWrapper_feature_div span:contains('ASIN')",
      table: [
        "#productDetails_feature_div th:contains('ASIN')",
        "#prodDetails th:contains('ASIN')",
      ],
    },
    germani: {
      list: "#detailBulletsWrapper_feature_div span:contains('ASIN')",
      table: [
        "#productDetails_feature_div th:contains('ASIN')",
        "#prodDetails th:contains('ASIN')",
      ],
    },
    french: {
      list: "#detailBulletsWrapper_feature_div span:contains('ASIN')",
      table: [
        "#productDetails_feature_div th:contains('ASIN')",
        "#prodDetails th:contains('ASIN')",
      ],
    },
    spanish: {
      list: "#detailBulletsWrapper_feature_div span:contains('ASIN')",
      table: [
        "#productDetails_feature_div th:contains('ASIN')",
        "#prodDetails th:contains('ASIN')",
      ],
    },
    portuguese: {
      list: "#detailBulletsWrapper_feature_div span:contains('ASIN')",
      table: [
        "#productDetails_feature_div th:contains('ASIN')",
        "#prodDetails th:contains('ASIN')",
      ],
    },
    turkish: {
      list: "#detailBulletsWrapper_feature_div span:contains('ASIN')",
      table: [
        "#productDetails_feature_div th:contains('ASIN')",
        "#prodDetails th:contains('ASIN')",
      ],
    },
    dutch: {
      list: "#detailBulletsWrapper_feature_div span:contains('ASIN')",
      table: [
        "#productDetails_feature_div th:contains('ASIN')",
        "#prodDetails th:contains('ASIN')",
      ],
    },
    arabic: {
      list: "#detailBulletsWrapper_feature_div span:contains('ASIN')",
      table: [
        "#productDetails_feature_div th:contains('ASIN')",
        "#prodDetails th:contains('ASIN')",
      ],
    },
    polish: {
      list: "#detailBulletsWrapper_feature_div span:contains('ASIN')",
      table: [
        "#productDetails_feature_div th:contains('ASIN')",
        "#prodDetails th:contains('ASIN')",
      ],
    },
    swedish: {
      list: "#detailBulletsWrapper_feature_div span:contains('ASIN')",
      table: [
        "#productDetails_feature_div th:contains('ASIN')",
        "#prodDetails th:contains('ASIN')",
      ],
    },
  },
  publisher: {
    english: {
      list: ["#detailBulletsWrapper_feature_div span:contains('Publisher')"],
      table: ["#productDetails_feature_div th:contains('Publisher')"],
    },
    canadian: {
      list: ["#detailBulletsWrapper_feature_div span:contains('Publisher')"],
      table: ["#productDetails_feature_div th:contains('Publisher')"],
    },
    estonia: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Editorial')",
        "#detailBulletsWrapper_feature_div span:contains('Publisher')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Editorial')",
        "#productDetails_feature_div th:contains('Publisher')",
      ],
    },
    italian: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Editore')",
        "#detailBulletsWrapper_feature_div span:contains('Publisher')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Editore')",
        "#productDetails_feature_div th:contains('Publisher')",
      ],
    },
    germani: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Herausgeber')",
        "#detailBulletsWrapper_feature_div span:contains('Publisher')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Herausgeber')",
        "#productDetails_feature_div th:contains('Publisher')",
      ],
    },
    french: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Éditeur')",
        "#detailBulletsWrapper_feature_div span:contains('Publisher')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Éditeur')",
        "#productDetails_feature_div th:contains('Publisher')",
      ],
    },
    spanish: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Editor')",
        "#detailBulletsWrapper_feature_div span:contains('Publisher')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Editor')",
        "#productDetails_feature_div th:contains('Publisher')",
      ],
    },
    portuguese: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Editor')",
        "#detailBulletsWrapper_feature_div span:contains('Publisher')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Editor')",
        "#productDetails_feature_div th:contains('Publisher')",
      ],
    },
    turkish: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Yayıncı')",
        "#detailBulletsWrapper_feature_div span:contains('Publisher')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Yayıncı')",
        "#productDetails_feature_div th:contains('Publisher')",
      ],
    },
    dutch: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Uitgever')",
        "#detailBulletsWrapper_feature_div span:contains('Publisher')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Uitgever')",
        "#productDetails_feature_div th:contains('Publisher')",
      ],
    },
    arabic: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('الناشر')",
        "#detailBulletsWrapper_feature_div span:contains('Publisher')",
      ],
      table: [
        "#productDetails_feature_div th:contains('الناشر')",
        "#productDetails_feature_div th:contains('Publisher')",
      ],
    },
    polish: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Wydawca')",
        "#detailBulletsWrapper_feature_div span:contains('Publisher')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Wydawca')",
        "#productDetails_feature_div th:contains('Publisher')",
      ],
    },
    swedish: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Förlag')",
        "#detailBulletsWrapper_feature_div span:contains('Publisher')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Förlag')",
        "#productDetails_feature_div th:contains('Publisher')",
      ],
    },
  },
  manufacturer: {
    english: {
      list: "#detailBulletsWrapper_feature_div span:contains('Manufacturer')",
      table: [
        "#productDetails_feature_div th:contains('Manufacturer')",
        "#prodDetails th:contains('Manufacturer')",
      ],
    },
    canadian: {
      list: "#detailBulletsWrapper_feature_div span:contains('Manufacturer')",
      table: [
        "#productDetails_feature_div th:contains('Manufacturer')",
        "#prodDetails th:contains('Manufacturer')",
      ],
    },
    estonia: {
      list: "#detailBulletsWrapper_feature_div span:contains('Fabricante')",
      table: [
        "#productDetails_feature_div th:contains('Fabricante')",
        "#prodDetails th:contains('Fabricante')",
      ],
    },
    italian: {
      list: "#detailBulletsWrapper_feature_div span:contains('Produttore')",
      table: [
        "#productDetails_feature_div th:contains('Produttore')",
        "#prodDetails th:contains('Produttore')",
      ],
    },
    germani: {
      list: "#detailBulletsWrapper_feature_div span:contains('Hersteller')",
      table: [
        "#productDetails_feature_div th:contains('Hersteller')",
        "#prodDetails th:contains('Hersteller')",
      ],
    },
    french: {
      list: "#detailBulletsWrapper_feature_div span:contains('Fabricant')",
      table: [
        "#productDetails_feature_div th:contains('Fabricant')",
        "#prodDetails th:contains('Fabricant')",
      ],
    },
    spanish: {
      list: "#detailBulletsWrapper_feature_div span:contains('Fabricante')",
      table: [
        "#productDetails_feature_div th:contains('Fabricante')",
        "#prodDetails th:contains('Fabricante')",
      ],
    },
    portuguese: {
      list: "#detailBulletsWrapper_feature_div span:contains('Fabricante')",
      table: [
        "#productDetails_feature_div th:contains('Fabricante')",
        "#prodDetails th:contains('Fabricante')",
      ],
    },
    turkish: {
      list: "#detailBulletsWrapper_feature_div span:contains('Üretici firma')",
      table: [
        "#productDetails_feature_div th:contains('Üretici firma')",
        "#prodDetails th:contains('Üretici firma')",
      ],
    },
    dutch: {
      list: "#detailBulletsWrapper_feature_div span:contains('Fabrikant')",
      table: [
        "#productDetails_feature_div th:contains('Fabrikant')",
        "#prodDetails th:contains('Fabrikant')",
      ],
    },
    arabic: {
      list: "#detailBulletsWrapper_feature_div span:contains('الصانع')",
      table: [
        "#productDetails_feature_div th:contains('الصانع')",
        "#prodDetails th:contains('الصانع')",
      ],
    },
    polish: {
      list: "#detailBulletsWrapper_feature_div span:contains('Producent')",
      table: [
        "#productDetails_feature_div th:contains('Producent')",
        "#prodDetails th:contains('Producent')",
      ],
    },
    swedish: {
      list: "#detailBulletsWrapper_feature_div span:contains('Tillverkare')",
      table: [
        "#productDetails_feature_div th:contains('Tillverkare')",
        "#prodDetails th:contains('Tillverkare')",
      ],
    },
  },
  ratings: {
    english: {
      list: "#acrCustomerReviewText",
      table: "#acrCustomerReviewText",
    },
    canadian: {
      list: "#acrCustomerReviewText",
      table: "#acrCustomerReviewText",
    },
    estonia: {
      list: "#acrCustomerReviewText",
      table: "#acrCustomerReviewText",
    },
    italian: {
      list: "#acrCustomerReviewText",
      table: "#acrCustomerReviewText",
    },
    germani: {
      list: "#acrCustomerReviewText",
      table: "#acrCustomerReviewText",
    },
    french: {
      list: "#acrCustomerReviewText",
      table: "#acrCustomerReviewText",
    },
    spanish: {
      list: "#acrCustomerReviewText",
      table: "#acrCustomerReviewText",
    },
    portuguese: {
      list: "#acrCustomerReviewText",
      table: "#acrCustomerReviewText",
    },
    turkish: {
      list: "#acrCustomerReviewText",
      table: "#acrCustomerReviewText",
    },
    dutch: {
      list: "#acrCustomerReviewText",
      table: "#acrCustomerReviewText",
    },
    arabic: {
      list: "#acrCustomerReviewText",
      table: "#acrCustomerReviewText",
    },
    polish: {
      list: "#acrCustomerReviewText",
      table: "#acrCustomerReviewText",
    },
    swedish: {
      list: "#acrCustomerReviewText",
      table: "#acrCustomerReviewText",
    },
  },
  productDimensions: {
    english: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Product Dimensions')",
        "#detailBulletsWrapper_feature_div span:contains('Dimensions')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Product Dimensions')",
        "#productDetails_feature_div th:contains('Dimensions')",
      ],
    },

    canadian: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Product Dimensions')",
        "#detailBulletsWrapper_feature_div span:contains('Dimensions')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Product Dimensions')",
        "#productDetails_feature_div th:contains('Dimensions')",
      ],
    },
    estonia: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Dimensiones')",
        "#detailBulletsWrapper_feature_div span:contains('Dimensions')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Dimensiones')",
        "#productDetails_feature_div th:contains('Dimensions')",
      ],
    },
    italian: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Dimensioni')",
        "#detailBulletsWrapper_feature_div span:contains('Dimensions')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Dimensioni')",
        "#productDetails_feature_div th:contains('Dimensions')",
      ],
    },
    germani: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Verpackungsabmessungen')",
        "#detailBulletsWrapper_feature_div span:contains('Dimensions')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Verpackungsabmessungen')",
        "#productDetails_feature_div th:contains('Dimensions')",
      ],
    },
    french: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Nombre de pages de l'édition imprimée')",
        "#detailBulletsWrapper_feature_div span:contains('Dimensions du produit')",
        "#detailBulletsWrapper_feature_div span:contains('Dimensions')",
        // Nombre de pages de l'édition imprimée
      ],
      table: [
        "#productDetails_feature_div th:contains('Nombre de pages de l'édition imprimée')",
        "#productDetails_feature_div th:contains('Dimensions du produit')",
        "#productDetails_feature_div th:contains('Dimensions')",
      ],
    },
    spanish: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Dimensiones del producto')",
        "#detailBulletsWrapper_feature_div span:contains('Dimensions')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Dimensiones del producto')",
        "#productDetails_feature_div th:contains('Dimensions')",
      ],
    },
    portuguese: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Dimensões do produto')",
        "#detailBulletsWrapper_feature_div span:contains('Dimensions')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Dimensões do produto')",
        "#productDetails_feature_div th:contains('Dimensions')",
      ],
    },
    turkish: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Ürün Boyutları')",
        "#detailBulletsWrapper_feature_div span:contains('Dimensions')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Ürün Boyutları')",
        "#productDetails_feature_div th:contains('Dimensions')",
      ],
    },
    dutch: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Productafmetingen')",
        "#detailBulletsWrapper_feature_div span:contains('Dimensions')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Productafmetingen')",
        "#productDetails_feature_div th:contains('Dimensions')",
      ],
    },
    arabic: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('ابعاد المنتج')",
        "#detailBulletsWrapper_feature_div span:contains('Dimensions')",
      ],
      table: [
        "#productDetails_feature_div th:contains('ابعاد المنتج')",
        "#productDetails_feature_div th:contains('Dimensions')",
      ],
    },
    polish: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('wymiary produktu')",
        "#detailBulletsWrapper_feature_div span:contains('Dimensions')",
      ],
      table: [
        "#productDetails_feature_div th:contains('wymiary produktu')",
        "#productDetails_feature_div th:contains('Dimensions')",
      ],
    },
    swedish: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Produktmått')",
        "#detailBulletsWrapper_feature_div span:contains('Dimensions')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Produktmått')",
        "#productDetails_feature_div th:contains('Dimensions')",
      ],
    },
  },
  size: {
    english: {
      list: "#detailBulletsWrapper_feature_div span:contains('Dimensions')",
      table: "#productDetails_feature_div th:contains('Dimensions')",
    },
    canadian: {
      list: "#detailBulletsWrapper_feature_div span:contains('Dimensions')",
      table: "#productDetails_feature_div th:contains('Dimensions')",
    },
    estonia: {
      list: "#detailBulletsWrapper_feature_div span:contains('Dimensions')",
      table: "#productDetails_feature_div th:contains('Dimensions')",
    },
    italian: {
      list: "#detailBulletsWrapper_feature_div span:contains('Dimensions')",
      table: "#productDetails_feature_div th:contains('Dimensions')",
    },
    germani: {
      list: "#detailBulletsWrapper_feature_div span:contains('Abmessungen')",
      table: "#productDetails_feature_div th:contains('Abmessungen')",
    },
    french: {
      list: "#detailBulletsWrapper_feature_div span:contains('Dimensions')",
      table: "#productDetails_feature_div th:contains('Dimensions')",
    },
    spanish: {
      list: "#detailBulletsWrapper_feature_div span:contains('Dimensions')",
      table: "#productDetails_feature_div th:contains('Dimensions')",
    },
    portuguese: {
      list: "#detailBulletsWrapper_feature_div span:contains('Dimensões')",
      table: "#productDetails_feature_div th:contains('Dimensões')",
    },
    turkish: {
      list: "#detailBulletsWrapper_feature_div span:contains('Boyutlar')",
      table: "#productDetails_feature_div th:contains('Boyutlar')",
    },
    dutch: {
      list: "#detailBulletsWrapper_feature_div span:contains('Afmetingen')",
      table: "#productDetails_feature_div th:contains('Afmetingen')",
    },
    arabic: {
      list: "#detailBulletsWrapper_feature_div span:contains('الأبعاد')",
      table: "#productDetails_feature_div th:contains('الأبعاد')",
    },
    polish: {
      list: "#detailBulletsWrapper_feature_div span:contains('Wymiary')",
      table: "#productDetails_feature_div th:contains('Wymiary')",
    },
    swedish: {
      list: "#detailBulletsWrapper_feature_div span:contains('Mått')",
      table: "#productDetails_feature_div th:contains('Mått')",
    },
  },
  authorsNode: {
    english: {
      list: "#bylineInfo_feature_div span.author",
      table: "#bylineInfo_feature_div span.author",
    },
    canadian: {
      list: "#bylineInfo_feature_div span.author",
      table: "#bylineInfo_feature_div span.author",
    },
    estonia: {
      list: "#bylineInfo_feature_div span.author",
      table: "#bylineInfo_feature_div span.author",
    },
    italian: {
      list: "#bylineInfo_feature_div span.author",
      table: "#bylineInfo_feature_div span.author",
    },
    germani: {
      list: "#bylineInfo_feature_div span.author",
      table: "#bylineInfo_feature_div span.author",
    },
    french: {
      list: "#bylineInfo_feature_div span.author",
      table: "#bylineInfo_feature_div span.author",
    },
    spanish: {
      list: "#bylineInfo_feature_div span.author",
      table: "#bylineInfo_feature_div span.author",
    },
    portuguese: {
      list: "#bylineInfo_feature_div span.author",
      table: "#bylineInfo_feature_div span.author",
    },
    turkish: {
      list: "#bylineInfo_feature_div span.author",
      table: "#bylineInfo_feature_div span.author",
    },
    dutch: {
      list: "#bylineInfo_feature_div span.author",
      table: "#bylineInfo_feature_div span.author",
    },
    arabic: {
      list: "#bylineInfo_feature_div span.author",
      table: "#bylineInfo_feature_div span.author",
    },
    polish: {
      list: "#bylineInfo_feature_div span.author",
      table: "#bylineInfo_feature_div span.author",
    },
    swedish: {
      list: "#bylineInfo_feature_div span.author",
      table: "#bylineInfo_feature_div span.author",
    },
  },
  printLength: {
    english: {
      list: ["#detailBulletsWrapper_feature_div span:contains('Print length')"],
      table: ["#productDetails_feature_div th:contains('Print length')"],
    },
    canadian: {
      list: ["#detailBulletsWrapper_feature_div span:contains('Print length')"],
      table: ["#productDetails_feature_div th:contains('Print length')"],
    },
    estonia: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Longitud de impresión')",
        "#detailBulletsWrapper_feature_div span:contains('Print length')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Longitud de impresión')",
        "#productDetails_feature_div th:contains('Print length')",
      ],
    },
    german: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Drucklänge')",
        "#detailBulletsWrapper_feature_div span:contains('Seitenzahl der Print-Ausgabe')",
        "#detailBulletsWrapper_feature_div span:contains('Print length')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Drucklänge')",
        "#productDetails_feature_div th:contains('Seitenzahl der Print-Ausgabe')",
        "#productDetails_feature_div th:contains('Print length')",
      ],
    },
    germani: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Drucklänge')",
        "#detailBulletsWrapper_feature_div span:contains('Seitenzahl der Print-Ausgabe')",
        "#detailBulletsWrapper_feature_div span:contains('Print length')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Drucklänge')",
        "#productDetails_feature_div th:contains('Seitenzahl der Print-Ausgabe')",
        "#productDetails_feature_div th:contains('Print length')",
      ],
    },
    italian: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Lunghezza stampa')",
        "#detailBulletsWrapper_feature_div span:contains('Print length')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Lunghezza stampa')",
        "#productDetails_feature_div th:contains('Print length')",
      ],
    },
    french: {
      list: [
        '#detailBulletsWrapper_feature_div span:contains("Nombre de pages de l\'édition imprimée")',
        "#detailBulletsWrapper_feature_div span:contains('Print length')",
      ],
      table: [
        '#productDetails_feature_div th:contains("Nombre de pages de l\'édition imprimée")',
        "#productDetails_feature_div th:contains('Print length')",
      ],
    },
    spanish: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Longitud de impresión')",
        "#detailBulletsWrapper_feature_div span:contains('Print length')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Longitud de impresión')",
        "#productDetails_feature_div th:contains('Print length')",
      ],
    },
    portuguese: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Comprimento da impressão')",
        "#detailBulletsWrapper_feature_div span:contains('Print length')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Comprimento da impressão')",
        "#productDetails_feature_div th:contains('Print length')",
      ],
    },
    turkish: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Baskı uzunluğu')",
        "#detailBulletsWrapper_feature_div span:contains('Print length')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Baskı uzunluğu')",
        "#productDetails_feature_div th:contains('Print length')",
      ],
    },
    dutch: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('Printlengte')",
        "#detailBulletsWrapper_feature_div span:contains('Print length')",
      ],
      table: [
        "#productDetails_feature_div th:contains('Printlengte')",
        "#productDetails_feature_div th:contains('Print length')",
      ],
    },
    arabic: {
      list: [
        "#detailBulletsWrapper_feature_div span:contains('طول الطباعة')",
        "#detailBulletsWrapper_feature_div span:contains('Print length')",
      ],
      table: [
        "#productDetails_feature_div th:contains('طول الطباعة')",
        "#productDetails_feature_div th:contains('Print length')",
      ],
    },
  },
  paperbackPrice: {
    english: "#tmmSwatches a:contains('Paperback')",
    canadian: "#tmmSwatches a:contains('Paperback')",
    estonia: "#tmmSwatches a:contains('Tapa blanda')",
    italian: "#tmmSwatches a:contains('Copertina flessibile')",
    germani: "#tmmSwatches a:contains('Taschenbuch')",
    french: "#tmmSwatches a:contains('Broché')",
    spanish: "#tmmSwatches a:contains('Libro de bolsillo')",
    portuguese: "#tmmSwatches a:contains('Livro cartonado')",
    turkish: "#tmmSwatches a:contains('ciltsiz')",
    dutch: "#tmmSwatches a:contains('Paperback')",
    arabic: "#tmmSwatches a:contains('غلاف ورقي')",
    polish: "#tmmSwatches a:contains('Oprawa miękka')",
    swedish: "#tmmSwatches a:contains('Pocketbok')",
  },
  kindlePrice: {
    english: "#tmmSwatches a:contains('Kindle')",
    canadian: "#tmmSwatches a:contains('Kindle')",
    estonia: "#tmmSwatches a:contains('Versión Kindle')",
    italian: "#tmmSwatches a:contains('Formato Kindle')",
    germani: "#tmmSwatches a:contains('Kindle')",
    french: "#tmmSwatches a:contains('Format Kindle')",
    spanish: "#tmmSwatches a:contains('Encender')",
    portuguese: "#tmmSwatches a:contains('Acender')",
    turkish: "#tmmSwatches a:contains('Tutuşmak')",
    dutch: "#tmmSwatches a:contains('Kindle')",
    arabic: "#tmmSwatches a:contains('كيندل')",
    polish: "#tmmSwatches a:contains('Rozpalać')",
    swedish: "#tmmSwatches a:contains('Kindle')",
  },
  spiralBoundPrice: {
    english: "#tmmSwatches a:contains('Spiral-bound')",
    canadian: "#tmmSwatches a:contains('Spiral-bound')",
    estonia: "#tmmSwatches a:contains('Encuadernación en espiral')",
    italian: "#tmmSwatches a:contains('Spiral-bound')",
    germani: "#tmmSwatches a:contains('Spiral-bound')",
    french: "#tmmSwatches a:contains('Spiral-bound')",
    spanish: "#tmmSwatches a:contains('Ligado en espiral')",
    portuguese: "#tmmSwatches a:contains('Em espiral')",
    turkish: "#tmmSwatches a:contains('sarmal bağlı')",
    dutch: "#tmmSwatches a:contains('Spiraal gebonden')",
    arabic: "#tmmSwatches a:contains('دوامة ملزمة')",
    polish: "#tmmSwatches a:contains('Oprawa spiralna')",
    swedish: "#tmmSwatches a:contains('Spiral-bound')",
  },
  hardcoverPrice: {
    english: "#tmmSwatches a:contains('Hardcover')",
    canadian: "#tmmSwatches a:contains('Hardcover')",
    estonia: "#tmmSwatches a:contains('Tapa dura')",
    italian: "#tmmSwatches a:contains('Copertina rigida')",
    germani: "#tmmSwatches a:contains('Gebundenes Buch')",
    french: "#tmmSwatches a:contains('Relié')",
    spanish: "#tmmSwatches a:contains('De tapa dura')",
    portuguese: "#tmmSwatches a:contains('capa dura')",
    turkish: "#tmmSwatches a:contains('Ciltli')",
    dutch: "#tmmSwatches a:contains('Gebonden')",
    arabic: "#tmmSwatches a:contains('غلاف')",
    polish: "#tmmSwatches a:contains('Twarda okładka')",
    swedish: "#tmmSwatches a:contains('Inbunden')",
  },
  mp3Price: {
    english: "#tmmSwatches a:contains('MP3 CD') .a-size-base.a-color-secondary",
    canadian:
      "#tmmSwatches a:contains('MP3 CD') .a-size-base.a-color-secondary",
    estonia: "#tmmSwatches a:contains('MP3 CD') .a-size-base.a-color-secondary",
    italian: "#tmmSwatches a:contains('MP3 CD') .a-size-base.a-color-secondary",
    germani: "#tmmSwatches a:contains('MP3 CD') .a-size-base.a-color-secondary",
    french: "#tmmSwatches a:contains('MP3 CD') .a-size-base.a-color-secondary",
    spanish: "#tmmSwatches a:contains('MP3 CD') .a-size-base.a-color-secondary",
    portuguese:
      "#tmmSwatches a:contains('MP3 CD') .a-size-base.a-color-secondary",
    turkish: "#tmmSwatches a:contains('MP3 CD') .a-size-base.a-color-secondary",
    dutch: "#tmmSwatches a:contains('MP3 CD') .a-size-base.a-color-secondary",
    arabic: "#tmmSwatches a:contains('MP3 CD') .a-size-base.a-color-secondary",
    polish: "#tmmSwatches a:contains('MP3 CD') .a-size-base.a-color-secondary",
    swedish: "#tmmSwatches a:contains('MP3 CD') .a-size-base.a-color-secondary",
  },
  audiobookPrice: {
    english:
      "#tmmSwatches a:contains('Audiobook') .a-size-base.a-color-secondary",
    canadian:
      "#tmmSwatches a:contains('Audiobook') .a-size-base.a-color-secondary",
    estonia:
      "#tmmSwatches a:contains('CD de audio') .a-size-base.a-color-secondary",
    italian:
      "#tmmSwatches a:contains('Audiolibro') .a-size-base.a-color-secondary",
    germani:
      "#tmmSwatches a:contains('Hörbuch') .a-size-base.a-color-secondary",
    french:
      "#tmmSwatches a:contains('Téléchargement audio') .a-size-base.a-color-secondary",
    spanish:
      "#tmmSwatches a:contains('Audio libro') .a-size-base.a-color-secondary",
    portuguese:
      "#tmmSwatches a:contains('Áudio-livro') .a-size-base.a-color-secondary",
    turkish:
      "#tmmSwatches a:contains('Sesli kitap') .a-size-base.a-color-secondary",
    dutch:
      "#tmmSwatches a:contains('Audioboek') .a-size-base.a-color-secondary",
    arabic:
      "#tmmSwatches a:contains('أوديوبوك') .a-size-base.a-color-secondary",
    polish:
      "#tmmSwatches a:contains('Książka audio') .a-size-base.a-color-secondary",
    swedish:
      "#tmmSwatches a:contains('Ljudbok') .a-size-base.a-color-secondary",
  },
  insideBoxPrice: {
    english: "#price_inside_buybox",
    canadian: "#price_inside_buybox",
    estonia: "#price_inside_buybox",
    italian: "#price_inside_buybox",
    germani: "#price_inside_buybox",
    french: "#price_inside_buybox",
    spanish: "#price_inside_buybox",
    portuguese: "#price_inside_buybox",
    turkish: "#price_inside_buybox",
    dutch: "#price_inside_buybox",
    arabic: "#price_inside_buybox",
    polish: "#price_inside_buybox",
    swedish: "#price_inside_buybox",
  },
  otherPrice: {
    english: ".apexPriceToPay span",
    canadian: ".apexPriceToPay span",
    estonia: ".apexPriceToPay span",
    italian: ".apexPriceToPay span",
    germani: ".apexPriceToPay span",
    french: ".apexPriceToPay span",
    spanish: ".apexPriceToPay span",
    portuguese: ".apexPriceToPay span",
    turkish: ".apexPriceToPay span",
    dutch: ".apexPriceToPay span",
    arabic: ".apexPriceToPay span",
    polish: ".apexPriceToPay span",
    swedish: ".apexPriceToPay span",
  },
};

// html content
var tableOld = `<table id="amazon-analysis-${chrome.runtime.id}" style="border-collapse: collapse; border: 2px solid white; color: black; text-align: center; font-size: 16px">
  <tbody>
    <tr style="border: 2px solid #E0D6FF; line-height: 30px">
      <td rowspan="2" style="border: 2px solid #E0D6FF; vertical-align: middle; background-color: #E0D6FF;">
        <div style="display: flex; align-items: center; justify-content: center">
          <img src="chrome-extension://${chrome.runtime.id}/assets/images/04.png" width="200px" />
        </div>
      </td>
      <td style="border: 2px solid #E0D6FF; background-color: #E0D6FF; text-align: left">
    

        <div style="border: 2px solid rgb(130, 87, 254); border-radius: 10px; margin-left: 32px; width: 230px; text-align: center; display: flex; align-items: center; margin-top: 10px;">
          <span style="margin: 5px; margin-left: 40px">Loading...</span>
          </div>
      </td>
      <td style="text-align: left; border: 2px solid #E0D6FF; background-color: #E0D6FF;">
        <span style="font-weight: bold; margin-left: 5px">Number of Results</span>

        <div style="border: 2px solid rgb(130, 87, 254); border-radius: 10px; width: 185px; height: 40px; line-height: 40px; text-align: center">Loading...</div>
      </td>
      <td style="text-align: left; border: 2px solid #E0D6FF; background-color: #E0D6FF;">
        <span style="font-weight: bold; margin-left: 5px">Average Price</span>

        <div style="border: 2px solid rgb(130, 87, 254); border-radius: 10px; width: 185px; height: 40px; line-height: 40px; text-align: center">Loading...</div>
      </td>
      <td style="text-align: left; border: 2px solid #E0D6FF; background-color: #E0D6FF">
        <span style="font-weight: bold; margin-left: 5px">Help</span>

        <div style="border: 2px solid rgb(130, 87, 254); border-radius: 10px; width: 185px; height: 40px; line-height: 40px; text-align: center">
          <a href="https://www.facebook.com/groups/2690865597847008" target="_blank" style="color: black; display: block">
            <span>Join Facebook Group</span>
          </a>
        </div>
      </td>
      <td style="text-align: left; border: 2px solid #E0D6FF; background-color: #E0D6FF">
        <span style="font-weight: bold; margin-left: 5px">Self Publishing Titans</span>

        <div style="border: 2px solid rgb(130, 87, 254); border-radius: 10px; width: 185px; height: 40px; line-height: 40px; text-align: center">
          <a href="https://selfpublishingtitans.com/" target="_blank" style="color: white; display: block">
            <span>More Free Tools</span>
          </a>
        </div>
      </td>
    </tr>
    <tr style="border: 2px solid white; line-height: 30px">
      <td style="border: 2px solid #E0D6FF; text-align: left; vertical-align: middle; background-color: #E0D6FF">
        <span> <span style="font-weight: bold; font-size: 30px;padding-left: 10px;" class="${stylePrefix}-kdplogoword">Titans Quick View</span> </span>
      </td>

      <td style="text-align: left; border: 2px solid #E0D6FF; background-color: #E0D6FF">
        <span style="font-weight: bold; margin-left: 5px">Average BSR</span>

        <div style="border: 2px solid rgb(130, 87, 254); border-radius: 10px; width: 185px; height: 40px; line-height: 40px; text-align: center">Loading...</div>
      </td>

      <td style="text-align: left; border: 2px solid #E0D6FF; background-color: #E0D6FF;">
        <span style="font-weight: bold; margin-left: 5px">Average Reviews</span>

        <div style="border: 2px solid rgb(130, 87, 254); border-radius: 10px; width: 185px; height: 40px; line-height: 40px; text-align: center">Loading...</div>
      </td>
      <td style="text-align: left; border: 2px solid #E0D6FF; background-color: #E0D6FF;">
        <span style="font-weight: bold; margin-left: 5px">Download</span>

        <div style="border: 2px solid rgb(130, 87, 254); border-radius: 10px; width: 185px; height: 40px; line-height: 40px; text-align: center">
          <a href="javascript: void(0)" id="download_excel_file_${chrome.runtime.id}" style="color: white; display: block"> All 1st Page Data </a>
        </div>
      </td>
      <td style="text-align: left; border: 2px solid #E0D6FF; background-color: #E0D6FF;">
        <span style="font-weight: bold; margin-left: 5px">How To</span>

        <div style="background-color: red; border: 2px solid rgb(130, 87, 254); border-radius: 10px; width: 185px; height: 40px; line-height: 40px; text-align: center">
          <a href="https://www.youtube.com/channel/UCkOTYGNYxS6jq7JT3Fk5NEQ" target="_blank" style="color: white"> New Tutorial Video! </a>
        </div>
      </td>
    </tr>
  </tbody>
  </table>
  `;

var table = `
  <table id="amazon-analysis-${chrome.runtime.id}" style="height: 170px; width: 100%; border-collapse: collapse; border: 2px solid #E0D6FF; color: black; text-align: center; font-size: 16px">
  <tbody>
    <tr style="border: 2px solid #E0D6FF; line-height: 30px">
      <td style="border: 2px solid #E0D6FF; text-align: center; vertical-align: middle; background-color: #E0D6FF;">
        <span> <span style="font-weight: bold; font-size: 30px;padding-left: 10px;" class="${stylePrefix}-kdplogoword">Titans Quick View</span> </span>
      </td>

      <td rowspan="2" class="${stylePrefix}-bsr-td">
        <span style="font-weight: bold; margin-left: 5px">Results</span>
        <div class="${stylePrefix}-box-wrapper">
        <div class="${stylePrefix}-top-box">
          <div class="${stylePrefix}-left-box" style="width:120px;">Total Results</div>
          <div>Loading...</div>
        </div>
        <div class="${stylePrefix}-inner-box">
          <div class="${stylePrefix}-left-box" style="width:120px;">Exact Match</div>
          <div>Loading...</div>
        </div>
        <div class="${stylePrefix}-bottom-box">
          <div class="${stylePrefix}-left-box" style="width:120px;">Ind. Published</div>
          <div>Loading...</div>
        </div>
        </div>
      </td>
      <td rowspan="2" class="${stylePrefix}-bsr-td">
        <span style="font-weight: bold; margin-left: 5px">Best Seller Rank</span>
<div class="${stylePrefix}-box-wrapper">
        <div class="${stylePrefix}-top-box">
          <div class="${stylePrefix}-left-box">Average</div>
          <div>Loading...</div>
        </div>
        <div class="${stylePrefix}-inner-box">
          <div class="${stylePrefix}-left-box">Low</div>
          <div>Loading...</div>
        </div>
        <div class="${stylePrefix}-bottom-box">
          <div class="${stylePrefix}-left-box">High</div>
          <div>Loading...</div>
        </div>
        </div>
      </td>
      <td rowspan="2"  class="${stylePrefix}-bsr-td">
        <span style="font-weight: bold; margin-left: 5px">Reviews</span>
<div class="${stylePrefix}-box-wrapper">
        <div
         class="${stylePrefix}-top-box"
        >
          <div  class="${stylePrefix}-left-box">Average</div>
          <div>Loading...</div>
        </div>
        <div  class="${stylePrefix}-inner-box">
          <div class="${stylePrefix}-left-box">Low</div>
          <div>Loading...</div>
        </div>
        <div class="${stylePrefix}-bottom-box">
          <div class="${stylePrefix}-left-box">High</div>
          <div>Loading...</div>
        </div>
        </div>
      </td>
      <td rowspan="2" class="${stylePrefix}-bsr-td">
        <span style="font-weight: bold; margin-left: 5px">Price</span>
<div class="${stylePrefix}-box-wrapper">
        <div  class="${stylePrefix}-top-box">
          <div class="${stylePrefix}-left-box">Average</div>
          <div>Loading...</div>
        </div>
        <div class="${stylePrefix}-inner-box">
          <div class="${stylePrefix}-left-box">Low</div>
          <div>Loading...</div>
        </div>
        <div class="${stylePrefix}-bottom-box">
          <div class="${stylePrefix}-left-box">High</div>
          <div>Loading...</div>
        </div>
        </div>
      </td>
      <td rowspan="2" class="${stylePrefix}-bsr-td">
        <span style="font-weight: bold; margin-left: 5px">Links</span>
<div class="${stylePrefix}-box-wrapper">
        <div class="${stylePrefix}-top-box">
          <a href="https://www.selfpublishingtitans.com/pricing" target="_blank" style="color: black; margin-left: 4px;">Titans Ultra </a>
        </div>

        <div class="${stylePrefix}-inner-box">
          <a href="https://www.facebook.com/groups/2690865597847008" target="_blank" style="color: black; margin-left: 4px;">
            <span>Join Facebook Group</span>
          </a>
        </div>

        <div class="${stylePrefix}-bottom-box">
          <a href="javascript: void(0)" id="download_excel_file_${chrome.runtime.id}" style="color: black; margin-left: 4px;"> Download 1st Page Data </a>
        </div>
        <div class="${stylePrefix}-box-wrapper">
      </td>

      <td rowspan="2" style="padding-left: 10px; border: 2px solid #E0D6FF; vertical-align: middle; background-color: #E0D6FF;">
        <div style="min-width: 200px; display: flex; align-items: center; justify-content: center">
          <img src="chrome-extension://${chrome.runtime.id}/assets/images/04.png" width="200px" />
        </div>
      </td>
    </tr>
    <tr style="text-align: -webkit-center; border: 2px solid white; line-height: 30px">
      <td style="border: 2px solid #E0D6FF; background-color: #E0D6FF; vertical-align:top;">
        

        <div class="${stylePrefix}-box-wrapper" style=" border: 2px solid rgb(130, 87, 254); border-radius: 10px; width: 230px; margin-top: 10px; text-align: center; display: flex; align-items: center">
          <span style="margin: 5px; margin-left: 40px">Loading...</span>
          
                   </div>
      </td>
    </tr>
  </tbody>
  </table>`;

const graphSVG = `
  <svg width="24px" height="20px" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">

<g fill="transparent" fill-rule="evenodd" stroke="rgb(72, 94, 117)" stroke-linecap="round" stroke-linejoin="round" transform="translate(4 3)">

<path d="m.5.5v11c0 1.1045695.8954305 2 2 2h11"/>

<path d="m2.5 9.5 3-3 2 2 5-5"/>

<path d="m12.5 6.5v-3h-3"/>

</g>

</svg>
  
  `;

const floatingMenuHTML = `
<div
      id="draggableDiv"
      class="${stylePrefix}-floating-menu-icon"
      draggable="true"
    >
      <div>
        <img src="chrome-extension://${chrome.runtime.id}/assets/images/04.png" alt="" width="60px" height="50px"  style="padding: 8px;">
      </div>
    </div>
    <div id="floating-menu" style="
    display: none;
    position: fixed;
    color: black;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(217, 224, 232);
    box-shadow: rgba(103, 132, 162, 0.4) 0px 4px 24px -4px;
    border-radius: 16px;
    min-width: 400px;
    bottom: 99px;
    right: 60px;
    z-index: 9999;
    padding: 24px;
  ">
        <div class="${stylePrefix}-wrapper" id="login-div" style="display: none;">
  <div class="${stylePrefix}-inner-warpper ${stylePrefix}-text-center">
    <div style="display: flex; justify-content: center; flex-direction: column; align-items: center; gap: 16px;">

      <img src="chrome-extension://${chrome.runtime.id}/assets/images/04.png" alt="Self Publishing Titans" width="120px"  />
      <h2 class="${stylePrefix}-title">Login To Self Publishing Titans</h2>
    </div>
    <form id="spt-login">
      <div class="${stylePrefix}-input-group">
        <label class="${stylePrefix}-palceholder" for="username">Email Address</label>
        <input class="${stylePrefix}-form-control" name="username" id="username" type="text" placeholder="" />
        
      </div>
      <div class="${stylePrefix}-input-group">
        <label class="${stylePrefix}-palceholder" for="password">Password</label>
        <input class="${stylePrefix}-form-control" name="password" id="password" type="password" placeholder="" />
        
      </div>
      <div
            style="display: flex; justify-content: center; align-items: center"
          >
            <p class="wrongpass">Incorrect email or password</p>
            <div class="${stylePrefix}-loader-s"></div>
      </div>
      <button type="submit" class="${stylePrefix}-purple-btn logdiv" id="login">Login</button>
      <div style="display: flex; justify-content: space-between; color: #7449fb;">
        
        <a  href="https://www.selfpublishingtitans.com/forgot-password" target="_blank" style="color: #7449fb;">Forgot Password?</a>
        <a href="https://www.selfpublishingtitans.com/register" target="_blank" style="color: #7449fb;">Create Account</a>
      </div>
    </form>
  </div>
</div>

        <div class="" style="display: flex; justify-content: start; align-items: center;">
            <img src="chrome-extension://${chrome.runtime.id}/assets/images/04.png" alt="" width="40px" height="26px"  style="padding-right: 8px;">
            <div style="font-size: 26px; font-weight: 600;" >Titan Tools</div>
        </div>
        <div style=" width: 100%; display: none; flex-direction: column; margin-top: 16px;" id="titans-pro-search-div">
            <input type="text" id="titans-pro-search-input" placeholder="Enter Search Keyword" style="border: 1px solid #d9e0e8; border-radius: 6px; padding: 22px; margin-bottom: 16px;">
            <div class="${stylePrefix}-floating-menu-item" style="justify-content: center;" id="run-titans-pro-btn">
                  <img src="chrome-extension://${chrome.runtime.id}/assets/svgs/titans-pro.svg" alt="" width="20px" height="16px">
                  <div>Search</div>
            </div>
            <div class="${stylePrefix}-floating-menu-item" style="justify-content: center; margin-top: 8px;" id="titans-pro-icon-btn-cancel">
                  
                  <div id="run-titans-pro-btn" >Cancel</div>
               </div>
         </div>
        <div style="display: grid; width: 100%; grid-template-columns: 1fr 1fr; grid-gap: 8px; margin-top: 16px;" id="floating-menu-items">
        <div class="${stylePrefix}-floating-menu-item" id="titans-pro-btn">
                <img src="chrome-extension://${chrome.runtime.id}/assets/svgs/titans-pro.svg" alt="" width="20px" height="16px">
                <div style="display: flex; flex-direction: column;">
                <div class="${stylePrefix}-title">
                  Titans Pro
                </div>
                <div class="${stylePrefix}-subtitle">
                  Find hot niches easily & quickly
                </div>
              </div>
        </div>
            <a class="${stylePrefix}-floating-menu-item" href="https://selfpublishingtitans.com/titans-retro-vision" target="_blank" style="text-decoration: none;">
                <img src="chrome-extension://${chrome.runtime.id}/assets/svgs/retro-view.svg" alt="" width="20px" height="16px">
                <div style="display: flex; flex-direction: column;">
                <div class="${stylePrefix}-title">
                  Titans Retro View
                </div>
                <div class="${stylePrefix}-subtitle">
                  Find competitors top keywords
                </div>
              </div>
            </a>
            <div class="${stylePrefix}-floating-menu-item" id="deep-view-btn">
      
                <img src="chrome-extension://${chrome.runtime.id}/assets/svgs/deep-view.svg" alt="" width="20px" height="16px"  ">
                <div style="display: flex; flex-direction: column;">
                <div class="${stylePrefix}-title">
                  Titans Deep View
                </div>
                <div class="${stylePrefix}-subtitle">
                  Analyze 100 search results at once.
                </div>
              </div>
        
            </div>
            <a href="https://selfpublishingtitans.com/titans-asin-tracker" target="_blank" style="text-decoration: none;" class="${stylePrefix}-floating-menu-item">
            <img src="chrome-extension://${chrome.runtime.id}/assets/svgs/product-tracker.svg" alt="" width="20px" height="16px"  ">
                <div style="display: flex; flex-direction: column;">
                <div class="${stylePrefix}-title">
                  Titans Product Tracker
                </div>
                <div class="${stylePrefix}-subtitle">
                   Track any product you want
                </div>
              </div>
            </a>
            <a href="https://selfpublishingtitans.com/titans-keyword-tracker" target="_blank" style="text-decoration: none;" class="${stylePrefix}-floating-menu-item">
            <img src="chrome-extension://${chrome.runtime.id}/assets/svgs/keyword-tracker.svg" alt="" width="20px" height="16px"  ">
                <div style="display: flex; flex-direction: column;">
                <div class="${stylePrefix}-title">
                  Titans Keyword Tracker
                </div>
                <div class="${stylePrefix}-subtitle">
                  Track rankings of any keyword
                </div>
              </div>
            </a>
            <a href="https://www.youtube.com/@SelfPublishingTitans" target="_blank" style="text-decoration: none;" class="${stylePrefix}-floating-menu-item">
                <img src="chrome-extension://${chrome.runtime.id}/assets/svgs/youtube.svg" alt="" width="20px" height="16px">
                 <div style="display: flex; flex-direction: column;">
                <div class="${stylePrefix}-title">
                  Video Tutorials
                </div>
                <div class="${stylePrefix}-subtitle">
                  Free tutorials for you
                </div>
              </div>
            </a>
            <a href="https://selfpublishingtitans.com/support" target="_blank" style="text-decoration: none;" class="${stylePrefix}-floating-menu-item">
                <img src="chrome-extension://${chrome.runtime.id}/assets/svgs/support.svg" alt="" width="20px" height="16px">
                <div style="display: flex; flex-direction: column;">
                <div class="${stylePrefix}-title">
                  Customer Support
                </div>
                <div class="${stylePrefix}-subtitle">
                  Ask for help, report bugs, request upgrades
                </div>
              </div>
            </a>
        </div>
        
    </div>
`;
