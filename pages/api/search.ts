// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse //<Data>
) {
    switch (req.method) {
        case "GET":
            const searchText1 = req.body;
            console.log("GET", searchText1);
            return res.status(200).redirect("/");

        case "POST":
            const { inputValue } = req.body;
            const URL = `https://www.youtube.com/results?search_query=${encodeURI(
                inputValue
            )}`;
            try {
                const HTML = await axios.get(URL);
                console.log("BE:res");

                //cheerio 써서 파싱 후 return
                return res.status(200).json({ data: "HI" });
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
