document.addEventListener("DOMContentLoaded", () => {
    // Hamburger Menu Toggle
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu");
    const menuIcon = hamburger?.querySelector("i");

    if (hamburger && mobileMenu && menuIcon) {
        hamburger.addEventListener("click", () => {
            const isOpen = mobileMenu.style.maxHeight === "300px";
            mobileMenu.style.maxHeight = isOpen ? "0" : "300px";
            menuIcon.className = isOpen ? "fas fa-bars text-red-500" : "fas fa-times text-red-500";
        });

        // Close menu on link click
        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.style.maxHeight = "0";
                if (menuIcon) menuIcon.className = "fas fa-bars text-red-500";
            });
        });
    } else {
        console.error("Hamburger menu elements not found:", { hamburger, mobileMenu, menuIcon });
    }

    // Smooth scrolling for all navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
                if (mobileMenu && mobileMenu.style.maxHeight === "300px") {
                    mobileMenu.style.maxHeight = "0";
                    if (menuIcon) menuIcon.className = "fas fa-bars text-red-500";
                }
            }
        });
    });

    // Handle "Get $ROAR" button for external link with compatibility check
    const getRoarBtn = document.getElementById("get-roar-btn");
    if (getRoarBtn) {
        getRoarBtn.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent default if needed
            window.location.href = getRoarBtn.getAttribute("href"); // Direct navigation
            console.log("Attempting to navigate to:", getRoarBtn.getAttribute("href"));
        });
    } else {
        console.error("Get $ROAR button not found");
    }

    // Hero Section Animation
    gsap.registerPlugin(ScrollTrigger);
    gsap.from("#hero-logo", { y: -50, opacity: 0, duration: 1, delay: 0.2, ease: "power2.out" });
    gsap.from("#home h1", { y: -30, opacity: 0, duration: 1, delay: 0.4, ease: "power2.out" });
    gsap.from("#home p", { y: -20, opacity: 0, duration: 1, delay: 0.6, ease: "power2.out" });
    gsap.from("#get-roar-btn", { scale: 0.8, opacity: 0, duration: 1, delay: 0.8, ease: "power2.out" });

    // Section Title Animations
    gsap.utils.toArray("section h2").forEach((title) => {
        gsap.from(title, {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
            },
        });
    });

    // Particle Effect for Hero Section
    const canvas = document.createElement("canvas");
    document.getElementById("particles").appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    const particles = [];

    for (let i = 0; i < 30; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 1.5,
            speedY: (Math.random() - 0.5) * 1.5,
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

    // Logo Loading Check
    const navLogo = document.getElementById("nav-logo");
    const heroLogo = document.getElementById("hero-logo");
    [navLogo, heroLogo].forEach(logo => {
        if (!logo.src || logo.src.includes("undefined")) {
            console.error("Logo not found. Verify file exists:", logo.src);
            logo.style.display = "none";
            logo.nextElementSibling.style.display = "block";
        } else {
            logo.onload = () => console.log("Logo loaded successfully for", logo.id);
            logo.onerror = () => {
                console.error("Failed to load logo for", logo.id, ". Verify file path.");
                logo.style.display = "none";
                logo.nextElementSibling.style.display = "block";
            };
        }
    });

    // Fetch real-time ROAR data from MultiversX API
    async function fetchTokenData() {
        try {
            const response = await fetch("https://api.multiversx.com/tokens/ROAR-e5185d");
            const tokenData = await response.json();
            console.log("API Response:", tokenData);

            // Tokenomics Section
            document.getElementById("ticker").textContent = tokenData.identifier || "ROAR-e5185d";
            document.getElementById("decimals").textContent = tokenData.decimals || 10;
            document.getElementById("total-supply").textContent = parseInt(tokenData.supply || "1847358").toLocaleString();
            document.getElementById("circulating-supply").textContent = parseInt(tokenData.circulatingSupply || "1365532").toLocaleString();
            document.getElementById("burnt-supply").textContent = parseInt(tokenData.burnt || "3748643897427984").toLocaleString();
            document.getElementById("initial-minted").textContent = parseInt(tokenData.initialMinted || "22222220").toLocaleString();
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

            // Token Properties under About
            document.getElementById("can-pause").textContent = tokenData.canPause ? "✔" : "❌";
            document.getElementById("can-freeze").textContent = tokenData.canFreeze ? "✔" : "❌";
            document.getElementById("can-wipe").textContent = tokenData.canWipe ? "✔" : "❌";
            document.getElementById("can-local-mint").textContent = tokenData.canLocalMint ? "✔" : "❌";
        } catch (error) {
            console.error("Error fetching token data:", error);
        }
    }

    fetchTokenData();
    setInterval(fetchTokenData, 60000); // Update every minute
});
