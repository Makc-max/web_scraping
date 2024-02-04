const PORT = 8000;

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

// ウェブスクレイパーを作ろう
const URL = "https://search.rakuten.co.jp/search/mall/mause/"
const data =[];

axios(URL)
    .then((response) => {
        const htmlParser = response.data;
        // console.log(htmlParser);

        const $ = cheerio.load(htmlParser);

        $(".searchresultitem", htmlParser).each(function () {
            const title = $(this).find(".title").text();
            const price = $(this).find(".price--OX_YW").text(); // 修正: "thhis" と "fint" を "this" と "find" に
            data.push({title, price});
            console.log(data);
        });
    })
    .catch((error) => console.log(error)); // 修正: セミコロンを削除し、catchブロックの構文を修正


app.listen(PORT, console.log("surver is running!"))