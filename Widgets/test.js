var WidgetMetadata = {
    id: "ph_favorites_widget",
    title: "Pornhub 我的收藏",
    description: "抓取并显示收藏夹中的视频",
    author: "ChatGPT",
    site: "https://cn.pornhub.com",
    version: "1.0.0",
    requiredVersion: "0.0.1",
    modules: [
        {
            title: "我的收藏视频",
            description: "从收藏夹页面加载视频",
            requiresWebView: false,
            functionName: "fetchFavorites",
            sectionMode: false,
            params: [
                {
                    name: "url",
                    title: "收藏页地址",
                    type: "input",
                    description: "请输入你的收藏页链接，如 https://cn.pornhub.com/users/aaaaa/videos/favorites",
                    value: "https://cn.pornhub.com/users/aaaaa/videos/favorites"
                }
            ]
        }
    ]
};

async function fetchFavorites(params = {}) {
    try {
        const url = params.url;
        if (!url || !url.includes("pornhub.com")) {
            throw new Error("请输入有效的 Pornhub 收藏链接");
        }

        const response = await Widget.http.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Referer": "https://cn.pornhub.com"
            }
        });

        const $ = Widget.html.load(response.data);
        const videoElements = $("ul.videos li.videoBox");

        const videos = videoElements.map((i, el) => {
            const element = $(el);
            const title = element.find("span.title a").text().trim();
            const link = "https://cn.pornhub.com" + element.find("a").attr("href");
            const posterPath = element.find("img").attr("data-thumb_url") || element.find("img").attr("src");
            const durationText = element.find(".duration").text().trim();

            return {
                id: link,
                type: "url",
                title,
                posterPath,
                backdropPath: posterPath,
                releaseDate: "",
                mediaType: "movie",
                rating: "",
                genreTitle: "收藏",
                durationText,
                link,
                description: "Pornhub 收藏视频",
                videoUrl: link // 注意：这里仅返回详情页链接，播放需用户在 WebView 中操作
            };
        }).get();

        return videos;
    } catch (error) {
        console.error("处理失败:", error);
        throw error;
    }
}
