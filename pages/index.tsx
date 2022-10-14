import type { NextPage } from "next";
import Player from "../src/components/Player";
import Search from "../src/components/search/Search";
import styled from "styled-components";
import Queue from "../src/components/Queue";
import QueueToggleBtn from "../src/components/QueueToggleBtn";
import { useRecoilState } from "recoil";
import { queueToggleAtom } from "../src/atom";

const Home: NextPage = () => {
    return (
        <>
            <TopContainer />
            <Queue />
        </>
    );
};

export default Home;

const TopContainer = () => {
    const [queueToggle, setQueueToggle] = useRecoilState(queueToggleAtom);

    const overlayToggleHandler = () => {
        setQueueToggle((prev) => false);
        console.log(1);
    };
    return (
        <>
            <Wrapper onClick={overlayToggleHandler}>
                <RotateComponent>
                    <Player />
                    <Search />
                </RotateComponent>
            </Wrapper>

            <QueueToggleBtn />
        </>
    );
};

const Wrapper = styled.div`
    position: relative;
    height: 100vh;
    background: #111;
`;

const RotateComponent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    background: #111;
`;

/*

const Home: NextPage = () => {
    return (
        <>
            <ArticleViewer />
            <PostArticle />
        </>
    );
};

const ArticleViewer = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const load = async () => {
        const res = await axios.get(API_URL);
        console.log(res);
        if (res.status > 300) {
            console.log("ERROR!!!");
            return;
        }
        const data = res.data as Articles;
        setArticles(data.list);
    };

    return (
        <div>
            <button onClick={load}>Load</button>
            {articles.map(({ id, title, author, content }) => (
                <div key={id}>
                    <div>{`${title} - ${author}`}</div>
                    <div>{`${content}`}</div>
                </div>
            ))}
        </div>
    );
};

const PostArticle = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //FE -> BE 소통 axios.
        // POST 요청은 아래와 같은 양식으로 보냄.
        const res = await axios.post(API_URL, { title, author, content });
        if (res.status > 300) {
            console.log("ERROR!!!");
        }
        console.log("SUCCESS");
    };

    return (
        <div>
            <form onSubmit={handleSubmit} method="POST">
                <label>Name</label>
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label>Author</label>
                <input
                    onChange={(e) => setAuthor(e.target.value)}
                    value={author}
                />
                <label>Content</label>
                <input
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
 */

//axios 대신 fetch도 가능.
//const res = await axios.post(API_URL, { title, author, content });

// fetch(API_URL, {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ title, author, content }),
// });
