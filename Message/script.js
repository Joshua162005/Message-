document.addEventListener('DOMContentLoaded', () => {
    // Verification Logic
    const verifyBtn = document.getElementById('verifyBtn');
    const verificationCodeInput = document.getElementById('verificationCode');
    const verifyError = document.getElementById('verifyError');
    const verificationOverlay = document.getElementById('verificationOverlay');
    const mainContent = document.getElementById('mainContent');

    verifyBtn.addEventListener('click', checkVerification);
    verificationCodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkVerification();
        }
    });

    function checkVerification() {
        const code = verificationCodeInput.value.trim().toLowerCase();
        // The passcode is "Nicole"
        if (code === 'nicole') {
            verificationOverlay.classList.add('hidden');
            mainContent.style.display = 'flex';

            // Wait for overlay to fade out before completely removing it from flow
            setTimeout(() => {
                verificationOverlay.style.display = 'none';
            }, 800);
        } else {
            verifyError.classList.remove('show');
            // Trigger reflow to restart animation
            void verifyError.offsetWidth;
            verifyError.classList.add('show');
        }
    }

    // Folder Logic
    const mainFolder = document.getElementById('mainFolder');
    const messageContainer = document.getElementById('messageContainer');
    const imageContainer = document.getElementById('imageContainer');
    const resetBtn = document.getElementById('resetBtn');
    const instructionText = document.getElementById('instructionText');

    let isMainFolderOpen = false;

    mainFolder.addEventListener('click', (e) => {
        if (e.target.closest('.item-container')) return;

        if (!isMainFolderOpen) {
            mainFolder.classList.add('open');
            isMainFolderOpen = true;
            instructionText.style.opacity = '0';

            setTimeout(() => {
                if (isMainFolderOpen) {
                    instructionText.textContent = "Click an item to open it, or click the folder to close it!";
                    instructionText.style.opacity = '1';
                }
            }, 600);

            createFloatingHearts();
        } else {
            closeEverything();
        }
    });

    function closeItem() {
        messageContainer.classList.remove('active');
        imageContainer.classList.remove('active');

        messageContainer.style.opacity = '1';
        imageContainer.style.opacity = '1';

        resetBtn.classList.remove('show');

        if (isMainFolderOpen) {
            instructionText.textContent = "Click an item to open it, or click the folder to close it!";
            instructionText.style.opacity = '1';
        }
    }

    messageContainer.addEventListener('click', () => {
        if (!isMainFolderOpen) return;

        if (messageContainer.classList.contains('active')) {
            closeItem();
        } else {
            messageContainer.classList.add('active');
            imageContainer.style.opacity = '0';
            instructionText.style.opacity = '0';
            resetBtn.classList.add('show');
        }
    });

    imageContainer.addEventListener('click', () => {
        if (!isMainFolderOpen) return;

        if (imageContainer.classList.contains('active')) {
            closeItem();
        } else {
            imageContainer.classList.add('active');
            messageContainer.style.opacity = '0';
            instructionText.style.opacity = '0';
            resetBtn.classList.add('show');
        }
    });

    function closeEverything() {
        closeItem();
        mainFolder.classList.remove('open');
        isMainFolderOpen = false;

        instructionText.textContent = "Click the big folder to open it!";
        instructionText.style.opacity = '1';
    }

    resetBtn.addEventListener('click', closeEverything);

    function createFloatingHearts() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '💖';
                heart.style.position = 'fixed';
                heart.style.left = (Math.random() * 80 + 10) + 'vw';
                heart.style.bottom = '-30px';
                heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
                heart.style.opacity = Math.random() * 0.7 + 0.3;
                heart.style.transition = 'all 2.5s ease-in';
                heart.style.zIndex = '9999';
                heart.style.pointerEvents = 'none';

                document.body.appendChild(heart);

                setTimeout(() => {
                    heart.style.bottom = '120vh';
                    heart.style.transform = `translateX(${(Math.random() - 0.5) * 150}px) rotate(${Math.random() * 360}deg)`;
                    heart.style.opacity = '0';
                }, 50);

                setTimeout(() => {
                    heart.remove();
                }, 2600);
            }, i * 120);
        }
    }
});
