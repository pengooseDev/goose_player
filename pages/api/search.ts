// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse //<Data>
) {
    switch (req.method) {
        case "GET":
            //youtube query 양식 : https://www.youtube.com/results?search_query=%ED%8E%AD%EA%B7%84
            const { query } = req.query; //쿼리쿼리야...
            if (typeof query !== "string") return res.status(400); //typescript exception.
            try {
                const resData = await axios.get(
                    `https://www.youtube.com/results?search_query=${encodeURI(
                        query
                    )}`
                );

                const HTML = resData.data;
                const regex = /(var ytInitialData)(.*?);/;
                //원하는 Data Object에 들어있는거 Parsing;
                const parsedRegexHTML = regex.exec(HTML);
                if (!parsedRegexHTML) return;
                const parsedHTML = parsedRegexHTML[0];
                if (!parsedHTML) return;

                const objectData = JSON.parse(
                    parsedHTML.substring(20, parsedHTML.length - 1)
                );
                const returnData =
                    objectData.contents.twoColumnSearchResultsRenderer
                        .primaryContents.sectionListRenderer?.contents[0]
                        .itemSectionRenderer.contents;

                return res.status(200).json({ result: returnData });
                //HTML을 string 데이터로 받아온 것 중 필요한 데이터가 있는 부분만 일단 chuncking
            } catch (e) {
                console.log(e);
                return res.status(400).redirect("/");
            }

        case "POST":
            const { inputValue } = req.body;
            const URL = `https://www.youtube.com/results?search_query=${encodeURI(
                inputValue
            )}`;
            try {
                const resData = axios.get(URL).then((res) => {
                    JSON.parse(res.data);
                    console.log(resData);
                });

                console.log("BE:res");
                //console.log(newData);
                //console.log(typeof newData)
                //const $ = cheerio.load(data);

                //cheerio 써서 파싱 후 return
                return res.status(200).json({ data: "hi" });
            } catch (err) {
                console.log("BE:ERR", err);
                return res.status(400).redirect("/");
            }

        case "PUT":
            return;

        case "DELETE":
            return;
    }
}
