import ReactPlayer from "react-player";
import { playerAtom } from "../atom";
import { useRecoilState } from "recoil";

const Player = () => {
    const [playerUrl, setPlayerUrl] = useRecoilState(playerAtom);
    return <ReactPlayer url={playerUrl} />;
};
