import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

// 1. Initialize Kaboom
kaboom({
    background: [13, 17, 23], // Dark background
    touchToMouse: true,       // Mobile support
});

// 2. Load Assets
loadSprite("wizard", "./assets/wizard-final.png");
loadSound("theme", "./assets/music.mp3");
loadSprite("robot", "./assets/npc.png");

// 3. Define the Main Scene
scene("main", () => {
    
    // --- THE PLAYER ---
    const player = add([
        sprite("wizard"), // Use the loaded PNG
        pos(center()),
        area({ scale: 0.1 }), // Adjust hitbox if PNG has whitespace
        body(),
        anchor("center"),
        scale(0.5), // Make the pixel art nice and big
        "player"
    ]);

    // -- THE THEME ---
    const music = play("theme", {
        loop: true,   // Loop forever
        volume: 0.5,  // 50% volume (don't blast their ears)
        paused: true  // Start paused to satisfy browser rules
    });

    let userMuted = false; // Track if user specifically turned it off
    const muteBtn = document.getElementById("mute-btn");

    if (muteBtn) {
        muteBtn.onclick = () => {
            userMuted = !userMuted; // Toggle status
            
            if (userMuted) {
                music.paused = true; // Stop the music
                muteBtn.innerText = "🔇 Music: OFF";
            } else {
                music.paused = false; // Resume the music
                if (!music.paused) music.play();
                muteBtn.innerText = "🔊 Music: ON";
            }
            // Remove focus from button so spacebar doesn't trigger click again
            muteBtn.blur(); 
        };
    }

    // Camera Follow
    player.onUpdate(() => {
        camPos(player.pos);
    });

    const robot = add([
        sprite("robot"), // Use your new image!
        pos(center().add(150, -100)), // 120px to the right
        anchor("center"),
        area({ scale: 0.1 }), // Hitbox
        body({ isStatic: true }), // Won't move
        scale(0.5), // Make it big enough to see
        "npc" // Tag for collision
    ]);

    // The Speech Bubble (Floating above the sprite)
    const bubble = add([
        rect(160, 50, { radius: 4 }),
        pos(robot.pos.sub(0, 70)), // Adjusted height for sprite
        anchor("center"),
        color(255, 255, 255),
        opacity(0), // Start invisible
        z(10) 
    ]);

    const bubbleText = bubble.add([
        text("", { size: 10, font: "monospace", width: 150, align: "center", lineSpacing: 6 }),
        anchor("center"),
        color(0, 0, 0),
    ]);

    // Robot Interaction Logic (Kept the same)
    const dialogues = [
        "Beep boop. Kaya runs on coffee and Python.",
        "Did you know? I am a finite state machine.",
        "Syntax error: You are too awesome.",
        "My favorite library is spaCy. It is very fast.",
        "Resume.pdf located at /home/user/downloads...",
        "definitely hire him ;)"
    ];

    let isTalking = false;

    player.onCollide("npc", () => {
        if (isTalking) return;
        isTalking = true;

        bubbleText.text = dialogues[Math.floor(Math.random() * dialogues.length)];
        
        // Pop In
        bubble.opacity = 1;

        wait(1.5, () => {
            bubble.opacity = 0;
            isTalking = false;
        });
    });

    // --- ORB CREATION LOGIC ---
    function createOrb(x, y, colorCode, title, htmlContent) {
        
        // 1. The Pulse Glow (Visual Effect)
        const glow = add([
            circle(50), // Start radius
            pos(center().add(x, y)),
            anchor("center"),
            color(colorCode),
            opacity(0.2),
        ]);

        // 2. The Solid Orb (Interactable)
        add([
            circle(25),
            pos(center().add(x, y)),
            anchor("center"),
            area({ scale: 1.5 }), // Hitbox is larger than the visual circle
            color(colorCode),
            outline(4, [255, 255, 255]), // White outline makes it pop
            "station", // Tag for collision
            { title, htmlContent } // Store the CV data here
        ]);

        // 3. The Label
        add([
            text(title, { size: 18, font: "monospace" }),
            pos(center().add(x, y + 60)),
            anchor("center"),
            color(200, 200, 200)
        ]);

        // 4. Animate the Glow (Breathe Effect)
        glow.onUpdate(() => {
            glow.radius = 45 + Math.sin(time() * 3) * 5; 
        });
    }

    // --- CV CONTENT (From your resume) ---

    // ORB 1: WORK (Red/Pink)
    const workHTML = `
        <strong>Technology Intern @ Mars Athletic Club</strong><br>
        <em>May 2024 - September 2025 | Istanbul</em>
        <hr>
        <br>
        <strong>Software Developer @ Mars Athletic Club</strong><br>
        <em>September 2024 - Oct 2025 | Istanbul</em>
        <ul>
            <li>Built AI solutions: RAG-driven chatbots, Custom GPTs & Copilot Studio bots.</li>
            <li>Developed scalable apps using <strong>Angular, TypeScript, Node.JS, FastAPI And Bootstrap</strong>.</li>
            <li>Managed state with NgRx/RxJS.</li>
        </ul>
        <hr>
        <br>
        <strong>Research Intern @ Koç University</strong><br>
        <em>April 2025 - Present | Remote</em>
        <ul>
            <li>Defining syntactic structures for low-resource languages.</li>
            <li>Creating datasets for LLMs to solve Linguistic Olympiad problems.</li>
        </ul>
    `;
    createOrb(-250, 0, [255, 0, 85], "Work XP", workHTML);

    // ORB 2: EDUCATION (Blue)
    const eduHTML = `
        <strong>M.Sc. Computational Linguistics</strong><br>
            <em>University of Stuttgart (2025-2027)</em><br>
            🏆 <strong>TEV-DAAD Scholar:</strong> Awarded for excellence in studies.
        <hr>
        <strong>B.A. German Language & Literature</strong><br>
            <em>Istanbul University (2019-2024)</em><br>
            Graduated Magna Cum Laude (GPA: 3.61/4.0).
    `;
    createOrb(250, 0, [0, 150, 255], "Education", eduHTML);

    // ORB 3: SKILLS (Green)
    const skillsHTML = `
        <strong>Languages:</strong><br><br> German (C1), English (C2), Turkish (Native)<br><br>
        <strong>Tech Stack:</strong>
        <ul>
            <li><strong>Web:</strong> Angular, React, TypeScript, Node.js, FastAPI</li>
            <li><strong>AI/Data:</strong> Python, PyTorch, spaCy, NLTK, Pandas, NumPy, Scikit-learn</li>
            <li><strong>Concepts:</strong> NLP, RAG, Machine Learning, Deep Learning, Web/App Development</li>
        </ul>
    `;
    createOrb(0, -200, [0, 255, 100], "Skills", skillsHTML);

    // ORB 4: CONTACT (Gold)
    const contactHTML = `
        <strong>Let's Connect!</strong><br><br>
        📧 <a href="mailto:kayamericengin@gmail.com">kayamericengin@gmail.com</a><br>
        📍 Stuttgart, Germany<br>
        📱 +49 0172 848 97 47<br>
        <br>
        <strong><a href="https://www.linkedin.com/in/kaya-meric-engin/">LinkedIn</a></strong<br>
        <br>
        <strong><a href="https://github.com/mericengin">GitHub</a></strong
    `;
    createOrb(0, 200, [255, 200, 0], "Contact", contactHTML);


    // --- MOVEMENT LOGIC ---
    const SPEED = 350;

    onKeyPress(() => {
        if (music.paused) {
            music.play();
        }
    });

    onKeyDown("left", () => {
        player.move(-SPEED, 0);
        player.flipX = false; // Face left
    });
    onKeyDown("right", () => {
        player.move(SPEED, 0);
        player.flipX = true; // Face right
    });
    onKeyDown("up", () => {
        player.move(0, -SPEED);
    });
    onKeyDown("down", () => {
        player.move(0, SPEED);
    });

    // Dust Particles (Visual Juice)
    loop(0.2, () => {
        if (isKeyDown("left") || isKeyDown("right") || isKeyDown("up") || isKeyDown("down")) {
            add([
                rect(4, 4),
                pos(player.pos.add(0, 30)),
                color(255, 255, 255),
                move(rand(0, 360), 50),
                opacity(0.5),
                lifespan(0.3, { fade: 0.3 }),
                anchor("center"),
            ]);
        }
    });

    // --- INTERACTION ---
    player.onCollide("station", (station) => {
        shake(3); // Screen shake
        window.openModal(station.title, station.htmlContent);
    });
});

// Start the game
go("main");

// --- MODAL CONTROLS (Global Functions) ---
window.openModal = (title, content) => {
    const overlay = document.getElementById("modal-overlay");
    document.getElementById("m-title").innerHTML = title;
    document.getElementById("m-content").innerHTML = content;
    overlay.style.display = "flex";
}

window.closeModal = () => {
    document.getElementById("modal-overlay").style.display = "none";
}

// Close modal with Escape key
window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        window.closeModal();
    }
});