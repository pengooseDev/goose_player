import type { NextPage } from 'next';
import Player from '../src/components/Player/Player';
import Search from '../src/components/search/Search';
import styled from 'styled-components';
import Queue from '../src/components/Queue';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { queueToggleAtom, useSsrComplectedState, queueAtom } from '../src/atom';
import Menu from '../src/components/ControlBar/Menu';

const Home: NextPage = () => {
  const [queue, setQueueData] = useRecoilState(queueAtom);

  useEffect(() => {
    const value = localStorage.getItem('persistQueueAtom');
    const queueData = !!value ? JSON.parse(value) : undefined;
    if (!queueData) return;
    const newData = Object.entries(queueData).map((v, i) => v[1]);

    //@ts-ignore;
    setQueueData((prev) => newData[0]);
  }, []);

  return (
    <>
      <Menu />
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
  };

  /* RecoilPersist SSR */
  const setSsrCompleted = useSsrComplectedState();
  useEffect(setSsrCompleted, [setSsrCompleted]);

  return (
    <>
      <Wrapper onClick={overlayToggleHandler}>
        <RotateComponent>
          <Player />
          <Search />
        </RotateComponent>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  background: #2b2b2b;
`;

const RotateComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #2b2b2b;
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
