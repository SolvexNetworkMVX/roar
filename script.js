// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero section animation
gsap.from(".animate__hero img", { y: -50, opacity: 0, duration: 1, delay: 0.2 });
gsap.from(".animate__hero h1", { y: -30, opacity: 0, duration: 1, delay: 0.4 });
gsap.from(".animate__hero p", { y: -20, opacity: 0, duration: 1, delay: 0.6 });
gsap.from(".animate__hero a", { y: -10, opacity: 0, duration: 1, delay: 0.8 });

// Scroll-triggered animations for sections
gsap.utils.toArray(".animate__fadeIn").forEach((element) => {
    gsap.from(element, {
        opacity: 0,
        y: 30,
        duration: 1,
        scrollTrigger: {
            trigger: element,
            start: "top 80%",
        },
    });
});

gsap.utils.toArray(".animate__card").forEach((element, index) => {
    gsap.from(element, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: index * 0.2,
        scrollTrigger: {
            trigger: element,
            start: "top 90%",
        },
    });
});

// Fetch real-time ROAR data from MultiversX API
async function fetchTokenData() {
    try {
        const response = await fetch("https://api.multiversx.com/tokens/ROAR-e5185d");
        const tokenData = await response.json();

        // Tokenomics Section
        document.getElementById("ticker").textContent = tokenData.ticker || "ROAR";
        document.getElementById("decimals").textContent = tokenData.decimals || 10;
        document.getElementById("total-supply").textContent = parseInt(tokenData.supply || "1847358").toLocaleString();
        document.getElementById("circulating-supply").textContent = parseInt(tokenData.circulatingSupply || "1365532").toLocaleString();
        document.getElementById("burnt-supply").textContent = parseInt(tokenData.burnt || "3748643897427984").toLocaleString();
        document.getElementById("initial-minted").textContent = parseInt(tokenData.initialMinted || "22222220000000000").toLocaleString();
        document.getElementById("holders").textContent = tokenData.accounts || "1554";
        document.getElementById("transactions").textContent = tokenData.transactions || "7415";

        // Dashboard Section
        document.getElementById("roar-price").textContent = parseFloat(tokenData.price || "0.008854").toFixed(6);
        document.getElementById("market-cap").textContent = parseFloat(tokenData.marketCap || "12090.49").toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        document.getElementById("volume").textContent = parseFloat(tokenData.totalVolume24h || "12.66").toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        document.getElementById("liquidity").textContent = parseFloat(tokenData.totalLiquidity || "667.54").toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        document.getElementById("dashboard-holders").textContent = tokenData.accounts || "1554";
        document.getElementById("dashboard-transactions").textContent = tokenData.transactions || "7415";
    } catch (error) {
        console.error("Error fetching token data:", error);
    }
}

fetchTokenData();
setInterval(fetchTokenData, 60000); // Update every minute
