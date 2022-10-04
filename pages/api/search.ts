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
            res.status(200).redirect("/");
            return;

        case "POST":
            const { inputValue } = req.body;
            const URL = `https://www.youtube.com/results?search_query=${encodeURI(
                inputValue
            )}`;
            console.log("POST : ", inputValue);
            console.log("URL : ", URL);

            const data = await axios.get(URL).catch((err) => {
                console.log(err);
            });

            console.log("data : ", data);

            res.status(200);
            //axios.get()

            res.status(200).redirect("/");
            return;

        case "PUT":
            return;

        case "DELETE":
            return;
    }

    res.status(200).json({ name: "John Doe" });
}
