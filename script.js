// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero section animation
gsap.from(".animate__hero img", { y: -50, opacity: 0, duration: 1, delay: 0.2 });
gsap.from(".animate__hero h1", { y: -30, opacity: 0, duration: 1, delay: 0.4 });
gsap.from(".animate__hero p", { y: -20, opacity: 0, duration: 1, delay: 0.6 });
gsap.from(".animate__hero a", { scale: 0.8, opacity: 0, duration: 1, delay: 0.8 });

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
        scale: 0.95,
        duration: 0.8,
        delay: index * 0.2,
        scrollTrigger: {
            trigger: element,
            start: "top 90%",
        },
    });
});

// Hamburger Menu Toggle (Fixed)
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    const icon = hamburger.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
});

// Red Particle Effect for Hero Section
const canvas = document.createElement("canvas");
document.getElementById("particles").appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
const particles = [];
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
        ctx.fill();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Resize canvas on window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Fetch real-time ROAR data from MultiversX API
async function fetchTokenData() {
    try {
        const response = await fetch("https://api.multiversx.com/tokens/ROAR-e5185d");
        const tokenData = await response.json();

        // Tokenomics Section
        document.getElementById("ticker").textContent = tokenData.identifier || "ROAR-e5185d";
        document.getElementById("decimals").textContent = tokenData.decimals || 10;
        document.getElementById("total-supply").textContent = parseInt(tokenData.supply || "1847358").toLocaleString();
        document.getElementById("circulating-supply").textContent = parseInt(tokenData.circulatingSupply || "1365532").toLocaleString();
        document.getElementById("burnt-supply").textContent = parseInt(tokenData.burnt || "3748643897427984").toLocaleString();
        document.getElementById("initial-minted").textContent = parseInt(tokenData.initialMinted || "222222220").toLocaleString();
        document.getElementById("holders").textContent = tokenData.accounts || "1554";
        document.getElementById("transactions").textContent = tokenData.transactions || "7415";

        // Dashboard Section
        document.getElementById("roar-price").textContent = parseFloat(tokenData.price || "0.008854").toFixed(6);
        document.getElementById("market-cap").textContent = parseFloat(tokenData.marketCap || "12090.49").toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        document.getElementById("volume").textContent = parseFloat(tokenData.totalVolume24h || "12.66").toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        document.getElementById("liquidity").textContent = parseFloat(tokenData.totalLiquidity || "667.54").toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        document.getElementById("dashboard-holders").textContent = tokenData.accounts || "1554";
        document.getElementById("dashboard-transactions").textContent = tokenData.transactions || "7415";
        document.getElementById("transfers").textContent = tokenData.transfers || "75151";
        document.getElementById("trade-count").textContent = tokenData.tradesCount || "9731";

        // Token Properties Section
        document.getElementById("can-pause").textContent = tokenData.canPause ? "Can Pause" : "Can't Pause";
        document.getElementById("can-freeze").textContent = tokenData.canFreeze ? "Can Freeze" : "Can't Freeze";
        document.getElementById("can-wipe").textContent = tokenData.canWipe ? "Can Wipe" : "Can't Wipe";
        document.getElementById("can-local-mint").textContent = tokenData.canLocalMint ? "Can Local Mint" : "Can't Local Mint";
    } catch (error) {
        console.error("Error fetching token data:", error);
        // Fallback values already set in HTML
    }
}

fetchTokenData();
setInterval(fetchTokenData, 60000); // Update every minute
