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
            console.log("BE1 : ", query);
            //@ts-ignore
            const replacedQuery = query?.split(" ").join("");
            console.log(replacedQuery);

            if (typeof query !== "string") return res.status(400); //typescript exception.
            try {
                const axiosUrl = `https://www.youtube.com/results?search_query=${encodeURI(
                    replacedQuery
                )}`;
                console.log("axiosUrl", axiosUrl);

                const resData = await axios.get(axiosUrl);

                console.log("1");

                const HTML = resData.data;
                const regex = /(var ytInitialData)(.*?)};/;
                //"펭귄 nier" 이런식으로 검색하면 regex에 만족하는게 없음 지금.
                const parsedRegexHTML = regex.exec(HTML);
                if (!parsedRegexHTML) return res.status(400);
                const parsedHTML = parsedRegexHTML[0];
                if (!parsedHTML) return res.status(400);

                const objectData = JSON.parse(
                    parsedHTML.substring(20, parsedHTML.length - 1)
                );

                const returnData =
                    objectData.contents.twoColumnSearchResultsRenderer
                        .primaryContents.sectionListRenderer?.contents[0]
                        .itemSectionRenderer.contents;

                return res.status(200).json({ result: returnData });
                //HTML을 string 데이터로 받아온 것 중 필요한 데이터가 있는 부분만 일단 chuncking
            } catch (err) {
                console.log("getERR : ", err);
                return res.status(400).send(err);
            }

        case "POST":
            return res.status(200).json({ data: "hi" });

        case "PUT":
            return;

        case "DELETE":
            return;
    }
}
