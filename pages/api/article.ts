import type { NextApiRequest, NextApiResponse } from "next";

export interface Article {
    id: number;
    title: string;
    author: string;
    content: string;
}

interface DefaultResponse {
    message: string;
}

export interface Articles extends DefaultResponse {
    list: Article[];
}

type CreateArticle = Pick<Article, "title" | "author" | "content">;

const articles: Article[] = [
    { id: 1, author: "Penguin", title: "Hello", content: "Hello, world!" },
];

/*

Get : 데이터 받아오기
Post : 데이터 추가
Delete : 삭제

*/

/*type Data = {
    name: string;
};*/

`/api/article?id=1234`;

//req 보낼 경우 그 데이터는 req.body에 parsedData가 담김.
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "GET":
                const result: Articles = {
                    message: "Load Successful",
                    list: articles,
                };
                res.json(result);
                return;

            case "POST":
                const json = req.body as CreateArticle;
                articles.push({
                    ...json,
                    id: Math.floor(Math.random() * 1000),
                });
                console.log("POST REQUEST: ", json);
                res.status(204);
                return;

            case "DELETE":
                if (
                    typeof req.query.id !== "string" ||
                    isNaN(req.query.id as any)
                ) {
                    res.status(400).json({ message: "Bad Request" });
                    return;
                }

                const targetId = parseInt(req.query.id);
                const targetIndex = articles.findIndex(
                    ({ id }) => id === targetId
                );
                articles.splice(targetIndex, 1);
                res.status(204);
                return;
        }
    } catch {
        res.status(500).json({ message: "SERVER ERROR" });
    }
}
