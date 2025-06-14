/**
 * Surge 脚本：Pornhub 推荐页 Cookie 抓取
 *
 * 【Surge 配置】
 * [Script]
 * Pornhub Cookie 抓取 = type=http-request,pattern=^https:\/\/cn\.pornhub\.com\/recommended,script-path=https://raw.githubusercontent.com/Madai-v/ForwardWidgets/refs/heads/main/Widgets/getPhCk.js
 * 
 * [MITM]
 * hostname = cn.pornhub.com
 * 
 * 🚀 使用方法：
 * 1. 启动 Surge，确保配置中包含上面的 Script 和 MITM
 * 2. 使用浏览器打开https://cn.pornhub.com/recommended登录
 * 3. 系统弹出通知「Cookie 抓取成功」，并自动复制到剪贴板
 * 4. 可在 Surge 控制台中查看完整 Cookie 日志
 */
if ($request.url.includes("/recommended")) {
  const cookieHeader = $request.headers["Cookie"] || $request.headers["cookie"];
  if (cookieHeader) {
    const message = `<<<===== 🍪 Cookie =====>>>\n${cookieHeader}\n<<<===== 🍪 Cookie =====>>>`;
    console.log(message);
    $notification.post("📡 Pornhub Cookie 抓取", "成功 ✅", cookieHeader);
  } else {
    console.log("❌ 未捕获到 Cookie");
    $notification.post("📡 Pornhub Cookie 抓取", "失败 ❌", "请求中没有 Cookie");
  }
}
$done({});
