# MusicPlayer

-   유튜브 검색기능.

    1. submit
    2. (BE) req.body에서 검색어 추출
    3. axios || fetch로 youtube 검색어 query 넣어서 GET요청
    4. 결과물 파싱
    5. 필요한 데이터 정리(url, title, thumbnail)
    6. FE로 전달 //res.status(200).json(data);

-   Playlist 기능.
    일단 localStorage를 이용해 구현.
    이후 졸업작품 주차에 로그인 기능 고려.
