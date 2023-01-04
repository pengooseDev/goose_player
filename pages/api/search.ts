// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { Video } from '../../src/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse //<Data>
) {
  switch (req.method) {
    case 'GET':
      //youtube query 양식 : https://www.youtube.com/results?search_query=%ED%8E%AD%EA%B7%84
      const { query } = req.query;
      //@ts-ignore
      const replacedQuery = query?.split(' ').join('');

      if (typeof query !== 'string') return res.status(400); //typescript exception.
      try {
        const axiosUrl = `https://www.youtube.com/results?search_query=${encodeURI(
          replacedQuery
        )}`;

        const resData = await axios.get(axiosUrl);
        const HTML = resData.data;
        const regex = /(var ytInitialData)(.*?)};/;
        const parsedRegexHTML = regex.exec(HTML);
        if (!parsedRegexHTML) return res.status(400);
        const parsedHTML = parsedRegexHTML[0];
        if (!parsedHTML) return res.status(400);

        const objectData = JSON.parse(
          parsedHTML.substring(20, parsedHTML.length - 1)
        );

        const returnData =
          objectData.contents.twoColumnSearchResultsRenderer.primaryContents
            .sectionListRenderer?.contents[0].itemSectionRenderer.contents;

        const filtered = returnData
          .map((data: any) => dataTrimmer(data))
          .filter((data: Video) => {
            if (!data) return false;
            for (const item in data) {
              if (!item) return false;
            }
            return true;
            // !Object.values(data)
            //     .map((value) => !!value)
            //     .includes(false)
          });

        return res.status(200).json({ result: filtered });
        //HTML을 string 데이터로 받아온 것 중 필요한 데이터가 있는 부분만 일단 chuncking
      } catch (err) {
        console.log('getERR : ', err);
        return res.status(400).send(err);
      }

    case 'POST':
      return res.status(200).json({ data: 'hi' });

    case 'PUT':
      return;

    case 'DELETE':
      return;
  }
}

const dataTrimmer = (axiosData: any) => {
  /* ChannelUrl */
  const info =
    axiosData.videoRenderer?.channelThumbnailSupportedRenderers
      .channelThumbnailWithLinkRenderer;
  const channelId = info?.navigationEndpoint.canonicalBaseUrl;
  const channelUrl = `https://www.youtube.com/${channelId}`;

  /* thumbnail */
  const thumbnailData = axiosData.videoRenderer?.thumbnail?.thumbnails[0];
  const thumbnail = thumbnailData?.url;

  //유튜브 쇼츠인 경우, 이미지 크기 맞추기 힘듦. 썸네일 세로>가로면 버리기.
  if (!thumbnailData) return;
  const { height, width } = thumbnailData;
  if (height > width) return;

  /* Title */
  const titleData =
    axiosData.videoRenderer?.title.accessibility.accessibilityData.label;

  //axios가 받아오는 데이터 형식이 local, vercel에 따라 다름. (title에 정규표현식 안먹음!)
  /* Local용 */
  const titleLocalRegex = /^.*? (?=게시자: )/g; //텍스트의 처음부터 "게시자"의 전방탐색까지.
  const title = titleLocalRegex.exec(titleData);

  /* ID */
  const id = axiosData.videoRenderer?.videoId;

  const owner = axiosData.videoRenderer?.ownerText.runs[0].text;

  const duration =
    axiosData.videoRenderer?.lengthText?.accessibility?.accessibilityData.label;

  return {
    title: title ? title[0] : 'Not Found',
    id,
    channelUrl,
    thumbnail,
    duration,
    owner,
  };
};
