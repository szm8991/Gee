// 初始资金m，每天可以买卖一股，求n天后的最大资产
// 最大资产=现金数+当天股票价格*股票数
function solve(prices, m, n) {
  // dp[i][j]->i天交易后，手上有j支股票的最大现金数
  // dp[i][j]=dp[i-1][j]->不交易
  // dp[i-1][j-1]>prices[i]时，dp[i][j]=dp[i-1][j-1]-a[i]->买入1股
  // dp[i][j]=dp[i-1][j+1]+a[i]->卖出
  const dp = new Array(n).fill(0).map(_ => new Array(n).fill(0));
  dp[0][0] = m;
  if (m > prices[0]) dp[0][1] = m - prices[0];
  // 从第一天开始
  for (let i = 1; i < n; i++) {
    // 0股-最多n股
    for (let j = 0; j <= n; j++) {
      // 不交易
      dp[i][j] = dp[i - 1][j];
      // 买入
      if (j > 0 && dp[i - 1][j - 1] > prices[j]) {
        dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - 1] - prices[i]);
      }
      // 卖出
      dp[i][j] = Math.max(dp[i][j], dp[i - 1][j + 1] + prices[i]);
    }
  }
  // 最大资产=现金数+当天股票价格*股票数
  let res = 0;
  for (let i = 0; i < n; i++) {
    res = Math.max(res, dp[n - 1][i] + i * prices[n - 1]);
  }
  return res;
}
