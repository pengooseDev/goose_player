import Head from "next/head";
import titleIcon from "../src/assets/img/Pengoose.jpeg";

const Header = () => {
  return (
    <Head>
      <title>GoosePlayer</title>
      {/*<link
                rel="shortcut icon"
                type="image/x-icon"
                href={titleIcon}
            ></link> href issue*/}
    </Head>
  );
};

export default Header;
