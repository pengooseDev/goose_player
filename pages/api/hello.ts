(async () => {
    const res = await fetch(
        "https://www.youtube.com/results?search_query=ambient+music"
    );
    const reg = /var ytInitialData = {(.*?)};/;
    const data = await res.text();
    const results = reg.exec(data);
    if (!results) return;
    const result = JSON.parse(results[0].substring(20).slice(0, -1));
    console.log(result);
})();
