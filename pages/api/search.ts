// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse //<Data>
) {
    switch (req.method) {
        case "GET":
            const searchText = req.body;
            console.log(searchText);
            res.status(200).redirect("/");
            return;

        case "POST":
            return;

        case "PUT":
            return;

        case "DELETE":
            return;
    }

    res.status(200).json({ name: "John Doe" });
}
